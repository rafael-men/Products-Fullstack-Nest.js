import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryIds: string[];
}

interface Category {
    _id: string;
    name: string;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Erro ao carregar produtos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/category');
                setCategories(response.data);
            } catch (error) {
                console.error("Erro ao carregar categorias", error);
            }
        };

        fetchCategories();
    }, []);




    const handleEdit = (id: string) => {
        navigate(`/edit-product/${id}`);
    };


    const handleCreateProduct = () => {
        navigate('/products/new');
    };


    const getCategoryNames = (categoryIds: string[]) => {
        return categoryIds
            .map((id) => categories.find((category) => category._id === id)?.name)
            .filter((name) => name)
            .join(', ');
    };

    

    return (
        <div className="container mx-auto p-4">
             <div className="flex items-center justify-between mb-4">
                 <h1 className="text-3xl font-semibold">Produtos</h1>
                    <button
                    onClick={handleCreateProduct}
                    className="bg-green-500 text-white px-3 py-2 ml-3 rounded-xl hover:bg-green-600 transition duration-200"
                >
                        Criar Novo Produto
                    </button>
             </div>
             <hr className='mb-6'></hr>
            {loading ? (
                <p className="text-center text-lg">Carregando produtos...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="border p-6 rounded-lg shadow-lg bg-white flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            
                            <p className="text-sm text-gray-500 mb-2">
                                <strong>Categorias:</strong> {getCategoryNames(product.categoryIds)}
                            </p>
                            
                            <p className="text-lg font-semibold text-gray-900">R$ {product.price}</p>
                            <div className="mt-4 flex justify-between space-x-2">
                                <button
                                    onClick={() => handleEdit(product._id)}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                                >
                                    Editar
                                </button>
                                <button
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
    );
};

export default Products;
