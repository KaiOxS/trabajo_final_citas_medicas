<template>
  <div class="doctor-page">
    <h1>Gestión de Doctores</h1>

    <DoctorTable :doctors="doctors" :loading="loading" v-model:error-message.sync="errorMessage"
      @add-doctor="abrirParaCrear" @edit-doctor="abrirParaEditar" @doctor-deleted="cargarDoctores" />

    <DoctorForm v-if="showForm" :doctor-to-edit="selectedDoctor" @save="guardarDoctor" @close="cerrarFormulario" />
  </div>
</template>

<script>
import DoctorTable from '@/components/DoctorTable.vue';
import DoctorForm from '@/components/DoctorForm.vue';
import { actualizarDoctorFachada, consultarTodosDoctoresFachada, crearDoctorFachada } from '@/clients/DoctorClient';

export default {
  name: 'DoctorView',
  components: { DoctorTable, DoctorForm },

  data() {
    return {
      doctors: [],
      loading: false,
      errorMessage: '',
      showForm: false,
      selectedDoctor: null
    };
  },

  mounted() {
    this.cargarDoctores();
  },

  methods: {
    async cargarDoctores() {
      this.loading = true;
      this.errorMessage = '';
      try {
        const lista = await consultarTodosDoctoresFachada();

        this.doctors = lista.sort((a, b) => a.id - b.id);

      } catch (error) {
        this.errorMessage = 'Error al cargar: ' + error.message;
      } finally {
        this.loading = false;
      }
    },

    // Funciones para abrir/cerrar
    abrirParaCrear() {
      this.selectedDoctor = null;
      this.showForm = true;
    },

    abrirParaEditar(doctor) {
      this.selectedDoctor = doctor;
      this.showForm = true;
    },

    cerrarFormulario() {
      this.showForm = false;
      this.selectedDoctor = null;
    },

    // Función principal de guardar
    async guardarDoctor(datosDoctor) {
      try {
        if (datosDoctor.id) {
          // Si tiene ID, es ACTUALIZAR
          await actualizarDoctorFachada(datosDoctor.id, datosDoctor);
          this.errorMessage = 'Doctor actualizado correctamente';
        } else {
          // Si no tiene ID, es CREAR
          await crearDoctorFachada(datosDoctor);
          this.errorMessage = 'Doctor creado correctamente';
        }

        this.cerrarFormulario();
        this.cargarDoctores();

      } catch (error) {
        this.errorMessage = 'Error al guardar: ' + error.message;
      }
    }
  }
};
</script>

<style scoped>
.doctor-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 30px;
  color: #2c3e50
}
</style>