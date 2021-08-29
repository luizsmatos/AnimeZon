/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
const animeContent = document.querySelector('#carouselAnime');
const mangaContent = document.querySelector('#carouselManga');
const topAiring = document.querySelector('#top-airing');
const topUpcoming = document.querySelector('#top-upcoming');
const topMost = document.querySelector('#top-most');
const buttonSearch = document.querySelector('.button-search');
const inputSearch = document.querySelector('.input-search');

const buttonRight = document.querySelectorAll('.right-button');
const buttonLeft = document.querySelectorAll('.left-button');

function createStreamingElement(className, product) {
  const image = document.createElement('img');
  image.classList = className;
  image.setAttribute('src', product);
  return image;
}

function getInfosApis(object, type) {
  const infos = object.top.map((element) => element.image_url);
    if (type === 'anime') {
      return infos.forEach((product) => {
        animeContent.appendChild(createStreamingElement('item', product));
      });
    }

    if (type === 'manga') {
      return infos.forEach((product) => {
        mangaContent.appendChild(createStreamingElement('item', product));
      });
    }
}

function createCustomElement(element, className, innerText, url) {
  if (!url) {
    const e = document.createElement(element);
    e.innerText = innerText; 
    e.className = className;
    return e;
  }
  const a = document.createElement('a');
  a.href = url;
  a.innerHTML = `<h3 class='${className}'>${innerText}</h3>`;
  return a;
}

function createItemElement({ rank, title, image_url, type, start_date, score }, top) {
  const scoreTXT = (score === 0) ? 'N/A' : score;
  const startDate = (start_date === null) ? 'N/A' : start_date;
  const lis = document.createElement('li');
  const divInfos = document.createElement('div');
  divInfos.className = 'item__infos';
  
  lis.classList = 'item__list';
  lis.appendChild(createCustomElement('span', 'item__rank', rank));
  lis.appendChild(createStreamingElement('top__img', image_url));

  divInfos.appendChild(createCustomElement('h3', 'item__title', title));
  divInfos.appendChild(
    createCustomElement('span', 'infos', `${type}, ${startDate}, Score: ${scoreTXT}`),
);
  lis.appendChild(divInfos);

  return top.appendChild(lis);
}

function getInfosTops(object, top) {
  const infos = object.top.map(({ rank, title, image_url, type, start_date, score }) => ({
    rank,
    title,
    image_url,
    type,
    start_date,
    score,

  }));
  return infos.forEach((item, index) => {
    if (index < 5) {
      createItemElement(item, top);
    }
  });
}

function characterItem({ image_url, name, anime, manga }) {
  const main = document.querySelector('main');
  const mainDiv = document.createElement('div');
  const divImg = document.createElement('div');
  const textDiv = document.createElement('div');
  textDiv.classList.add('div-person');
  mainDiv.classList.add('searched-div');

  const nameText = document.createElement('p');
  nameText.className = 'name__character';
  const listOfAnimes = anime.map((el) => 
  `<a href='${el.url}'><p class='animes-list-character'> ${el.name}</p></a>`);
  const listOfManga = manga.map((el) => 
  `<a href='${el.url}'><p class='manga-list-character'> ${el.name}</p></a>`);
  nameText.innerHTML = `<p class="name-person">Nome: ${name}</p>\n
  <p class='animes-p-tag'>Animes:</p> ${listOfAnimes}
  <br> <p class='mangas-p-tag'>Mangas:</p> ${listOfManga}`;
  divImg.appendChild(createStreamingElement('image__character', image_url));
  textDiv.appendChild(nameText);
  mainDiv.appendChild(divImg);
  mainDiv.appendChild(textDiv);
  main.appendChild(mainDiv);
}

function createTextScore(score) {
  return `Nota média: ${score}`;
}

function createStartDateText(start_date) {
  const data = (start_date === null) ? 'N/A' : start_date.split('T')[0];
  return `Data de Lançamento: ${data}`;
}

function createEpisodesText(episodes) {
  return `Episódios: ${episodes}`;
}

function createVolumeText(volumes) {
  if (volumes === 0) return 'Volumes: -';
  return `Volumes: ${volumes}`;
}

function validatedMangaOrAnime(episodes, textDiv, volumes) {
  if (!episodes) { 
    return textDiv
    .appendChild(createCustomElement('p', 'item__volume', createVolumeText(volumes))); 
  }
  return textDiv
  .appendChild(createCustomElement('p', 'item__episode', createEpisodesText(episodes)));
}

function searchedItems({ title, image_url, synopsis, score, start_date, episodes, volumes, url }) {
  const main = document.querySelector('main');
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('searched-div');
  const divImg = document.createElement('div');
  const textDiv = document.createElement('div');

  textDiv.classList.add('text-infos');

  divImg.appendChild(createStreamingElement('image__search', image_url));
  textDiv.appendChild(createCustomElement('h3', 'item__title', title, url));
  textDiv.appendChild(createCustomElement('p', 'item__synopsis', synopsis));
  textDiv.appendChild(createCustomElement('p', 'item__startdate', createStartDateText(start_date)));
  validatedMangaOrAnime(episodes, textDiv, volumes);

  textDiv.appendChild(createCustomElement('p', 'item__score', createTextScore(score)));
  mainDiv.appendChild(divImg);
  mainDiv.appendChild(textDiv);
  main.appendChild(mainDiv);
}

const messageError = (error) => alert(error.message);

async function getSearchAnimeOrManga(type, name) {
  const url = `https://api.jikan.moe/v3/search/${type}?q=${name}&page=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (type === 'anime') {
      data.results.filter((item) => item.rated !== 'Rx').forEach((element) => {
        searchedItems(element);
      });
    }
    return data.results.forEach((element) => {
      const anime = element;
      if (type === 'character') return characterItem(anime);
      searchedItems(anime);
    });
  } catch (error) {
    messageError(error);
  }
}

async function getAnimeOrMangaTop(type, subtype, top) {
  const url = `https://api.jikan.moe/v3/top/${type}/1/${subtype}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (subtype !== 'favorite') return getInfosTops(data, top);
    getInfosApis(data, type);
  } catch (error) {
    messageError(error);
  }
}

function searchValueFunction() {
  const main = document.querySelector('main');
  main.innerHTML = '';
  main.style.marginTop = '75px';
  const inputValue = inputSearch.value;
  const selectedDropDown = document.querySelector('.active-item').id;
  if (selectedDropDown === 'character') getSearchAnimeOrManga('character', inputValue);
  
  getSearchAnimeOrManga(selectedDropDown, inputValue);
}

function searchValueEvent(event) {
  if (event.key === 'Enter') searchValueFunction();
  if (event.type === 'click') searchValueFunction();
}

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

buttonSearch.addEventListener('click', searchValueEvent);
inputSearch.addEventListener('keypress', searchValueEvent);

window.onload = () => {
  getAnimeOrMangaTop('anime', 'favorite');
  getAnimeOrMangaTop('manga', 'favorite');
  getAnimeOrMangaTop('anime', 'airing', topAiring);
  getAnimeOrMangaTop('anime', 'upcoming', topUpcoming);
  getAnimeOrMangaTop('anime', 'bypopularity', topMost);
};

module.exports = { 
  getInfosApis,
  getInfosTops,
  characterItem,
  getSearchAnimeOrManga,
  getAnimeOrMangaTop,
};
