<template>
  <div class="modal-overlay">
    <div class="modal-container">

      <div class="modal-header">
        <h3>{{ form.id ? 'Editar Doctor' : 'Nuevo Doctor' }}</h3>
        <button @click="cerrar" class="close-btn">&times;</button>
      </div>

      <form @submit.prevent="enviarDatos">
        <div class="form-group">
          <label>Nombre *</label>
          <input v-model="form.nombre" type="text" required placeholder="Ingrese nombre">
        </div>

        <div class="form-group">
          <label>Apellido *</label>
          <input v-model="form.apellido" type="text" required placeholder="Ingrese apellido">
        </div>

        <div class="form-group">
          <label>Especialidad</label>
          <input v-model="form.especialidad" type="text" placeholder="Ingrese especialidad">
        </div>

        <div class="form-group">
          <label>N° Licencia *</label>
          <input v-model="form.nro_licencia" type="text" required placeholder="Ingrese licencia">
        </div>

        <div class="form-group">
          <label>Estado</label>
          <select v-model="form.estado">
            <option value="ACTIVO">Activo</option>
            <option value="INACTIVO">Inactivo</option>
          </select>
        </div>

        <div class="modal-footer">
          <button type="submit" class="btn-save">
            {{ form.id ? 'Actualizar' : 'Guardar' }}
          </button>
          <button type="button" @click="cerrar" class="btn-cancel">
            Cancelar
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorForm',
  props: ['doctorToEdit'],
  emits: ['save', 'close'],

  data() {
    return {
      // Datos del formulario
      form: {
        id: null,
        nombre: '',
        apellido: '',
        especialidad: '',
        nro_licencia: '',
        estado: 'ACTIVO'
      }
    };
  },

  watch: {
    doctorToEdit: {
      immediate: true,
      handler(doctorRecibido) {
        if (doctorRecibido) {
          this.form.id = doctorRecibido.id;
          this.form.nombre = doctorRecibido.nombre;
          this.form.apellido = doctorRecibido.apellido;
          this.form.especialidad = doctorRecibido.especialidad;
          this.form.nro_licencia = doctorRecibido.nro_licencia;
          this.form.estado = doctorRecibido.estado;
        } else {
          this.limpiarFormulario();
        }
      }
    }
  },

  methods: {
    limpiarFormulario() {
      this.form = {
        id: null,
        nombre: '',
        apellido: '',
        especialidad: '',
        nro_licencia: '',
        estado: 'ACTIVO'
      };
    },

    enviarDatos() {
      this.$emit('save', this.form);
    },

    cerrar() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-container {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 550px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
  border-radius: 12px 12px 0 0;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  color: #6c757d;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #dc3545;
}

form {
  padding: 25px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #495057;
  font-size: 0.95rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.form-group input:hover,
.form-group select:hover {
  border-color: #adb5bd;
}

.modal-footer {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.btn-save,
.btn-cancel {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-save {
  background: #28a745;
  color: white;
}

.btn-save:hover {
  background: #218838;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
}

.btn-cancel {
  background: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background: #5a6268;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(108, 117, 125, 0.3);
}

@media (max-width: 576px) {
  .modal-container {
    width: 95%;
    margin: 20px;
  }

  .modal-header {
    padding: 15px 20px;
  }

  .modal-footer {
    flex-direction: column;
  }
}
</style>