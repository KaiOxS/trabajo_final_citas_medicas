<template>
  <div class="login-card">
    <h2>Iniciar Sesión</h2>
    
    <form @submit.prevent="iniciarSesion">
      <div class="form-group">
        <label>Usuario:</label>
        <input 
          type="text" 
          v-model="credenciales.usuario" 
          placeholder="Ej. admin" 
          required 
        />
      </div>

      <div class="form-group">
        <label>Contraseña:</label>
        <input 
          type="password" 
          v-model="credenciales.password" 
          placeholder="******" 
          required 
        />
      </div>

      <p v-if="error" class="error-msg">{{ error }}</p>

      <button type="submit" :disabled="cargando">
        {{ cargando ? 'Verificando...' : 'Ingresar' }}
      </button>
    </form>
  </div>
</template>

<script>
import { loginFachada } from '@/clients/ObtenerTockenClient.js';

export default {
  name: 'LoginForm',
  data() {
    return {
      credenciales: {
        usuario: '',
        password: ''
      },
      error: null,
      cargando: false
    };
  },
  methods: {
    async iniciarSesion() {
      this.cargando = true;
      this.error = null;

      try {
        const data = await loginFachada(this.credenciales.usuario, this.credenciales.password);
        
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('estaAutenticado', 'true'); 
        
        localStorage.setItem('rol', data.role);

        this.$router.push({ name: 'citas' }); 

      } catch (e) {
        this.error = "Usuario o contraseña incorrectos.";
      } finally {
        this.cargando = false;
      }
    }
  }
};
</script>

<style scoped>
.login-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #2c3e50; 
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.3s;
}

button:hover {
  background-color: #42b983;
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.error-msg {
  color: #e74c3c;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}
</style>