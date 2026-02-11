import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8081/citamedica/api/v1.0',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

class DoctorClient {
  // GET - Listar todos
  async getAllDoctors() {
    try {
      const response = await API.get('/doctores');
      return response.data;
    } catch (error) {
      console.error('Error en getAllDoctors:', error);
      throw error;
    }
  }

  // POST - Crear nuevo
  async createDoctor(doctorData) {
    try {
      const payload = {
        nombre: doctorData.nombre,
        apellido: doctorData.apellido,
        especialidad: doctorData.especialidad || '',
        nro_licencia: doctorData.nro_licencia,
        estado: doctorData.estado || 'ACTIVO'
      };
      const response = await API.post('/doctores', payload);
      return response.data;
    } catch (error) {
      console.error('Error en createDoctor:', error);
      throw error;
    }
  }

  // PUT - Actualizar
  async updateDoctor(id, doctorData) {
    try {
      const payload = {
        id: id,
        nombre: doctorData.nombre,
        apellido: doctorData.apellido,
        especialidad: doctorData.especialidad || '',
        nro_licencia: doctorData.nro_licencia,
        estado: doctorData.estado || 'ACTIVO'
      };
      const response = await API.put(`/doctores/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error en updateDoctor:', error);
      throw error;
    }
  }

  // DELETE - Eliminar
  async deleteDoctor(id) {
    try {
      await API.delete(`/doctores/${id}`);
      return true;
    } catch (error) {
      console.error('Error en deleteDoctor:', error);
      throw error;
    }
  }
}

export default new DoctorClient();