const buttonMenu = document.querySelector('#btn-hamburguer');
const searchDropdownButton = document.querySelector('.select-dropdown');
const dropdownItems = document.querySelectorAll('.dropdown-item');

const selectDropdown = (event) => {
  const clicked = event.target;
  clicked.classList.toggle('active-item')
  searchDropdownButton.innerText = clicked.innerText
};

const toggleMenu = () => {
  const headerContainer = document.querySelector('.header-container');
  headerContainer.classList.toggle('active');
};

buttonMenu.addEventListener('click', toggleMenu);

dropdownItems.forEach((element) => element.addEventListener('click', selectDropdown))