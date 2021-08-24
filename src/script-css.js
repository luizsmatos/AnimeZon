const buttonMenu = document.querySelector('#btn-hamburguer');

const toggleMenu = (event) => {
  if (event.type === 'touchstart') {
    event.preventDefault()
  }
  const navHeader = document.querySelector('.header-container');
  navHeader.classList.toggle('active');
} 

buttonMenu.addEventListener('click', toggleMenu);
buttonMenu.addEventListener('touchstart', toggleMenu);