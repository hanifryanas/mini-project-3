import React, {useState, useEffect} from 'react'
import './CardContainer.css'
import axios from 'axios'
import ProductCard from './ProductCard'


const CardContainer = () => {
    const [productList, setProductList] = useState([])

    useEffect(() => {
        updateProduct()
    }, [])

    const updateProduct = () => {
        axios.get('http://localhost:3100/products/').then(response => {
            if (response.data.length > 0) {
                setProductList(response.data)
            }
        }).catch((error) => {
            alert("Error:", error)
        })
    }

  return (
    <section>
        {
            productList.map(product => {
                return <ProductCard key={product.id} product={product} />
            })
        }
    </section>

  )
}

export default CardContainer