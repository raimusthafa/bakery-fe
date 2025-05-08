import { FC, useState, useEffect } from "react";
import { Button, Form, Input, Typography, message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategories, updateCategory } from "../../../api/category";

const CategoryEdit: FC = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCategory = async () => {
      setFetching(true);
      try {
        const data = await fetchCategories(1, 1000); // fetch all categories to find one by id
        const category = data.data.data.find((cat: any) => cat.id === Number(id));
        if (category) {
          form.setFieldsValue({ name: category.name });
        } else {
          message.error("Kategori tidak ditemukan");
          navigate("/dashboard/categories");
        }
      } catch (error) {
        message.error("Gagal mengambil data kategori");
        navigate("/dashboard/categories");
      } finally {
        setFetching(false);
      }
    };
    fetchCategory();
  }, [id, form, navigate]);

  const onFinish = async (values: { name: string }) => {
    setLoading(true);
    try {
      if (id) {
        await updateCategory(Number(id), values.name);
        message.success("Kategori berhasil diperbarui");
        navigate("/dashboard/categories");
      }
    } catch (error) {
      message.error("Gagal memperbarui kategori");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-[32rem]">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-5 px-4">
      <Typography.Title level={2}>Edit Kategori</Typography.Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
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

export default CategoryEdit;
