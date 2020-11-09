initialise();
addRadiosEventListeners();
addRangeEventListeners();

function initialise() {
  chrome.storage.sync.get("sound", function (data) {
    var stateSound = document.getElementById(data.sound);
    stateSound.checked = true;
  });
  chrome.storage.sync.get("volume", function (data) {
    var stateVolume = document.getElementById("volume");
    stateVolume.value = data.volume;
  });
}

function addRadiosEventListeners() {
  var radios = document.soundForm.soundChoices;
  for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function () {
      var choice = this.value;

      chrome.storage.sync.set({ sound: choice }, function () {
        console.log(`Set sound to: ${choice}`);
        playSound();
      });
    });
  }
}

function addRangeEventListeners() {
  var volume = document.soundForm.volume;
  volume.addEventListener("change", function () {
    var choice = this.value;

    chrome.storage.sync.set({ volume: choice }, function () {
      console.log(`Set volume to: ${choice}`);
      playSound();
    });
  });
}

function playSound() {
  chrome.storage.sync.get(["sound", "volume"], function (data) {
    var audio = new Audio(`sounds/${data.sound}_sound.mp3`);
    audio.volume = data.volume / 100;
    audio.play();
  });
}
