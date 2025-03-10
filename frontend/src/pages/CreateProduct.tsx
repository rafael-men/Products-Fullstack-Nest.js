import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]); 
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/category');
                const categoriesWithId = response.data.map((category: { _id: string, name: string }) => ({
                    id: category._id,  // Usando '_id' como 'id'
                    name: category.name
                }));
                setCategories(categoriesWithId); 
            } catch (error) {
                console.error('Erro ao carregar categorias', error);
            }
        };

        fetchCategories();
    }, []); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const newProduct = {
            name,
            description,
            price: parseFloat(price),
            categoryIds: selectedCategories, 
            imageUrl
        };
    
        try {
            await axios.post('http://localhost:3000/products/new', newProduct);
            window.alert('Produto Criado com Sucesso.');
            navigate('/products');
        } catch (error) {
            console.error("Erro ao criar o produto", error);
            window.alert('Erro ao criar o produto. Tente novamente mais tarde.');
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedCategories(selectedOptions);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-4">Criar Novo Produto</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descrição</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Preço</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Categorias</label>
                    <select
                        multiple
                        value={selectedCategories}
                        onChange={handleCategoryChange} 
                        className="w-full p-2 border rounded-md"
                        required
                    >
                        <option value="">Selecione uma ou mais categorias</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}> 
                                {category.name} ID:   {category.id}  
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-200"
                    >
                        Criar Produto
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
