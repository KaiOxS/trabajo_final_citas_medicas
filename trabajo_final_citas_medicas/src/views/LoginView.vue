<template>
  <div class="login_container">
    <div class="brand">
      <h1>Centro de Salud Nueva Esperanza</h1>
      <p>Sistema de gestión de pacientes, personal y citas médicas</p>
    </div>

    <transition name="fade">
      <div v-if="mensajeAlerta" class="timeout-alert">
        {{ mensajeAlerta }}
      </div>
    </transition>

    <LoginComponent />
  </div>
</template>

<script>
import LoginComponent from "@/components/LoginComponent.vue";

export default {
  name: "LoginView",
  components: {
    LoginComponent,
  },
  data() {
    return {
      // Usaremos una sola variable de texto para cualquier mensaje
      mensajeAlerta: "", 
    };
  },
  watch: {
    // ESTA ES LA CLAVE: Observamos cambios en la URL (query params)
    "$route.query": {
      immediate: true, // Esto hace que también se ejecute al cargar la página (reemplaza a mounted)
      handler(newQuery) {
        this.verificarMensajes(newQuery);
      },
    },
  },
  methods: {
    verificarMensajes(params) {
      // 1. Caso: Acceso Denegado (Viene del Guardián)
      if (params.accesoDenegado === "true") {
        this.mensajeAlerta = "Acceso Restringido: Debes iniciar sesión para ver esa página.";
      } 
      // 2. Caso: Sesión Expirada (Viene por inactividad)
      else if (params.sesionExpirada === "true") {
        this.mensajeAlerta = "Sesión Finalizada: Tu sesión ha expirado por inactividad. Por favor, ingresa nuevamente.";
      }
      // 3. Caso: URL limpia (usuario borra los params o navega normal)
      else {
        this.mensajeAlerta = "";
      }
    }
  }
};
</script>

<style scoped>
.login_container {
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

/* --- ESTILOS DEL MENSAJE DE TIMEOUT --- */
.timeout-alert {
  background-color: #fff3cd; /* Fondo amarillo suave (tipo advertencia) */
  color: #856404; /* Texto marrón oscuro */
  border: 1px solid #ffeeba;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  font-size: 0.95rem;

  /* Un pequeño borde izquierdo para que resalte más */
  border-left: 5px solid #ffc107;
}

/* Animación de entrada suave */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>