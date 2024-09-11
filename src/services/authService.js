import api from '../api/axios'; 

export const login = async (username, password) => {
    try {
        const response = await api.post('restaurant/auth/login', { username, password });
        const token = response.data.result.token;

        localStorage.setItem('jwtToken', token);

        return response;
    } catch (error) {
        console.error('Login failed', error);
        throw error; 
    }
};

export const logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
};
