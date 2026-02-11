<template>
  <div class="doctor-page">
    <h1>Gestión de Doctores</h1>
    
    <!-- Componente de tabla -->
    <DoctorTable 
      :doctors="doctors"
      :loading="loading"
      :error-message.sync="errorMessage"
      @add-doctor="showForm = true"
      @edit-doctor="openForm"
      @doctor-deleted="loadDoctors"
    />
    
    <!-- Componente de formulario (modal) -->
    <DoctorForm 
      v-if="showForm"
      :doctor-to-edit="selectedDoctor"
      @save="saveDoctor"
      @close="closeForm"
    />
  </div>
</template>

<script>
import DoctorTable from '@/components/DoctorTable.vue';
import DoctorForm from '@/components/DoctorForm.vue';
import DoctorClient from '@/clients/DoctorClient';

export default {
  name: 'DoctorView',
  components: {
    DoctorTable,
    DoctorForm
  },
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
    this.loadDoctors();
  },
  methods: {
    async loadDoctors() {
      this.loading = true;
      this.errorMessage = '';
      try {
        this.doctors = await DoctorClient.getAllDoctors();
      } catch (error) {
        this.errorMessage = 'Error al cargar doctores: ' + error.message;
      } finally {
        this.loading = false;
      }
    },
    
    openForm(doctor) {
      this.selectedDoctor = doctor;
      this.showForm = true;
    },
    
    closeForm() {
      this.showForm = false;
      this.selectedDoctor = null;
    },
    
    async saveDoctor(doctorData) {
      try {
        if (doctorData.id) {
          await DoctorClient.updateDoctor(doctorData.id, doctorData);
          this.errorMessage = 'Doctor actualizado correctamente';
        } else {
          await DoctorClient.createDoctor(doctorData);
          this.errorMessage = 'Doctor creado correctamente';
        }
        this.closeForm();
        this.loadDoctors();
      } catch (error) {
        this.errorMessage = 'Error al guardar doctor';
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
  color: #2c3e50;
}
</style>