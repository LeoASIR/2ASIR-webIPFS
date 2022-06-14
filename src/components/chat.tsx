import React from "react";
import { Mensaje, useConnection } from "./hooks/chat.hook";
import { Input } from "./input";
import { Messages } from "./messages";

import "./chat.scss";

// Autofocus
function autofocus() {
    const el = document.querySelector(".autofocusme")
    if (el) {
        // @ts-ignore
        el.focus();
    }
}

export const Chat = () => {

    const [myId, setMyId] = React.useState<string>('');
    const [messages, setMessages] = React.useState<Mensaje[]>([]);

    const {
        enviarMensaje,
        iniciado,
        nombreUsuario,
        ponerNombreUsuario
    } = useConnection((mensaje) => {
        // Utilizamos el objeto window para almacenar el estado de los mensajes
        // @ts-ignore
        if (!window._mensajes) {
            // @ts-ignore
            window._mensajes = []
        }
        // @ts-ignore
        window._mensajes = [mensaje, ...window._mensajes]

        // @ts-ignore
        setMessages(window._mensajes)
    });

    // mantener en local el estado de los formularios
    const [message, setMessage] = React.useState<string>('');
    const [usuario, setUsuario] = React.useState<string>('');

    React.useEffect(() => {
        // @ts-ignore
        if (window.getIPFS) {
            // @ts-ignore
            window.getIPFS().then(([ipfs, id]: [any, any]) => {
                setMyId(id.id);
            }).catch((err: any) => {
                console.log(`Error: ${err}`);
            });
        } else {
            console.error('IPFS not available');
        }
    }, []);

    const enviarMensajeEnter = () => {
        if (!message || message.trim().length == 0) {
            return;
        }
        enviarMensaje(message);
        setMessage("");// Limpiamos el texto del mensaje una vez enviado
    }

    React.useEffect(() => {
        setTimeout(() => autofocus(), 100);
    }, [iniciado, nombreUsuario]);
    return (
        <div className="chat-app">
            {(iniciado) ? (
                <header className="chat-wrapper" >
                    <div className="message-wrapper" id="chatventana">
                        {
                            messages.map(message => {
                                return (<div
                                    className={"message-w " + (message.usuario == nombreUsuario ? "propio" : "")}>
                                    <div className="user">
                                        {message.usuario}
                                    </div>
                                    <div className="message">
                                        {message.mensaje}
                                    </div>
                                    <div className="date">
                                        {new Date(message.fecha).toLocaleTimeString()}
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                    {(nombreUsuario) ? (<>
                        {myId ? <div className="ipfs-id">ID: {myId}</div> : <p>Loading...</p>}
                        <p>

                            <div className="input-wrapper">
                                <input type="text"
                                    className="autofocusme"
                                    value={message} onKeyDown={(e: any) => e.key == "Enter" ? enviarMensajeEnter() : ""}

                                    onChange={(e: any) => setMessage(e.target.value)} />
                                <button placeholder="Nombre de usuario"
                                    onClick={() => {
                                        enviarMensajeEnter()
                                    }}>Enviar</button></div>
                        </p></>) : (
                        <div className="input-wrapper">

                            <input type="text"

                                className="autofocusme" value={usuario}
                                placeholder="Nombre de usuario"
                                onKeyDown={(e: any) => e.key == "Enter" ? ponerNombreUsuario(usuario) : ""}
                                onChange={(e: any) => setUsuario(e.target.value)} />
                            <button onClick={() => ponerNombreUsuario(usuario)}>Entrar</button>
                        </div>)}
                </header>) : (
                <span>Cargando...</span>
            )}
        </div>
    );



    /*
        return (
            <div className="chat">
                <Messages></Messages>
                <Input></Input>
            </div>
        );*/
}
