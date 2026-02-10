// ======================
// ELEMENTOS
// ======================
const registroBox = document.getElementById("registroAutor");
const loginBox = document.getElementById("loginAutor");
const panel = document.getElementById("panelAutor");

const regUsuario = document.getElementById("regUsuario");
const regClave = document.getElementById("regClave");
const regBtn = document.getElementById("registrarAutor");

const logUsuario = document.getElementById("loginUsuario");
const logClave = document.getElementById("loginClave");
const logBtn = document.getElementById("entrarAutor");

const logoutBtn = document.getElementById("logoutAutor");

const tituloInput = document.getElementById("tituloCap");
const contenidoInput = document.getElementById("contenidoCap");
const guardarBtn = document.getElementById("guardarCap");
const lista = document.getElementById("listaCaps");

let editando = null;

// ======================
// SESIÓN AUTOR
// ======================
let autorActivo = JSON.parse(localStorage.getItem("autorActivo"));

if (autorActivo) {
    mostrarPanel();
} else {
    verificarRegistro();
}

// ======================
// REGISTRO
// ======================
function verificarRegistro(){
    const autor = JSON.parse(localStorage.getItem("autor"));
    if (autor) {
        registroBox.style.display = "none";
        loginBox.style.display = "block";
    }
}

regBtn.onclick = () => {
    if (!regUsuario.value || !regClave.value) {
        alert("Completa todo");
        return;
    }

    const autor = {
        usuario: regUsuario.value,
        clave: regClave.value
    };

    localStorage.setItem("autor", JSON.stringify(autor));
    registroBox.style.display = "none";
    loginBox.style.display = "block";
};

// ======================
// LOGIN
// ======================
logBtn.onclick = () => {
    const autor = JSON.parse(localStorage.getItem("autor"));
    if (!autor) return;

    if (
        logUsuario.value === autor.usuario &&
        logClave.value === autor.clave
    ) {
        localStorage.setItem("autorActivo", JSON.stringify(autor.usuario));
        mostrarPanel();
    } else {
        alert("Usuario o contraseña incorrectos");
    }
};

// ======================
// LOGOUT
// ======================
logoutBtn.onclick = () => {
    localStorage.removeItem("autorActivo");
    location.reload();
};

// ======================
// PANEL
// ======================
function mostrarPanel(){
    registroBox.style.display = "none";
    loginBox.style.display = "none";
    panel.style.display = "block";
    cargarCapitulos();
}

// ======================
// CAPÍTULOS
// ======================
guardarBtn.onclick = () => {
    if (!tituloInput.value || !contenidoInput.value) {
        alert("Completa el capítulo");
        return;
    }

    let caps = JSON.parse(localStorage.getItem("capitulos")) || [];

    if (editando !== null) {
        caps[editando] = {
            titulo: tituloInput.value,
            contenido: contenidoInput.value
        };
        editando = null;
    } else {
        caps.push({
            titulo: tituloInput.value,
            contenido: contenidoInput.value
        });
    }

    localStorage.setItem("capitulos", JSON.stringify(caps));
    tituloInput.value = "";
    contenidoInput.value = "";
    cargarCapitulos();
};

function cargarCapitulos(){
    lista.innerHTML = "";
    const caps = JSON.parse(localStorage.getItem("capitulos")) || [];

    caps.forEach((cap, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${cap.titulo}</strong><br>
            <button onclick="editar(${i})">✏️</button>
            <button onclick="eliminar(${i})">🗑️</button>
        `;
        lista.appendChild(li);
    });
}

window.editar = (i) => {
    const caps = JSON.parse(localStorage.getItem("capitulos"));
    tituloInput.value = caps[i].titulo;
    contenidoInput.value = caps[i].contenido;
    editando = i;
};

window.eliminar = (i) => {
    if (!confirm("¿Eliminar capítulo?")) return;
    let caps = JSON.parse(localStorage.getItem("capitulos"));
    caps.splice(i, 1);
    localStorage.setItem("capitulos", JSON.stringify(caps));
    cargarCapitulos();
};