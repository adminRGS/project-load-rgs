window.conectarAdminConManga = async function(db, getDoc, doc, historiaID, portadaIdHTML, sinopsisIdHTML, portadaDefecto) {
    try {
        // CORRECCIÓN: Ahora busca dentro de la colección del ID del manga, en el documento "informacion_proyecto"
        const docBaseRef = doc(db, historiaID, "informacion_proyecto");
        const snapBase = await getDoc(docBaseRef);
        
        if (snapBase.exists()) {
            const datosAdmin = snapBase.data();
            
            // Actualizar Sinopsis
            if (datosAdmin.sinopsis && document.getElementById(sinopsisIdHTML)) {
                document.getElementById(sinopsisIdHTML).innerText = datosAdmin.sinopsis;
            }
            // Actualizar Portada
            if (datosAdmin.portadaUrl && document.getElementById(portadaIdHTML)) {
                document.getElementById(portadaIdHTML).src = datosAdmin.portadaUrl;
            }
        } else {
            console.log("No se encontró el documento informacion_proyecto para:", historiaID);
        }
    } catch (error) {
        console.error("Error al conectar con Firebase:", error);
    }
};
