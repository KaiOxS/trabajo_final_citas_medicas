<template>
  <div class="login-container">
    <div class="brand">
      <h1>Centro de Salud Nueva Esperanza</h1>
      <p>Sistema de gestión de pacientes, personal y citas médicas</p>
    </div>
    <LoginComponent />
  </div>
</template>

<script>
// Importamos el componente
import LoginComponent from '@/components/LoginComponent.vue';

export default {
  name: 'LoginView',
  components: {
    LoginComponent
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2c3e50;
}

.brand {
  margin-bottom: 2rem;
  text-align: center;
}

.brand h1 {
  color: #42b983;
  font-size: 2.5rem;
  margin: 0;
}

.brand p {
  color: #ffffff;
  font-size: 1.2rem;
}
</style>