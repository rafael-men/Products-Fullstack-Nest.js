import { Link } from "react-router-dom";
import product_image from '../assets/product.png';
import category_image from '../assets/category.png';
import order_image from '../assets/order.png';

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <hr />
      <h2 className="text-xl text-center font-bold mb-4 mt-4">Menu</h2>
      <hr />
      <nav className="flex flex-col space-y-2 mt-4">
        <Link to="/products" className="flex items-center hover:bg-gray-700 p-2 rounded">
          <img src={product_image} alt="Produto" width="24" height="24" className="mr-2" />
          Produtos
        </Link>
        <Link to="/categories" className="flex items-center hover:bg-gray-700 p-2 rounded">
          <img src={category_image} alt="Categoria" width="24" height="24" className="mr-2" />
          Categorias
        </Link>
        <Link to="/orders" className="flex items-center hover:bg-gray-700 p-2 rounded">
          <img src={order_image} alt="Pedidos" width="24" height="24" className="mr-2" />
          Pedidos
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
