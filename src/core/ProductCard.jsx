import React, {useState} from 'react'
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removefromCart, quantity } from './helper/cartHelper';
import { Card, CardContent } from "@/components/ui/card"
import { Link } from 'react-router-dom'
import { StarIcon } from 'lucide-react';
import { Button } from "@/components/ui/button"


const ProductCard = ({product, addtoCart = true, removeFromCart = false, quantity = false,
    setReload = f => f
    , 
    reload = undefined}) => {
    
    const [redirect, setRedirect] = useState(false)
    // const [count, setCount] = useState(product.count)

    const cardTitle = product ? product.name : "Product"
    const cardDescription = product ? product.description : "About the product"
    const cardPrice = product ? product.price : "Unavailable"
  
  
    const addToCart = () => {
        addItemToCart(product, ()=> setRedirect(true) )
    }

    const getRedirect = (redirect) => {
        if(redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddtoCart = (addtoCart) => {
        return(
        addtoCart && (
            <Button
            onClick={addToCart}
            className="btn btn-block rounded btn-outline-light mt-2 mb-2"
            >
            Add to Cart
          </Button>
        )
        );
    }

    const showRemoveFromCart = (removeFromCart) => {
        return(
            removeFromCart && (
            <Button
            onClick={() => {
                removefromCart(product._id);
                setReload(!reload);
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </Button>
        )
        );
    }

    const showQuantity = (quantity) => {
      return(
        quantity && (
        <button
        onClick={() => {
          quantity(product._id);
            setReload(!reload);
        }}
        className="btn btn-success rounded  btn-sm px-4"
      >
        Quantity {product.count}
      </button>
    )
    );
  }
    // return (
    //       <div className="card text-white bg-dark border border-dark shadow">
    //         <div className="card-header lead">{cardTitle}</div>
    //         <div className="card-body">
    //             {getRedirect(redirect)}
    //             <ImageHelper product={product}/>
    //           <p className="lead my-3 rounded font-weight-normal text-wrap">
    //             {cardDescription}
    //           </p>
    //           <p className="btn btn-light rounded btn-sm px-4">{cardPrice} /- </p> <br />
    //           {showQuantity(quantity)}
    //           <div className="row">
    //             <div className="col-12" >
    //                 {showAddtoCart(addtoCart)}
    //             </div>
    //             <div className="col-12">
    //                 {showRemoveFromCart(removeFromCart)}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     );
      
    return (
      <Card key={product._id} className="relative group">
      {getRedirect(redirect)}
      <Link to={`/product/${product._id}`} className="absolute inset-0 z-10" prefetch="false">
        <span className="sr-only">{product.name}</span>
      </Link>
      <ImageHelper product={product}/>
      <CardContent className="py-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-0.5">
            <StarIcon className="w-5 h-5 fill-primary" />
            <span className="text-sm font-medium">4</span>
          </div>
          <span className="text-sm text-muted-foreground">/5</span>
        </div>
        <div className="font-semibold text-lg mt-2">${product.price}</div>
        {/* <Button size="sm" className="mt-4 w-full">
          Add to Cart
        </Button> */}
        {showQuantity(quantity)}
        {showAddtoCart(addtoCart)}
        {showRemoveFromCart(removeFromCart)}
      </CardContent>
    </Card>
    )
}
 export default ProductCard;