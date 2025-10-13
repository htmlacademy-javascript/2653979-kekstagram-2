const scalePlus = document.querySelector('.scale__control--bigger');
const scaleMinus = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const imageToScale = document.querySelector('.img-upload__preview img');

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
const inputEffect = document.querySelector('.effect-level__value');

const SCALE_STEP = 25;
let scale = 100;

const formOpener = document.querySelector('.img-upload__start');
formOpener.addEventListener('click', () => {
  imageToScale.style.filter = '';
  sliderContainer.classList.add('hidden');
  scale = 100;
  imageToScale.style.transform = 'scale(1)';
});

if (effectNone.checked) {
  sliderContainer.classList.add('hidden');
  imageToScale.style.filter = '';
}

scalePlus.addEventListener('click', () => {
  if (scale < 100) {
    scale += SCALE_STEP;
    scaleValue.value = `${scale}%`;
    imageToScale.style.transform = `scale(${scale}%`;
  }
});
scaleMinus.addEventListener('click', () => {
  if (scale > 25) {
    scale -= SCALE_STEP;
    scaleValue.value = `${scale}%`;
    imageToScale.style.transform = `scale(${scale}%`;
  }

});

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 1, }, start: 0, step: 0.1,
  connect: 'lower',
}
);

effectNone.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderContainer.classList.add('hidden');
    imageToScale.style.filter = '';
  } else {
    sliderContainer.classList.remove('hidden');
  }
});

effectChrome.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderContainer.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions(
      { range: { min: 0, max: 1, }, start: 1, step: 0.1, }
    );
    sliderElement.noUiSlider.on('update', () => {
      const sliderValue = sliderElement.noUiSlider.get();
      imageToScale.style.filter = `grayscale(${sliderValue})`;
      inputEffect.value = parseFloat(sliderValue).toString();
    });
  }
});

effectSepia.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderContainer.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions(
      { range: { min: 0, max: 1, }, start: 1, step: 0.1, }
    );

    sliderElement.noUiSlider.on('update', () => {
      const sliderValue = sliderElement.noUiSlider.get();
      imageToScale.style.filter = `sepia(${sliderValue})`;
      inputEffect.value = parseFloat(sliderValue).toString();
    });
  }
});

effectMarvin.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderContainer.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions(
      { range: { min: 0, max: 100, }, start: 100, step: 1, }
    );

    sliderElement.noUiSlider.on('update', () => {
      const sliderValue = sliderElement.noUiSlider.get();
      imageToScale.style.filter = `invert(${sliderValue}%)`;
      inputEffect.value = parseFloat(sliderValue).toString();
    });
  }
});

effectPhobos.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderContainer.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions(
      { range: { min: 0, max: 3, }, start: 3, step: 0.1, }
    );

    sliderElement.noUiSlider.on('update', () => {
      const sliderValue = sliderElement.noUiSlider.get();
      imageToScale.style.filter = `blur(${sliderValue}px)`;
      inputEffect.value = parseFloat(sliderValue).toString();
    });
  }
});

effectHeat.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderContainer.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions(
      { range: { min: 1, max: 3, }, start: 3, step: 0.1, }
    );

    sliderElement.noUiSlider.on('update', () => {
      const sliderValue = sliderElement.noUiSlider.get();
      imageToScale.style.filter = `brightness(${sliderValue})`;
      inputEffect.value = parseFloat(sliderValue).toString();
    });
  }
});
