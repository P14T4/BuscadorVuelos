const ciudades = [
    "Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Malaga", "Granada", "Zaragoza", "Alicante", "Cordoba",
    "San Sebastian", "Vigo", "Gijon", "Toledo", "Salamanca", "Santander", "Tarragona", "Burgos", "Lugo", "Almeria",
    "Jaen", "Merida", "Pamplona", "Leon", "Cadiz", "Cartagena", "Huelva", "Logroño", "Teruel", "Ourense",
    "Soria", "Palencia", "Avila", "Guadalajara", "Cuenca", "Segovia", "Melilla", "Ceuta", "Lleida", "Girona",
    "Vitoria", "Oviedo", "Benidorm", "Tenerife", "Las Palmas", "La Coruña", "Marbella", "Fuengirola", "Alcala de Henares", "Torremolinos",
    "San Fernando", "Eivissa", "Elche", "Villena", "Lorca", "Orihuela", "Estepona", "Manresa", "Sanlucar de Barrameda", "Ronda",
    "Mataro", "Vilanova i la Geltru", "Ponferrada", "Ferrol", "La Linea", "Talavera de la Reina", "Pontevedra", "Vigo", "Vilagarcia", "Betanzos",
    "Aranda de Duero", "Cambrils", "Olot", "Caceres", "Calahorra", "Malgrat de Mar", "Motril", "Sanxenxo", "Cangas", "Santa Pola",
    "Algeciras", "Albacete", "Badajoz", "Jerez", "Donostia", "Valladolid", "Tarifa", "Torrelavega", "Castellon", "Xativa",
    "Ciudad Real", "Reus", "Santiago de Compostela", "Puertollano", "Paterna", "Molina de Segura", "Montilla", "Almoradi", "Alcoy", "Puerto Real"
];

// Función para mostrar la lista filtrada de ciudades
function filtrarCiudades(campo) {
    const input = document.getElementById(campo);
    const filtro = input.value.toLowerCase();
    const lista = document.getElementById(`lista${campo.charAt(0).toUpperCase() + campo.slice(1)}`);
    lista.innerHTML = '';

    // Filtra las ciudades según el texto ingresado
    const ciudadesFiltradas = ciudades.filter(ciudad => ciudad.toLowerCase().startsWith(filtro));

    ciudadesFiltradas.forEach(ciudad => {
        const item = document.createElement('li');
        item.textContent = ciudad;
        item.onclick = () => {
            input.value = ciudad;
            lista.style.display = 'none';
        };
        lista.appendChild(item);
    });

    // Muestra la lista si hay resultados, oculta si no hay
    lista.style.display = ciudadesFiltradas.length ? 'block' : 'none';
}

// Genera datos de vuelo simulados y muestra el resultado
function buscarVuelo(event) {
    event.preventDefault();
    const salida = document.getElementById("salida").value;
    const llegada = document.getElementById("llegada").value;
    const fechaSalida = document.getElementById("fechaSalida").value;
    const fechaRegreso = document.getElementById("fechaRegreso").value;

    if (!salida || !llegada || !fechaSalida) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const precio = (Math.random() * 500 + 50).toFixed(2);
    const horaSalida = generarHoraAleatoria();
    const horaRegreso = fechaRegreso ? generarHoraAleatoria() : "No aplica";

    document.getElementById("resultado").innerHTML = `
        <p><strong>Detalles del vuelo:</strong></p>
        <p>Origen: ${salida}</p>
        <p>Destino: ${llegada}</p>
        <p>Fecha de Salida: ${fechaSalida}</p>
        <p>Hora de Salida: ${horaSalida}</p>
        <p>Fecha de Regreso: ${fechaRegreso || "No aplica"}</p>
        <p>Hora de Regreso: ${horaRegreso}</p>
        <p>Precio: ${precio} € </p>
    `;
}

// Genera una hora aleatoria en formato HH:MM
function generarHoraAleatoria() {
    const hora = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minutos = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${hora}:${minutos}`;
}

// Establece la fecha mínima en los campos de fecha
window.onload = function() {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("fechaSalida").min = today;
    document.getElementById("fechaRegreso").min = today;

    document.getElementById("fechaSalida").addEventListener("change", function() {
        document.getElementById("fechaRegreso").min = this.value;
    });
};
