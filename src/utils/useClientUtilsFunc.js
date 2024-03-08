import { useEffect, useState } from "react";

const useClient = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const token = auth?.token;

        if (!token) {
          throw new Error("No token found");
        }

        if (!options.headers) {
          options.headers = {};
        }

        options.headers.Authorization = `Bearer ${token}`;

        const response = await fetch(endpoint, options);

        if (!response.ok) {
          throw new Error(`API call failed: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, options]);

  return { data, loading, error };
};

export default useClient;
