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
  a.innerHTML = `<p class='${className}'>${innerText}</p>`;
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

// Função para criar a lista de cards, caso seja selecionado 'Personagem' no dropdown:
function characterItem({ image_url, name, anime, manga }) {
  const main = document.querySelector('main');
  // Cria as divs para colocar como filhos da main:
  const mainDiv = document.createElement('div');
  const divImg = document.createElement('div');
  const textDiv = document.createElement('div');
  mainDiv.classList.add('searched-div');
  // Cria os elementos para colocar como filhos das divs acima:
  const nameText = document.createElement('p');
  nameText.className = 'name__character';
  const listOfAnimes = anime.map((el) => 
  `<a href='${el.url}'><p class='animes-list-character'> ${el.name}</p></a>`);
  const listOfManga = manga.map((el) => 
  `<a href='${el.url}'><p class='manga-list-character'> ${el.name}</p></a>`);
  nameText.innerHTML = `<p>Nome: ${name}</p>\n <p class='animes-p-tag'>Animes:</p> ${listOfAnimes}
  <br> <p class='mangas-p-tag'>Mangas:</p> ${listOfManga}`;
  // Faz o append child dos elementos nas divs:
  divImg.appendChild(createStreamingElement('image__character', image_url));
  textDiv.appendChild(nameText);
  // Faz o append das divs na div principal (mainDiv):
  mainDiv.appendChild(divImg);
  mainDiv.appendChild(textDiv);
  main.appendChild(mainDiv);
}

function createTextScore(score) {
  return `Nota média: ${score}`;
}

function createStartDateText(start_date) {
  return `Data de Lançamento: ${start_date.split('T')[0]}`;
}

function createEpisodesText(episodes) {
  return `Episódios: ${episodes}`;
}

function createVolumeText(volumes) {
  if (volumes === 0) return 'Volumes: -';
  return `Volumes: ${volumes}`;
}
// Função para criar os cards, caso seja selecionado, no dropdown, qualquer outra opção diferente de 'Personagens':
function searchedItems({ title, image_url, synopsis, score, start_date, episodes, volumes, url }) {
  const main = document.querySelector('main');
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('searched-div');
  const divImg = document.createElement('div');
  const textDiv = document.createElement('div');

  divImg.appendChild(createStreamingElement('image__search', image_url));
  textDiv.appendChild(createCustomElement('p', 'item__title', title, url));
  textDiv.appendChild(createCustomElement('p', 'item__synopsis', synopsis));
  textDiv.appendChild(createCustomElement('p', 'item__startdate', createStartDateText(start_date)));
  if (!episodes) { 
    textDiv.appendChild(createCustomElement('p', 'item__volume', createVolumeText(volumes))); 
  } else {
    textDiv.appendChild(createCustomElement('p', 'item__episode', createEpisodesText(episodes)));
  }
  textDiv.appendChild(createCustomElement('p', 'item__score', createTextScore(score)));

  mainDiv.appendChild(divImg);
  mainDiv.appendChild(textDiv);
  main.appendChild(mainDiv);
}

const messageError = (error) => console.log(error.message);

async function getSearchAnimeOrManga(type, name) {
  const url = `https://api.jikan.moe/v3/search/${type}?q=${name}&page=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (type === 'anime') {
      data.results.filter((item) => item.rated !== 'Rx').forEach((element) => {
        searchedItems(element)
      })
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

// Event listener do botão de pesquisa:
buttonSearch.addEventListener('click', () => {
  const main = document.querySelector('main');
  // Deixa a main vazia:
  main.innerHTML = '';
  /* 
  Pega o valor do input e chama a função que irá fazer os cards. Neste caso pega pelo 'selectedDropDown' aquele valor que está selecionado na lista do dropdown e já passa o seu Id.Se o elemento selecionado tiver um id = 'characters', chamará a função getCharacters(), caso contrário chamará a função getNameAnimeOrManga():
  */
  const inputValue = inputSearch.value;
  const selectedDropDown = document.querySelector('.active-item').id;
  console.log(inputValue);
  console.log(selectedDropDown);
  if (selectedDropDown === 'character') getSearchAnimeOrManga('character', inputValue);
  
  getSearchAnimeOrManga(selectedDropDown, inputValue);
});

window.onload = () => {
  getAnimeOrMangaTop('anime', 'favorite');
  getAnimeOrMangaTop('manga', 'favorite');
  getAnimeOrMangaTop('anime', 'airing', topAiring);
  getAnimeOrMangaTop('anime', 'upcoming', topUpcoming);
  getAnimeOrMangaTop('anime', 'bypopularity', topMost);
};

// ENDPOINTS:
// top 50 anime = 'https://api.jikan.moe/v3/top/anime/1/favorite'
// top 50 manga = 'https://api.jikan.moe/v3/top/manga/1/favorite'
// top airing = https://api.jikan.moe/v3/top/anime/1/airing
// top upcoming = https://api.jikan.moe/v3/top/anime/1/upcoming
// top most = https://api.jikan.moe/v3/top/anime/1/bypopularity
// search = https://api.jikan.moe/v3/search/{type = anime ou manga}?q=${nome}&page=1'
