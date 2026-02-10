// ========= USUARIO =========
const loginBox = document.getElementById("loginBox");
const usuarioBox = document.getElementById("usuarioBox");
const usuarioTexto = document.getElementById("usuarioTexto");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const nombreInput = document.getElementById("nombreUsuario");

let usuario = localStorage.getItem("usuario");

if (usuario) {
    usuarioTexto.textContent = "👋 " + usuario;
    loginBox.style.display = "none";
    usuarioBox.style.display = "flex";
}

loginBtn?.addEventListener("click", () => {
    if (!nombreInput.value) return;
    usuario = nombreInput.value;
    localStorage.setItem("usuario", usuario);
    location.reload();
});

logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    location.reload();
});

// ========= TEMA =========
const temaBtn = document.getElementById("temaBtn");
if (localStorage.getItem("tema") === "claro") {
    document.body.classList.add("claro");
}

temaBtn?.addEventListener("click", () => {
    document.body.classList.toggle("claro");
    localStorage.setItem(
        "tema",
        document.body.classList.contains("claro") ? "claro" : "oscuro"
    );
});

// ========= BOTÓN SUBIR CAPÍTULOS (AUTOR) =========
const subirBtn = document.getElementById("subirCapituloBtn");
const autorActivo = localStorage.getItem("autorActivo");

if (subirBtn && autorActivo) {
    subirBtn.style.display = "block";
    subirBtn.onclick = () => {
        window.location.href = "autor.html";
    };
}

// ========= CAPÍTULO =========
const capituloActual = location.pathname.split("/").pop();
localStorage.setItem("ultimoCapitulo", capituloActual);

// ========= RESEÑAS =========
const texto = document.getElementById("textoReseña");
const estrellas = document.querySelectorAll(".estrellas span");
const guardar = document.getElementById("guardarReseña");

if (usuario && texto) {
    const key = "reseña_" + usuario + "_" + capituloActual;
    let data = JSON.parse(localStorage.getItem(key));
    let puntuacion = 0;
    let bloqueado = false;

    if (data) {
        texto.value = data.texto;
        puntuacion = data.estrellas;
        bloquear();
        marcar();
    }

    estrellas.forEach(s => {
        s.onclick = () => {
            if (bloqueado) return;
            puntuacion = s.dataset.star;
            marcar();
        };
    });

    guardar.onclick = () => {
        if (!texto.value || puntuacion == 0) return;
        localStorage.setItem(key, JSON.stringify({
            texto: texto.value,
            estrellas: puntuacion
        }));
        bloquear();
    };

    function marcar() {
        estrellas.forEach(s =>
            s.classList.toggle("activa", s.dataset.star <= puntuacion)
        );
    }

    function bloquear() {
        bloqueado = true;
        texto.disabled = true;
        guardar.disabled = true;
        guardar.textContent = "🔒 Reseña guardada";
    }
}

// ========= COMENTARIOS =========
const lista = document.getElementById("listaComentarios");
const nuevo = document.getElementById("nuevoComentario");
const publicar = document.getElementById("publicarComentario");

if (lista) {
    const key = "comentarios_" + capituloActual;
    let comentarios = JSON.parse(localStorage.getItem(key)) || [];
    render();

    publicar.onclick = () => {
        if (!usuario || !nuevo.value) return;
        comentarios.push({ usuario, texto: nuevo.value });
        localStorage.setItem(key, JSON.stringify(comentarios));
        nuevo.value = "";
        render();
    };

    function render() {
        lista.innerHTML = "";
        comentarios.forEach(c => {
            const d = document.createElement("div");
            d.className = "comentario";
            d.innerHTML = `<strong>${c.usuario}</strong>${c.texto}`;
            lista.appendChild(d);
        });
    }
    }
