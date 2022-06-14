import "./menu.scss"
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <header id="header">
      <div id="nav-full" className="navbar-right navbar-expand-lg">
        <nav id="nav" className="collapse">
          <li className="">
            <Link className="opcion" 
              to="/" 
              target="_self" 
              rel="address:/">1NICI0</Link>
          </li>
          <li className="separador">/</li>
          <li className="">
            <Link className="opcion" 
              to="/proyecto" 
              target="_self" 
              rel="address:/proyecto">PROYECTO</Link>
          </li>
          <li className="separador">/</li>
          <li className="">
            <Link className="opcion" 
              to="/chat" 
              target="_self" 
              rel="address:/chat">CHAT</Link>
          </li>
          <li className="separador">/</li>
          <li className="">
            <Link className="opcion" 
              to="/contacto" 
              target="_self" 
              rel="address:/contacto">CONTACTO</Link>
          </li>
        </nav>
      </div>
    </header>
  )
}