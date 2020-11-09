const pageActionMatchRule = {
  // Be alerted on any page
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {},
    }),
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()],
};

// Register the runtime.onInstalled event listener.
chrome.runtime.onInstalled.addListener(function () {
  // Overrride the rules to replace them with pageActionMatchRule.
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([pageActionMatchRule]);
  });
});

let regExp = new RegExp("(app.prolific.co)");
window.setInterval(function () {
  chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      if (regExp.test(tabs[i].url))
        chrome.tabs.executeScript(tabs[i].id, { file: "content_script.js" });
    }
  });
}, 2000);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.browserAction.setIcon({
    path: {
      16: `images/pronotif16_study.png`,
    },
  });
});
