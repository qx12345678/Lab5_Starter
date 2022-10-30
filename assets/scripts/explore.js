// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  var voices = []
  /**Add and load voice list */ 
  function populateVoiceList() {
    if (typeof speechSynthesis === 'undefined') {
      return;
    }
    voices = speechSynthesis.getVoices();

    for(let i = 0; i < voices.length; i++ ) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if( voices[i].default ) {
        option.textContent += ' — DEFAULT';
      }

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      document.getElementById("voice-select").appendChild(option);
    }
  }
  populateVoiceList();
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  /**press to speak*/
  const synth = window.speechSynthesis;
  let button = document.querySelector('button');
  let text = document.querySelector('textarea');
  let selected = document.querySelector('select');
  let image = document.querySelector('img');

  button.addEventListener('click', function() {
    const utterThis = new SpeechSynthesisUtterance(text.value);
    const selectedOption = selected.selectedOptions[0].getAttribute('data-name');
    for( let i = 0; i < voices.length; i++ ) {
      if( voices[i].name === selectedOption ) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);
    /**change the image while speaking*/
    image.src = 'assets/images/smiling-open.png';
    utterThis.onend = () => {
      image.src = 'assets/images/smiling.png';
    }
  });
}