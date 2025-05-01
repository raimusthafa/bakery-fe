import React, { useState } from "react";
import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import { Upload, Image } from "antd";
import type { UploadFile, UploadProps } from "antd";

const { Dragger } = Upload;

type FileType = File;

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface UploadFotoProps {
  fileList: UploadFile[];
  onChange: (fileList: UploadFile[]) => void;
}

const UploadFoto: React.FC<UploadFotoProps> = ({ fileList, onChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    onChange(newFileList);
  };

  return (
    <>
      <Dragger
        multiple={true}
        listType="picture"
        fileList={fileList}
        beforeUpload={() => false}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={5} // Batasi maksimal 5 file
        showUploadList={{ showPreviewIcon: true }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Klik atau tarik file ke area ini untuk mengunggah</p>
        <p className="ant-upload-hint">Dukungan untuk unggah satu atau lebih file</p>
      </Dragger>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadFoto;
