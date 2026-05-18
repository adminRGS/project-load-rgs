// --- 1. LÓGICA DE TEMAS GLOBALES ---
function aplicarTemaGlobal(tema) {
    const root = document.documentElement;
    if (tema === 'gris') {
        root.style.setProperty('--fondo-rose', '#2c2c2c');
        root.style.setProperty('--texto-rose', '#ffffff');
        root.style.setProperty('--panel-rose', 'rgba(44, 44, 44, 0.95)');
    } else if (tema === 'sepia') {
        root.style.setProperty('--fondo-rose', '#fcf8f2');
        root.style.setProperty('--texto-rose', '#ffffff');
        root.style.setProperty('--panel-rose', 'rgba(238, 230, 220, 0.9)');
    } else {
        root.style.setProperty('--fondo-rose', 'radial-gradient(circle at center, #1a0a1a 0%, #050505 100%)');
        root.style.setProperty('--texto-rose', '#ffffff');
        root.style.setProperty('--panel-rose', 'rgba(0, 0, 0, 0.96)');
    }
    localStorage.setItem('tema-rose-garden', tema);
}

// Ejecutar inmediatamente al cargar
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
// Esta función la van a usar tus 10 HTMLs de golpe para jalar los datos automáticos
window.conectarAdminConManga = async function(db, getDoc, doc, historiaID, portadaIdHTML, sinopsisIdHTML, portadaDefecto) {
    try {
        // Va a buscar a la carpeta maestra que ya tienes en Firebase
        const docBaseRef = doc(db, "estados_historias", historiaID);
        const snapBase = await getDoc(docBaseRef);
        
        if (snapBase.exists()) {
            const datosAdmin = snapBase.data();
            
            // Si el Admin guardó una sinopsis, la cambia en el HTML
            if (datosAdmin.sinopsis && document.getElementById(sinopsisIdHTML)) {
                document.getElementById(sinopsisIdHTML).innerText = datosAdmin.sinopsis;
            }
            // Si el Admin guardó una URL de portada, la cambia en vivo en el HTML
            if (datosAdmin.portadaUrl && datosAdmin.portadaUrl.trim() !== "" && document.getElementById(portadaIdHTML)) {
                document.getElementById(portadaIdHTML).src = datosAdmin.portadaUrl;
            }
        }
    } catch (error) {
        console.error("Error en funciones-rose al conectar con el Admin:", error);
    }
};
