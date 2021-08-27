const buttonMenu = document.querySelector('#btn-hamburguer');
const headerContainer = document.querySelectorAll('.header-container');
const header = document.querySelector('.header');
const searchDropdownButton = document.querySelector('.select-dropdown');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const toggleSearchButton = document.querySelector('.toggle-search');
const cancelToggleSearch = document.querySelector('.cancel-toggle-search');
const logo = document.querySelector('.logo');

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