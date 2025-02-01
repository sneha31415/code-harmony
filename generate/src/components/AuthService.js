export const AuthService = {
  login: async (email, password) => {
      const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
          localStorage.setItem("token", data.token);
      }
      return data;
  },
  getToken: () => localStorage.getItem("token"),
};
