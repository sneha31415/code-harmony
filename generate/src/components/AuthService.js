export const AuthService = {
    login: async (email, password) => {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email,
          password,
        });
        if (response.data.jwtToken) {
          localStorage.setItem('token', response.data.jwtToken); // Save token to localStorage
          console.log('Token saved:', response.data.jwtToken); // Debugging
        }
        return response.data;
      } catch (error) {
        console.error('Login error:', error.response?.data?.message || error.message);
        throw error;
      }
    },
    getToken: () => {
      const token = localStorage.getItem('token');
      console.log('Extracted token:', token); // Debugging
      return token;
    },
  };