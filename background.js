// Show page action on any page.
const pageActionMatchRule = {
  // Declare the rule conditions.
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {},
    }),
  ],
  // Shows the page action when the condition is met.
  actions: [new chrome.declarativeContent.ShowPageAction()],
};

// Register the runtime.onInstalled event listener.
chrome.runtime.onInstalled.addListener(function () {
  // Overrride the rules to replace them with kMatchRule.
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([pageActionMatchRule]);
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("ALERT");
  chrome.browserAction.setIcon("images/get_started16.png");
});
