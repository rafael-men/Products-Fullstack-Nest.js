import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface Order {
  date: string;
  productIds: string[];
  total: number;
}

const EditOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order>({ date: '', productIds: [], total: 0 });
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3008/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Erro ao carregar pedido', error);
        alert('Erro ao carregar pedido.');
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3008/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao carregar produtos', error);
      }
    };

    fetchOrder();
    fetchProducts();
  }, [id]);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setOrder({ ...order, productIds: selectedOptions });
    const newTotal = selectedOptions.reduce((sum, productId) => {
      const product = products.find((p) => p._id === productId);
      return sum + (product ? product.price : 0);
    }, 0);
    setOrder((prev) => ({ ...prev, total: newTotal }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3008/orders/atualizar/${id}`, order);
      alert('Pedido atualizado com sucesso!');
      navigate('/orders');
    } catch (error) {
      console.error('Erro ao atualizar pedido', error);
      alert('Erro ao atualizar pedido.');
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-3xl font-semibold mb-4'>Editar Pedido</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <label className='block text-lg font-semibold'>Data do Pedido:</label>
        <input
          type='date'
          value={order.date}
          onChange={(e) => setOrder({ ...order, date: e.target.value })}
          className='w-full p-2 border rounded'
        />
        <label className='block text-lg font-semibold'>Selecione um ou mais produtos:</label>
        <select multiple value={order.productIds} onChange={handleProductChange} className='w-full p-2 border rounded'>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product._id} - {product.name} - R$ {product.price.toFixed(2)}
            </option>
          ))}
        </select>
        <p className='text-lg font-semibold'>Total: R$ {order.total.toFixed(2)}</p>
        <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition duration-200'>
          Atualizar Pedido
        </button>
      </form>
    </div>
  );
};

export default EditOrder;
