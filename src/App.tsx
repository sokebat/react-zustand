import "./App.css";
import Cart from "./components/cart";
import ProductList from "./components/product-list";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md py-4 mb-8">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-800">Zustand Store</h1>
          <Cart />
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ProductList />
      </main>
    </div>
  );
}

export default App;
