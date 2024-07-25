import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';

const breedSelectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

function getBreed() {
  fetchBreeds()
    .then(data => {
      loaderEl.classList.replace('loader', 'is-hidden');

      let optionsMarkUp = data.map(({ id, name }) => {
        return `<option value=${id}>${name}</option>`;
      });

      breedSelectEl.insertAdjacentHTML('beforeend', optionsMarkUp);
      breedSelectEl.classList.remove('is-hidden');
    })
    .catch(onError);
}

getBreed();

breedSelectEl.addEventListener('change', e => {
  // show loader while its loading
  loaderEl.classList.replace('is-hidden', 'loader');
  // hide select element and cat info while loading
  catInfoEl.classList.add('is-hidden');

  let breedId = e.target.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loaderEl.classList.add('is-hidden');
      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];
      catInfoEl.innerHTML = `
      <img src=${url} alt=${name} width="400"/>
      <div>
        <h2>${name}</h2>
        <p>${description}</p>
        <p>${temperament}</p>
      </div>
      `;
      catInfoEl.classList.remove('is-hidden');
    })
    .catch(onError);
});

function onError() {
  // Show error Message
  errorEl.classList.remove('is-hidden');
}
