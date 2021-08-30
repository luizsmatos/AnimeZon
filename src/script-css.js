const buttonMenu = document.querySelector('#btn-hamburguer');
const headerContainer = document.querySelectorAll('.header-container');
const header = document.querySelector('.header');
const searchDropdownButton = document.querySelector('.select-dropdown');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const toggleSearchButton = document.querySelector('.toggle-search');
const cancelToggleSearch = document.querySelector('.cancel-toggle-search');
const carouselInner = document.querySelector('.carousel-inner');
const logo = document.querySelector('.logo');

const carouselContent = [
  {
    img: '../images/naruto-shippuden.jpg',
    title: 'Naruto Shippuden',
    description: 'Dia 5 de setembro estreia temporada 17',
  },
  {
    img: '../images/shingeki.jpg',
    title: 'Attack On Titan',
    description: 'Dia 3 de Janeiro de 2022',
  },
  {
    img: '../images/one-piece-wall.jpg',
    title: 'One Piece',
    description: 'Temporada 546 chega dia 7 de março!',
  },
];

carouselContent.forEach(({ img, title, description }) => {
  carouselInner.innerHTML += `<div class="carousel-item">
    <img src="${img}" class="d-block img-carousel"/>
    <div class="carousel-caption d-none d-md-block">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  </div>`;
});
carouselInner.firstChild.classList.add('active');

const selectDropdown = (event) => {
  dropdownItems.forEach((element) => {
    element.classList.remove('active-item');
  });
  const clicked = event.target;
  clicked.classList.add('active-item');
  searchDropdownButton.innerText = clicked.innerText;
};

const toggleMenu = () => {
  headerContainer[0].classList.toggle('active');
};

const toggleSearch = () => {
  header.classList.toggle('search-show');
  headerContainer[1].classList.toggle('search-show');
};

const refreshPage = () => window.location.reload();

logo.addEventListener('click', refreshPage);
toggleSearchButton.addEventListener('click', toggleSearch);
cancelToggleSearch.addEventListener('click', toggleSearch);
buttonMenu.addEventListener('click', toggleMenu);
dropdownItems.forEach((element) => element.addEventListener('click', selectDropdown));

// eslint-disable-next-line no-undef
AOS.init();