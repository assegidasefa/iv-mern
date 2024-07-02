import React, { useState } from 'react';
import axios from '../axios';

const AddProductScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [image, setImage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('countInStock', countInStock);
    formData.append('image', image);

    try {
      await axios.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product added successfully!');
    } catch (error) {
      console.error('There was an error uploading the product!', error);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Count In Stock</label>
          <input
            type="number"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductScreen;
