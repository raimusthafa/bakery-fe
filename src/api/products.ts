import Api from "../API_BASE_URL";

interface ProductPayload {
  image: File;
  title: string;
  content: string;
  price: number;
  is_preorder: boolean; 
}

export interface Product {
  id: number;
  image: string;
  title: string;
  content: string;
  price: number;
  is_preorder: boolean; // Add is_preorder as a boolean
}

interface ProductDetail {
  title: string;
  content: string;
  price: string;
  image?: string;
  is_preorder: boolean; // Add is_preorder as a boolean
  category_name?: string;
}

export type { ProductDetail };

interface UpdateProductPayload {
  image?: File;
  title: string;
  content: string;
  price: string;
  is_preorder: boolean; // Add is_preorder as a boolean
}

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchProducts = async (page: number, perPage: number) => {
  const response = await Api.get("/api/posts", {
    params: {
      page,
      per_page: perPage,
    },
    headers: getAuthHeader(),
  });
  return response.data.data;
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await Api.delete(`/api/posts/${id}`, {
      headers: getAuthHeader(),
    });
    console.log("Produk berhasil dihapus", response);
  } catch (error) {
    console.error("Error menghapus produk:", error);
    throw error;  // Lempar kembali error agar bisa ditangani di frontend
  }
};


export const createProduct = async (payload: ProductPayload) => {
  console.log("Data yang dikirim ke createProduct:", payload);
  const formData = new FormData();
  formData.append("image", payload.image);
  formData.append("title", payload.title);
  formData.append("content", payload.content);
  formData.append("price", payload.price.toString());
  formData.append("is_preorder", payload.is_preorder.toString()); // Add is_preorder to formData

  const response = await Api.post("/api/posts", formData, {
    headers: {
      ...getAuthHeader(), // 👈 tambahkan di sini
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const fetchProductDetail = async (id: string) => {
  const response = await Api.get(`/api/posts/${id}`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  return response.data.data as ProductDetail;
};

export const updateProduct = async (id: string, payload: UpdateProductPayload) => {
    const formData = new FormData();
  
    if (payload.image) {
      formData.append("image", payload.image);
    }
  
    formData.append("title", payload.title);
    formData.append("content", payload.content);
    formData.append("price", payload.price);
    formData.append("is_preorder", payload.is_preorder.toString()); // ✅ tambahkan ini
    formData.append("_method", "PUT"); // Laravel butuh ini untuk spoofing PUT
  
    const response = await Api.post(`/api/posts/${id}`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
  
    return response.data;
  };
  


// khusus user

// Tambahan fungsi khusus untuk user/public
export const fetchPublicPosts = async (page: number, perPage: number) => {
  const response = await Api.get("/api/public-posts", {
    params: { page, per_page: perPage },
  });
  console.log("data kue", response.data.data)
  return response.data.data;
};

export const fetchPublicPostDetail = async (id: string) => {
  try {
    const response = await Api.get(`/api/public-posts/${id}`);
    console.log("Detail produk yang diambil:", response.data.data);
    return response.data.data as ProductDetail;
  } catch (error) {
    console.error("Gagal mengambil detail produk:", error);
    throw error;
  }
};

