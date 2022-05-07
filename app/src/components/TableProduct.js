import React, { useState, useEffect } from 'react';
import './TableProduct.css';

const TableProduct = ({productList, handleEditProduct, handleDeleteProduct}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState('');

    useEffect(() => {
        setProductName(productList.name)
        setProductPrice(productList.price)
        setProductDescription(productList.description)
        setProductImage(productList.image)
    }, [productList])

    const handleName = (e) => {
        const val = e.target.value;
        setProductName(val)
    }

    const handlePrice = (e) => {
        const val = e.target.value;
        setProductPrice(val)
    }

    const handleDescription = (e) => {
        const val = e.target.value;
        setProductDescription(val)
    }

    const handleImage = (e) => {
        const val = e.target.value;
        setProductImage(val)
    }

    const handleValidation = () => {
        if (productName === '' || productPrice === '' || productDescription === '' || productImage === '') {
            return false;
        } else {
            return true;
        }
    }

    const handleEdit= (id) => {
        setIsEdit(true)
        const product = productList.find(product => product.id === id)
        setProductId(product.id);
        setProductName(product.name);
        setProductPrice(product.price);
        setProductDescription(product.description);
        setProductImage(product.image);
    }

    const handleDelete = (id) => {
        handleDeleteProduct(productList.find(product => product.id === id));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (handleValidation()) {
            const editedProduct = {
                id : productId,
                name: productName,
                price: productPrice,
                description: productDescription,
                image: productImage
            }
            handleEditProduct(editedProduct);
            setIsEdit(false);
        } else {
            alert('Please fill all the field')
        }
    }

    return (
        <div className="table-container">
            {isEdit ?
                <form onSubmit={handleSubmit}>
                    <h2>Update Product</h2>
                    <div className='form-container'>
                    <div className="form-group">
                        <label htmlFor="productName">Product Name</label>
                        <input type="text" className="form-control" id="productName" value={productName} onChange={handleName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productPrice">Product Price</label>
                        <input type="text" className="form-control" id="productPrice" value={productPrice} onChange={handlePrice} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productDescription">Product Description</label>
                        <input type="text" className="form-control" id="productDescription" value={productDescription} onChange={handleDescription} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productImage">Product Image</label>
                        <input type="url" className="form-control" id="productImage" value={productImage} onChange={handleImage} />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
                :
                <>
                    <h2>Product List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td>{product.image}</td>
                                    <td>
                                        <button onClick={() => handleEdit(product.id)} className="btn btn-primary">Edit</button>
                                        <button onClick={() => handleDelete(product.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            }
        </div>
    )
}

export default TableProduct;