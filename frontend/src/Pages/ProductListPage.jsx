import React, { useState, useEffect } from "react";
import ProductFilter from "../Components/ProductFilter"; 
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('https://6792c350cf994cc6804b0051.mockapi.io/produtos/Produtos');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="bg-[#F9F8FE] min-h-screen d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="bg-[#F9F8FE] min-vh-100 py-4">
        <div className="container">
          <ProductFilter />
        </div>
      </div>
      <Footer />
    </>
  );
}