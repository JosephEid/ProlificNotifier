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
