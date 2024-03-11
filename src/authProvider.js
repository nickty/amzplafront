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
            subscription: data.subscription,
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
    // Check if error is an object and has a 'status' property
    if (error && typeof error === "object" && "status" in error) {
      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem("auth");
        return Promise.reject(new Error("Unauthorized or Forbidden"));
      }
    } else {
      // If error does not have a status, it might be structured differently
      // Log the error to see its structure
      console.error("Unexpected error format:", error);

      // Optionally handle this case differently, e.g., by rejecting the promise with a generic error message
      return Promise.reject(new Error("An unexpected error occurred"));
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
      const { id, fullName, email, subscription } = JSON.parse(storedData);
      // Return the identity details
      return Promise.resolve({ id, fullName, email, subscription });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
