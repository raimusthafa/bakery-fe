import React, { useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface DeleteModalProps {
  title?: string;
  onDelete: () => void;
  loading?: boolean; // added loading prop
}

const DeleteModal: React.FC<DeleteModalProps> = ({ title = "Konfirmasi Hapus", onDelete, loading = false }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const WhiteText = <p className="text-black">Hapus Produk</p>;

  return (
    <>
      <Tooltip placement="top" title={WhiteText} color="#f6f6f6">
        <Button
          type="default"
          icon={<DeleteOutlined style={{ color: "#ff4d4f" }} />}
          onClick={() => setModalOpen(true)}
          style={{ borderColor: "#ff4d4f", color: "#ff4d4f" }}
          loading={loading} // apply loading prop here
        />
      </Tooltip>

      <Modal
        title={title}
        centered
        open={modalOpen}
        onOk={() => {
          onDelete();
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
        okText="Hapus"
        cancelText="Batal"
        okButtonProps={{ danger: true }}
      >
        <p>Apakah Anda yakin ingin menghapus data ini?</p>
      </Modal>
    </>
  );
};

export default DeleteModal;
