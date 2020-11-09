chrome.storage.local.get(function () {
  let elements = Array.from(document.querySelectorAll("div.study-info"));

  chrome.runtime.sendMessage({ studyCount: elements.length });
});
