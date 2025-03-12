import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3008/category/new', { name });
      alert('Categoria criada com sucesso!');
      navigate('/categories');
    } catch (error) {
      console.error('Erro ao criar categoria', error);
      alert('Erro ao criar categoria.');
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-3xl font-semibold mb-4'>Criar Nova Categoria</h2>
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
          Criar Categoria
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;