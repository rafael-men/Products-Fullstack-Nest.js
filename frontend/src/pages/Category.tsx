import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Category {
  _id: string,
  name: string,
}

const Category = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3008/category');
        setCategory(response.data);
      }
      catch(err) {
        console.log('Erro ao carregar categorias...', err);
      }
      finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/edit-category/${id}`);
  };

  const handleCreate = () => {
    navigate('/categories/new');
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta categoria?");
    if (!confirmDelete) return;

    try {
      const productResponse = await axios.get(`http://localhost:3008/products?categoryIds=${id}`);
      if (productResponse.data.length > 0) {
        alert("Não é possível excluir a categoria, pois está associada a um ou mais produtos.");
        return;
      }

      await axios.delete(`http://localhost:3008/category/deletar/${id}`);
      setCategory(category.filter(cat => cat._id !== id));
      alert("Categoria excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir categoria", error);
      alert("Erro ao excluir categoria.");
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <div className="flex flex-items justify-between mb-4">
        <h2 className="font-semibold text-3xl">Categorias</h2>
        <button onClick={handleCreate} 
          className='bg-green-500 text-white px-3 py-2 ml-3 rounded-xl hover:bg-green-600 transition duration-200'>
          Criar Categoria
        </button>
      </div>
      <hr className='mb-6'></hr>
      {loading ? (
        <p className="text-center text-lg">Carregando categorias...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {category.map((category) => (
            <div key={category._id} className="border p-6 rounded-lg shadow-lg bg-white flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">{category.name}</h3>
              <div className="mt-4 flex justify-between space-x-2">
                <button
                  onClick={() => handleEdit(category._id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
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

export default Category;
