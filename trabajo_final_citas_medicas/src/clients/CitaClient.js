import axios from "axios";
import { obTokenFacade } from "../clients/ObtenerTockenClient.js";

// Asegúrate de que el puerto sea el correcto (8080 o 8081 según tu Quarkus)
const URL = "http://localhost:8081/citamedica/api/v1.0/citas";
const URL_PACIENTES = "http://localhost:8081/citamedica/api/v1.0/pacientes";

// Mapeo de @GET @Path("") - soporta el queryParam "soloActivas"
const consultarTodos = async (soloActivas = false) => {
    const TOKEN = await obTokenFacade();
    // Se añade el query param a la URL si es necesario
    const data = axios.get(`${URL}?soloActivas=${soloActivas}`, { headers: { Authorization: `Bearer ${TOKEN}` } }).then(r => r.data);
    return data;
}

// Mapeo de @GET @Path("/{id}")
const consultarPorId = async (id) => {
    const TOKEN = await obTokenFacade();
    const data = axios.get(`${URL}/${id}`, { headers: { Authorization: `Bearer ${TOKEN}` } }).then(r => r.data);
    return data;
}

// Mapeo de @GET @Path("/doctor/{doctorId}")
const consultarPorDoctor = async (doctorId) => {
    const TOKEN = await obTokenFacade();
    const data = axios.get(`${URL}/doctor/${doctorId}`, { headers: { Authorization: `Bearer ${TOKEN}` } }).then(r => r.data);
    return data;
}

// Mapeo de @GET @Path("/paciente/{pacienteId}")
const consultarPorPaciente = async (pacienteId) => {
    const TOKEN = await obTokenFacade();
    const data = axios.get(`${URL}/paciente/${pacienteId}`, { headers: { Authorization: `Bearer ${TOKEN}` } }).then(r => r.data);
    return data;
}

// Mapeo de @POST @Path("")
const guardar = async (body) => {
    const TOKEN = await obTokenFacade();
    const data = axios.post(`${URL}`, body, { headers: { Authorization: `Bearer ${TOKEN}` } }).then(r => r.data);
    return data;
}

// Mapeo de @PUT @Path("/{id}")
const actualizar = async (id, body) => {
    const TOKEN = await obTokenFacade();
    const data = axios.put(`${URL}/${id}`, body, { headers: { Authorization: `Bearer ${TOKEN}` } }).then(r => r.data);
    return data;
}

// Mapeo de @PATCH @Path("/{id}/cancelar")
const cancelar = async (id) => {
    const TOKEN = await obTokenFacade();
    // PATCH no suele llevar body en este caso, enviamos objeto vacío {}
    const data = axios.patch(`${URL}/${id}/cancelar`, {}, { headers: { Authorization: `Bearer ${TOKEN}` } }).then(r => r.data);
    return data;
}

// Mapeo de @PATCH @Path("/{id}/completar")
const completar = async (id) => {
    const TOKEN = await obTokenFacade();
    const data = axios.patch(`${URL}/${id}/completar`, {}, { headers: { Authorization: `Bearer ${TOKEN}` } }).then(r => r.data);
    return data;
}

// Mapeo de @DELETE @Path("/{id}")
const borrar = async (id) => {
    const TOKEN = await obTokenFacade();
    const data = axios.delete(`${URL}/${id}`, { headers: { Authorization: `Bearer ${TOKEN}` } }).then(r => r.data);
    return data;
}

// --- FACHADAS (EXPORTS) ---

export const consultarTodosFachada = async (soloActivas) => {
    return await consultarTodos(soloActivas);
}

export const consultarPorIdFachada = async (id) => {
    return await consultarPorId(id);
}

export const consultarPorDoctorFachada = async (doctorId) => {
    return await consultarPorDoctor(doctorId);
}

export const consultarPorPacienteFachada = async (pacienteId) => {
    return await consultarPorPaciente(pacienteId);
}

export const guardarFachada = async (body) => {
    return await guardar(body);
}

export const actualizarFachada = async (id, body) => {
    return await actualizar(id, body);
}

export const cancelarFachada = async (id) => {
    return await cancelar(id);
}

export const completarFachada = async (id) => {
    return await completar(id);
}

export const borrarFachada = async (id) => {
    return await borrar(id);
}


const consultarTodosPacientes = async () => {
    const TOKEN = await obTokenFacade();
    const data = axios.get(`${URL_PACIENTES}`, { headers: { Authorization: `Bearer ${TOKEN}` } }).then(r => r.data);
    return data;
}

export const consultarPacientesFachada = async () => {
    return await consultarTodosPacientes();
}

