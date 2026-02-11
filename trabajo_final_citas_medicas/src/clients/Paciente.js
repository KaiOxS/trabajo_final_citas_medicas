import axios from "axios";
import { obTokenFacade } from "../clients/ObtenerTockenClient.js";

const URL = 'http://localhost:8080/citamedica/api/v1.0/pacientes';

const consultarTodos = async () => {
    const TOKEN = await obTokenFacade(); //
    const r = await axios.get(URL, { headers: { Authorization: `Bearer ${TOKEN}` } });
    return r.data;
}

const consultarPorCedula = async (cedula) => {
    const TOKEN = await obTokenFacade();
    // Endpoint específico definido en PacienteResource
    const r = await axios.get(`${URL}/cedula?cedula=${cedula}`, { 
        headers: { Authorization: `Bearer ${TOKEN}` } 
    });
    return r.data;
}

const consultarPorId = async (id) => {
    const TOKEN = await obTokenFacade();
    const r = await axios.get(`${URL}/${id}`, { 
        headers: { Authorization: `Bearer ${TOKEN}` } 
    });
    return r.data;
}

const guardar = async (body) => {
    const TOKEN = await obTokenFacade();
    // El backend devuelve status 201 Created
    const r = await axios.post(URL, body, { 
        headers: { Authorization: `Bearer ${TOKEN}` } 
    });
    return r.data;
}

const actualizar = async (id, body) => {
    const TOKEN = await obTokenFacade();
    const r = await axios.put(`${URL}/${id}`, body, { 
        headers: { Authorization: `Bearer ${TOKEN}` } 
    });
    return r.data;
}

const borrar = async (id) => {
    const TOKEN = await obTokenFacade();
    const r = await axios.delete(`${URL}/${id}`, { 
        headers: { Authorization: `Bearer ${TOKEN}` } 
    });
    return r.data;
}

// --- FACHADAS (EXPORTS) ---

export const consultarPacientesFachada = async () => {
    return await consultarTodos();
}

export const buscarPacienteCedulaFachada = async (cedula) => {
    return await consultarPorCedula(cedula);
}

export const consultarPacienteIdFachada = async (id) => {
    return await consultarPorId(id);
}

export const guardarPacienteFachada = async (body) => {
    return await guardar(body);
}

export const actualizarPacienteFachada = async (id, body) => {
    return await actualizar(id, body);
}

export const eliminarPacienteFachada = async (id) => {
    return await borrar(id);
}