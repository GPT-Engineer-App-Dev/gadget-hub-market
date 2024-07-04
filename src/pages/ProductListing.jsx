import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

const fetchProductsByCategory = async (category) => {
  // Simulate fetching data from an API
  const products = {
    laptops: [
      { id: 1, name: "Laptop 1", price: "$999", image: "/placeholder.svg" },
      { id: 2, name: "Laptop 2", price: "$1299", image: "/placeholder.svg" },
    ],
    smartphones: [
      { id: 3, name: "Smartphone 1", price: "$699", image: "/placeholder.svg" },
      { id: 4, name: "Smartphone 2", price: "$799", image: "/placeholder.svg" },
    ],
    accessories: [
      { id: 5, name: "Headphones", price: "$199", image: "/placeholder.svg" },
      { id: 6, name: "Charger", price: "$49", image: "/placeholder.svg" },
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold capitalize">{category}</h1>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <img src={product.image} alt={product.name} className="mx-auto object-cover w-full h-[200px]" />
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{product.price}</p>
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