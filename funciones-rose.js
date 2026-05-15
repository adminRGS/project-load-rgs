// --- 1. LÓGICA DE TEMAS GLOBALES CON SEPIA ARENA SUAVE (OPCIÓN B) ---
function aplicarTemaGlobal(tema) {
    const root = document.documentElement;
    
    if (tema === 'gris') {
        root.style.setProperty('--fondo-rose', '#2c2c2c');
        root.style.setProperty('--texto-rose', '#ffffff');
        root.style.setProperty('--panel-rose', 'rgba(44, 44, 44, 0.95)');
    } else if (tema === 'sepia') {
        // OFICIAL: Sepia Arena Suave (Elegante, neutro y descansa la vista)
        root.style.setProperty('--fondo-rose', '#fcf8f2');
        root.style.setProperty('--texto-rose', '#ffffff');
        root.style.setProperty('--panel-rose', 'rgba(238, 230, 220, 0.9)');
    } else {
        // Modo Oscuro Original
        root.style.setProperty('--fondo-rose', 'radial-gradient(circle at center, #1a0a1a 0%, #050505 100%)');
        root.style.setProperty('--texto-rose', '#ffffff');
        root.style.setProperty('--panel-rose', 'rgba(0, 0, 0, 0.96)');
    }
    localStorage.setItem('tema-rose-garden', tema);
}

// Ejecutar inmediatamente al cargar para evitar parpadeos negros
(function() {
    const temaGuardado = localStorage.getItem('tema-rose-garden') || 'dark';
    aplicarTemaGlobal(temaGuardado);
})();

window.cambiarTemaRose = function(tema) {
    aplicarTemaGlobal(tema);
};

// --- 2. MOSTRAR / OCULTAR MENÚ DE COLORES ---
window.toggleMenuColores = function(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('sub-menu-colores');
    if (menu) {
        menu.classList.toggle('visible-rose');
    }
};

// Cerrar menús automáticamente si hacen clic fuera
document.addEventListener('click', () => {
    const menuColores = document.getElementById('sub-menu-colores');
    if (menuColores) menuColores.classList.remove('visible-rose');
});

// --- 3. BARRA DE PROGRESO DE LECTURA ---
window.addEventListener('scroll', () => {
    const barra = document.getElementById('barra-progreso-rose');
    if (barra) {
        const altura = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progreso = (window.scrollY / altura) * 100;
        barra.style.width = progreso + '%';
    }
});
