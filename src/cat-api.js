const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'dlive_fQfHfjSEXrNjTws55rGe95aSFbuH4LphNVn26EWt7DObTYut3Jhtky81BRDiSQvO';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, {
    headers: {
      api_key: API_KEY,
    },
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    } else {
      return res.json();
    }
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`,
    {
      headers: {
        'x-api-key': API_KEY,
      },
    }
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    } else {
      return res.json();
    }
  });
}
