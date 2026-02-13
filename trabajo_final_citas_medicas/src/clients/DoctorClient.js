import axios from 'axios';
import { obTokenFacade } from './ObtenerTockenClient';

const URL_DOCTORES = 'http://localhost:8081/citamedica/api/v1.0/doctores';

// Métodos
const consultarTodosDoctores = async () => {
  const token = await obTokenFacade();
  console.log("Token obtenido en DoctorClient:", token);
  const data = await axios.get(`${URL_DOCTORES}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(r => r.data);
  return data;
}

const crearDoctor = async (body) => {
  const token = await obTokenFacade();
  return await axios.post(`${URL_DOCTORES}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(r => r.data);
}

const actualizarDoctor = async (id, body) => {
  const token = await obTokenFacade();
  return await axios.put(`${URL_DOCTORES}/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(r => r.data);
}

const eliminarDoctor = async (id) => {
  const token = await obTokenFacade();
  return await axios.delete(`${URL_DOCTORES}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

// Fachadas

export const consultarTodosDoctoresFachada = async () => {
  return await consultarTodosDoctores();
}

export const crearDoctorFachada = async (body) => {
  return await crearDoctor(body);
}

export const actualizarDoctorFachada = async (id, body) => {
  return await actualizarDoctor(id, body);
}

export const eliminarDoctorFachada = async (id) => {
  return await eliminarDoctor(id);
}
