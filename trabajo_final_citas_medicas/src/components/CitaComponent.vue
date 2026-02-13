<template>
  <div class="opcionesContainer">

    <div v-if="vistaActual === 'menu'" class="menu-inicial">
      <h3>Sistema de Citas Médicas</h3>

      <img src="../assets/hospital.jpg" alt="Imagen Hospital" class="imagen-cita" />

      <div class="botones-menu">
        <button class="btn-agendar" @click="vistaActual = 'form'">
          Agendar Nueva Cita
        </button>
        <button class="btn-listar" @click="irALista">
          Ver / Cancelar Citas
        </button>
      </div>
    </div>

    <div v-else-if="vistaActual === 'form'" class="formulario-cita">
      <h3>Nueva Cita</h3>
      <button class="btn-volver" @click="irAlMenu">⬅ Volver al Menú</button>

      <div class="form-group">
        <label>Doctor:</label>
        <select v-model="citaLocal.doctorId">
          <option :value="null">Seleccione Doctor</option>
          <option v-for="doc in listaDoctores" :key="doc.id" :value="doc.id">
            {{ doc.nombre }} {{ doc.apellido }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Paciente:</label>
        <select v-model="citaLocal.pacienteId">
          <option :value="null">Seleccione Paciente</option>
          <option v-for="pac in listaPacientes" :key="pac.id" :value="pac.id">
            {{ pac.nombre }} {{ pac.apellido }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Fecha:</label>
        <input type="date" v-model="citaLocal.fecha">
      </div>

      <div class="form-group">
        <label>Hora:</label>
        <input type="time" v-model="citaLocal.hora">
      </div>

      <div class="form-group">
        <label>Motivo:</label>
        <input type="text" v-model="citaLocal.motivo" placeholder="Motivo de la consulta">
      </div>

      <transition name="fade">
        <div v-if="mensajeError" class="alerta-error">
          {{ mensajeError }}
        </div>
      </transition>

      <button class="btn-guardar" @click="pasarPadre">Confirmar Cita</button>
    </div>

    <div v-else-if="vistaActual === 'lista'" class="lista-citas">
      <h3>Gestión de Citas</h3>
      <button class="btn-volver" @click="irAlMenu">⬅ Volver al Menú</button>

      <table class="tabla-citas">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Paciente</th>
            <th>Doctor</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cita in listaCitas" :key="cita.id">
            <td>{{ cita.fechaCita || cita.fecha }}</td>
            <td>{{ cita.horaCita || cita.hora }}</td>
            <td>{{ cita.paciente ? cita.paciente.nombre : '...' }}</td>
            <td>{{ cita.doctor ? cita.doctor.nombre : '...' }}</td>
            <td>
              <button class="btn-eliminar-tabla" @click="preguntarBorrado(cita.id)">
                Cancelar
              </button>
            </td>
          </tr>
          <tr v-if="listaCitas.length === 0">
            <td colspan="5">No hay citas registradas.</td>
          </tr>
        </tbody>
      </table>

      <div v-if="idParaBorrar" class="modal-overlay">
        <div class="modal-contenido">
          <h4>⚠ Confirmación</h4>
          <p>¿Estás seguro de que deseas cancelar esta cita?</p>
          <div class="modal-botones">
            <button class="btn-confirmar" @click="confirmarAccion">Sí, Cancelar</button>
            <button class="btn-cancelar-modal" @click="idParaBorrar = null">No, Regresar</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    listaDoctores: { type: Array, required: true },
    listaPacientes: { type: Array, required: true },
    listaCitas: { type: Array, default: () => [] }
  },
  data() {
    return {
      vistaActual: 'menu',
      idParaBorrar: null,
      mensajeError: null,

      citaLocal: {
        doctorId: null,
        pacienteId: null,
        fecha: '',
        hora: '',
        motivo: ''
      }
    };
  },

  methods: {
    irAlMenu() {
      this.mensajeError = null;
      this.citaLocal = {
        doctorId: null,
        pacienteId: null,
        fecha: '',
        hora: '',
        motivo: ''
      };
      this.vistaActual = 'menu';
    },

    pasarPadre() {

      this.mensajeError = null;

      // Validación
      if (!this.citaLocal.doctorId || !this.citaLocal.pacienteId || !this.citaLocal.fecha || !this.citaLocal.hora) {
        this.mensajeError = "Por favor completa todos los campos obligatorios.";

        // Timer para limpiar el mensaje
        setTimeout(() => {
          this.mensajeError = null;
        }, 3000);

        return;
      }

      this.$emit("seleccionado", this.citaLocal);
    },

    irALista() {
      this.vistaActual = 'lista';
      this.$emit("accionListar");
    },

    preguntarBorrado(id) {
      this.idParaBorrar = id;
    },

    confirmarAccion() {
      this.$emit('accionBorrar', this.idParaBorrar);
      this.idParaBorrar = null;
    }
  }
};
</script>

<style scoped>
.opcionesContainer {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.menu-inicial,
.formulario-cita,
.lista-citas {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.imagen-cita {
  width: 300px;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
}

.botones-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
}

.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.tabla-citas {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9em;
  margin-top: 10px;
}

.tabla-citas th,
.tabla-citas td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.tabla-citas th {
  background-color: #f4f4f4;
  color: #333;
}

button {
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  color: white;
  transition: 0.3s;
}

button:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

.btn-agendar {
  background-color: #42b983
}

.btn-listar {
  background-color: #2c3e50;
}

.btn-guardar {
  background-color: #42b983;
  width: 100%;
  font-size: 1rem;
}

.btn-volver {
  background-color: #607d8b;
  align-self: flex-start;
  padding: 5px 15px;
  font-size: 0.8rem;
}

.btn-eliminar-tabla {
  background-color: #e53935;
  padding: 5px 10px;
  font-size: 0.8rem;
}

input,
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus,
select:focus {
  border-color: #2c3e50;
  outline: none;
}

.alerta-error {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ef9a9a;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 0.9rem;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-contenido {
  background: white;
  padding: 25px;
  border-radius: 8px;
  text-align: center;
  width: 320px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.modal-botones {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.btn-confirmar {
  background-color: #d32f2f;
}

.btn-cancelar-modal {
  background-color: #757575;
}
</style>