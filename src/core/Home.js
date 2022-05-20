import React, {useEffect, useState} from 'react'
import "../styles.css"
import API from "../backend.js"
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';
import { Spinner } from 'react-bootstrap';


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
            loadAllProducts();
        }, [])


    return (
        <Base title="Home Page" description="Welcome to my store bitch">
                <h1 className="text-white"> All products </h1>
                <div className="row">
                        {products && products.length > 0 ? products.map((product, index) => {
                            return(
                                <div key ={index} className="col-4 mb-4">
                                    <Card product = {product}/>
                                </div>
                            )
                        }) : <Spinner animation="grow" /> }
                </div>
        </Base>
    )
}
