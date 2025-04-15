import { FC, useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import Api from "../../API_BASE_URL";
import UploadFoto from "../../component/upfoto";
import { UploadFile } from "antd";
import toast from "react-hot-toast";

interface Errors {
    image?: string[];
    title?: string[];
    content?: string[];
    price?: string[];
    general?: string[];
}

const ProductCreate: FC = () => {
    const [imageList, setImageList] = useState<UploadFile[]>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [price, setPrice] = useState<number | "">("");
    const [errors, setErrors] = useState<Errors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleImageChange = (fileList: UploadFile[]) => {
        setImageList(fileList);
    };

    const storeProduct = async (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        
        // Validasi sebelum mengirim data
        if (imageList.length === 0) {
            setErrors({ image: ["Image is required"] });
            return;
        }
        if (!title.trim()) {
            setErrors({ title: ["Title is required"] });
            return;
        }
        if (!content.trim()) {
            setErrors({ content: ["Description is required"] });
            return;
        }
        if (!price || price <= 0) {
            setErrors({ price: ["Price must be greater than 0"] });
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        if (imageList.length > 0 && imageList[0].originFileObj) {
            formData.append("image", imageList[0].originFileObj);
        }
        formData.append("title", title);
        formData.append("content", content);
        formData.append("price", price.toString());

        try {
            await Api.post("/api/posts", formData);
            navigate("/products/admin");
            toast.success("Data Berhasil Ditambah!",
                {
                  duration: 4000,
                }
              );
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response?.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ general: ["Something went wrong!"] });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <form onSubmit={storeProduct} className="space-y-4">
                    {/* Upload Image */}
                    <div>
                        <label className="block font-semibold text-gray-700">Image</label>
                        <UploadFoto fileList={imageList} onChange={handleImageChange} />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>
                        )}
                    </div>

                    {/* Title Input */}
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

                    {/* Description Input */}
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

                    {/* Price Input */}
                    <div>
                        <label className="block font-semibold text-gray-700">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value ? parseFloat(e.target.value) : "")
                            }
                            placeholder="Price Product"
                            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">{errors.price[0]}</p>
                        )}
                    </div>

                    {/* General Error */}
                    {errors.general && (
                        <p className="text-red-500 text-sm mt-2">{errors.general[0]}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full text-white py-2 rounded-md shadow-md transition ${
                            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductCreate;
