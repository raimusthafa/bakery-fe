import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Tooltip,
  Modal,
  Form,
  Space,
  message,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../api/category";
import toast from "react-hot-toast";

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [form] = Form.useForm();

  const perPage = 10;

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await fetchCategories(page, perPage);
      console.log("fetchCategories response:", res);

      if (res && res.data && Array.isArray(res.data.data)) {
        setCategories(res.data.data);
        setTotal(res.data.total || 0);
      } else {
        setCategories([]);
        setTotal(0);
      }
    } catch (err) {
      message.error("Gagal memuat data kategori");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    loadCategories();
  }, [page]);

  const handleSearch = (value: string) => {
    setSearch(value.toLowerCase());
  };

  const filteredCategories = Array.isArray(categories)
  ? categories.filter((c) => c.name.toLowerCase().includes(search))
  : [];


  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      toast.success("Kategori berhasil dihapus");
      loadCategories();
    } catch {
      toast.error("Gagal menghapus kategori");
    }
  };

  const openModal = (category?: any) => {
    setEditingCategory(category || null);
    setModalVisible(true);
    form.setFieldsValue({ name: category?.name || "" });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        await updateCategory(editingCategory.id, values.name);
        toast.success("Kategori berhasil diperbarui");
      } else {
        await createCategory(values.name);
        toast.success("Kategori berhasil ditambahkan");
      }
      setModalVisible(false);
      loadCategories();
    } catch (err) {
      toast.error("Gagal menyimpan kategori");
    }
  };

  const columns = [
    {
      title: "No",
      render: (_: any, __: any, index: number) => (page - 1) * perPage + index + 1,
    },
    {
      title: "Nama",
      dataIndex: "name",
    },
    {
      title: "Aksi",
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Lihat">
            <Button icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} onClick={() => openModal(record)} />
          </Tooltip>
          <Tooltip title="Hapus">
            <Popconfirm
              title="Yakin ingin menghapus kategori ini?"
              onConfirm={() => handleDelete(record.id)}
              okText="Ya"
              cancelText="Batal"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16, justifyContent: "space-between", width: "100%" }}>
        <Input.Search
          placeholder="Cari kategori..."
          onSearch={handleSearch}
          allowClear
          style={{ width: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>
          Tambah
        </Button>
      </Space>

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={filteredCategories}
        pagination={{
          current: page,
          pageSize: perPage,
          total: total,
          onChange: setPage,
        }}
      />

      <Modal
        title={editingCategory ? "Edit Kategori" : "Tambah Kategori"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
        okText="Simpan"
        cancelText="Batal"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Nama Kategori"
            rules={[{ required: true, message: "Nama kategori wajib diisi" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryList;
