<template>
  <div class="contenedor-principal">
    <h2>Módulo de Pacientes</h2>

    <PacienteComponente v-if="mostrar" :listaPacientes="pacientesArr" :citasDelPaciente="citasArr"
      @filtrar="buscarPaciente" @guardar="procesarGuardado" @accionBorrar="eliminar"
      @buscarCitas="cargarCitasDePaciente" @borrarCita="eliminarCitaDelHistorial" />

    <p v-if="cargando" class="info">Conectando con el servidor...</p>
    <p v-if="mensaje" :class="esError ? 'error' : 'exito'">
      {{ mensaje }}
    </p>

  </div>
</template>

<script>
import PacienteComponente from "../components/PacienteComponent.vue";

import {
  consultarPacientesFachada,
  buscarPacienteCedulaFachada,
  guardarPacienteFachada,
  actualizarPacienteFachada,
  eliminarPacienteFachada
} from "../clients/PacienteClient.js";

// 1. AQUÍ AGREGAMOS "borrarFachada"
import {
  consultarPorPacienteFachada,
  borrarFachada
} from "../clients/CitaClient.js";

export default {
  components: { PacienteComponente },
  data() {
    return {
      pacientesArr: [],
      citasArr: [],
      mensaje: null,
      esError: false,
      cargando: false,
      mostrar: true,
      timeoutBusqueda: null
    };
  },
  async mounted() {
    console.log("Iniciando PacienteView...");
    await this.listar();
  },
  methods: {

    async listar() {
      this.cargando = true;
      try {
        this.pacientesArr = await consultarPacientesFachada();
      } catch (error) {
        this.mensaje = "Error al cargar la lista de pacientes.";
        this.esError = true;
      } finally {
        this.cargando = false;
      }
    },

    buscarPaciente(cedula) {
      clearTimeout(this.timeoutBusqueda);
      this.timeoutBusqueda = setTimeout(async () => {
        if (!cedula || cedula.trim() === '') {
          await this.listar();
          return;
        }
        try {
          this.pacientesArr = await buscarPacienteCedulaFachada(cedula);
          this.esError = false;
          this.mensaje = "";
        } catch (e) {
          this.pacientesArr = [];
          this.mensaje = "No se encontró paciente con esa cédula.";
          this.esError = true;
        }
      }, 400);
    },

    async procesarGuardado(paciente) {
      this.mensaje = "Guardando...";
      try {
        if (paciente.id) {
          await actualizarPacienteFachada(paciente.id, paciente);
        } else {
          await guardarPacienteFachada(paciente);
        }
        this.mensaje = "Paciente guardado exitosamente.";
        this.esError = false;
        await this.listar();
      } catch (e) {
        this.mensaje = "Error al guardar. Verifique los datos.";
        this.esError = true;
      }
    },

    async eliminar(id) {
      try {
        await eliminarPacienteFachada(id);
        this.mensaje = "Paciente eliminado correctamente.";
        this.esError = false;
        await this.listar();
      } catch (e) {
        this.mensaje = "Error al eliminar paciente.";
        this.esError = true;
      }
    },

    // --- LÓGICA DE CITAS DEL PACIENTE ---

    async cargarCitasDePaciente(idPaciente) {
      this.cargando = true;
      this.mensaje = "Obteniendo historial...";
      this.citasArr = [];
      try {
        this.citasArr = await consultarPorPacienteFachada(idPaciente);
        this.esError = false;
        if (this.citasArr.length === 0) {
          this.mensaje = "El paciente no tiene historial de citas.";
        } else {
          this.mensaje = "";
        }
      } catch (error) {
        this.mensaje = "Error al cargar las citas del paciente.";
        this.esError = true;
      } finally {
        this.cargando = false;
      }
    },

    // 2. AQUÍ AGREGAMOS EL MÉTODO QUE FALTABA
    async eliminarCitaDelHistorial(idCita) {
      try {
        // Llamamos a borrarFachada (importado de CitaClient.js)
        await borrarFachada(idCita);

        // Actualizamos la lista visualmente (quitamos la cita borrada)
        this.citasArr = this.citasArr.filter(cita => cita.id !== idCita);

        this.mensaje = "Cita cancelada correctamente.";
        this.esError = false;
      } catch (error) {
        this.mensaje = "Error al cancelar la cita: " + error.message;
        this.esError = true;
      }
    }
  }
};
</script>

<style scoped>
.contenedor-principal {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 20px auto;
  text-align: center;
}

.exito {
  color: #42b983;
  font-weight: bold;
  margin-top: 15px;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 15px;
}

.info {
  color: #2c3e50;
  font-weight: bold;
  margin-top: 15px;
}
</style>