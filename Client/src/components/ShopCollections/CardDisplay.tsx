import { useEffect, useState } from "react";
import ShopCard from "./ShopCard";
import { Spinner, Text } from "@radix-ui/themes";

interface Product {
  _id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  rating: number;
}

const CardDisplay: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/plants");
      if (!response.ok) {
        throw new Error("Failed to fetch products data");
      }
      const data = await response.json();
      setProducts(data.plants);
    } catch (error) {
      console.error("Error fetching products data:");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.length > 0 &&
        products.map(
          (product) =>
            product.stock > 0 && (
              <ShopCard key={product._id} product={product} />
            )
        )}
      {products.length == 0 && (
        <Text className="flex justify-center items-center gap-2">
          <Spinner></Spinner> No Data available
        </Text>
      )}
    </div>
  );
};

export default CardDisplay;
