
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    console.log("Index page mounted successfully");
  }, []);

  console.log("Index page rendering");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome to Your Blank App</h1>
        <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
        <div className="mt-4 text-sm text-gray-500">
          If you can see this, the app is working correctly!
        </div>
      </div>
    </div>
  );
};

export default Index;
