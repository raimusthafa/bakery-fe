import { FC, useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../../api/category";

const CategoryCreate: FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { name: string }) => {
    setLoading(true);
    try {
      await createCategory(values.name);
      message.success("Kategori berhasil ditambahkan");
      navigate("/dashboard/categories");
    } catch (error) {
      message.error("Gagal menambahkan kategori");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-5 px-4">
      <Typography.Title level={2}>Tambah Kategori</Typography.Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Nama Kategori"
          name="name"
          rules={[{ required: true, message: "Mohon masukkan nama kategori" }]}
        >
          <Input placeholder="Masukkan nama kategori" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Simpan
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => navigate("/dashboard/categories")}
          >
            Batal
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CategoryCreate;
