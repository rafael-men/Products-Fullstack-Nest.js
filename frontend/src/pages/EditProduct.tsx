import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  name: string;
  description: string;
  price: string;
  categoryIds: string[];
  imageUrl: string;
}

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: "",
    categoryIds: [],
    imageUrl: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Erro ao buscar produto:", error));

    api.get("/category")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Erro ao buscar categorias:", error));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setProduct({ ...product, categoryIds: selectedOptions });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.put(`/products/atualizarProduto/${id}`, product)
      .then(() => {
        alert("Produto atualizado com sucesso!");
        navigate("/products");
      })
      .catch((error) => console.error("Erro ao atualizar produto:", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Nome"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Preço"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          placeholder="URL da Imagem"
          className="w-full p-2 border rounded"
        />
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt="Prévia do produto"
            className="w-40 h-40 object-cover border rounded mt-2"
          />
        )}
        <select
          multiple
          name="categoryIds"
          value={product.categoryIds}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded"
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl">
          Atualizar Produto
        </button>
      </form>
    </div>
  );
}

export default EditProduct;