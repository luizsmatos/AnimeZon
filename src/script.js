const body = document.querySelector('body');
const mainCarousel = document.querySelector('.main-carousel');
const mainContent = document.querySelector('.main-content');
const animeContent = document.querySelector('#carouselAnime');
const mangaContent = document.querySelector('#carouselManga');

const buttonRight = document.querySelectorAll('.right-button');
const buttonLeft = document.querySelectorAll('.left-button');

buttonRight[0].onclick = () => {
  animeContent.scrollLeft += 500;
};
buttonLeft[0].onclick = () => {
  animeContent.scrollLeft -= 1000;
};

buttonRight[1].onclick = () => {
  mangaContent.scrollLeft += 500;
};
buttonLeft[1].onclick = () => {
  mangaContent.scrollLeft -= 1000;
};

function createStreamingElement(product) {
  const image = document.createElement('img');
  image.classList = 'item';
  image.setAttribute('src', product.image);
  return image;
}

function getInfosApis(object, type) {

  const infos = object.top.map((element) => ({
     image: element.image_url,
    }));
    if(type === 'anime') {
      return infos.forEach((product) => {
        animeContent.appendChild(createStreamingElement(product));
      });
    }

    if(type === 'manga') {
      return infos.forEach((product) => {
        mangaContent.appendChild(createStreamingElement(product));
      });
    }
}


const messageError = (error) => console.log(error.message);

async function getNameAnimeOrManga(type, name) {
  const url = `https://api.jikan.moe/v3/search/${type}?q=${name}&page=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.forEach((element) => {
      const anime = element;
    });
  } catch (error) {
    messageError(error);
  }
}

async function fetchApiAnime() {
  const url = "https://api.jikan.moe/v3/top/anime/1/favorite";

  try {
    const response = await fetch(url);

    const data = await response.json()
    getInfosApis(data, 'anime');
  } catch (error) {
    messageError(error);
  }
}

async function fetchApiManga() {
  const url = "https://api.jikan.moe/v3/top/manga/1/favorite";

  try {
    const response = await fetch(url);
    const data = await response.json();
    getInfosApis(data, 'manga');
  } catch (error) {
    messageError(error);
  }
}

window.onload = () => {
  fetchApiAnime();
  fetchApiManga();
};

// ENDPOINTS:
// top 50 anime = 'https://api.jikan.moe/v3/top/anime/1/favorite'
// top 50 manga = 'https://api.jikan.moe/v3/top/manga/1/favorite'
// search = https://api.jikan.moe/v3/search/{type = anime ou manga}?q=${nome}&page=1'
