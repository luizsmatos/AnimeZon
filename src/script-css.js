const buttonMenu = document.querySelector('#btn-hamburguer');
const searchDropdownButton = document.querySelector('.select-dropdown');
const dropdownItems = document.querySelectorAll('.dropdown-item');

const selectDropdown = (event) => {
  dropdownItems.forEach((element) => {
    element.classList.remove('active-item');
  });
  const clicked = event.target;
  console.log(clicked);
  clicked.classList.add('active-item');
  searchDropdownButton.innerText = clicked.innerText;
};

const toggleMenu = () => {
  const headerContainer = document.querySelector('.header-container');
  headerContainer.classList.toggle('active');
};

buttonMenu.addEventListener('click', toggleMenu);

dropdownItems.forEach((element) => element.addEventListener('click', selectDropdown));

// eslint-disable-next-line no-undef
AOS.init();