
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Truck, MapPin } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number;
    image: string;
  };
}

const CheckoutModal = ({ isOpen, onClose, product }: CheckoutModalProps) => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { toast } = useToast();

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.fullName && address.phone && address.addressLine1 && address.city && address.state && address.pincode) {
      setStep(2);
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  const handleOrderComplete = () => {
    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been placed and will be delivered soon.",
    });
    onClose();
    setStep(1);
    setAddress({
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step === 1 ? (
              <>
                <MapPin className="w-5 h-5" />
                Delivery Address
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                Payment Method
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {step === 1 ? "Enter your delivery address" : "Choose your payment method"}
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex gap-3">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h4 className="font-medium text-sm">{product.name}</h4>
              <p className="text-lg font-bold">₹{product.price.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {step === 1 ? (
          <form onSubmit={handleAddressSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="addressLine1">Address Line 1 *</Label>
              <Input
                id="addressLine1"
                value={address.addressLine1}
                onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                placeholder="House No, Building, Street"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input
                id="addressLine2"
                value={address.addressLine2}
                onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                placeholder="Area, Landmark (Optional)"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  placeholder="City"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  placeholder="State"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  placeholder="Pincode"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                Continue to Payment
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Cash on Delivery
                  </div>
                  <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Credit/Debit Card
                  </div>
                  <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    UPI Payment
                  </div>
                  <p className="text-sm text-muted-foreground">Pay using UPI apps</p>
                </Label>
              </div>
            </RadioGroup>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span>Subtotal:</span>
                <span>₹{product.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Delivery:</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>₹{product.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleOrderComplete} className="flex-1">
                Place Order
              </Button>
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
