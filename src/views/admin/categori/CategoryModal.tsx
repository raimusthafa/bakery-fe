import { FC, useEffect } from "react";
import { Modal, Form, Input, message } from "antd";
import { createCategory, updateCategory } from "../../../api/category";
import toast from "react-hot-toast";

interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  categoryId?: number;
  initialName?: string;
  onSuccess: () => void;
}

const CategoryModal: FC<CategoryModalProps> = ({
  visible,
  onClose,
  categoryId,
  initialName = "",
  onSuccess,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({ name: initialName });
    }
  }, [visible, initialName, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (categoryId) {
        await updateCategory(categoryId, values.name);
        toast.success("Kategori berhasil diperbarui");
      } else {
        await createCategory(values.name);
        toast.success("Kategori berhasil ditambahkan");
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Gagal menyimpan kategori");
    }
  };

  return (
    <Modal
      title={categoryId ? "Edit Kategori" : "Tambah Kategori"}
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Simpan"
      cancelText="Batal"
      destroyOnClose
    >
      <Form form={form} layout="vertical" initialValues={{ name: initialName }}>
        <Form.Item
          label="Nama Kategori"
          name="name"
          rules={[{ required: true, message: "Mohon masukkan nama kategori" }]}
        >
          <Input placeholder="Masukkan nama kategori" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
