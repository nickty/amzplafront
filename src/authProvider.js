// authProvider.js
export default {
  login: ({ username, password }) => {
    // Example API call
    return fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        if (data.status === "error") throw new Error(data.message);
        localStorage.setItem(
          "auth",
          JSON.stringify({ token: data.token, role: data.role })
        );
        return Promise.resolve();
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
    const storedData = localStorage.getItem("auth");
    if (!storedData) {
      // If there's no data in localStorage, reject the promise
      return Promise.reject();
    }

    try {
      const { role } = JSON.parse(storedData);
      // Ensure the role exists; otherwise, reject the promise
      return role ? Promise.resolve(role) : Promise.reject();
    } catch (error) {
      // In case of JSON parsing errors or other issues, reject the promise
      return Promise.reject(error);
    }
  },
};
