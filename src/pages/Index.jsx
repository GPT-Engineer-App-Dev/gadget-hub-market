import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link, useOutletContext } from "react-router-dom";

const fetchFeaturedProducts = async () => {
  // Simulate fetching data from an API
  return [
    { id: 1, name: "Laptop", price: "$999", image: "/placeholder.svg" },
    { id: 2, name: "Smartphone", price: "$699", image: "/placeholder.svg" },
    { id: 3, name: "Headphones", price: "$199", image: "/placeholder.svg" },
  ];
};

const Index = () => {
  const { filteredProducts } = useOutletContext();
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: fetchFeaturedProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  const displayProducts = filteredProducts || products;

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold">Welcome to Our Electronics Store</h1>
        <p className="mt-4 text-lg">Find the best electronics at unbeatable prices.</p>
        <Button className="mt-6" as={Link} to="/categories">
          Shop Now
        </Button>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
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

      <section>
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card>
            <img src="/placeholder.svg" alt="Laptops" className="mx-auto object-cover w-full h-[200px]" />
            <CardHeader>
              <CardTitle>Laptops</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button as={Link} to="/categories/laptops">
                Shop Laptops
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <img src="/placeholder.svg" alt="Smartphones" className="mx-auto object-cover w-full h-[200px]" />
            <CardHeader>
              <CardTitle>Smartphones</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button as={Link} to="/categories/smartphones">
                Shop Smartphones
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <img src="/placeholder.svg" alt="Accessories" className="mx-auto object-cover w-full h-[200px]" />
            <CardHeader>
              <CardTitle>Accessories</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button as={Link} to="/categories/accessories">
                Shop Accessories
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;