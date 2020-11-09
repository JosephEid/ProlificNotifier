const pageActionMatchRule = {
  // Be alerted on any page
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {},
    }),
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()],
};

// Register the runtime.onInstalled event listener and initialise notification sound as bell sound.
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ sound: "bell", volume: "90" }, function () {
    console.log("Sound initialised as bell at 90% volume.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([pageActionMatchRule]);
  });
});

let regExp = new RegExp("(app.prolific.co)");
window.setInterval(function () {
  var count = 0;
  chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      if (regExp.test(tabs[i].url)) {
        chrome.tabs.executeScript(tabs[i].id, { file: "content_script.js" });
        count++;
      }
    }
    if (count == 0) {
      chrome.browserAction.setIcon({
        path: {
          16: `images/pronotif16_0.png`,
        },
      });
    }
  });
}, 2000);

var studies = 0;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.browserAction.setIcon({
    path: {
      16: `images/pronotif16_study.png`,
    },
  });
  var audio;
  if (request.studyCount > studies) {
    chrome.storage.sync.get("sound", function (data) {
      audio = new Audio(`sounds/${data.sound}_sound.mp3`);
    });
    chrome.storage.sync.get("volume", function (data) {
      audio.volume = data.volume == "100" ? 1 : `0.${data.volume}`;
      audio.play();
    });
  }
  studies = request.studyCount;
});
