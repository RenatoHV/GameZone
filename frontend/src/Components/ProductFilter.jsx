import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductHeader from './ProductHeader';
import ProductCard from '../Components/ProductCard';
import BrandFilter from '../Components/BrandFilter';

export default function ProductFilter() {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState('relevance');

  const allowedBrands = ['Nintendo', 'PlayStation', 'Xbox', 'PC'];

  const jogosData = [
    // NINTENDO
   {
  id: 1,
  name: "The Legend of Zelda: Breath of the Wild",
  platform: "Nintendo Switch",
  price: 299.90,
  oldPrice: 349.90,
  image: "/produtos/zeldaBOTW.png", 
  brand: "Nintendo",
  category: "Nintendo"
 },
  {
      id: 2,
      name: "Super Smash Bros Ultimate",
      platform: "Nintendo Switch",
      price: 299.90,
      oldPrice: 349.90,
      image: "/produtos/smash.png",
      brand: "Nintendo"
    },
    {
      id: 3,
      name: "Super Mario Bros Wonder",
      platform: "Nintendo Switch",
      price: 299.90,
      oldPrice: 349.90,
      image: "/produtos/SuperMarioBrosWonder.png",
      brand: "Nintendo"
    },
    {
      id: 4,
      name: "Animal Crossing: New Horizons",
      platform: "Nintendo Switch",
      price: 249.90,
      oldPrice: 299.90,
      image: "/produtos/animal.png",
      brand: "Nintendo"
    },
    {
      id: 5,
      name: "Super Mario Odyssey",
      platform: "Nintendo Switch",
      price: 299.90,
      oldPrice: 349.90,
      image: "/produtos/SuperMarioOdyssey.png",
      brand: "Nintendo"
    },
    {
      id: 6,
      name: "Pokémon Sword",
      platform: "Nintendo Switch",
      price: 299.90,
      oldPrice: 349.90,
      image: "/produtos/pokemon.png",
      brand: "Nintendo"
    },
    // PLAYSTATION
    {
      id: 7,
      name: "The Last of Us Part II Remastered",
      platform: "PlayStation 5",
      price: 199.90,
      oldPrice: 249.90,
      image: "/produtos/thelast.webp",
      brand: "PlayStation"
    },
    {
      id: 8,
      name: "Marvel's Spider-Man 2",
      platform: "PlayStation 5",
      price: 249.90,
      oldPrice: 299.90,
      image: "/produtos/spiderman2.webp",
      brand: "PlayStation"
    },
    {
      id: 9,
      name: "God of War Ragnarök",
      platform: "PlayStation 5",
      price: 249.90,
      oldPrice: 299.90,
      image: "/produtos/godofwar.webp",
      brand: "PlayStation"
    },
    {
      id: 10,
      name: "Assassin's Creed Shadows",
      platform: "PlayStation 5",
      price: 299.90,
      oldPrice: 349.90,
      image: "/produtos/acshadow.webp",
      brand: "PlayStation"
    },
    {
      id: 11,
      name: "Horizon Forbidden West",
      platform: "PlayStation 5",
      price: 249.90,
      oldPrice: 299.90,
      image: "/produtos/horizon.jpg",
      brand: "PlayStation"
    },
    {
      id: 12,
      name: "Black Myth: Wukong",
      platform: "PlayStation 5",
      price: 299.90,
      image: "/produtos/wukong.jpg",
      brand: "PlayStation"
    },
    // XBOX
    {
      id: 13,
      name: "Call of Duty: Black Ops 6",
      platform: "Xbox Series X/S",
      price: 299.90,
      oldPrice: 349.90,
      image: "/produtos/cod.jpg",
      brand: "Xbox"
    },
    {
      id: 14,
      name: "Mortal Kombat 11",
      platform: "Xbox Series X/S",
      price: 249.90,
      oldPrice: 299.90,
      image: "/produtos/mk11.jpg",
      brand: "Xbox"
    },
    {
      id: 15,
      name: "Cyberpunk 2077: Phantom Liberty",
      platform: "Xbox Series X",
      price: 349.90,
      oldPrice: 399.90,
      image: "/produtos/cyberpunk.jpg",
      brand: "Xbox"
    },
    {
      id: 16,
      name: "Yakuza: Like a Dragon",
      platform: "Xbox Series X/One",
      price: 149.90,
      oldPrice: 199.90,
      image: "/produtos/yakuza.jpg",
      brand: "Xbox"
    },
    {
      id: 17,
      name: "Resident Evil Village Gold Edition",
      platform: "Xbox Series X/One",
      price: 199.90,
      oldPrice: 249.90,
      image: "/produtos/resident.jpg",
      brand: "Xbox"
    },
    // PC
    {
      id: 18,
      name: "Death Stranding 2: On The Beach",
      platform: "PC (Steam)",
      price: 349.90,
      image: "/produtos/ds2.png",
      brand: "PC"
    },
    {
      id: 19,
      name: "Pragmata - Deluxe Edition",
      platform: "PC (Steam)",
      price: 319.90,
      oldPrice: 349.90,
      image: "/produtos/prag.jpg",
      brand: "PC"
    },
    {
      id: 20,
      name: "Resident Evil Requiem",
      platform: "PC (Steam)",
      price: 349.90,
      image: "/produtos/resident9.jpg",
      brand: "PC"
    },
    {
      id: 21,
      name: "Life is Strange: Reunion",
      platform: "PC (Steam)",
      price: 299.90,
      image: "/produtos/life.jpg",
      brand: "PC"
    },
    {
      id: 22,
      name: "Crimson Desert",
      platform: "PC (Steam)",
      price: 249.90,
      image: "/produtos/crim.webp",
      brand: "PC"
    },
    {
      id: 23,
      name: "Monster Hunter Stories 3",
      platform: "PC (Steam)",
      price: 249.90,
      oldPrice: 299.90,
      image: "/produtos/monster.jpg",
      brand: "PC"
    }
  ];

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const filteredProducts = selectedBrands.length
    ? jogosData.filter(p => selectedBrands.includes(p.brand))
    : jogosData;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'lowestPrice':
        return a.price - b.price;
      case 'highestPrice':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="container mt-4">
      <ProductHeader
        total={filteredProducts.length}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <div className="row">
        <div className="col-md-3">
          <BrandFilter
            brands={allowedBrands}
            selectedBrands={selectedBrands}
            onChange={handleBrandChange}
          />
        </div>
        <div className="col-md-9">
          <div className="row">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            {sortedProducts.length === 0 && (
              <div className="col-12">
                <p className="text-center text-muted">Nenhum produto encontrado.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}