// authProvider.js
export default {
  login: ({ username, password }) => {
    return fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "error") {
          throw new Error(data.message);
        }
        localStorage.setItem("auth", JSON.stringify(data)); // Store the token and role
      });
  },
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    const role = JSON.parse(localStorage.getItem("auth")).role;
    return role ? Promise.resolve(role) : Promise.reject();
  },
};
