export default {
  login: ({ email, password }) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        if (data.status === "error") throw new Error(data.message);

        // console.log("Login Response:", data); // Debugging line

        // Ensure you're accessing the response data correctly
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: data.token,
            role: data.role,
            id: data.id, // Corrected based on assumed flat structure
            fullName: data.fullName, // Corrected based on assumed flat structure
            email: data.email, // Corrected based on assumed flat structure
          })
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
      return Promise.reject();
    }
    try {
      const { role } = JSON.parse(storedData);
      return role ? Promise.resolve(role) : Promise.reject();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getIdentity: () => {
    const storedData = localStorage.getItem("auth");
    if (!storedData) {
      return Promise.reject();
    }
    try {
      const { id, fullName, email } = JSON.parse(storedData);
      // Return the identity details
      return Promise.resolve({ id, fullName, email });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
