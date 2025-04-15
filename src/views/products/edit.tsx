import { FC, useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import Api from "../../API_BASE_URL";
import UploadFoto from "../../component/upfoto";
import { UploadFile } from "antd";
import toast from "react-hot-toast";

// Interface Errors
interface Errors {
    image?: string[];
    title?: string[];
    content?: string[];
    price?: string[];
}

const ProductEdit: FC = () => {
    // State untuk image, title, description, price
    const [imageList, setImageList] = useState<UploadFile[]>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({});

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // Fungsi untuk fetch data produk termasuk gambar lama
    const fetchDetailProduct = async () => {
        try {
            const response = await Api.get(`/api/posts/${id}`);
            const data = response.data.data;

            // Set data product ke state
            setTitle(data.title);
            setContent(data.content);
            setPrice(data.price);

            // Jika ada gambar lama, tambahkan ke imageList
            if (data.image) {
                setImageList([
                    {
                        uid: "-1",
                        name: "old-image",
                        status: "done",
                        url: data.image, // Pastikan API mengembalikan URL gambar yang valid
                    },
                ]);
            }
        } catch (error: any) {
            console.error("Error fetching product:", error);
        }
    };

    useEffect(() => {
        fetchDetailProduct();
    }, []);

    // Fungsi untuk meng-handle perubahan gambar
    const handleImageChange = (fileList: UploadFile[]) => {
        setImageList(fileList);
    };

    // Fungsi untuk update produk
    const updateProduct = async (e: FormEvent) => {
        e.preventDefault();

        // Membuat FormData
        const formData = new FormData();
        if (imageList.length > 0 && imageList[0].originFileObj) {
            formData.append("image", imageList[0].originFileObj);
        }
        formData.append("title", title);
        formData.append("content", content);
        formData.append("price", price);
        formData.append("_method", "PUT");

        try {
            await Api.post(`/api/posts/${id}`, formData);
            navigate("/products/admin");
            toast.success("Data Berhasil Diedit!",
                {
                    duration: 4000,
                }
            );
        } catch (error: any) {
            setErrors(error.response.data);
            toast.error(error.response.data,
                {
                    duration: 4000,
                }
            );
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <form onSubmit={updateProduct} className="space-y-4">
                    {/* Upload Foto */}
                    <div>
                        <label className="block font-semibold text-gray-700">Image</label>
                        <UploadFoto fileList={imageList} onChange={handleImageChange} />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>
                        )}
                    </div>

                    {/* Input Title */}
                    <div>
                        <label className="block font-semibold text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title Product"
                            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
                        )}
                    </div>

                    {/* Input Description */}
                    <div>
                        <label className="block font-semibold text-gray-700">Description</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={5}
                            placeholder="Description Product"
                            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm mt-1">{errors.content[0]}</p>
                        )}
                    </div>

                    {/* Input Price */}
                    <div>
                        <label className="block font-semibold text-gray-700">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price Product"
                            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">{errors.price[0]}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductEdit;
