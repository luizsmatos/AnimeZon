const body = document.querySelector('body')

function createProductItemElement(product) {
  const image = document.createElement('img');
  image.setAttribute('src', product.image)
  return image;
}

function getInfosApi(object) {
  const infos = object.top.map((element) => ({
     image: element.image_url,
    }));
  return infos.forEach((product) => {
    body.appendChild(createProductItemElement(product));
  });
}

const messageError = (error) => console.log(error.message);

async function getNameAnimeOrManga(type, name) {
  const url = `https://api.jikan.moe/v3/search/${type}?q=${name}&page=1`

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.forEach((element) => {  
      const anime = (element);
  });
  } catch (error) {
    messageError(error);
  }
}

async function fetchApiAnime() {
  const url = 'https://api.jikan.moe/v3/top/anime/1/favorite'

  try {
    const response = await fetch(url);
    const data = await response.json()
    getInfosApi(data);
  } catch (error) {
    messageError(error);
  }
}

async function fetchApiManga() {
  const url = 'https://api.jikan.moe/v3/top/manga/1/favorite'

  try {
    const response = await fetch(url);
    const data = await response.json()
    // getInfosApi(data);
  } catch (error) {
    messageError(error);
  }
}


window.onload = () => {
  fetchApiAnime()
  fetchApiManga()
};

// ENDPOINTS:
// top 50 anime = 'https://api.jikan.moe/v3/top/anime/1/favorite'
// top 50 manga = 'https://api.jikan.moe/v3/top/manga/1/favorite'
// search = https://api.jikan.moe/v3/search/{type = anime ou manga}?q=${nome}&page=1'