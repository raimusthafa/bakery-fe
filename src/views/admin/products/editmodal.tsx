import { FC, useState, useEffect, FormEvent } from "react";
import { UploadFile, Modal, Checkbox, Input, InputNumber, Button } from "antd";
import UploadFoto from "../../../component/upfoto";
import toast from "react-hot-toast";
import { updateProduct } from "../../../api/products";
import { useProductStore } from "../../../store/product";

const { TextArea } = Input;

interface ProductEditModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  product: {
    id: string;
    title: string;
    content: string;
    price: number;
    image?: string;
    is_preorder: boolean;
  } | null;
}

interface Errors {
  image?: string[];
  title?: string[];
  content?: string[];
  price?: string[];
  general?: string[];
}

const ProductEditModal: FC<ProductEditModalProps> = ({ visible, onCancel, onSuccess, product }) => {
  const { triggerRefresh } = useProductStore();
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState<string | null>(null);
  const [isPreorder, setIsPreorder] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setContent(product.content);
      setPrice(product.price.toString());
      setIsPreorder(product.is_preorder);
      if (product.image) {
        setImageList([
          {
            uid: "-1",
            name: "old-image",
            status: "done",
            url: product.image,
          },
        ]);
      } else {
        setImageList([]);
      }
      setErrors({});
    } else {
      resetForm();
    }
  }, [product, visible]);

  const handleImageChange = (fileList: UploadFile[]) => setImageList(fileList);

  const resetForm = () => {
    setImageList([]);
    setTitle("");
    setContent("");
    setPrice(null);
    setIsPreorder(false);
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

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
    if (!price || Number(price) <= 0) {
      setErrors({ price: ["Price must be greater than 0"] });
      return;
    }

    if (!product) {
      setErrors({ general: ["Product data is missing"] });
      return;
    }

    setIsLoading(true);

    try {
      await updateProduct(product.id, {
        image: imageList[0].originFileObj,
        title,
        content,
        price: (price),
        is_preorder: isPreorder,
      });
      toast.success("Produk berhasil diupdate!");
      triggerRefresh();
      resetForm();
      onSuccess();
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: ["Terjadi kesalahan"] });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={() => {
        onCancel();
        resetForm();
      }}
      title="Edit Produk"
      footer={null}
      destroyOnClose
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="font-semibold text-gray-700">Image</label>
          <UploadFoto fileList={imageList} onChange={handleImageChange} />
          {errors.image && <p className="text-red-500 text-sm">{errors.image[0]}</p>}
        </div>

        <div>
          <label className="font-semibold text-gray-700">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul produk"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title[0]}</p>}
        </div>

        <div>
          <label className="font-semibold text-gray-700">Description</label>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            placeholder="Deskripsi produk"
          />
          {errors.content && <p className="text-red-500 text-sm">{errors.content[0]}</p>}
        </div>

        <Checkbox checked={isPreorder} onChange={(e) => setIsPreorder(e.target.checked)}>
          Preorder
        </Checkbox>

        <div className="mt-4 w-full">
          <label className="font-semibold text-gray-700 block mb-1">Price</label>
          <div className="w-full">
          <InputNumber
            value={price !== null ? Number(price) : undefined}
            onChange={(value) => setPrice(value !== undefined && value !== null ? value.toString() : null)}
            min={0}
            className="!w-full"
            placeholder="Harga produk"
          />
          </div>
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price[0]}</p>}
        </div>

        {errors.general && <p className="text-red-500 text-sm">{errors.general[0]}</p>}

        <Button type="primary" htmlType="submit" loading={isLoading} className="w-full mt-4">
          Simpan
        </Button>
      </form>
    </Modal>
  );
};

export default ProductEditModal;
