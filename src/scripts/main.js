window.onload = ()=> {
    const burgerMenuButton = document.querySelector('.burger-menu-button');
    const closeBurgerMenuButton = document.querySelector('.cross-button-icon');
    const mobileNavMenu = document.querySelector('.nav-menu.mobile');
    
    burgerMenuButton.addEventListener('click', () => {
        console.log('hovered button');
        mobileNavMenu.classList.toggle('visible');
        burgerMenuButton.classList.toggle('active')
    });
    closeBurgerMenuButton.addEventListener('click', ()=> {
        mobileNavMenu.classList.remove('visible')
    })
};




$('.team-slider').slick({
    dots: true,
});