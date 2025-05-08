import Api from "../API_BASE_URL";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchCategories = async (page: number, perPage: number) => {
  const response = await Api.get("/api/categories", {
    params: {
      page,
      per_page: perPage,
    },
    headers: getAuthHeader(),
  });
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await Api.delete(`/api/categories/${id}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const createCategory = async (name: string) => {
  const response = await Api.post(
    "/api/categories",
    { name },
    { headers: getAuthHeader() }
  );
  return response.data;
};

export const updateCategory = async (id: number, name: string) => {
  const response = await Api.put(
    `/api/categories/${id}`,
    { name },
    { headers: getAuthHeader() }
  );
  return response.data;
};
