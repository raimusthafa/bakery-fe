import { Modal } from "antd";
import React from "react";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLoading?: boolean;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = "Konfirmasi",
  message = "Apakah Anda yakin ingin melanjutkan?",
  icon,
  onCancel,
  onConfirm,
  confirmLoading = false,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onConfirm}
      confirmLoading={confirmLoading}
      title={
        <div className="flex items-center gap-2">
          {icon && <div className="text-[#D2691E]">{icon}</div>}
          <span className="text-[#6F4E37] font-semibold">{title}</span>
        </div>
      }
      okText="Ya, Logout"
      cancelText="Batal"
      centered
      okButtonProps={{ danger: true }}
    >
      <p className="text-[#5C4033]">{message}</p>
    </Modal>
  );
};

export default ConfirmModal;
