// --- 1. LÓGICA DE TEMAS GLOBALES ---
function aplicarTemaGlobal(tema) {
    const root = document.documentElement;
    
    if (tema === 'gris') {
        root.style.setProperty('--fondo-rose', '#242426');
        root.style.setProperty('--texto-rose', '#f5f5f5');
        root.style.setProperty('--panel-rose', '#1c1c1e');
        root.style.setProperty('--borde-tarjeta', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--acentos-rose', '#ff85c2');
    } else if (tema === 'malva') {
        // Fondo malva suave con texto ciruela oscuro para que se lea perfectamente
        root.style.setProperty('--fondo-rose', '#dfd3e3');
        root.style.setProperty('--texto-rose', '#351f38');
        root.style.setProperty('--panel-rose', '#f3ebf5');
        root.style.setProperty('--borde-tarjeta', '#bcabbf');
        root.style.setProperty('--acentos-rose', '#b30047');
    } else {
        // Modo Oscuro Original (Por defecto)
        root.style.setProperty('--fondo-rose', 'radial-gradient(circle at center, #1a0a1a 0%, #050505 100%)');
        root.style.setProperty('--texto-rose', '#ffffff');
        root.style.setProperty('--panel-rose', '#161616');
        root.style.setProperty('--borde-tarjeta', 'rgba(255, 102, 178, 0.2)');
        root.style.setProperty('--acentos-rose', '#ff66b2');
    }
    // Guarda la elección para que se mantenga al cambiar de página
    localStorage.setItem('tema-rose-garden', tema);
}

// Ejecutar inmediatamente al cargar la página
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
    if (menu) menu.classList.toggle('visible-rose');
};

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

// --- 4. FUNCIÓN MAESTRA: CONECTAR EL ADMIN CON LAS PORTADAS Y SINOPSIS ---
window.conectarAdminConManga = async function(db, getDoc, doc, historiaID, portadaIdHTML, sinopsisIdHTML, portadaDefecto) {
    try {
        const docBaseRef = doc(db, "estados_historias", historiaID);
        const snapBase = await getDoc(docBaseRef);
        
        if (snapBase.exists()) {
            const datosAdmin = snapBase.data();
            
            if (datosAdmin.sinopsis && document.getElementById(sinopsisIdHTML)) {
                document.getElementById(sinopsisIdHTML).innerText = datosAdmin.sinopsis;
            }
            if (datosAdmin.portadaUrl && datosAdmin.portadaUrl.trim() !== "" && document.getElementById(portadaIdHTML)) {
                document.getElementById(portadaIdHTML).src = datosAdmin.portadaUrl;
            }
        }
    } catch (error) {
        console.error("Error en funciones-rose al conectar con el Admin:", error);
    }
};

// Abrir y cerrar la paletita de colores en el lector
window.toggleMenuLector = (e) => {
    e.stopPropagation();
    const menuLector = document.getElementById('sub-menu-colores-lector');
    if (menuLector) {
        menuLector.classList.toggle('visible-rose');
    }
};

// Cerrar menús automáticamente si hacen clic en cualquier otra parte de la pantalla
document.addEventListener('click', () => {
    // Cierra el menú de reacciones/votos
    const menuStats = document.getElementById('stats-menu');
    if (menuStats) menuStats.classList.remove('active');
    
    // Cierra la paletita de colores
    const menuLector = document.getElementById('sub-menu-colores-lector');
    if (menuLector) menuLector.classList.remove('visible-rose');
});
