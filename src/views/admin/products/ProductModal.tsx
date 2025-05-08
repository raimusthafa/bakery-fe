// import { FC, useEffect, useState } from "react";
// import { Modal, Form, Input, InputNumber, message, Checkbox } from "antd";
// import { createProduct, updateProduct } from "../../../api/products";
// import UploadFoto from "../../../component/upfoto";
// import { UploadFile } from "antd/es/upload/interface";

// interface ProductModalProps {
//   visible: boolean;
//   onClose: () => void;
//   productId?: number;
//   initialTitle?: string;
//   initialContent?: string;
//   initialPrice?: number;
//   initialImage?: string;
//   initialIsPreorder?: boolean;
//   onSuccess: () => void;
// }

// const ProductModal: FC<ProductModalProps> = ({
//   visible,
//   onClose,
//   productId,
//   initialTitle = "",
//   initialContent = "",
//   initialPrice = 0,
//   initialImage = "",
//   initialIsPreorder = false,
//   onSuccess,
// }) => {
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState<UploadFile[]>([]);

//   useEffect(() => {
//     if (visible) {
//       form.setFieldsValue({
//         title: initialTitle,
//         content: initialContent,
//         price: initialPrice,
//         is_preorder: initialIsPreorder,
//       });
//       if (initialImage) {
//         setFileList([
//           {
//             uid: "-1",
//             name: "image.png",
//             status: "done",
//             url: initialImage,
//           },
//         ]);
//       } else {
//         setFileList([]);
//       }
//     }
//   }, [visible, initialTitle, initialContent, initialPrice, initialImage, initialIsPreorder, form]);

//   const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
//     setFileList(fileList);
//   };

//   const handleOk = async () => {
//     try {
//       const values = await form.validateFields();
//       if (fileList.length === 0) {
//         message.error("Mohon unggah gambar produk");
//         return;
//       }

//       const formData = new FormData();

//       // Append image only if it's a File (new upload)
//       if (fileList[0].originFileObj) {
//         formData.append("image", fileList[0].originFileObj);
//       }

//       formData.append("title", values.title);
//       formData.append("content", values.content);
//       formData.append("price", values.price.toString());
//       formData.append("is_preorder", values.is_preorder ? "true" : "false");

//       if (productId) {
//         // For update, append _method for Laravel PUT spoofing
//         formData.append("_method", "PUT");
//         await updateProduct(productId.toString(), formData);
//         message.success("Produk berhasil diperbarui");
//       } else {
//         await createProduct({
//           image: fileList[0].originFileObj,
//           title: values.title,
//           content: values.content,
//           price: values.price,
//           is_preorder: values.is_preorder,
//         });
//         message.success("Produk berhasil ditambahkan");
//       }
//       onSuccess();
//       onClose();
//     } catch (error) {
//       message.error("Gagal menyimpan produk");
//     }
//   };

//   return (
//     <Modal
//       title={productId ? "Edit Produk" : "Tambah Produk"}
//       visible={visible}
//       onOk={handleOk}
//       onCancel={onClose}
//       okText="Simpan"
//       cancelText="Batal"
//       destroyOnClose
//     >
//       <Form form={form} layout="vertical">
//         <Form.Item
//           label="Judul"
//           name="title"
//           rules={[{ required: true, message: "Mohon masukkan judul produk" }]}
//         >
//           <Input placeholder="Masukkan judul produk" />
//         </Form.Item>
//         <Form.Item
//           label="Deskripsi"
//           name="content"
//           rules={[{ required: true, message: "Mohon masukkan deskripsi produk" }]}
//         >
//           <Input.TextArea placeholder="Masukkan deskripsi produk" />
//         </Form.Item>
//         <Form.Item
//           label="Harga"
//           name="price"
//           rules={[{ required: true, message: "Mohon masukkan harga produk" }]}
//         >
//           <InputNumber
//             style={{ width: "100%" }}
//             min={0}
//             formatter={(value: number | string | undefined) => `Rp${Number(value)?.toLocaleString("id-ID")}`}
//             parser={(value: string | undefined) => (value ? value.replace(/Rp\s?|(,*)/g, "") : "")}
//           />
//         </Form.Item>
//         <Form.Item
//           label="Preorder"
//           name="is_preorder"
//           valuePropName="checked"
//         >
//           <Checkbox>Preorder</Checkbox>
//         </Form.Item>
//         <Form.Item
//           label="Gambar Produk"
//           required
//         >
//           <UploadFoto fileList={fileList} onChange={handleFileChange} />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default ProductModal;
