import React, {useState, useEffect} from 'react'
import './TableContainer.css'
import axios from 'axios'
import AddProduct from './AddProduct'
// import ProductCard from './ProductCard'
import TableProduct from './TableProduct'

const TableContainer = () => {
    const [productList, setProductList] = useState([])

    useEffect(() => {
        updateProduct()
    }, [])

    const updateProduct = () => {
        axios.get('http://localhost:3100/products/').then(response => {
            if (response.data.length > 0) {
                setProductList(response.data)
                console.log(response.data)
            }
        }).catch((error) => {
            alert("Error:", error)
        }
        )
    }

    const handleAddProduct = (newProduct) => {
        axios.post('http://localhost:3100/products/', newProduct).then(() => {
            updateProduct()
        }).catch((error) => {
            alert("Error:", error)
        })
    }

    const handleEditProduct = (editedProduct) => {
        axios.put(`http://localhost:3100/products/${editedProduct.id}`, editedProduct).then(() => {
            updateProduct()
        }).catch((error) => {
            alert("Error:", error)
        })
    }

    const handleDeleteProduct = (product) => {
        axios.delete(`http://localhost:3100/products/${product.id}`).then(() => {
            updateProduct();
        }
        ).catch((error) => {
            alert("Error:", error)
        })
    }

    return (
        <section>
            <AddProduct handleAddProduct={handleAddProduct} />
            <TableProduct productList={productList} handleEditProduct={handleEditProduct} handleDeleteProduct={handleDeleteProduct} />
        </section>
    )
}

export default TableContainer