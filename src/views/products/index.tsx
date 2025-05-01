import { FC, useState, useEffect } from "react";
import { Spin, Button, Image, Table, Tooltip, Space, Typography, Alert, Empty } from "antd";
import { Link } from "react-router"; // Pastikan pakai 'react-router-dom' jika ini bukan versi v3
import toast from "react-hot-toast";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import DeleteModal from "../../component/confirmdelete";
import { fetchProducts, deleteProduct as apiDeleteProduct, Product } from "../../api/products";
import { useProductStore } from "../../store/product";

const ProductIndex: FC = () => {
  const { products, setProducts, shouldRefresh, clearRefresh } = useProductStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [pagination, setPagination] = useState<{ current: number; pageSize: number; total: number }>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isPaginationLoading, setIsPaginationLoading] = useState<boolean>(false);

  const fetchDataProducts = async (
    page = pagination.current,
    pageSize = pagination.pageSize,
    showLoading = true,
    paginationLoading = false
  ) => {
    if (showLoading) {
      setLoading(true);
      setProducts([]); // <-- Tambahin ini supaya clear dulu
    }
    if (paginationLoading) {
      setIsPaginationLoading(true);
    }
    setHasError(false);
    try {
      const data = await fetchProducts(page, pageSize);
      setProducts(data.data); // <-- simpan ke global store
      setPagination({
        current: data.current_page,
        pageSize: data.per_page,
        total: data.total,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasError(true);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
      if (paginationLoading) {
        setIsPaginationLoading(false);
      }
    }
  };

  useEffect(() => {
    if (products.length === 0 || shouldRefresh) {
      fetchDataProducts();
      clearRefresh(); // Habis fetch, clear lagi
    } else {
      setLoading(false);
    }
  }, [shouldRefresh]);
  

  const deleteProduct = async (id: number) => {
    try {
      await apiDeleteProduct(id);
      fetchDataProducts();
      toast.success("Data Berhasil Dihapus!", { duration: 4000 });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Gagal menghapus produk!");
    }
  };

  const contentStyle: React.CSSProperties = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
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
      render: (image: string) => <Image src={image} alt="Product" className="rounded-md object-cover" width={80} />,
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
      width: 150,
      render: (content: string) => (
        <div style={{ maxWidth: "200px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
          {content}
        </div>
      ),
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
          <Link to={`/dashboard/products/edit/${product.id}`} style={{ display: "inline-block" }}>
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
          <Link to="/dashboard/products/create">
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
        <Alert message="Tidak dapat mengambil data" description="Koneksi server bermasalah" type="warning" showIcon />
      ) : (
        // Jika data kosong atau ada
        <Table<Product>
          columns={columns}
          dataSource={products}
          rowKey="id"
          bordered
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            // showSizeChanger: true,
            // pageSizeOptions: ['5', '10', '20', '50'],
            itemRender: (page, type, originalElement) => {
              if (
                isPaginationLoading &&
                page === pagination.current &&
                (type === "page" || type === "jump-prev" || type === "jump-next")
              ) {
                return <Button size="small" loading style={{ minWidth: 32, height: 32, padding: 0 }}></Button>;
              }
              return originalElement;
            },
            disabled: isPaginationLoading,
          }}
          onChange={(pagination) => {
            fetchDataProducts(pagination.current || 1, pagination.pageSize || 10, false, true);
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
