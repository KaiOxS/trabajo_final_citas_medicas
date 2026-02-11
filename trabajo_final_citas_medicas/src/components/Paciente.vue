<template>
  <div class="opcionesContainer">
    
    <div v-if="vistaActual === 'lista'" class="lista-citas">
      <h3>Dashboard de Pacientes</h3>

      <div class="form-group">
        <label>Buscar por Cédula:</label>
        <input
          type="text"
          v-model="filtro"
          @input="$emit('filtrar', filtro)"
          placeholder="Ingrese cédula..."
        />
      </div>

      <div class="botones-menu" style="margin-bottom: 15px">
        <button class="btn-agendar" @click="prepararFormulario">
          + Registrar Nuevo Paciente
        </button>
      </div>

      <div class="tabla-responsive">
        <table class="tabla-citas">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha Nac.</th>
              <th>Celular</th>
              <th>Dirección</th>
              <th style="min-width: 150px;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pac in listaPacientes" :key="pac.id">
              <td>{{ pac.id }}</td>
              <td>{{ pac.cedula }}</td>
              <td>{{ pac.nombre }}</td>
              <td>{{ pac.apellido }}</td>
              <td>{{ pac.fecha_nac }}</td>
              <td>{{ pac.celular || '-' }}</td>
              <td class="texto-pequeno">{{ pac.direccion || '-' }}</td>
              <td>
                <div class="acciones-btn">
                  <button class="btn-icon azul" @click="verCitas(pac)" title="Ver Historial">
                    📅
                  </button>
                  <button class="btn-icon naranja" @click="cargarParaEditar(pac)" title="Editar">
                    ✏️
                  </button>
                  <button class="btn-icon rojo" @click="preguntarBorrado(pac.id)" title="Eliminar">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="listaPacientes.length === 0">
              <td colspan="8">No se encontraron registros.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="idParaBorrar" class="modal-overlay">
        <div class="modal-contenido">
          <h4>Confirmación</h4>
          <p>¿Estás seguro de eliminar este paciente?</p>
          <div class="modal-botones">
            <button class="btn-confirmar" @click="confirmarAccion">Sí, Eliminar</button>
            <button class="btn-cancelar-modal" @click="idParaBorrar = null">Cancelar</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="vistaActual === 'form'" class="formulario-cita">
      <h3>{{ pacienteLocal.id ? "Editar Paciente" : "Nuevo Paciente" }}</h3>
      <button class="btn-volver" @click="vistaActual = 'lista'">Volver</button>

      <div class="grid-2-col">
          <div class="form-group">
            <label>Cédula:</label>
            <input type="text" v-model="pacienteLocal.cedula" />
          </div>
          <div class="form-group">
            <label>Fecha Nacimiento:</label>
            <input type="date" v-model="pacienteLocal.fecha_nac" />
          </div>
      </div>

      <div class="grid-2-col">
        <div class="form-group">
          <label>Nombre:</label>
          <input type="text" v-model="pacienteLocal.nombre" />
        </div>
        <div class="form-group">
          <label>Apellido:</label>
          <input type="text" v-model="pacienteLocal.apellido" />
        </div>
      </div>

      <div class="grid-2-col">
        <div class="form-group">
          <label>Celular:</label>
          <input type="text" v-model="pacienteLocal.celular" />
        </div>
        <div class="form-group">
          <label>Dirección:</label>
          <input type="text" v-model="pacienteLocal.direccion" />
        </div>
      </div>

      <button class="btn-guardar" @click="enviarDatos">Guardar Datos</button>
    </div>

    <div v-else-if="vistaActual === 'citas'" class="lista-citas">
      <h3>Historial de Citas: {{ pacienteSeleccionadoNombre }}</h3>
      <button class="btn-volver" @click="vistaActual = 'lista'">Volver</button>

      <table class="tabla-citas">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Motivo</th>
            <th>Doctor</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cita in citasDelPaciente" :key="cita.id">
            <td>{{ cita.fechaCita }} {{ cita.horaCita }}</td>
            <td>{{ cita.motivo }}</td>
            <td>{{ cita.doctor ? cita.doctor.apellido : "N/A" }}</td>
            <td>
              <button class="btn-eliminar-tabla" @click="eliminarCitaDesdePerfil(cita.id)">
                Cancelar
              </button>
            </td>
          </tr>
          <tr v-if="citasDelPaciente.length === 0">
            <td colspan="4">Sin historial clínico.</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    listaPacientes: { type: Array, default: () => [] },
    citasDelPaciente: { type: Array, default: () => [] },
  },
  data() {
    return {
      vistaActual: "lista",
      filtro: "",
      idParaBorrar: null,
      pacienteSeleccionadoNombre: "",
      pacienteLocal: {
        id: null,
        nombre: "",
        apellido: "",
        cedula: "",
        fecha_nac: "",
        celular: "",   
        direccion: "" 
      },
    };
  },
  methods: {
    prepararFormulario() {
      this.pacienteLocal = { id: null, nombre: "", apellido: "", cedula: "", fecha_nac: "", celular: "", direccion: "" };
      this.vistaActual = "form";
    },
    cargarParaEditar(paciente) {
        this.pacienteLocal = { ...paciente };
        this.vistaActual = "form";
    },
    enviarDatos() {
      if (!this.pacienteLocal.cedula || !this.pacienteLocal.nombre || !this.pacienteLocal.fecha_nac) {
        alert("Cédula, Nombre y Fecha de Nacimiento son obligatorios.");
        return;
      }
      this.$emit("guardar", this.pacienteLocal);
      this.vistaActual = "lista";
    },
    preguntarBorrado(id) {
      this.idParaBorrar = id;
    },
    confirmarAccion() {
      this.$emit("accionBorrar", this.idParaBorrar);
      this.idParaBorrar = null;
    },
    verCitas(paciente) {
      this.pacienteSeleccionadoNombre = paciente.nombre + " " + paciente.apellido;
      this.$emit("buscarCitas", paciente.id);
      this.vistaActual = "citas";
    },
    eliminarCitaDesdePerfil(idCita) {
        if(confirm("¿Seguro que deseas cancelar esta cita del historial?")) {
            this.$emit("borrarCita", idCita);
        }
    }
  },
};
</script>

<style scoped>
/* CONTENEDOR PRINCIPAL */
.opcionesContainer {
  border: 1px solid #e0e0e0;
  padding: 25px;
  border-radius: 12px;
  max-width: 95%; /* Usamos más ancho de pantalla */
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.menu-inicial, .formulario-cita, .lista-citas {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

/* TABLA RESPONSIVA */
.tabla-responsive {
  width: 100%;
  overflow-x: auto; /* Permite scroll horizontal si es necesario */
}

.tabla-citas {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9em;
  min-width: 800px; /* Asegura que no se aplaste */
}

.tabla-citas th, .tabla-citas td {
  border-bottom: 1px solid #eee;
  padding: 12px 15px;
  text-align: left;
}

.tabla-citas th {
  background-color: #f8f9fa;
  color: #333;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85em;
}

.tabla-citas tr:hover {
  background-color: #f1f1f1;
}

.texto-pequeno {
    font-size: 0.85em;
    color: #666;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* INPUTS Y FORMULARIOS */
.form-group { width: 100%; display: flex; flex-direction: column; text-align: left; margin-bottom: 10px;}
.grid-2-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; }

input { 
    padding: 10px; 
    border: 1px solid #ddd; 
    border-radius: 6px; 
    transition: border 0.3s;
}
input:focus { border-color: #4CAF50; outline: none; }


/* BOTONES */
button {
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  color: white;
  transition: transform 0.1s, opacity 0.2s;
}
button:active { transform: scale(0.98); }

.btn-agendar { background-color: #4CAF50; width: 100%; font-size: 1rem;}
.btn-guardar { background-color: #4CAF50; width: 100%; margin-top: 10px;}
.btn-volver { background-color: #607d8b; align-self: flex-start; padding: 8px 15px; font-size: 0.9rem;}

/* BOTONES DE ACCIONES (ICONOS) */
.acciones-btn {
    display: flex;
    gap: 8px; /* Espacio entre botones */
    justify-content: center;
}

.btn-icon {
    padding: 8px;
    border-radius: 6px;
    font-size: 1.1rem;
    line-height: 1;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.azul { background-color: #2196F3; }
.naranja { background-color: #ff9800; }
.rojo { background-color: #e53935; }


.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 999;
}
.modal-contenido {
  background: white; padding: 25px; border-radius: 12px; text-align: center; width: 320px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
.modal-botones { display: flex; justify-content: center; gap: 15px; margin-top: 20px; }
.btn-confirmar { background-color: #d32f2f; }
.btn-cancelar-modal { background-color: #757575; }


@media (max-width: 600px) {
    .grid-2-col { grid-template-columns: 1fr; gap: 0;}
}
</style>