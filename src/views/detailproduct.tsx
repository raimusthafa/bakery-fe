import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { ProductDetail } from "../api/products";
import { fetchPublicPostDetail } from "../api/products";
import {
  Card,
  Image,
  Typography,
  Tag,
  Button,
  Skeleton,
  Row,
  Col,
  Space,
  message,
} from "antd";
import {
  ShoppingCartOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";

const { Title, Paragraph, Text } = Typography;

const ProductDetail = () => {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
const [showToggle, setShowToggle] = useState(false);
const paragraphRef = React.useRef<HTMLDivElement>(null);

useEffect(() => {
  if (paragraphRef.current) {
    const lineHeight = parseFloat(getComputedStyle(paragraphRef.current).lineHeight || "24");
    const maxHeight = lineHeight * 4; // 4 lines
    setShowToggle(paragraphRef.current.scrollHeight > maxHeight);
  }
}, [product?.content]);



  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError("ID produk tidak ditemukan.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetchPublicPostDetail(id);
        setProduct(response);
        setError(null);
      } catch (error) {
        console.error("Gagal memuat detail produk:", error);
        setError("Gagal memuat detail produk.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen bg-[#FDF6ED] py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden animate-pulse">
        <div className="flex flex-col md:flex-row">
          {/* Gambar Produk */}
          <div className="md:w-1/2 bg-gray-300 h-96 md:rounded-l-2xl"></div>
  
          {/* Detail Produk */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-24 bg-gray-300 rounded mb-6"></div>
              {/* <div className="h-6 bg-yellow-200 rounded w-[15%]"></div> */}
            </div>
            <div className="mt-4">
              <div className="h-10 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-lg text-red-600">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10 text-lg text-gray-600">
        Produk tidak ditemukan.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FDF6ED] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <Card bordered={false} className="rounded-2xl shadow-lg">
          <Row gutter={[32, 16]}>
            <Col xs={24} md={12}>
              <Image
                src={product.image || "/default-image.jpg"}
                alt={product.title}
                width="100%"
                height={400}
                style={{ objectFit: "cover", borderRadius: 16 }}
                placeholder
              />
            </Col>

            <Col xs={24} md={12}>
              <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <Title level={2} style={{ color: "#6F4E37" }}>
                  {product.title}
                </Title>

                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Title level={4} style={{ margin: 0, color: "#6F4E37" }}>
                      Rp {parseInt(product.price).toLocaleString("id-ID")}
                    </Title>
                    {product.is_preorder && (
                      <Tag color="gold" style={{ margin: 0, }}>Preorder</Tag>
                    )}
                  </div>
                </Space>

                <div
                ref={paragraphRef}
                style={{
                  color: "#8B7E74",
                  whiteSpace: "pre-line",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: expanded ? "none" : 4,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {product.content}
              </div>
              {showToggle && (
                <div className="-mt-4">
                <Button type="link" onClick={() => setExpanded(!expanded)} style={{ padding: 0 }}>
                  {expanded ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
                </Button>
                </div>
                )}


                {product.category_name && (
                  <Text type="secondary">Kategori: {product.category_name}</Text>
                )}

<div className="pt-6">
  <div className="flex flex-col md:flex-row gap-4">
    <Button
      type="primary"
      icon={<ShoppingCartOutlined />}
      className="w-full md:w-auto md:flex-1"
      style={{ backgroundColor: "#D9822B", borderColor: "#D9822B" }}
      onClick={() => toast.success("Ditambahkan ke keranjang")}
    >
      Tambah ke Keranjang
    </Button>
    <Link to="/products" className="w-full md:w-auto md:flex-1">
      <Button
        block
        type="default"
        icon={<ArrowLeftOutlined />}
        style={{ borderColor: "#D9822B", color: "#D9822B" }}
      >
        Kembali ke Produk
      </Button>
    </Link>
  </div>
</div>


              </Space>
            </Col>
          </Row>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetail;
