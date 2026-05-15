// --- 1. BARRA DE PROGRESO INTELIGENTE ---
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    
    // Busca la barra rosa y la estira según el scroll
    let bar = document.getElementById("barra-progreso-rose");
    if (bar) {
        bar.style.width = scrolled + "%";
    }
};

// --- 2. CAMBIADOR DE TEMAS (NEGRO, GRIS, SEPIA) ---
function cambiarTemaRose(tema) {
    const cuerpo = document.body;
    
    // Limpiamos temas anteriores
    cuerpo.classList.remove('tema-gris', 'tema-sepia');
    
    // Aplicamos el nuevo si no es el negro (que es el normal)
    if (tema === 'gris') cuerpo.classList.add('tema-gris');
    if (tema === 'sepia') cuerpo.classList.add('tema-sepia');
    
    // GUARDAR PREFERENCIA: Para que no se borre al cambiar de página
    localStorage.setItem('tema-rose-garden', tema);
}

// --- 3. AUTO-CARGA AL ENTRAR ---
window.onload = function() {
    // Revisa si el usuario ya tenía un color favorito guardado
    const temaGuardado = localStorage.getItem('tema-rose-garden');
    if (temaGuardado) {
        cambiarTemaRose(temaGuardado);
    }
    
    console.log("Rose Garden Scan: Cerebro activado 🌹");
};

// --- 4. ESPACIO PARA CARGA DE IMÁGENES (PRÓXIMO PASO) ---
// Aquí conectaremos tu Firebase para que las imágenes vuelen
