import React from "react";

import { procesarEstado } from "./UtilEstado";

export type Mensaje = {
    usuario: string;
    mensaje: string;
    fecha: number; // Timestamp
};

const CHAT_PREFIX = "chat_leo-";

// Hook para mantener en el estado el objeto de IPFS
const useIPFS = () => {
    const [ipfs, setIPFS] = React.useState<any>();
    React.useEffect(() => {
        // @ts-ignore
        window.getIPFS().then(([ipfs, id]) => {
            setIPFS(ipfs)
        })
    })

    return [ipfs]

}
// This is the entry point for the chat hook
export const useConnection = (
    mensajeRecibido: (mensaje: Mensaje) => void
) => {

    // @ts-ignore
    const [ipfs] = useIPFS();

    // Lo ponemos a true cuando el chat este preparado
    const [iniciado, setIniciado] = React.useState(false);
    const [nombreUsuario, ponerNombreUsuario] = React.useState("");

    const sendMessage = async (channel: string, message: string) => {
        if (!ipfs) {
            console.log("IPFS No iniciado");
            return;
        }
        await ipfs.pubsub.publish(CHAT_PREFIX + channel, message);
    }

    // Return the chat hooks
    const salidaFn = (received: any) => {
        const mensajeJson = new TextDecoder().decode(received.data);
        const mensaje = JSON.parse(mensajeJson) as Mensaje;
        mensajeRecibido(mensaje);
    };

    async function crearConexion() {

        // Nos suscribimos a dos canales:
        // Uno para mensajes y otro para comprobar cada cierto tiempo la cine
        await ipfs.pubsub.subscribe(CHAT_PREFIX + "global");
        await ipfs.pubsub.subscribe(CHAT_PREFIX + "keepalive");

        const keepAliveInterval = setInterval(function () {
            sendMessage("1", CHAT_PREFIX + "keepalive");
        }, 4000);

        // El canal announce-circuit sirve para poder comunicarse con otros nodos
        // sin tener una conexion directa
        await ipfs.pubsub.subscribe("announce-circuit", procesarEstado);
        setInterval(function () { ipfs.pubsub.publish("announce-circuit", "peer-alive"); }, 5000);
        await ipfs.pubsub.subscribe(CHAT_PREFIX + "global", salidaFn);
    }

    React.useEffect(() => {
        if (!ipfs) {
            console.log("IPFS no inicializado...");
            return;
        }

        crearConexion().then(
            () => {
                setIniciado(true); // Poner a true el iniciado
                console.log("Iniciado!");
            }
        ).catch(
            (e) => {
                console.log(e);
            }
        );
    }, [ipfs]);

    const enviarMensaje = (mensaje: string) => {
        // Comprobamos que el usuario tenga nombre...
        if (!nombreUsuario) {
            return;
        }
        sendMessage("global", JSON.stringify({
            usuario: nombreUsuario,
            mensaje: mensaje,
            fecha: Date.now(),
        }));
    }

    return {
        enviarMensaje,
        iniciado,
        nombreUsuario,
        ponerNombreUsuario,
    }
}
