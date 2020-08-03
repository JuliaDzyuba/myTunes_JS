import { addZero } from './supScript.js';

export const audioInit = () => {
  
  const audio = document.querySelector('.audio');
  const audioImg = document.querySelector('.audio-img');
  const audioHeader = document.querySelector('.audio-header');
  const audioPlayer = document.querySelector('.audio-player');
  const audioNavigation = document.querySelector('.audio-navigation');
  const audioButtonPlay = document.querySelector('.audio-button__play');
  const audioTimePassed = document.querySelector('.audio-time__passed');
  const audioProgress = document.querySelector('.audio-progress');
  const audioProgressTiming = document.querySelector('.audio-progress__timing');
  const audioTimeTotal = document.querySelector('.audio-time__total');

  const playlist =[ 'hello', 'flow', 'speed'];

  let trackIndex = 0;


  const loadTrack = () => {
    // при запуске функции проверяем была ли включена музыка, т.е. чему равно audioPlayer.paused (true или false)
    const isPlayed = audioPlayer.paused;
    // записываем текущий трек в переменную
    const track = playlist[trackIndex];
    // меняем заголовок, картинку и путь к треку на заголовок/картинку текущего трека и путь к нему
    audioHeader.textContent = track.toUpperCase();
    audioImg.src = `./audio/${track}.jpg`;
    audioPlayer.src = `./audio/${track}.mp3`;

    
    if(isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }

  };
  // отловим клик по кнопкам навигации
  audioNavigation.addEventListener('click', event => {
    const target = event.target;
// если таргет содержит класс audio-button__play, т.е. нажали на кнопку Play
    if(target.classList.contains('audio-button__play')) {
      //  переключаем классы у кнопки для изменения иконки
      audioButtonPlay.classList.toggle('fa-play');
      audioButtonPlay.classList.toggle('fa-pause');
      //  переключаем класс у всей вкладки аудиоплеера для включения-отключения анимации
      audio.classList.toggle('play');
      
      // включаем/выключаем сам плеер
      if(audioPlayer.paused){
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
      // записываем текущий трек в переменную
      const track = playlist[trackIndex];
      // меняем заголовок на заголовок текущего трека 
      audioHeader.textContent = track.toUpperCase();
    }

    // действия при нажатии кнопок prev и next
    if(target.classList.contains('audio-button__prev')){
      if(trackIndex !== 0){
        // переходим к предыдущему трэку
        trackIndex--;
      } else {
        // переходим к последнему трэку
        trackIndex = playlist.length-1;
      }
      loadTrack();
    }

    if(target.classList.contains('audio-button__next')){
      if(trackIndex < playlist.length-1){
        trackIndex++;
      } else {
        trackIndex = 0;
      }
      loadTrack();
    }
  });

  // когда трэк закончился, то автоматчески переключаться на следующий
  audioPlayer.addEventListener('ended', () => {
    if(trackIndex < playlist.length-1){
      trackIndex++;
    } else {
      trackIndex = 0;
    }
    loadTrack();
    audioPlayer.play();
  });

  // прогресс-бар

  audioPlayer.addEventListener('timeupdate', ()=> {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = (currentTime / duration) *100;

    // стилизация прогрессбара в зависимости от уже проигранной музыки
    audioProgressTiming.style.width = progress + '%';
    // установка времени уже проигранной музыки и общей продолжительности трэка
    const minPassed = Math.floor(currentTime / 60) || '0';
    const secPassed = Math.floor(currentTime % 60) || '0';

    const minTotal = Math.floor(duration / 60) || '0';
    const secTotal = Math.floor(duration % 60) || '0';

    audioTimePassed.textContent = `${addZero(minPassed)}:${addZero(secPassed)}`;
    audioTimeTotal.textContent = `${addZero(minTotal)}:${addZero(secTotal)}`;

  });
  
  // ручная перемотка трэка по прогрессбару
  audioProgress.addEventListener('click', event =>{
    // подхватим координаты места на прогрессбаре, куда кликнули при перемотке
    const x = event.offsetX; //отсчет от левой верхней точки элемента audioProgress
    const allWidth = audioProgress.clientWidth; // получим ширину прогрессбара на экране пользователя

    // найдем процент проигранной музыке
    const progress = ( x / allWidth ) * audioPlayer.duration;
    // и установим прогрессбар
    audioPlayer.currentTime = progress;

  });

  // реализация отключения аудиоплеера, если переключились на другую вкладку

  // добавим нашей функции метод stop
  audioInit.stop = () => {
    // проверяем, если плеер играет, то
    if(!audioPlayer.paused){
      // ставим его на паузу
      audioPlayer.pause();
      // меняем классы для отключения анимации и изменения иконки запуска/паузы
      audio.classList.remove('play')
      audioButtonPlay.classList.remove('fa-pause');
      audioButtonPlay.classList.add('fa-play');
    }
  }


  







}; 