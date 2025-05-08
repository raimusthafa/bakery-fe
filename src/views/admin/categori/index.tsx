import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../api/category";
import {
  Table,
  Button,
  Typography,
  Spin,
  Alert,
  Empty,
  Modal,
} from "antd";
import { PlusOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import DeleteModal from "../../../component/confirmdelete";

const { Title } = Typography;

type Category = {
  id: number;
  name: string;
};

const CategoryPage = () => {
  const queryClient = useQueryClient();
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [inputName, setInputName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories", currentPage, pageSize],
    queryFn: () => fetchCategories(currentPage, pageSize),
  });
  

  const createMutation = useMutation({
    mutationFn: (name: string) => createCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Kategori berhasil ditambahkan");
    },
    onError: () => toast.error("Gagal menambah kategori"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      updateCategory(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Kategori berhasil diubah");
    },
    onError: () => toast.error("Gagal mengubah kategori"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", currentPage, pageSize] });
      toast.success("Kategori berhasil dihapus");
    },
    onError: () => toast.error("Gagal menghapus kategori"),
  });

  const openAddModal = () => {
    setEditing(null);
    setInputName("");
    setModalVisible(true);
  };

  const openEditModal = (record: Category) => {
    setEditing(record);
    setInputName(record.name);
    setModalVisible(true);
  };

  // Remove handleDelete function since DeleteModal handles button and modal internally


  const handleSave = () => {
    if (inputName.trim() === "") return;

    if (editing) {
      updateMutation.mutate({ id: editing.id, name: inputName });
    } else {
      createMutation.mutate(inputName);
    }
    setModalVisible(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "20%",
    },
    {
      title: "Nama Kategori",
      dataIndex: "name",
      width: "60%",
    },
    {
      title: "Aksi",
      key: "action",
      width: "20%",
      render: (_: any, record: Category) => (
        <div className="space-x-2">
          <Button icon={<EditOutlined />} onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <DeleteModal
            title="Yakin ingin menghapus kategori ini?"
            onDelete={() => deleteMutation.mutate(record.id)}
            loading={deleteMutation.status === "pending"} // pass loading prop to show loading state on button
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Title level={2}>Category List</Title>
        <Button icon={<PlusOutlined />} type="primary" size="large" onClick={openAddModal}>
          Tambah Kategori baruu
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[32rem]">
              <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : isError ? (
        <Alert
          message="Tidak dapat mengambil data"
          description={(error as Error).message || "Koneksi server bermasalah"}
          type="warning"
          showIcon
        />
      ) : (
        <Table
        columns={columns}
        dataSource={data?.data?.data || []}
        rowKey="id"
        bordered
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data?.data?.total || 0,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
        }}
        locale={{
          emptyText: <Empty description="Data kosong, cobalah tambah data" />,
        }}
      />
      
      )}

      <Modal
        title={editing ? "Edit Kategori" : "Tambah Kategori"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
        okText="Simpan"
        cancelText="Batal"
      >
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Masukkan nama kategori"
        />
      </Modal>
    </div>
  );
};

export default CategoryPage;
