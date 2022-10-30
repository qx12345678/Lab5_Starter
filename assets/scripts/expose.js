// expose.js
window.addEventListener('DOMContentLoaded', init);

const jsconfetti = new JSConfetti();

function init() {
  /* update the img and audio of select horn */
  let drop_down = document.getElementById('horn-select');
  let image = document.querySelector('img');
  let sound = document.querySelector('audio');

  drop_down.addEventListener('input',update);
  function update() {
    let type = drop_down.value;
    if( type == "air-horn" ) {
      image.src = 'assets/images/air-horn.svg';
      sound.src = 'assets/audio/air-horn.mp3';
    }
    else if ( type == "car-horn" ) {
      image.src = 'assets/images/car-horn.svg';
      sound.src = 'assets/audio/car-horn.mp3';
    }
    else if( type == "party-horn" ) {
      image.src = 'assets/images/party-horn.svg';
      sound.src = 'assets/audio/party-horn.mp3';
    }
  }

  /**update volume icon */
  let volume = document.querySelector('input');
  let volume_icon = document.querySelectorAll('img')[1];
  volume.addEventListener('input', update_icon);
  function update_icon() {
    let vol_num = volume.value;
    if( vol_num == 0 ){
      volume_icon.src = 'assets/icons/volume-level-0.svg';
    }
    else if( vol_num >= 1 && vol_num < 33 ){
      volume_icon.src = 'assets/icons/volume-level-1.svg';
    }
    else if ( vol_num >= 33 && vol_num < 67 ){
      volume_icon.src = 'assets/icons/volume-level-2.svg';
    }
    else {
      volume_icon.src = 'assets/icons/volume-level-3.svg';
    }
  }
  
  /**play sound when click Play Sound */
  let button = document.querySelector('button');
  button.addEventListener('click', function(){
    sound.play();
    let type = drop_down.value;
    if( type == "party-horn" ){
      jsconfetti.addConfetti();
    }
  });
}