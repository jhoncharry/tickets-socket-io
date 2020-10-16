// Comando para establecer la conexión
var socket = io();

//Label query para cambiar el ticket en la pantalla
var label = $("#lblNuevoTicket");

// Conexion cliente - servidor
socket.on("connect", function () {
    console.log("Conectado al servidor");
});

// Desconexion cliente - servidor
socket.on("disconnect", function () {
    console.log("Desconectado del servidor");
});




// Escucha servidor
socket.on("estadoActual", function (resp) {
    console.log(resp);
    label.text(resp.actual)
});


$("button").on("click", function () {

    //Emite siguiente ticket cliente -> servidor
    socket.emit("siguienteTicket", null, function (siguienteTicket) {

        label.text(siguienteTicket);

    });

});
