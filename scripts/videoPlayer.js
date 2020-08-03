import { addZero } from './supScript.js';

export const videoInit = () => {
  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimeTotal = document.querySelector('.video-time__total');

  const videoFullscreen = document.querySelector('.video-fullscreen');
  const videoVolume = document.querySelector('.video-volume');


  

  // функция меняющая иконку fa-play на fa-pause
  const toggleIcon = () => {
    if(videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  }
  
  // функция включающая/выключающая плеер по нажатию иконки play/pause
  const togglePlay = () => {
    // видеоплейер имеет методы: play(), pause()
    // поставим условие
    if(videoPlayer.paused){
      videoPlayer.play(); 
   } else {
     videoPlayer.pause();
   }
   // мняем иконку у videoButtonPlay
   toggleIcon();
  };
  // функция остановки плеера по нажатию иконки stop и переход к нулевой секунде (в начало видео)
  const stopPlay = () => {
    // по клику на кнопку плеер становится на паузу
    videoPlayer.pause();
    // а отсчет времени в 0, используя свойства плеера currentTime
    videoPlayer.currentTime = 0;
  }

  // функция форматирования времени (добавление нуля)
  // const addZero = n => n < 10 ? '0' + n : n; вынесли в отдельный файл
  
  // по клику на видеоплейер или кнопку запуска будет запускаться видео
  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  // у видео и аудио плееров есть встроенные события:
  // play, pause, timeupdate

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  // отловим клик по кнопке videoButtonStop
  videoButtonStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    //  для обновления времени нужны две переменные currentTime и duration, которые есть у плеера
    const currentTime = videoPlayer.currentTime; //текущее время просмотра видео
    const duration = videoPlayer.duration; // длительность всего видео

    // выделим минуты и секунды
    const minPassed = Math.floor( currentTime / 60);
    const secPassed = Math.floor( currentTime % 60);

    const minTotal = Math.floor( duration / 60);
    const secTotal = Math.floor( duration % 60);

    // выведем полученные данные на экран
    videoTimePassed.textContent = addZero(minPassed) + ':' + addZero(secPassed);
    videoTimeTotal.textContent =` ${addZero(minTotal)}:${addZero(secTotal)}`;

    // прогресс-бар имеет свойство value, которое можно установить 
    videoProgress.value = (currentTime / duration) * 100; // процент прошедшего видео 
  });

  //  пропишем действия при ручном движении прогресс-бара
  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    // фиксируем измененное значение value прогресс-бара (в процентах)
    const value = videoProgress.value;
    console.log(value);
    // устанавливаем значение текущего времени currentTime
    videoPlayer.currentTime = (value * duration) / 100;

  });

  // при клике на иконку Fullscreen разворачивать/сворачивать видео. Для этого есть встроенный АПИ requestFullscreen()
  videoFullscreen.addEventListener('click', () => {
    // videoPlayer.webkitEnterFullscreen();
    videoPlayer.requestFullscreen();
  });

  // по клику на регулировщик звука будем менять volume у videoPlayer. По умолчанию Volume=1 (100%), доступные значения от 0 до 1 ( от 0% до 100%)
  videoVolume.addEventListener('input', () => {
    // значения value у videoVolume мы задали от 1 до 100,  значит
    videoPlayer.volume = videoVolume.value /100;
  });

  // дополнительно можно сделать чтоб первоначально громкость была установлена на 50%
  videoPlayer.volume = 0.5;
  // также установим ползунок громкости в том месте, где значение громкости
  videoVolume.value = videoPlayer.volume * 100;

  // реализация отключения аудиоплеера, если переключились на другую вкладку

  // добавим нашей функции метод stop
  videoInit.stop=()=> {
    if(!videoPlayer.paused) {
      stopPlay();
    }   
  }








}; 