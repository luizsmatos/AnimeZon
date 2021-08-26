const body = document.querySelector('body');
const mainCarousel = document.querySelector('.main-carousel');
const mainContent = document.querySelector('.main-content');
const animeContent = document.querySelector('#carouselAnime');
const mangaContent = document.querySelector('#carouselManga');
const topAiring = document.querySelector('#top-airing')
const topUpcoming = document.querySelector('#top-upcoming')
const topMost = document.querySelector('#top-most')

const buttonRight = document.querySelectorAll('.right-button');
const buttonLeft = document.querySelectorAll('.left-button');

buttonRight[0].onclick = () => {
  animeContent.scrollLeft += 500;
};
buttonLeft[0].onclick = () => {
  animeContent.scrollLeft -= 500;
};

buttonRight[1].onclick = () => {
  mangaContent.scrollLeft += 500;
};
buttonLeft[1].onclick = () => {
  mangaContent.scrollLeft -= 500;
};

function createStreamingElement(className, product) {
  const image = document.createElement('img');
  image.classList = className;
  image.setAttribute('src', product);
  return image;
}


function getInfosApis(object, type) {
  const infos = object.top.map((element) => element.image_url);
    if(type === 'anime') {
      return infos.forEach((product) => {
        animeContent.appendChild(createStreamingElement('item', product));
      });
    }

    if(type === 'manga') {
      return infos.forEach((product) => {
        mangaContent.appendChild(createStreamingElement('item', product));
      });
    }
}



function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createItemElement({ rank, title, image_url, type, start_date, score }, top) {
  const scoreTXT = (score === 0) ? 'N/A' : score;
  const startDate = (start_date === null) ? 'N/A' : start_date;
  const lis = document.createElement('li')
  const divInfos = document.createElement('div');
  divInfos.className = 'item__infos'
  
  lis.classList = 'item__list'
  lis.appendChild(createCustomElement('span', 'item__rank', rank));
  lis.appendChild(createStreamingElement('top__img', image_url));

  divInfos.appendChild(createCustomElement('h3', 'item__title', title))
  divInfos.appendChild(
    createCustomElement('span','infos', `${type}, ${startDate}, Score: ${scoreTXT}`))
  lis.appendChild(divInfos)

  return top.appendChild(lis)
}


function getInfosTops(object, top) {
  const infos = object.top.map(({ rank, title, image_url, type, start_date, score }) => ({
    rank,
    title,
    image_url,
    type,
    start_date,
    score,

  }))
  return infos.forEach((item, index) => {

    if(index < 5) {
      createItemElement(item, top)
    }
  })
}

const messageError = (error) => console.log(error.message);

async function getSearchAnimeOrManga(type, name) {
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

async function getAnimeOrMangaTop(type, subtype, top) {
  const url = `https://api.jikan.moe/v3/top/${type}/1/${subtype}`;

  try {
    const response = await fetch(url);
    const data = await response.json()
    if (subtype !== 'favorite') return getInfosTops(data, top);
    getInfosApis(data, type)
  } catch (error) {
    messageError(error);
  }
}


window.onload = () => {
  getAnimeOrMangaTop('anime', 'favorite');
  getAnimeOrMangaTop('manga', 'favorite');
  getAnimeOrMangaTop('anime', 'airing', topAiring)
  getAnimeOrMangaTop('anime', 'upcoming', topUpcoming)
  getAnimeOrMangaTop('anime', 'bypopularity', topMost)
};


// ENDPOINTS:
// top 50 anime = 'https://api.jikan.moe/v3/top/anime/1/favorite'
// top 50 manga = 'https://api.jikan.moe/v3/top/manga/1/favorite'
// top airing = https://api.jikan.moe/v3/top/anime/1/airing
// top upcoming = https://api.jikan.moe/v3/top/anime/1/upcoming
// top most = https://api.jikan.moe/v3/top/anime/1/bypopularity
// search = https://api.jikan.moe/v3/search/{type = anime ou manga}?q=${nome}&page=1'
