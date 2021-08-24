const buttonMenu = document.querySelector('#btn-hamburguer');

const toggleMenu = () => {
  const headerContainer = document.querySelector('.header-container');
  headerContainer.classList.toggle('active');
} 

buttonMenu.addEventListener('click', toggleMenu);