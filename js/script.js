/**
 * script.js - Funcionalidades para Momentos Especiales
 * Incluye menú hamburguesa responsive y mejoras de interacción
 */

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // MENÚ HAMBURGUESA
    // ======================
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    // Solo crear menú hamburguesa en móviles
    if (window.innerWidth <= 480) {
        createMobileMenu();
    }
    
    // Crear el botón del menú hamburguesa
    function createMobileMenu() {
        const menuButton = document.createElement('button');
        menuButton.classList.add('menu-button');
        menuButton.innerHTML = '☰ Menú';
        menuButton.setAttribute('aria-label', 'Abrir menú');
        nav.insertBefore(menuButton, nav.firstChild);
        
        // Ocultar enlaces inicialmente
        navLinks.forEach(link => {
            link.style.display = 'none';
        });
        
        // Alternar menú al hacer clic
        menuButton.addEventListener('click', function() {
            const isOpen = nav.classList.toggle('responsive');
            menuButton.innerHTML = isOpen ? '✕ Cerrar' : '☰ Menú';
            
            navLinks.forEach(link => {
                link.style.display = isOpen ? 'block' : 'none';
            });
        });
    }
    
    // Manejar cambios de tamaño de pantalla
    window.addEventListener('resize', function() {
        if (window.innerWidth > 480) {
            // Versión escritorio
            nav.classList.remove('responsive');
            const menuButton = document.querySelector('.menu-button');
            if (menuButton) menuButton.remove();
            
            navLinks.forEach(link => {
                link.style.display = 'inline-block';
            });
        } else {
            // Versión móvil
            if (!document.querySelector('.menu-button')) {
                createMobileMenu();
            }
        }
    });
    
    // ======================
    // MEJORAS ADICIONALES
    // ======================
    
    // 1. Smooth scroll para los enlaces del menú
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 480) {
                // Cerrar menú después de hacer clic en móvil
                nav.classList.remove('responsive');
                document.querySelector('.menu-button').innerHTML = '☰ Menú';
                navLinks.forEach(l => l.style.display = 'none');
            }
            
            // Smooth scroll
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 2. Efecto de carga para las imágenes
    const images = document.querySelectorAll('.gallery img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = 1;
        });
        
        // Estilo inicial para transición
        img.style.opacity = 0;
        img.style.transition = 'opacity 0.5s ease';
    });
    
    // 3. Botón "Volver arriba"
    createBackToTopButton();
});

// Crear botón "Volver arriba"
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.classList.add('back-to-top');
    button.setAttribute('aria-label', 'Volver al inicio');
    document.body.appendChild(button);
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Mostrar/ocultar según scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    // Estilos iniciales
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.padding = '10px 15px';
    button.style.background = 'var(--color-primario)';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '50%';
    button.style.cursor = 'pointer';
    button.style.fontSize = '1.2rem';
    button.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    button.style.transition = 'all 0.3s ease';
    button.style.opacity = '0';
    button.style.visibility = 'hidden';
    button.style.zIndex = '1000';
}