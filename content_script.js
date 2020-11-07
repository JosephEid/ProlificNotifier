chrome.storage.local.get(function () {
  let elements = Array.from(document.querySelectorAll("div.study-info"));

  for (let element of elements) {
    element.style.backgroundColor = "#89eb34";
  }

  chrome.runtime.sendMessage({ studyCount: elements.length });
});
