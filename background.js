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

  if (request.studyCount > studies) {
    playSound();
  }
  studies = request.studyCount;
});

function playSound() {
  chrome.storage.sync.get(["sound", "volume"], function (data) {
    var audio = new Audio(`sounds/${data.sound}_sound.mp3`);
    audio.volume = data.volume / 100;
    audio.play();
  });
}
