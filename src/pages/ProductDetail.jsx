import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

const fetchProductById = async (id) => {
  // Simulate fetching data from an API
  const products = [
    { id: 1, name: "Laptop 1", price: "$999", description: "A high-performance laptop.", image: "/placeholder.svg" },
    { id: 2, name: "Laptop 2", price: "$1299", description: "A powerful laptop with great features.", image: "/placeholder.svg" },
    { id: 3, name: "Smartphone 1", price: "$699", description: "A smartphone with excellent camera.", image: "/placeholder.svg" },
    { id: 4, name: "Smartphone 2", price: "$799", description: "A smartphone with long battery life.", image: "/placeholder.svg" },
    { id: 5, name: "Headphones", price: "$199", description: "Noise-cancelling headphones.", image: "/placeholder.svg" },
    { id: 6, name: "Charger", price: "$49", description: "Fast charging charger.", image: "/placeholder.svg" },
  ];
  return products.find((product) => product.id === parseInt(id));
};

const fetchRelatedProducts = async (category) => {
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

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["relatedProducts", product?.category],
    queryFn: () => fetchRelatedProducts(product?.category),
    enabled: !!product,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.name} className="mx-auto object-cover w-full h-[400px] md:w-1/2" />
        <div className="flex flex-col space-y-4 md:w-1/2">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl text-primary">{product.price}</p>
          <p>{product.description}</p>
          <Button>Add to Cart</Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts?.map((relatedProduct) => (
            <Card key={relatedProduct.id}>
              <img src={relatedProduct.image} alt={relatedProduct.name} className="mx-auto object-cover w-full h-[200px]" />
              <CardHeader>
                <CardTitle>{relatedProduct.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{relatedProduct.price}</p>
              </CardContent>
              <CardFooter>
                <Button as={Link} to={`/product/${relatedProduct.id}`}>
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

export default ProductDetail;