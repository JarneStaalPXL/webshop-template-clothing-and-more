const createPOSTRequestAsync = async (path, data) => {
  return await fetch(import.meta.env.VITE_STRAPI_PRODUCTION_URL_API + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + import.meta.env.VITE_STRAPI_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      data,
    }),
  });
};

const createGETRequestAsync = async (path) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_STRAPI_PRODUCTION_URL_API}${path}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_STRAPI_ACCESS_TOKEN}`,
        },
      }
    );
    return response;
  } catch (error) {
    // It's a good practice to handle errors in asynchronous functions
    console.error("Error during GET request:", error);
    throw error; // Re-throw the error for further handling if necessary
  }
};

const createPUTRequestAsync = async (path, data) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_STRAPI_PRODUCTION_URL_API}${path}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_STRAPI_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          data,
        }),
      }
    );
    return response;
  } catch (error) {
    console.error("Error during PUT request:", error);
    throw error;
  }
};

const createDELETERequestAsync = async (path) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_STRAPI_PRODUCTION_URL_API}${path}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_STRAPI_ACCESS_TOKEN}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during DELETE request:", error);
    throw error;
  }
}

export { createPOSTRequestAsync, createPUTRequestAsync, createGETRequestAsync };
