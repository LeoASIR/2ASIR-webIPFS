import {
  Routes,
  Route,
} from "react-router-dom";
import { Index } from ".";
import { Chat } from "../components/chat";
import { Login } from "./login";
import { Proyecto } from "./proyecto";
import { Register } from "./register";

export const Rutas = ()=>{
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/proyecto" element={<Proyecto />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}