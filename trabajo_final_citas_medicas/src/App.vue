<template>
  <nav>
    <transition name="fade" mode="out-in">
      <router-link v-if="!estaLogueado" to="/" key="login-btn" class="nav-link">
        Login
      </router-link>
      <a v-else
        href="#"
        @click.prevent="logoutManual"
        key="logout-btn"
        class="logout-btn" > Salir </a>
    </transition>
    <span class="divider">|</span>
    <router-link to="/paciente">Paciente</router-link>
    <span class="divider">|</span>
    <router-link to="/doctores">Doctores</router-link>
    <span class="divider">|</span>
    <router-link to="/citas">Agendar Cita</router-link>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      estaLogueado: false, // Variable reactiva para controlar el estado
      events: ["click", "mousemove", "keypress", "scroll"],
      logoutTimer: null,
      TIMEOUT: 5 * 60 * 1000, // 5 minutos
    };
  },
  // EL WATCHER: Esto es lo que hace que el botón cambie sin recargar la página
  watch: {
    $route() {
      this.verificarEstadoLogin();
    },
  },
  methods: {
    verificarEstadoLogin() {
      // Simplemente revisamos si existe el token
      this.estaLogueado = localStorage.getItem("token") !== null;
    },

    // --- Lógica de Inactividad (La que ya tenías) ---
    resetTimer() {
      if (this.logoutTimer) clearTimeout(this.logoutTimer);
      if (this.estaLogueado) {
        this.logoutTimer = setTimeout(this.logoutAutomatico, this.TIMEOUT);
      }
    },
    // En methods de App.vue
    logoutAutomatico() {
      // Limpiamos datos del LocalStorage
      localStorage.removeItem("token");
      localStorage.removeItem("estaAutenticado");
      this.estaLogueado = false; // Actualizamos el estado visual del menú

      // REDIRECCIÓN CON PARÁMETRO
      // Si no estamos en el login, nos vamos al login y avisamos que fue por tiempo
      if (this.$route.path !== "/") {
        this.$router.push({
          path: "/",
          query: { sesionExpirada: "true" }, // <--- ESTA ES LA CLAVE
        });
      }
    },
    logoutManual() {
      this.limpiarSesion();
    },
    limpiarSesion() {
      localStorage.removeItem("token");
      localStorage.removeItem("estaAutenticado");
      this.estaLogueado = false; // Actualizamos estado visual inmediatamente
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
  },
  mounted() {
    // Verificamos el estado apenas carga la app
    this.verificarEstadoLogin();

    // Activamos el detector de inactividad
    this.events.forEach((event) =>
      window.addEventListener(event, this.resetTimer)
    );
    this.resetTimer();
  },
  unmounted() {
    this.events.forEach((event) =>
      window.removeEventListener(event, this.resetTimer)
    );
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Espacio entre elementos */
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

nav a.router-link-exact-active {
  color: #42b983;
  background-color: #e8f5e9;
}

.divider {
  color: #ccc;
}

/* Estilo especial para el botón salir */
.logout-btn {
  color: #e74c3c !important;
  border: 1px solid #e74c3c;
}

.logout-btn:hover {
  background-color: #e74c3c;
  color: white !important;
}

/* --- AQUÍ ESTÁ LA MAGIA DE LA ANIMACIÓN (CSS) --- */

/* Estado inicial de entrada (invisible y desplazado un poco hacia abajo) */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Estado final (visible y en su sitio) */
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* La transición en sí */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
</style>