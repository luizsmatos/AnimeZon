const buttonMenu = document.querySelector('#btn-hamburguer');

const toggleMenu = (event) => {
  if (event.type === 'touchstart') {
    event.preventDefault()
  }
  const headerContainer = document.querySelector('.header-container');
  headerContainer.classList.toggle('active');
} 

buttonMenu.addEventListener('click', toggleMenu);
buttonMenu.addEventListener('touchstart', toggleMenu);