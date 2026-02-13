import axios from "axios";

const URL = "http://localhost:8082/auth/api/v1.0/usuarios/token?"
const URL_AUTH = 'http://localhost:8082/auth/api/v1.0/usuarios/token';

let tokenEnMemoria = null;

// Métodos
const obToken = async () => {
    // 1. Intentar sacar el token que ya guardamos en el login exitoso
    const tokenGuardado = localStorage.getItem('token');

    if (tokenGuardado) {
        return tokenGuardado;
    }

    // 2. Si no hay token, no intentes llamar a URL_AUTH sin parámetros
    // Mejor redirigir al login o lanzar un error controlado
    console.warn("No hay token en memoria. El usuario debe loguearse.");
    return null; 
}

// ... mantener la función login como está para cuando el usuario sí escriba sus datos

const login = async (usuario, password) => {
    try {
        const response = await axios.get(URL_AUTH, {
            params: {
                user: usuario,
                password: password
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
}

// Fachadas
export const obTokenFacade = async () => {
    return await obToken();
}

export const loginFachada = async (usuario, password) => {
    return await login(usuario, password);
}