import React, { useState } from 'react'
import { FaCaretLeft , FaHeart, FaCaretRight} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import toast, { Toaster } from 'react-hot-toast';
import { CiHeart } from "react-icons/ci";
import { getSingleproduct } from "../../api/api";
export default function QuickLook({  active , SetActive , product}) {
 
  const [counter , SetCounter] =  useState(1)
  const [unactive , setUnactive] = useState(true)
  const [heartBtn , SetHeartBtn] = useState(false)
  const minError = () => toast.error('Cannot Choose Less than 1');
    const maxError = () => toast.error('Cannot Choose more than 10');
    const wishlist = () => { 
      if(heartBtn == true){
        
        toast.success("Successfully removed from WishList")
        
      }else{
        toast.success('Successfully added to WishList');
      }
    }
    function close (){
      setUnactive(true)
      SetActive(false)
    }
    function incremnt (){
      if(counter < 10){
        SetCounter(counter + 1)
      } else{
        SetCounter(counter)
        maxError()
      }
    }

    function decremnt (){
      if(counter > 1){

        SetCounter(counter - 1)
      } else{
        SetCounter(counter)
        minError()
      }
    }

    function toggle(){
      SetHeartBtn(!heartBtn)
    
    }
  return (
    <>
      <Toaster toastOptions={{
        style:{
          color: "red" 
        },

        success: {
          style:{
            color:"black"
          },
          icon: '🖤',
          theme: {
            primary: 'green',
            secondary: 'black',
          },
        },
      }}/>
    <div className={`quickLookPage ${unactive ? 'unactive' : ""} ${active ? "active" : "unactive"}`}>
        <div className="quickLookSection">

      <div className="img">
        <FaXmark onClick={close}/>
        <img src={product.url} loading='lazy' alt={product.name} />
      </div>

      <div className="info">

        <div className="head">
        <FaXmark onClick={close}/>
        <h3>{product.name}</h3>
        <div className="price">
         <p className='actuallPrice'>{product.price}  $</p>
        <p className='sale'>{product.sale ? `${product.sale}  $`: "" }  </p>  
        </div>

        </div>
        <div className="body">
        <div className="stars">stars</div>
        <p className="desc">{product.description}</p>

        <div className="buttons">
        <div className="quantity">
            <div>
            <p>Quantity</p>
            </div>
            <div className="quantityCounter">
            <FaCaretLeft onClick={decremnt}/>
            {counter}
            <FaCaretRight onClick={incremnt}/>
            </div>

        </div>

        <button className='addToCart'>Add to cart</button>
        </div>

        <div className="wishlist">
            <p onClick={toggle}> {heartBtn ? <FaHeart onClick={wishlist} />  : <CiHeart onClick={wishlist} /> }</p>
            <p>Add to wishlist</p>
        </div>
        </div>


      </div>
        </div>
    </div>
              </>
  )
}
