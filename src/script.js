const body = document.querySelector('body');
const mainCarousel = document.querySelector('.main-carousel');
const mainContent = document.querySelector('.main-content');
const animeContent = document.querySelector('#carouselAnime');
const mangaContent = document.querySelector('#carouselManga');
const topAiring = document.querySelector('#top-airing')
const topUpcoming = document.querySelector('#top-upcoming')
const topMost = document.querySelector('#top-Most')

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



function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createItemElement(item) {
  const { rank, title, image_url, type, start_date, score } = item;

  const ul = document.createElement('ul')
  const lis = document.createElement('li')
  const divInfos = document.createElement('div');
  
  lis.classList = 'item-list'
  lis.appendChild(createCustomElement('span', 'item__rank', rank));
  lis.appendChild(
    createCustomElement('p', 'item_img', 'test'));
  divInfos.appendChild(createCustomElement('h3', 'item__title', title))
  divInfos.appendChild(
    createCustomElement('span','item__infos', `${type}, ${start_date}, Score: ${score}`))
  lis.appendChild(divInfos)

  return topAiring.appendChild(lis)
}


function getInfosTops(object) {
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
      console.log('test')
      createItemElement(item)
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

async function getAnimeOrMangaTop(type, subtype) {
  const url = `https://api.jikan.moe/v3/top/${type}/1/${subtype}`;

  try {
    const response = await fetch(url);
    const data = await response.json()
    if (subtype !== 'favorite') return getInfosTops(data, type);
    getInfosApis(data, type)
  } catch (error) {
    messageError(error);
  }
}


window.onload = () => {
  getAnimeOrMangaTop('anime', 'favorite');
  getAnimeOrMangaTop('manga', 'favorite');
  getAnimeOrMangaTop('anime', 'airing')
};


// ENDPOINTS:
// top 50 anime = 'https://api.jikan.moe/v3/top/anime/1/favorite'
// top 50 manga = 'https://api.jikan.moe/v3/top/manga/1/favorite'
// top airing = https://api.jikan.moe/v3/top/anime/1/airing
// top 
// top 
// search = https://api.jikan.moe/v3/search/{type = anime ou manga}?q=${nome}&page=1'
