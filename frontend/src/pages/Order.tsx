import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface OrderInteface {
    _id:string,
    date:string,
    productIds: string[],
    total: number;
}

interface Product {
    _id:string,
    name:string;
}


const Order = () => {
  const [orders, setOrders] = useState<OrderInteface[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(()=> {
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3008/orders');
            setOrders(response.data);
        }
        catch(err) {
            console.log('Erro ao mostrar pedidos',err);
        }
        finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios .get('http://localhost:3008/products');
            setProducts(response.data);
        }
        catch(err) {
            console.log('Erro ao carregar produtos',err);
        }
    };

    fetchOrders();
    fetchProducts();
  },[])

  const handleEdit = (id: string) => {
    navigate(`/edit-order/${id}`);
  }

  const handleCreate = () => {
    navigate('/orders/new');
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este pedido?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3008/orders/deletar/${id}`);
      setOrders(orders.filter(order => order._id !== id));
      alert("Pedido excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir pedido", error);
      alert("Erro ao excluir pedido.");
    }
  }


  const getProductNames = (productIds:string[]) => {
    return productIds.map((id) => products.find((product) => product._id == id)?.name).filter((name)=> name).join(', ');
  }

  return (
    <div className='container mx-auto p-4'>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-3xl">Pedidos</h2>
        <button
          onClick={handleCreate}
          className='bg-green-500 text-white px-3 py-2 ml-3 rounded-xl hover:bg-green-600 transition duration-200'
        >
          Criar Pedido
        </button>
      </div>
      <hr className='mb-6'></hr>
      {loading ? (
        <p className="text-center text-lg">Carregando pedidos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-6 rounded-lg shadow-lg bg-white flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-sm font-semibold mb-2 text-gray-800 text-center">Pedido #{order._id}</h3>
              <p className="text-gray-600 mb-2"><strong>Data:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-2"><strong>Produtos:</strong> {getProductNames(order.productIds)}</p>
              <p className="text-lg font-semibold text-gray-900">Total: R$ {order.total.toFixed(2)}</p>
              <div className="mt-4 flex justify-between space-x-2">
                <button
                  onClick={() => handleEdit(order._id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(order._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Order