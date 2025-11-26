const mobileBtn = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.main-nav');
const dropdowns = document.querySelectorAll('.dropdown');
// alternar entre menus
mobileBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileBtn.classList.toggle('active');
    
    // dar block ao scroll enquanto aberto
    document.body.style.overflowY = nav.classList.contains('active') ? 'hidden' : 'auto';
});
// fechar menu ao clickar em link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        // se não for dropdown fecha o menu
        if(!link.parentElement.classList.contains('dropdown')) {
            nav.classList.remove('active');
            mobileBtn.classList.remove('active');
            document.body.style.overflowY = 'auto';
        }
    });
});
// mobile dropdown
dropdowns.forEach(drop => {
    drop.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            drop.classList.toggle('active');
        }
    });
});
