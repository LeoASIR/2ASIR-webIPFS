import {
  Routes,
  Route,
} from "react-router-dom";
import { Index } from ".";
import { Chat } from "../components/chat";
import { Proyecto } from "./proyecto";
import { Contacto } from "./contacto";

export const Rutas = ()=>{
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/proyecto" element={<Proyecto />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/contacto" element={<Contacto />} />
    </Routes>
  );
}