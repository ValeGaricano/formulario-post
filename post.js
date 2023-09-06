document.addEventListener("DOMContentLoaded", function () {
    const registroForm = document.getElementById("registroForm");
    const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");

    registroForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        const url = "https://jsonplaceholder.typicode.com/users";

        // Obtiene los valores de los campos del formulario
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;

        // Crea un objeto JavaScript con los datos del formulario
        const userData = {
            nombre: nombre,
            apellido: apellido,
            fechaNacimiento: fechaNacimiento
        };

        const jsonData = JSON.stringify(userData); // Convierte el objeto JavaScript a formato JSON

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Especifica que está enviando JSON
            },
            body: jsonData // Envía los datos en formato JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Hubo un problema con la solicitud.");
            }
            return response.json();
        }) // Respuesta de la primer promesa
        .then(data => {
            console.log("Respuesta del servidor:", data); //Respuesta de la segunda promesa
            mensajeConfirmacion.style.display = "block"; // Muestra el mensaje de confirmación que estaba oculto
            registroForm.reset(); // Limpia el formulario al terminar el registro
            setTimeout(function() { 
                mensajeConfirmacion.style.display = "none";
            }, 3000);  // Después de 3 segundos (3000 milisegundos), oculta el mensaje
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
});