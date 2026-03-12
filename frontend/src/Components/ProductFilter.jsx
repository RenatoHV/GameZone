import { useEffect, useState } from "react";
import ProductHeader from './ProductHeader';
import BrandFilter from '../Components/BrandFilter';
import { fetchProducts } from '../services/firebase';

export default function ProductFilter() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState('relevance');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const allowedBrands = ['Nintendo', 'PlayStation', 'Xbox', 'PC'];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        console.log('Produtos carregados:', data);
        
        const normalizedData = data.map(product => {
          let brand = product.brand;
          if (product.console?.toLowerCase().includes('playstation')) brand = 'PlayStation';
          if (product.console?.toLowerCase().includes('nintendo')) brand = 'Nintendo';
          if (product.console?.toLowerCase().includes('xbox')) brand = 'Xbox';
          if (product.console?.toLowerCase().includes('pc')) brand = 'PC';
          
          return { ...product, brand };
        });

        const filteredData = normalizedData.filter(product => 
          allowedBrands.includes(product.brand)
        );
        
        console.log('Produtos filtrados:', filteredData);
        setProducts(filteredData);
        setFilteredProducts(filteredData);
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar jogos:', error);
        setError('Erro ao carregar jogos. Verifique o Firebase.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    switch (sortOption) {
      case 'lowestPrice':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'highestPrice':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [selectedBrands, sortOption, products]);

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  if (loading) {
    return (
      <div className="container-fluid px-[100px] py-8 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-2 text-gray-600">Carregando jogos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid px-[100px] py-8 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-[100px] py-8">
      <ProductHeader
        total={filteredProducts.length}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      <div className="flex gap-8 mt-8">
        <div className="w-1/4">
          <BrandFilter
            brands={allowedBrands}
            selectedBrands={selectedBrands}
            onChange={handleBrandChange}
          />
        </div>

        <div className="w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-[4px] shadow-custom overflow-hidden">
                <div className="relative h-[200px] bg-gray-50 flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      console.log('Erro ao carregar imagem:', product.image);
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/300x200/1a1a1a/white?text=" + 
                                    encodeURIComponent(product.name);
                    }}
                  />
                  {product.oldPrice && product.oldPrice !== product.price && (
                    <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                      SALE OFF
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <span className="font-bold text-[12px] leading-[24px] text-[#8F8F8F]">
                    {product.category}
                  </span>
                  <h2 className="text-grayCustom font-medium mb-2 line-clamp-2">
                    {product.name}
                  </h2>

                  <div className="flex items-center gap-2">
                    {product.oldPrice && product.oldPrice !== product.price && (
                      <p className="text-[#8F8F8F] line-through text-sm">
                        R$ {product.oldPrice.toFixed(2)}
                      </p>
                    )}
                    <p className="text-[#2074c9] font-bold text-lg">
                      R$ {product.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-transparent border border-[#2074c9] text-[#2074c9] py-2 rounded hover:bg-[#2074c9] hover:text-white transition">
                      Carrinho
                    </button>
                    <button className="flex-1 bg-[#2074c9] text-white py-2 rounded hover:bg-[#1a5fa3] transition">
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#8F8F8F] text-lg">
                Nenhum jogo encontrado.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}