export const radioInit = () => {
  const radio = document.querySelector('.radio');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioNavigation = document.querySelector('.radio-navigation');
  const radioHeaderBig = document.querySelector('.radio-header__big');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');
  
  const radioVolume = document.querySelector('.radio-volume');
  const faVolumeDown = document.querySelector('.volume .fa-volume-down');
  const faVolumeUp = document.querySelector('.volume .fa-volume-up');
  

// будем работать с конструктором Audio, который будет создавать объект audio с набором свойств как и в видеоплеере
  const audio = new Audio();
  // пропишем какой тип данных будет у нашего audio
  audio.type = 'audio/aac';
  // при загрузке блока с радио присвоим кнопке Стоп(radioStop) свойство disable
  radioStop.disabled = true;

  // функция смены иконки на кнопке radioStop
  const changeIconPlay = () => {
    if(audio.paused){
      // уберем анимацию для всего блока радио при паузе
      radio.classList.remove('play');
      // меняем иконки
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      // добавим анимацию для всего блока радио при паузе
      radio.classList.add('play');
      // меняем иконки
      radioStop.classList.remove('fa-play');
      radioStop.classList.add('fa-stop');
    }
  }

  // функция добавит стилей выбранному элементу
  const selectRadioItem = elem =>{
    // добавим elem класс .select, который добавит стилей выбранному элементу, предварительно снимем этот класс у всех айтемов(радиостанций)
    radioItem.forEach( item => item.classList.remove('select'));
    elem.classList.add('select');
  }

// действия по клику на одну из радиостанций
  radioNavigation.addEventListener('change', (event) => {
    // объекту audio с помощью свойства src добавим путь к выбранной радиостанции
    // путь находится в дата-атрибуте инпута, который мы поймаем с помощью event.target и заберем у него дата-атрибут через свойство dataset.radioStantion
    const target = event.target;
    audio.src = target.dataset.radioStantion;
    // разблокируем кнопку Стоп, когда радиостанция выбрана
    radioStop.disabled = false;

    // дотянемся до родителя radio-item полученного таргета
    const parent = target.closest('.radio-item');
    // добавим ему класс .select
    selectRadioItem(parent);
    
    // у parent нужно найти картинку и название станции
    const title = parent.querySelector('.radio-name').textContent;
    const img = parent.querySelector('.radio-img').src;

    // запишем полученные данные в radioHeaderBig и radioCoverImg
    radioHeaderBig.textContent = title;
    radioCoverImg.src = img;
    // чтоб радио заиграло, нужно к аудио применить метод play()
    audio.play();
    changeIconPlay();
  });

// по клику на кнопку СТОП будем включать/выключать радио
  radioStop.addEventListener('click', () => {
    if(audio.paused){
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  })
// ДЗ: регулировка громкости аудио
  radioVolume.addEventListener('input', () => {
    audio.volume = radioVolume.value/100;

  });

  // первоначально установим громкость в 50% и рейнж поставим в соответствующую позицию
  audio.volume = 0.5;
  radioVolume.value = audio.volume *100;

  const onVolume = () => {
    audio.volume = 1;
    radioVolume.value = 100;
  };
  const offVolume = () => {
    audio.volume = 0;
    radioVolume.value = 0;
  };

  faVolumeDown.addEventListener('click', offVolume);
  faVolumeUp.addEventListener('click', onVolume);

  // реализация отключения аудиоплеера, если переключились на другую вкладку

  // добавим нашей функции метод stop
  radioInit.stop = () => {
    audio.pause();
    changeIconPlay();
  }


}; 