import { FC, useState, useEffect, useCallback } from "react";
import { Spin, Button, Image, Table, Tooltip, Space, Typography, Alert, Empty } from "antd";
import { Link } from "react-router"; // pastikan menggunakan 'react-router-dom'
import Api from "../../API_BASE_URL";
import DeleteModal from "../../component/confirmdelete";
import toast from "react-hot-toast";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

// Interface Product
interface Product {
  id: number;
  image: string;
  title: string;
  content: string;
  price: number;
}

const ProductIndex: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Mengambil data produk dari API
  const fetchDataProducts = useCallback(async (page: number = 1) => {
    const isInitialLoad = page === 1;
    isInitialLoad ? setLoading(true) : setPaginationLoading(true);
    setHasError(false);
    try {
      const response = await Api.get(`/api/posts?page=${page}`);
      setProducts(response.data.data.data);
      setPagination({
        current: page,
        pageSize: 10,
        total: response.data.data.total, // Total data untuk pagination
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasError(true);
    } finally {
      isInitialLoad ? setLoading(false) : setPaginationLoading(false);
    }
  }, []);

  // Memanggil fetchDataProducts ketika halaman pertama kali dimuat atau ketika halaman berubah
  useEffect(() => {
    fetchDataProducts(pagination.current);
  }, [pagination.current, fetchDataProducts]);

  // Fungsi untuk menghapus produk
  const deleteProduct = async (id: number) => {
    try {
      await Api.delete(`/api/posts/${id}`);
      fetchDataProducts(pagination.current); // Reload data untuk halaman yang sama
      toast.success("Data Berhasil Dihapus!", { duration: 4000 });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Gagal menghapus produk!");
    }
  };

  const contentStyle: React.CSSProperties = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };
  
  const content = <div style={contentStyle} />;
  const WhiteText = <p className="text-black">Edit Produk</p>;

  const columns: ColumnsType<Product> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image: string) => (
        <Image src={image} alt="Product" className="rounded-md object-cover" width={80} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "content",
      key: "content",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price: number) => `Rp${price?.toLocaleString("id-ID")}`,
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_: any, product: Product) => (
        <Space>
        <Link to={`/products/edit/${product.id}`} style={{ display: "inline-block" }}>
          <Tooltip placement="top" title={WhiteText} color="#f6f6f6">
          <Button
              type="default"
              icon={<EditOutlined style={{ color: "#1890ff" }} />} // warna biru Ant Design
              style={{ borderColor: "#1890ff", color: "#1890ff" }}
            />
          </Tooltip>
        </Link>
          <Tooltip title="Hapus Produk">
            <DeleteModal title="Hapus Produk" onDelete={() => deleteProduct(product.id)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto mt-5 mb-5 px-4">
      {/* Tombol tambah hanya ditampilkan kalau tidak loading */}
      {!loading && (
        <div className="flex justify-between items-center mb-4">
          <Typography.Title level={2}>Product List</Typography.Title>
          <Link to="/products/create">
            <Button icon={<PlusOutlined />} size="large">
              Add New Product
            </Button>
          </Link>
        </div>
      )}

      {/* Loading spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-[32rem]">
        <Spin tip="Loading" size="large">
        {content}
        </Spin>
         </div>
      ) : hasError ? (
        // Jika error jaringan
        <Alert
          message="Tidak dapat mengambil data"
          description="Koneksi server bermasalah"
          type="warning"
          showIcon
        />
      ) : products.length === 0 ? (
        <Empty description="Tidak ada produk untuk ditampilkan" />
      ) : (
        <Table<Product>
          columns={columns}
          dataSource={products}
          rowKey="id"
          bordered
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            onChange: (page) => setPagination((prev) => ({ ...prev, current: page })),
            itemRender: (_, type, originalElement) => {
              if (type === 'page' && paginationLoading) {
                return <Spin size="small" />;
              }
              return originalElement;
            }
          }}
          locale={{
            emptyText: <Empty description="Data kosong, cobalah tambah data" />,
          }}
        />
      )}
    </div>
  );
};

export default ProductIndex;
