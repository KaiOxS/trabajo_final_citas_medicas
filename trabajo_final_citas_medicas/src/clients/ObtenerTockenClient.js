import axios from "axios";

const URL = "http://localhost:8082/auth/api/v1.0/usuarios/token?user=admin&&password=123456"
const URL_AUTH = 'http://localhost:8082/auth/api/v1.0/usuarios/token';

let tokenEnMemoria = null;

// Métodos
const obToken = async () => {

    if (tokenEnMemoria) {
        return tokenEnMemoria;
    }

    try {
        const token = await axios.get(`${URL}`).then(r => r.data);
        tokenEnMemoria = token.accessToken;
        return tokenEnMemoria;
    } catch (error) {
        console.error("Error al obtener token:", error);
        throw error;
    }

}

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