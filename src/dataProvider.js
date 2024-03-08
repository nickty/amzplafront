// dataProvider.js
import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:4000/api"; // Update the API URL with your actual backend API URL

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  // Add your authorization token if required
  // const auth = localStorage.getItem("auth");
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      skip: (page - 1) * perPage,
      limit: perPage,
      _sort: field,
      _order: order,
    };

    // Add filters to the query
    Object.keys(params.filter).forEach((key) => {
      query[key] = params.filter[key];
    });

    const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      // Ensure each item has an 'id' field, map from '_id' if necessary
      const data = json.map((item) => ({
        ...item,
        id: item._id || item.id, // Adapt based on your identifier field
      }));

      let total = parseInt(headers.get("X-Total-Count"), 10); // Use the X-Total-Count header for total count

      return { data, total };
    });
  },
  getOne: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
      // console.log("check response for get one", json);
      if (!json || !json._id) {
        throw new Error(
          `The response for ${resource} with ID ${params._id} does not contain an 'id' key.`
        );
      }
      return { data: { ...json, id: json._id } };
    });
  },
  create: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    }));
  },
  update: (resource, params) => {
    const { id, data } = params;
    return httpClient(`${apiUrl}/${resource}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }).then(({ json }) => {
      if (!json || !json._id) {
        throw new Error(
          `The response for updating ${resource} with ID ${id} does not contain an 'id' key.`
        );
      }
      return { data: { ...data, id: json._id } };
    });
  },
  delete: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({
      data: json,
    }));
  },
};

export default dataProvider;
