import { FC, useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { UploadFile, Checkbox } from "antd";
import toast from "react-hot-toast";
import { Link } from 'react-router';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Spin } from "antd"; // Kita pakai spinner dari Ant Design
import UploadFoto from "../../component/upfoto";
import { fetchProductDetail, updateProduct } from "../../api/products";
import { useProductStore } from "../../store/product";

// Interface Errors
interface Errors {
  image?: string[];
  title?: string[];
  content?: string[];
  price?: string[];
}

const ProductEdit: FC = () => {
  const { triggerRefresh } = useProductStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [isPreorder, setIsPreorder] = useState<boolean>(false); // Tambahkan state untuk isPreorder
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      loadProductDetail();
    }
  }, [id]);

  const loadProductDetail = async () => {
    try {
      const data = await fetchProductDetail(id!);
      console.log("is_preorder dari API:", data.is_preorder, typeof data.is_preorder);

      setTitle(data.title);
      setContent(data.content);
      setPrice(data.price);
      setIsPreorder(data.is_preorder || false); // Mengambil status preorder jika ada

      if (data.image) {
        setImageList([
          {
            uid: "-1",
            name: "old-image",
            status: "done",
            url: data.image,
          },
        ]);
      }
    } catch (error: any) {
      console.error("Error loading product:", error);
    }
  };

  const handleImageChange = (fileList: UploadFile[]) => {
    setImageList(fileList);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      content,
      price,
      image: imageList[0]?.originFileObj, // kalau ada file baru
      is_preorder: isPreorder, // Menambahkan status preorder
    };

    try {
      await updateProduct(id!, payload);
      toast.success("Data Berhasil Diedit!", { duration: 4000 });
      triggerRefresh();
      navigate("/dashboard/products");
    } catch (error: any) {
      setErrors(error.response?.data || {});
      toast.error("Gagal mengedit data.", { duration: 4000 });
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Upload Foto */}
          <div>
            <label className="block font-semibold text-gray-700">Image</label>
            <UploadFoto fileList={imageList} onChange={handleImageChange} />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>}
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
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>}
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
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content[0]}</p>}
          </div>

          {/* Preorder Checkbox */}
          <div className="mt-4">
            <Checkbox
              checked={isPreorder}
              onChange={(e) => setIsPreorder(e.target.checked)}
            >
              <span className="text-gray-700">Preorder</span>
            </Checkbox>
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
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price[0]}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex w-full mt-8 gap-2">
            {/* Tombol Kembali */}
            <Link
              to="/dashboard/products"
              className="flex items-center justify-center gap-2 w-1/2 py-3 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300 transition"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Kembali</span>
            </Link>

            {/* Tombol Save */}
            <button
              type="submit"
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 w-1/2 py-3 text-white rounded-md shadow-md transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? (
                <>
                  Saving
                  <Spin size="small" />
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;
