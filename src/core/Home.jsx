import React, {useEffect, useState} from 'react'
import API from "../backend.js"
import Card from './ProductCard.jsx';
import { getProducts } from './helper/coreapicalls.jsx';
import { Base } from './Base.jsx';
import Products from './Products.jsx';


export default function Home() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const [loading, setloading] = useState(false);
    
    const loadAllProducts = () => {
        getProducts().then(
            data=> {
                console.log(data);
                if(data?.error){
                    setError(data.error)
                }else{
                    setProducts(data)
                }
            }
        )
    }
    
        useEffect(() => {
            // loadAllProducts();
        }, [])


    return (
        <Base title="Home Page" description="Welcome to my store">
                <Products />
        </Base>
    )
}
