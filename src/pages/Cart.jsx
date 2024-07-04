import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchCartItems = async () => {
  // Simulate fetching data from an API
  return [
    { id: 1, name: "Laptop", price: "$999", quantity: 1, image: "/placeholder.svg" },
    { id: 2, name: "Smartphone", price: "$699", quantity: 2, image: "/placeholder.svg" },
  ];
};

const Cart = () => {
  const { data: cartItems, isLoading, error } = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItems,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart items</div>;

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold">Shopping Cart</h1>
      </section>

      <section>
        <div className="grid grid-cols-1 gap-6">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <div className="flex gap-4">
                <img src={item.image} alt={item.name} className="mx-auto object-cover w-[100px] h-[100px]" />
                <div className="flex flex-col justify-between flex-grow">
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="destructive">Remove</Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-right">
        <h2 className="text-2xl font-semibold">Total: ${totalPrice}</h2>
        <Button className="mt-4" as={Link} to="/checkout">
          Proceed to Checkout
        </Button>
      </section>
    </div>
  );
};

export default Cart;