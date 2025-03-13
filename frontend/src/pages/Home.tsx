import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Bem-vindo à plataforma de gerenciamento feita com Nest.js
    </h1>
    <p className="text-xl text-gray-600 mb-6">
        Explore nossos produtos, categorias e pedidos.
    </p>
    <div className="flex space-x-4">
        <button
            onClick={() => navigate('/products')}
            className="bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 transition duration-200"
        >
            Ver Produtos
        </button>
        <button
            onClick={() => navigate('/categories')}
            className="bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 transition duration-200"
        >
            Ver Categorias
        </button>
        <button
            onClick={() => navigate('/orders')}
            className="bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 transition duration-200"
        >
            Ver Pedidos
        </button>
        <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 transition duration-200"
        >
            Dashboard
        </button>
    </div>
</div>

    );
};

export default Home;
