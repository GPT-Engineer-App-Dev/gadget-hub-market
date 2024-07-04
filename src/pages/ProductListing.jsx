import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const fetchProductsByCategory = async (category) => {
  // Simulate fetching data from an API
  const products = {
    laptops: [
      { id: 1, name: "Laptop 1", price: 999, brand: "Brand A", image: "/placeholder.svg" },
      { id: 2, name: "Laptop 2", price: 1299, brand: "Brand B", image: "/placeholder.svg" },
    ],
    smartphones: [
      { id: 3, name: "Smartphone 1", price: 699, brand: "Brand A", image: "/placeholder.svg" },
      { id: 4, name: "Smartphone 2", price: 799, brand: "Brand B", image: "/placeholder.svg" },
    ],
    accessories: [
      { id: 5, name: "Headphones", price: 199, brand: "Brand C", image: "/placeholder.svg" },
      { id: 6, name: "Charger", price: 49, brand: "Brand D", image: "/placeholder.svg" },
    ],
  };
  return products[category] || [];
};

const ProductListing = () => {
  const { category } = useParams();
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProductsByCategory(category),
  });

  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1500]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  const filteredProducts = products.filter((product) => {
    return (
      (selectedBrand === "" || product.brand === selectedBrand) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    );
  });

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold capitalize">{category}</h1>
      </section>

      <section className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4 md:w-1/4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Filter by Brand</h2>
            <Select onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Brands</SelectItem>
                <SelectItem value="Brand A">Brand A</SelectItem>
                <SelectItem value="Brand B">Brand B</SelectItem>
                <SelectItem value="Brand C">Brand C</SelectItem>
                <SelectItem value="Brand D">Brand D</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Filter by Price</h2>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1500}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:w-3/4">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <img src={product.image} alt={product.name} className="mx-auto object-cover w-full h-[200px]" />
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>${product.price}</p>
              </CardContent>
              <CardFooter>
                <Button as={Link} to={`/product/${product.id}`}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductListing;