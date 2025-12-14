// ==================== DATOS INICIALES ====================
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
    {
        id: '1',
        documento: 'admin',
        nombre: 'Administrador',
        correo: 'admin@sistema.com',
        telefono: '',
        direccion: '',
        ciudad: '',
        departamento: '',
        fechaCreacion: new Date().toISOString()
    }
];

let paquetes = JSON.parse(localStorage.getItem('paquetes')) || [];
let envios = JSON.parse(localStorage.getItem('envios')) || [];
let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')) || null;

// Guardar datos iniciales si no existen
if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', function () {
    if (usuarioActual) {
        mostrarApp();
    }
});

// ==================== LOGIN ====================
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Credenciales fijas: admin / admin123
    if (username === 'admin' && password === 'admin123') {
        usuarioActual = {
            id: 'admin',
            nombre: 'Administrador',
            esAdmin: true
        };
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
        mostrarApp();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

function mostrarApp() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('appSection').style.display = 'block';
    document.getElementById('welcomeText').textContent = `👤 ${usuarioActual.nombre}`;
    cargarPaquetes();
    cargarEnvios();
    cargarUsuarios();
    actualizarSelectPaquetes();
    actualizarSelectUsuarios(); // Para usar en envíos si lo necesitas
}

function logout() {
    usuarioActual = null;
    localStorage.removeItem('usuarioActual');
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('appSection').style.display = 'none';
    document.getElementById('loginForm').reset();
}

// ==================== NAVEGACIÓN TABS ====================
function showTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    event.target.classList.add('active');
    document.getElementById(tab).classList.add('active');
}

// ==================== CRUD USUARIOS (Clientes/Destinatarios) ====================
document.getElementById('usuarioForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('usuarioId').value;
    
    const usuario = {
        id: id || Date.now().toString(),
        documento: document.getElementById('usuarioDocumento').value,
        nombre: document.getElementById('usuarioNombre').value,
        correo: document.getElementById('usuarioCorreo').value,
        telefono: document.getElementById('usuarioTelefono').value || '',
        direccion: document.getElementById('usuarioDireccion').value,
        ciudad: document.getElementById('usuarioCiudad').value,
        departamento: document.getElementById('usuarioDepartamento').value,
        fechaCreacion: id ? usuarios.find(u => u.id === id)?.fechaCreacion : new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
    };

    if (id) {
        // Actualizar usuario existente
        const index = usuarios.findIndex(u => u.id === id);
        usuarios[index] = usuario;
    } else {
        // Crear nuevo usuario (cliente/destinatario)
        usuarios.push(usuario);
    }

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    cargarUsuarios();
    actualizarSelectUsuarios();
    cancelarUsuario();
});

function cargarUsuarios() {
    const tbody = document.getElementById('usuariosBody');
    tbody.innerHTML = '';

    if (usuarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="empty-state">No hay clientes registrados</td></tr>';
        return;
    }

    // Filtrar para no mostrar el usuario admin en la lista
    const clientes = usuarios.filter(u => u.documento !== 'admin');
    
    clientes.forEach(usuario => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${usuario.documento}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.telefono || 'N/A'}</td>
            <td>${usuario.direccion}</td>
            <td>${usuario.ciudad}</td>
            <td>${usuario.departamento}</td>
            <td class="actions">
                <button class="btn btn-edit btn-small" onclick="editarUsuario('${usuario.id}')">Editar</button>
                <button class="btn btn-danger btn-small" onclick="eliminarUsuario('${usuario.id}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editarUsuario(id) {
    const usuario = usuarios.find(u => u.id === id);
    document.getElementById('usuarioId').value = usuario.id;
    document.getElementById('usuarioDocumento').value = usuario.documento;
    document.getElementById('usuarioNombre').value = usuario.nombre;
    document.getElementById('usuarioCorreo').value = usuario.correo;
    document.getElementById('usuarioTelefono').value = usuario.telefono;
    document.getElementById('usuarioDireccion').value = usuario.direccion;
    document.getElementById('usuarioCiudad').value = usuario.ciudad;
    document.getElementById('usuarioDepartamento').value = usuario.departamento;
    document.getElementById('btnGuardarUsuario').textContent = 'Actualizar Cliente';
}

function eliminarUsuario(id) {
    if (confirm('¿Estás seguro de eliminar este cliente/destinatario?')) {
        usuarios = usuarios.filter(u => u.id !== id);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        cargarUsuarios();
        actualizarSelectUsuarios();
    }
}

function cancelarUsuario() {
    document.getElementById('usuarioForm').reset();
    document.getElementById('usuarioId').value = '';
    document.getElementById('btnGuardarUsuario').textContent = 'Guardar Cliente';
}

// ==================== CRUD PAQUETES ====================
document.getElementById('paqueteForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('paqueteId').value;
    const paquete = {
        id: id || Date.now().toString(),
        descripcion: document.getElementById('paqueteDesc').value,
        peso: document.getElementById('paquetePeso').value,
        dimensiones: document.getElementById('paqueteDim').value,
        fechaCreacion: id ? paquetes.find(p => p.id === id)?.fechaCreacion : new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
    };

    if (id) {
        // Actualizar paquete existente
        const index = paquetes.findIndex(p => p.id === id);
        paquetes[index] = paquete;
    } else {
        // Crear nuevo paquete
        paquetes.push(paquete);
    }

    localStorage.setItem('paquetes', JSON.stringify(paquetes));
    cargarPaquetes();
    actualizarSelectPaquetes();
    cancelarPaquete();
});

function cargarPaquetes() {
    const tbody = document.getElementById('paquetesBody');
    tbody.innerHTML = '';

    if (paquetes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No hay paquetes registrados</td></tr>';
        return;
    }

    paquetes.forEach(paquete => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${paquete.id}</td>
            <td>${paquete.descripcion}</td>
            <td>${paquete.peso} kg</td>
            <td>${paquete.dimensiones}</td>
            <td>${new Date(paquete.fechaCreacion).toLocaleDateString()}</td>
            <td class="actions">
                <button class="btn btn-edit btn-small" onclick="editarPaquete('${paquete.id}')">Editar</button>
                <button class="btn btn-danger btn-small" onclick="eliminarPaquete('${paquete.id}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editarPaquete(id) {
    const paquete = paquetes.find(p => p.id === id);
    document.getElementById('paqueteId').value = paquete.id;
    document.getElementById('paqueteDesc').value = paquete.descripcion;
    document.getElementById('paquetePeso').value = paquete.peso;
    document.getElementById('paqueteDim').value = paquete.dimensiones;
    document.getElementById('btnGuardarPaquete').textContent = 'Actualizar Paquete';
}

function eliminarPaquete(id) {
    // Verificar si el paquete está siendo usado en algún envío
    const enviosConPaquete = envios.filter(e => e.paqueteId === id);
    if (enviosConPaquete.length > 0) {
        alert('No se puede eliminar este paquete porque está siendo usado en uno o más envíos');
        return;
    }
    
    if (confirm('¿Estás seguro de eliminar este paquete?')) {
        paquetes = paquetes.filter(p => p.id !== id);
        localStorage.setItem('paquetes', JSON.stringify(paquetes));
        cargarPaquetes();
        actualizarSelectPaquetes();
    }
}

function cancelarPaquete() {
    document.getElementById('paqueteForm').reset();
    document.getElementById('paqueteId').value = '';
    document.getElementById('btnGuardarPaquete').textContent = 'Guardar Paquete';
}

// ==================== CRUD ENVÍOS ====================
document.getElementById('envioForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('envioId').value;
    const envio = {
        id: id || Date.now().toString(),
        paqueteId: document.getElementById('envioPaquete').value,
        destinatarioId: document.getElementById('envioDestinatario').value,
        destinatarioNombre: usuarios.find(u => u.id === document.getElementById('envioDestinatario').value)?.nombre || '',
        direccion: document.getElementById('envioDireccion').value,
        estado: document.getElementById('envioEstado').value,
        fechaCreacion: id ? envios.find(e => e.id === id)?.fechaCreacion : new Date().toISOString(),
        fechaActualizacion: new Date().toISOString()
    };

    if (id) {
        // Actualizar envío existente
        const index = envios.findIndex(e => e.id === id);
        envios[index] = envio;
    } else {
        // Crear nuevo envío
        envios.push(envio);
    }

    localStorage.setItem('envios', JSON.stringify(envios));
    cargarEnvios();
    cancelarEnvio();
});

function cargarEnvios() {
    const tbody = document.getElementById('enviosBody');
    tbody.innerHTML = '';

    if (envios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No hay envíos registrados</td></tr>';
        return;
    }

    envios.forEach(envio => {
        const paquete = paquetes.find(p => p.id === envio.paqueteId);
        const destinatario = usuarios.find(u => u.id === envio.destinatarioId);
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${envio.id}</td>
            <td>${paquete ? paquete.descripcion : 'N/A'}</td>
            <td>${destinatario ? destinatario.nombre : envio.destinatarioNombre}</td>
            <td>${envio.direccion}</td>
            <td><span class="status-badge status-${envio.estado}">${envio.estado.toUpperCase()}</span></td>
            <td>${new Date(envio.fechaCreacion).toLocaleDateString()}</td>
            <td class="actions">
                <button class="btn btn-edit btn-small" onclick="editarEnvio('${envio.id}')">Editar</button>
                <button class="btn btn-danger btn-small" onclick="eliminarEnvio('${envio.id}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editarEnvio(id) {
    const envio = envios.find(e => e.id === id);
    document.getElementById('envioId').value = envio.id;
    document.getElementById('envioPaquete').value = envio.paqueteId;
    document.getElementById('envioDestinatario').value = envio.destinatarioId;
    document.getElementById('envioDireccion').value = envio.direccion;
    document.getElementById('envioEstado').value = envio.estado;
    document.getElementById('btnGuardarEnvio').textContent = 'Actualizar Envío';
}

function eliminarEnvio(id) {
    if (confirm('¿Estás seguro de eliminar este envío?')) {
        envios = envios.filter(e => e.id !== id);
        localStorage.setItem('envios', JSON.stringify(envios));
        cargarEnvios();
    }
}

function cancelarEnvio() {
    document.getElementById('envioForm').reset();
    document.getElementById('envioId').value = '';
    document.getElementById('btnGuardarEnvio').textContent = 'Guardar Envío';
}

// ==================== UTILIDADES ====================
function actualizarSelectPaquetes() {
    const select = document.getElementById('envioPaquete');
    const valorActual = select.value;
    select.innerHTML = '<option value="">Selecciona un paquete</option>';

    paquetes.forEach(paquete => {
        const option = document.createElement('option');
        option.value = paquete.id;
        option.textContent = `${paquete.descripcion} (${paquete.peso}kg)`;
        select.appendChild(option);
    });

    if (valorActual) select.value = valorActual;
}

function actualizarSelectUsuarios() {
    // Esta función se puede usar si quieres un select de usuarios en lugar de campo de texto
    const clientes = usuarios.filter(u => u.documento !== 'admin');
    // Podrías actualizar un select aquí si lo necesitas
}