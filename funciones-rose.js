// --- 1. LÓGICA DE TEMAS ---
function aplicarTemaGlobal(tema) {
    const body = document.body;
    body.classList.remove('tema-gris', 'tema-malva');
    if (tema === 'gris') body.classList.add('tema-gris');
    if (tema === 'malva') body.classList.add('tema-malva');
    localStorage.setItem('tema-rose-garden', tema);
}

document.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('tema-rose-garden') || 'dark';
    aplicarTemaGlobal(temaGuardado);
});

window.cambiarTemaRose = function(tema) { 
    aplicarTemaGlobal(tema); 
    document.getElementById('sub-menu-colores-lector').classList.remove('visible-rose');
};

// --- 2. BARRA DE PROGRESO Y MENÚS ---
window.addEventListener('scroll', () => {
    const barra = document.getElementById('barra-progreso-rose');
    if (barra) {
        const altura = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        barra.style.width = (window.scrollY / altura) * 100 + '%';
    }
});

window.toggleMenuLector = (e) => {
    e.stopPropagation();
    const menu = document.getElementById('sub-menu-colores-lector');
    if (menu) menu.classList.toggle('visible-rose');
};

document.addEventListener('click', () => {
    const menuStats = document.getElementById('stats-menu');
    if (menuStats) menuStats.classList.remove('active');
    const menuLector = document.getElementById('sub-menu-colores-lector');
    if (menuLector) menuLector.classList.remove('visible-rose');
});

// --- 3. CONEXIÓN ADMIN EN TIEMPO REAL Y ARREGLO DE LINKS ---
window.conectarAdminConManga = function(db, getDoc, doc, historiaID, portadaIdHTML, sinopsisIdHTML, onSnapshot) {
    try {
        const docBaseRef = doc(db, historiaID, "informacion_proyecto");

        // Buscamos si el archivo HTML o Firebase nos pasó 'onSnapshot' para usar tiempo real
        const listenMethod = onSnapshot || window.firebaseOnSnapshot;

        if (listenMethod) {
            // ¡TIEMPO REAL ACTIVO! Escucha los cambios instantáneamente sin retrasos por caché
            listenMethod(docBaseRef, (snapBase) => {
                if (snapBase.exists()) {
                    const datosAdmin = snapBase.data();
                    if (datosAdmin.sinopsis && document.getElementById(sinopsisIdHTML)) {
                        document.getElementById(sinopsisIdHTML).innerText = datosAdmin.sinopsis;
                    }
                    if (datosAdmin.portadaUrl && document.getElementById(portadaIdHTML)) {
                        // Forzamos al navegador a saltarse la caché de la imagen agregando un timestamp dinámico (?t=)
                        document.getElementById(portadaIdHTML).src = datosAdmin.portadaUrl + "?t=" + new Date().getTime();
                    }
                }
            }, (error) => {
                console.error("Error en la conexión en tiempo real:", error);
            });
        } else {
            // Alternativa de respaldo por si no se encuentra el método en tiempo real
            getDoc(docBaseRef).then((snapBase) => {
                if (snapBase.exists()) {
                    const datosAdmin = snapBase.data();
                    if (datosAdmin.sinopsis && document.getElementById(sinopsisIdHTML)) document.getElementById(sinopsisIdHTML).innerText = datosAdmin.sinopsis;
                    if (datosAdmin.portadaUrl && document.getElementById(portadaIdHTML)) document.getElementById(portadaIdHTML).src = datosAdmin.portadaUrl;
                }
            }).catch(e => console.error("Error en getDoc de respaldo:", e));
        }
    } catch (e) { console.error("Error al conectar con Admin:", e); }
};

window.arreglarLink = function(url) {
    if (!url) return "";
    if (url.includes('drive.google.com')) {
        let id = url.includes('id=') ? url.split('id=')[1].split('&')[0] : url.split('/d/')[1].split('/')[0];
        return `https://docs.google.com/uc?export=view&id=${id}`;
    }
    return url;
};
