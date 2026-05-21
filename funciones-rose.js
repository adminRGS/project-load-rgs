// --- 1. LÓGICA DE TEMAS GLOBALES ---
function aplicarTemaGlobal(tema) {
    const root = document.documentElement;
    if (tema === 'gris') {
        root.style.setProperty('--fondo-rose', '#242426');
        root.style.setProperty('--texto-rose', '#f5f5f5');
        root.style.setProperty('--panel-rose', '#1c1c1e');
    } else if (tema === 'malva') {
        root.style.setProperty('--fondo-rose', '#dfd3e3');
        root.style.setProperty('--texto-rose', '#351f38');
        root.style.setProperty('--panel-rose', '#f3ebf5');
    } else {
        root.style.setProperty('--fondo-rose', 'radial-gradient(circle at center, #1a0a1a 0%, #050505 100%)');
        root.style.setProperty('--texto-rose', '#ffffff');
        root.style.setProperty('--panel-rose', '#161616');
    }
    localStorage.setItem('tema-rose-garden', tema);
}

(function() {
    const temaGuardado = localStorage.getItem('tema-rose-garden') || 'dark';
    aplicarTemaGlobal(temaGuardado);
})();

window.cambiarTemaRose = function(tema) { aplicarTemaGlobal(tema); };

// --- 2. BARRA DE PROGRESO Y MENÚS ---
window.addEventListener('scroll', () => {
    const barra = document.getElementById('barra-progreso-rose');
    if (barra) {
        const altura = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        barra.style.width = (window.scrollY / altura) * 100 + '%';
    }
});

document.addEventListener('click', () => {
    const menuStats = document.getElementById('stats-menu');
    if (menuStats) menuStats.classList.remove('active');
    const menuLector = document.getElementById('sub-menu-colores-lector');
    if (menuLector) menuLector.classList.remove('visible-rose');
});

window.toggleMenuLector = (e) => {
    e.stopPropagation();
    const menu = document.getElementById('sub-menu-colores-lector');
    if (menu) menu.classList.toggle('visible-rose');
};

// --- 3. FUNCIÓN MAESTRA: CONEXIÓN CON ADMIN (PORTADA Y SINOPSIS) ---
window.conectarAdminConManga = async function(db, getDoc, doc, historiaID, portadaIdHTML, sinopsisIdHTML) {
    try {
        // Busca en el documento "informacion_proyecto" dentro de la colección del proyecto
        const docBaseRef = doc(db, historiaID, "informacion_proyecto");
        const snapBase = await getDoc(docBaseRef);
        
        if (snapBase.exists()) {
            const datosAdmin = snapBase.data();
            if (datosAdmin.sinopsis && document.getElementById(sinopsisIdHTML)) {
                document.getElementById(sinopsisIdHTML).innerText = datosAdmin.sinopsis;
            }
            if (datosAdmin.portadaUrl && document.getElementById(portadaIdHTML)) {
                document.getElementById(portadaIdHTML).src = datosAdmin.portadaUrl;
            }
        }
    } catch (error) {
        console.error("Error al conectar con Firebase:", error);
    }
};

// --- 4. ARREGLO DE LINKS (FIREBASE O DRIVE) ---
window.arreglarLink = function(url) {
    if (!url) return "";
    // Si es link de Firebase, lo devuelve tal cual
    if (url.includes('firebasestorage.googleapis.com')) return url;
    // Si es link de Drive, lo convierte a formato de visualización
    if (url.includes('drive.google.com')) {
        let id = url.includes('id=') ? url.split('id=')[1].split('&')[0] : url.split('/d/')[1].split('/')[0];
        return `https://docs.google.com/uc?export=view&id=${id}`;
    }
    return url;
};
