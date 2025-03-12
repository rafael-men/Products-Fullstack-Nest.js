import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:3008/category/${id}`);
        setName(response.data.name);
      } catch (error) {
        console.error('Erro ao buscar categoria', error);
        alert('Erro ao carregar categoria.');
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3008/category/atualizar/${id}`, { name });
      alert('Categoria atualizada com sucesso!');
      navigate('/categories');
    } catch (error) {
      console.error('Erro ao atualizar categoria', error);
      alert('Erro ao atualizar categoria.');
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-3xl font-semibold mb-4'>Editar Categoria</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Nome da Categoria'
          className='w-full p-2 border rounded'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200'
        >
          Atualizar Categoria
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
