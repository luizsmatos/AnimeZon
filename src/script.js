const body = document.querySelector('body');
const mainCarousel = document.querySelector('.main-carousel');
const mainContent = document.querySelector('.main-content');
const animeContent = document.querySelector('#carouselAnime');
const mangaContent = document.querySelector('#carouselManga');
const buttonSearch = document.querySelector('.button-search');
const inputSearch = document.querySelector('.input-search');

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
  if (selectedDropDown === 'characters') { getCharacters(inputValue) }
  getNameAnimeOrManga(selectedDropDown, inputValue);
})

async function getCharacters(name) {
  const url = `https://api.jikan.moe/v3/search/character?q=${name}&page=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.forEach((element) => {
      const anime = element;
      characterItem(anime);
    });
  } catch (error) {
    messageError(error);
  }
}


// Função para criar a lista de cards, caso seja selecionado 'Personagem' no dropdown:
function characterItem ({ image_url, name, anime, manga }) {
  const main = document.querySelector('main');
  // Cria as divs para colocar como filhos da main:
  const mainDiv = document.createElement('div');
  const divImg = document.createElement('div');
  const textDiv = document.createElement('div');
  mainDiv.classList.add('searched-div');
  // Cria os elementos para colocar como filhos das divs acima:
  const img = document.createElement('img');
  img.src = image_url;
  const nameText = document.createElement('p');
  const listOfAnimes = anime.map((el) => `<a href='${el.url}'><p class='animes-list-character'> ${el.name}</p></a>`);
  const listOfManga = manga.map((el) => `<a href='${el.url}'><p class='manga-list-character'> ${el.name}</p></a>`);
  nameText.innerHTML = `<p>Nome: ${name}</p>\n
  <p class='animes-p-tag'>Animes:</p> ${listOfAnimes}
  <br>
  <p class='mangas-p-tag'>Mangas:</p> ${listOfManga}`;
  // Faz o append child dos elementos nas divs:
  divImg.appendChild(img);
  textDiv.appendChild(nameText);
  // Faz o append das divs na div principal (mainDiv):
  mainDiv.appendChild(divImg);
  mainDiv.appendChild(textDiv);
  // Faz o append da div principal na tag main:
  main.appendChild(mainDiv);
}

// Função para criar os cards, caso seja selecionado, no dropdown, qualquer outra opção diferente de 'Personagens':
function searchedItems ({ title, image_url, synopsis, score, start_date, episodes, url}) {
  const main = document.querySelector('main');
  // Cria divs para colocar como filhos da main:
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('searched-div');
  const divImg = document.createElement('div');
  const textDiv = document.createElement('div');
  // Cria elementos para ser filhos das divs acima:
  const img = document.createElement('img');
  img.src = image_url;
  const synopsisText = document.createElement('p');
  synopsisText.innerText = synopsis;
  const titleText = document.createElement('p');
  titleText.innerHTML = `<a href='${url}'><p class='anime-card-title'>${title}</p><a>`;
  const scoreText = document.createElement('p');
  scoreText.innerText = `Nota média: ${score}`;
  const startDate = document.createElement('p');
  startDate.innerText = `Data de Lançamento: ${start_date.split('T')[0]}`;
  const episodesOfAnime = document.createElement('p');
  episodesOfAnime.innerText = `Episódios: ${episodes}`;
  // Faz o append child dos elementos criados acima:
  divImg.appendChild(img);
  textDiv.appendChild(titleText);
  textDiv.appendChild(synopsisText);
  textDiv.appendChild(startDate);
  textDiv.appendChild(episodesOfAnime);
  textDiv.appendChild(scoreText);
  //Faz o append child das divs com os elementos:
  mainDiv.appendChild(divImg);
  mainDiv.appendChild(textDiv);
  // Faz o append child das 2 principais divs na main
  main.appendChild(mainDiv);
}

const messageError = (error) => console.log(error.message);

async function getNameAnimeOrManga(type, name) {
  const url = `https://api.jikan.moe/v3/search/${type}?q=${name}&page=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.forEach((element) => {
      const anime = element;
      searchedItems(anime);
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