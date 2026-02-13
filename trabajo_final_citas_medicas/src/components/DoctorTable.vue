<template>
  <div class="doctor-table">
    <h2>Lista de Doctores</h2>

    <button @click="$emit('add-doctor')" class="btn-add">
      + Nuevo Doctor
    </button>

    <div v-if="loading" class="loading">Cargando doctores...</div>

    <div v-if="errorMessage" class="message error">
      {{ errorMessage }}
      <button @click="$emit('update:errorMessage', '')" class="close-btn">×</button>
    </div>

    <table v-if="doctors.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Especialidad</th>
          <th>Licencia</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doctor, index) in doctors" :key="doctor.id">
          <td>{{ index + 1 }}</td>
          <td>{{ doctor.nombre }}</td>
          <td>{{ doctor.apellido }}</td>
          <td>{{ doctor.especialidad || '-' }}</td>
          <td>{{ doctor.nro_licencia }}</td>
          <td>
            <span :class="doctor.estado === 'ACTIVO' ? 'status-active' : 'status-inactive'">
              {{ doctor.estado || 'ACTIVO' }}
            </span>
          </td>
          <td class="actions">
            <button @click="$emit('edit-doctor', doctor)" class="btn-edit">✏️</button>

            <button @click="preguntarEliminar(doctor)" class="btn-delete">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else-if="!loading" class="empty-state">
      No hay doctores registrados.
    </div>

    <div v-if="showDeleteModal" class="delete-modal">
      <div class="delete-content">
        <h3>Confirmar Eliminación</h3>
        <p>¿Seguro que quieres borrar a <strong>{{ doctorToDelete?.nombre }}</strong>?</p>

        <div class="delete-buttons">
          <button @click="borrarDeVerdad" class="btn-confirm">Sí, eliminar</button>
          <button @click="showDeleteModal = false" class="btn-cancel">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eliminarDoctorFachada } from '@/clients/DoctorClient';

export default {
  name: 'DoctorTable',
  props: ['doctors', 'loading', 'errorMessage'],
  emits: ['add-doctor', 'edit-doctor', 'doctor-deleted', 'update:errorMessage'],

  data() {
    return {
      showDeleteModal: false,
      doctorToDelete: null
    };
  },

  methods: {
    preguntarEliminar(doctor) {
      this.doctorToDelete = doctor;
      this.showDeleteModal = true;
    },

    async borrarDeVerdad() {
      try {
        await eliminarDoctorFachada(this.doctorToDelete.id);

        this.$emit('doctor-deleted');
        this.$emit('update:errorMessage', 'Doctor eliminado correctamente');
        this.showDeleteModal = false;

      } catch (error) {
        this.$emit('update:errorMessage', 'Error al eliminar doctor');
      }
    }
  }
};
</script>

<style scoped>
.doctor-table {
  padding: 20px;
}

.btn-add {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background: #f2f2f2;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-edit {
  background: #ffc107;
  color: black;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete {
  background: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.status-active {
  color: green;
  font-weight: bold;
}

.status-inactive {
  color: red;
  font-weight: bold;
}

.loading,
.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.delete-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.delete-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.delete-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-confirm {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px;
  flex: 1;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px;
  flex: 1;
  border-radius: 4px;
  cursor: pointer;
}
</style>