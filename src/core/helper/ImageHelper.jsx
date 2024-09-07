import React from 'react'
import API from '../../backend';


const ImageHelper = ({product}) => {

   const imageurl = product ? `${API}/product/photo/${product._id}` : `https://img.icons8.com/clouds/100/000000/product.png` 

    return (
       
                <img
                  src={imageurl}
                  loading="lazy"
                  alt={product._id}
                  width={400}
                  height={400}
                  className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                  
                />
    )
}

export default ImageHelper;