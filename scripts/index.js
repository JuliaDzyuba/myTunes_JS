import { radioInit } from './radioPlayer.js';
import { audioInit } from './audioPlayer.js';
import { videoInit } from './videoPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivationPlayer = () => {
  temp.style.display = 'none';
  playerBtn.forEach( item => item.classList.remove('active'));
  playerBlock.forEach( item => item.classList.remove('active'));

  // вызовем методы функций, отключающиее соответсвующий плеер при переключении вкладок
  audioInit.stop();
  videoInit.stop();
  radioInit.stop();
}

playerBtn.forEach( (btn, i) => {
  // console.log(btn);
  // console.log(playerBlock[i]);
  btn.addEventListener('click', ()=>{
    deactivationPlayer();
    btn.classList.add('active');
    playerBlock[i].classList.add('active');
  })
})

videoInit();
radioInit();
audioInit();