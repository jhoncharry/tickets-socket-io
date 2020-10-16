const { io } = require("../server");

const { TicketControl } = require("../classes/ticket-control");
const ticketControl = new TicketControl();

// Conexion con clientes
io.on("connection", (client) => {

    //Escucha cliente
    client.on("siguienteTicket", (data, callback) => {

        let siguiente = ticketControl.siguiente();

        console.log(siguiente);

        callback(siguiente);

    });


    //Emite a cliente
    client.emit("estadoActual", {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    //Escucha cliente
    client.on("atenderTicket", (data, callback) => {

        if (!data.escritorio) {
            callback({
                error: true,
                mensaje: "Escritorio es necesario"
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);


        // Actualizar o notificar cambios en los ULTIMOS 4
        client.broadcast.emit("ultimos4", { ultimos4: ticketControl.getUltimos4() });



    });




});