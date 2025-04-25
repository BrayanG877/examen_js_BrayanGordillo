// Datos iniciales con un usuario de prueba para Profesor
let usuarios = [
    { id: "12345", nombre: "Admin", rol: "administrativo", email: "admin@acme.com", contraseña: "1234" },
    { id: "67890", nombre: "Profesor Juan", rol: "profesor", email: "profesor@acme.com", contraseña: "5678" }
];

let usuario = [];
let cursos = [];
let usuarioActual = null;
let cursoSeleccionado = null;

// Iniciar sesión
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const usuario = usuarios.find(u => u.email === email && u.contraseña === password);

    if (usuario) {
        usuarioActual = usuario;
        alert("Bienvenido " + usuario.nombre);
        document.getElementById("login").style.display = "none";
        document.getElementById("menu").style.display = "block";
        document.getElementById("userName").textContent = usuario.nombre;
    } else {
        alert("Datos incorrectos!!");
    }
}

// Cerrar sesión y retornar al login
function logout() {
    usuarioActual = null;
    document.getElementById("login").style.display = "block";
    document.getElementById("menu").style.display = "none";
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("profesorPanel").style.display = "none";
    document.getElementById("gestionCursos").style.display = "none";
    document.getElementById("gestionEstudiantes").style.display = "none";
    document.getElementById("asignarEstudiantes").style.display = "none";
}

// Mostrar funciones según el rol
function mostrarPanel() {
    if (!usuarioActual) return;
    document.getElementById("menu").style.display = "none";
    if (usuarioActual.rol.toLowerCase() === "administrativo") {
        document.getElementById("adminPanel").style.display = "block";
    } else if (usuarioActual.rol.toLowerCase() === "profesor") {
        document.getElementById("profesorPanel").style.display = "block";
    }
}

// Volver al login ("Iniciar sesión")
function volverMenu() {
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("profesorPanel").style.display = "none";
    document.getElementById("gestionCursos").style.display = "none";
    document.getElementById("gestionEstudiantes").style.display = "none";
    document.getElementById("asignarUsuarios").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("login").style.display = "block";
}


// Registrar usuario
function registroUsuario() {
    const id = prompt("Número de Identificación:");
    const nombre = prompt("Nombre completo:");
    const email = prompt("Correo electrónico:");
    if (!id || !nombre || !email ) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    usuario.push({ id, nombre, email });
    alert(`Gracias ${nombre} tu registro fue exitoso.`);
}

// Crear evento
function crearEvento() {
    const nombre = prompt("Nombre del evento:");
    const descripcion = prompt("Descripción del curso:");
    const fecha = prompt("fecha del evento:");
    if (!nombre || !descripcion | !fecha) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    eventos.push({ nombre, descripcion, fecha: [] });
    alert(`el evento ${nombre} fue creado correctamente.`);
}

// Asignar usuario a evento: se muestra la lista de estudiantes y cursos en secciones separadas
function mostrarAsignarUsuarios() {
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("asignarUsuarios").style.display = "block";

    let listaUsuariosHTML = "";
    usuarios.forEach(usuario => {
        listaUsuariosHTML += `<p>${usuario.nombre} 
            <button onclick="seleccionarEstudiante('${usuario.id}')">Agregar al evento</button>
        </p>`;
    });
    // Actualizar el contenedor de eventos para asignación
    document.getElementById("listaUsuariosAsignacion").innerHTML = listaUsuariosHTML;

    let listaEventosHTML = "";
    eventos.forEach(evento => {
        listaEventosHTML += `<p>${evento.nombre} 
            <button onclick="seleccionarCurso('${evento.nombre}')">Seleccionar evento</button>
        </p>`;
    });
    document.getElementById("listaEventosAdmin").innerHTML = listaEventosHTML;
}

let usuarioSeleccionado = null;
let eventoSeleccionadoAdmin = null;
function seleccionarUsuario(idUsuario) {
    usuarioSeleccionado = usuarios.find(s => s.id === idUsuario);
    if (usuarioSeleccionado) {
        alert(`Usuario ${usuarioSeleccionado.nombre} seleccionado.`);
    }
}
function selecionarEvento(nombreEvento) {
    eventoSeleccionadoAdmin = eventos.find(c => c.nombre === nombreEvento);
    if (eventoSeleccionadoAdmin) {
        alert(`Evento ${eventoSeleccionadoAdmin.nombre} seleccionado.`);
        if (usuarioSeleccionado) {
            eventoSeleccionadoAdmin.usuarios.push(usuarioSeleccionado);
            alert(`Usuario ${usuarioSeleccionado.nombre} agregado a ${eventoSeleccionadoAdmin.nombre}.`);
            usuarioSeleccionado = null;
        } else {
            alert("Selecciona un usuario primero.");
        }
    }
}
function volverAdminPanel() {
    document.getElementById("asignarUsuarios").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
}

// Vista para el profesor: mostrar cursos en forma de tabla
function mostrarGestionCursos() {
    document.getElementById("profesorPanel").style.display = "none";
    document.getElementById("gestionEventos").style.display = "block";

    let listaCursosHTML = "<table border='1'><tr><th>Curso</th><th>Opciones</th></tr>";
    cursos.forEach(curso => {
        listaCursosHTML += `<tr>
            <td>${curso.nombre}</td>
            <td><button onclick="calificarCurso('${curso.nombre}')">Calificar</button></td>
        </tr>`;
    });
    listaCursosHTML += "</table>";
    document.getElementById("listaCursos").innerHTML = listaCursosHTML;
}

// Vista para calificar: mostrar tabla con estudiantes y campos para notas
function calificarCurso(nombreCurso) {
    cursoSeleccionado = cursos.find(curso => curso.nombre === nombreCurso);
    if (!cursoSeleccionado) {
        alert("Curso no encontrado.");
        return;
    }
    document.getElementById("gestionCursos").style.display = "none";
    document.getElementById("gestionEstudiantes").style.display = "block";
    document.getElementById("cursoActual").textContent = `Calificando: ${cursoSeleccionado.nombre}`;

    let tablaHTML = `<table border='1'>
        <tr>
            <th>Estudiante</th>
            <th>Nota 1 (30%)</th>
            <th>Nota 2 (30%)</th>
            <th>Nota 3 (40%)</th>
            <th>Nota Final</th>
        </tr>`;
    cursoSeleccionado.estudiantes.forEach(estudiante => {
        tablaHTML += `<tr>
            <td>${estudiante.nombre}</td>
            <td><input type="number" id="nota1-${estudiante.id}" min="0" max="100" placeholder="0-100"></td>
            <td><input type="number" id="nota2-${estudiante.id}" min="0" max="100" placeholder="0-100"></td>
            <td><input type="number" id="nota3-${estudiante.id}" min="0" max="100" placeholder="0-100"></td>
            <td id="notaFinal-${estudiante.id}">Pendiente</td>
        </tr>`;
    });
    tablaHTML += `</table>
        <button onclick="guardarCalificaciones()">Guardar Calificaciones</button>
        <button onclick="volverGestionCursos()">Volver</button>`;
    document.getElementById("listaEstudiantesCalificaciones").innerHTML = tablaHTML;
}

// Guardar calificaciones y calcular la nota final con validaciones
function guardarCalificaciones() {
    cursoSeleccionado.estudiantes.forEach(estudiante => {
        const nota1 = parseFloat(document.getElementById(`nota1-${estudiante.id}`).value) || 0;
        const nota2 = parseFloat(document.getElementById(`nota2-${estudiante.id}`).value) || 0;
        const nota3 = parseFloat(document.getElementById(`nota3-${estudiante.id}`).value) || 0;
        if (nota1 < 0 || nota1 > 100 || nota2 < 0 || nota2 > 100 || nota3 < 0 || nota3 > 100) {
            alert(`Las notas deben estar entre 0 y 100. Verifica las notas de ${estudiante.nombre}.`);
            return;
        }
        estudiante.notaFinal = (nota1 * 0.3) + (nota2 * 0.3) + (nota3 * 0.4);
        document.getElementById(`notaFinal-${estudiante.id}`).textContent = estudiante.notaFinal.toFixed(2);
    });
    alert("Calificaciones guardadas correctamente.");
}

// Desde la vista de calificación, volver a la vista de gestión de cursos
function volverGestionCursos() {
    document.getElementById("gestionEstudiantes").style.display = "none";
    document.getElementById("gestionCursos").style.display = "block";
}
// Volver al panel de control del profesor desde la vista de "Mis Cursos"
function volverProfesorPanel() {
    document.getElementById("gestionCursos").style.display = "none";
    document.getElementById("profesorPanel").style.display = "block";
}
