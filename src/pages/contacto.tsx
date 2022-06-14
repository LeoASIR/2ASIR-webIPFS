import { Menu } from "../components/menu"
import "./contacto.scss"

export const Contacto = () =>{
    return(<div className="form_wrapper">
    <div className="header">
       CONTACTO
    </div>
    <div className="informacion_wrapper">
        <div className="present_wrapper">
            <p className="present">
                Hola, Soy G. Leonardo García Urrutia Balarezo, el administrador de esta dapp; he estudiado Administración de 
                Sistemas Informáticos en red y esta web fue mi proyecto final.
            </p>
            <p className="present">Si te gusta el sitio, tienes interés en la maquetación y/o tecnologías utilizadas puedes contactarme en:</p>
        </div>
        <div className="enlaces_wrapper">
            <a className="item-enlace" href="https://www.facebook.com/NaNundef/">
                <img src="./images/icon-fb.png" />
                <span>Facebook</span>
            </a>
            
            <a className="item-enlace" href="https://www.instagram.com/noname_gub/">
                <img src="images/icon-ig.png" />
                <span>Instagram</span>
            </a>
            
            <a className="item-enlace" href="https://twitter.com/gleogub">
                <img src="images/icon-tw.png" />
                <span>Twitter</span>
            </a>
            <a className="item-enlace" href="https://www.linkedin.com/in/gleogub/">
                <img src="./images/icon-in.png" />
                <span>Linkedin</span>
            </a>
        </div>
    </div> 
</div>);
}