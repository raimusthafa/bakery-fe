import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/category";
import CategoryTable from "./CategoryTable";
import CategoryModal from "./CategoryModal";
import ConfirmDialog from "./ConfirmDialog";

const CategoryPage = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<{ id: number | null; name: string }>({ id: null, name: "" });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(1, 100),
  });

  console.log("CategoryPage data:", data);
  
  

  const createMutation = useMutation({
    mutationFn: (name: string) => createCategory(name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      updateCategory(id, name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const handleSave = (name: string) => {
    if (selected.id) {
      updateMutation.mutate({ id: selected.id, name });
    } else {
      createMutation.mutate(name);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId);
      setConfirmOpen(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Kategori</h1>
        <button
          onClick={() => {
            setSelected({ id: null, name: "" });
            setModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Tambah Kategori
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Gagal memuat data: {(error as Error).message}</p>
      ) : data && data.data && Array.isArray(data.data.data) && data.data.data.length > 0 ? (
        <CategoryTable
          data={data.data.data}
          onEdit={(item) => {
            setSelected(item);
            setModalOpen(true);
          }}
          onDelete={(id) => {
            setDeleteId(id);
            setConfirmOpen(true);
          }}
        />
      ) : (
        <p>Tidak ada data kategori.</p>
      )}


      <CategoryModal
        isOpen={modalOpen}
        initialName={selected.name}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        message="Yakin ingin menghapus kategori ini?"
      />
    </div>
  );
};

export default CategoryPage;
