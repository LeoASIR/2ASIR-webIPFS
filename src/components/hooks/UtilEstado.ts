// Para crear y mantenera la conexion par a par
// se envian mensajes que indican que seguimos
// activos. Estos mensajes se envían y reciben
// cada ciertos segundos y los debemos procesar

export const procesarEstado = async (mensaje: any) => {

    // @ts-ignore La conexion IPFS
    const ipfs = window.ipfsNode;
    // @ts-ignore Nuestro id
    const id = window.ipfsId;

    // Filtramos los mensajes que son nuestros, ya que
    // queremos obtener conexiones de otros pares.
    if (mensaje.from == id) {
        return;
    }

    // Obtener el texto del dato
    const direccion = new TextDecoder().decode(mensaje.data);
    if (direccion == "peer-alive") {
        // 
        return;
    }

    // @ts-ignore
    window._chat_status.lastAlive = Date.now();


    if (direccion == "keep-alive") {
        return;
    }

    const peer = direccion.split("/")[9];
    if (peer == id) {
        return;
    }

    // Recogemos los pares conectados para 
    // conectarnos a los nuevos
    const peers = await ipfs.swarm.peers();
    for (let i in peers) {
        if (peers[i].peer == peer) {
            return;
        }
    }
    
    console.log(`Conexion al par: ${direccion}`);

    // Las conexiones a veces fallan, por eso
    // hemos puesto una funcion que hace 3
    // reintentos de conexion.
    await tryConnect(ipfs, direccion)
}

async function tryConnect(
    ipfs: any, 
    direccion: any,
    retry: number = 0) {

    try {
        await ipfs.swarm.connect(direccion);
    } catch (err) {
        // Si es el tercer reintento no lo volvemos
        // a intentar
        if (retry < 3) {
            setTimeout(() => {
            tryConnect(
                ipfs, 
                direccion,
                retry++)
            }, 100); // Esperamos unos milisegundos
        } else {
            console.log("No se pudo conectar a la direccion " + direccion)
        }
    }
}