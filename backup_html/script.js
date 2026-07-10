document.querySelectorAll(
'.feature-card,.program-card,.support-card,.process-card,.timeline-card,.stat-card'
).forEach(function(card){

    card.addEventListener('mousemove', function(e){

        const rect = card.getBoundingClientRect();

        card.style.setProperty('--x', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--y', (e.clientY - rect.top) + 'px');

    });

});


const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


/* Current Page Highlight */
document.addEventListener('DOMContentLoaded', () => {

    const currentPage =
        window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a').forEach(link => {

        const linkPage =
            link.getAttribute('href').split('/').pop();

        if(linkPage === currentPage){
            link.classList.add('active');
        }

    });

});
