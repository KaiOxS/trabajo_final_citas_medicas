<template>
  <div class="contenedor-principal">
    
    <h2>Módulo de Citas</h2>

    <CitaOpciones 
      v-if="mostrar"
      :listaDoctores="doctoresArr"
      :listaPacientes="pacientesArr"
      :listaCitas="citasArr"
      @seleccionado="evaluarYGuardar"
      @accionListar="cargarListaCitas"
      @accionBorrar="eliminarCita"
    />

    <p v-if="mensaje" :class="esError ? 'error' : 'exito'">
      {{ mensaje }}
    </p>

  
  </div>
</template>

<script>
import CitaOpciones from "../components/CitaComponent.vue";
import { 
  consultarDoctoresFachada, 
  consultarPacientesFachada, 
  guardarFachada,
  consultarTodosFachada,
  borrarFachada
} from "../clients/CitaClient";

export default {
  components: { CitaOpciones },
  
  data() {
    return {
      doctoresArr: [],
      pacientesArr: [],
      citasArr: [],
      mensaje: null,
      esError: false,
      mostrar: true
    };
  },

  async mounted() {
    console.log("Iniciando CitaView...");
    await this.cargarCatalogos();
  },

  methods: {
    async cargarCatalogos() {
      try {
        
        const [docs, pacs] = await Promise.all([
          consultarDoctoresFachada(),
          consultarPacientesFachada()
        ]);
        this.doctoresArr = docs;
        this.pacientesArr = pacs;
      } catch (error) {
        this.mensaje = "Error de conexión: No se pudieron cargar doctores o pacientes.";
        this.esError = true;
        console.error(error);
      }
    },

    
    async evaluarYGuardar(datosRecibidos) {
      this.mensaje = "Procesando cita...";
      this.esError = false;

      
      const citaParaGuardar = {
        doctor: { id: datosRecibidos.doctorId },
        paciente: { id: datosRecibidos.pacienteId },
        fechaCita: datosRecibidos.fecha, 
        horaCita: datosRecibidos.hora,  
        motivo: datosRecibidos.motivo,
        estadoCita: 'CREATED'
      };

      try {
        await guardarFachada(citaParaGuardar);
        this.mensaje = "¡Cita agendada exitosamente!";
        
      } catch (error) {
        console.error("Error Backend:", error.response?.data);
        this.mensaje = "Error al guardar. Verifica los datos.";
        this.esError = true;
      }
    },

    
    async cargarListaCitas() {
      this.mensaje = "Actualizando lista...";
      try {
        this.citasArr = await consultarTodosFachada();
        this.mensaje = ""; 
      } catch (error) {
        this.mensaje = "No se pudieron obtener las citas.";
        this.esError = true;
      }
    },

    
    async eliminarCita(idCita) {
      try {
        await borrarFachada(idCita);
        this.mensaje = "Cita cancelada/eliminada correctamente.";
        this.esError = false;
      
        await this.cargarListaCitas();
      } catch (error) {
        console.error(error);
        this.mensaje = "Error al intentar cancelar la cita.";
        this.esError = true;
      }
    },

    resetear() {
      this.mensaje = null;
      this.mostrar = false;
      this.$nextTick(() => { this.mostrar = true; });
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
.exito { color: green; font-weight: bold; margin-top: 15px; }
.error { color: red; font-weight: bold; margin-top: 15px; }
.boton_destr { margin-top: 30px; }
.btn-reset { background-color: #333; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
</style>