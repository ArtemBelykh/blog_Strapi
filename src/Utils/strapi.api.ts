import axios from "axios";
// URL для обращения к API Strapi
export const API_URL = 'http://localhost:1337/api'
export class StrapiApi {
    /**
     * Получение информации о пользователе.
     * @returns Promise с данными о пользователе или ошибкой.
     */
    public async getUser  () {
        try {
            const user = await axios.get(`${API_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${window.sessionStorage.getItem('jwt')}`
                }
            })
            return user.data[0]
        } catch (e) {
            console.error("Error fetching user:", e)
        }
    }
    /**
     * Получение данных по указанному URL.
     * @param url - URL для запроса данных.
     * @returns Promise с данными или ошибкой.
     */
    public async fetchData(url: string) {
        try {
            const response = await axios.get(API_URL + url)
            return response.data.data
        } catch (e) {
            console.error("Error fetching data: ", e)
        }
    }
    /**
     * Аутентификация пользователя.
     * @param data - Данные пользователя для входа (email, password).
     */
    public async login(data: any) {
        try {
            const login = await axios.post(`${API_URL}/auth/local`, {
                "identifier": data.email,
                "password": data.password
            })
            window.sessionStorage.setItem('jwt', login.data.jwt)
            if (login) {
                window.location.replace('/')
            }

        } catch (e) {
            console.error("Error fetching post:", e)
        }
    }
}