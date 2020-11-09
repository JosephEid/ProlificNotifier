var radios = document.soundForm.soundChoices;
for (var i = 0; i < radios.length; i++) {
  radios[i].addEventListener("change", function () {
    var choice = this.value;
    chrome.storage.sync.set({ sound: choice }, function () {
      console.log(`Set sound to: ${choice}`);
      var audio = new Audio(`sounds/${choice}_sound.mp3`);
      audio.play();
    });
  });
}

var volume = document.soundForm.volume;
volume.addEventListener("change", function () {
  var choice = this.value;
  chrome.storage.sync.set({ volume: choice }, function () {
    console.log(`Set volume to: ${choice}`);
    chrome.storage.sync.get("sound", function (data) {
      var audio = new Audio(`sounds/${data.sound}_sound.mp3`);
      audio.volume = choice == "100" ? 1 : `0.${choice}`;
      audio.play();
    });
  });
});
