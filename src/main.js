const textarea = document.querySelector("#text");
let voicelist = document.querySelector("#voice");
let speechButton = document.querySelector(".submit");

let synth = speechSynthesis;
let isSpeaking = true;

function voicespeech() {
  for (let voice of synth.getVoices()) {
    let option = document.createElement("option");
    option.text = voice.name;
    voicelist.add(option);
    console.log(option);
  }
}

synth.addEventListener("voiceschanged", voicespeech);

function texttospeech(text) {
  let utternance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name === voicelist.value) {
      utternance.voice = voice;
    }
  }
  speechSynthesis.speak(utternance);
}

speechButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value != "") {
    if (!synth.speaking) {
      texttospeech(textarea.value);
    }
    if (textarea.value.length > 10) {
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechButton.innerHTML = "Pause Speech";
      } else {
        synth.pause();
        isSpeaking = true;
        speechButton.innerHTML = "Resume Speech";
      }
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechButton.innerHTML = "Convert";
        }
      }, 500);
    } else {
      speechButton.innerHTML = "Convert To Speech";
    }
  }
});
voicespeech();
