import React, { useEffect, useState } from 'react'
import { FaCircleXmark } from "react-icons/fa6";
import { useMutation, useQueryClient } from 'react-query';
import { AxiosConfig } from '../../axios/axiosConfig';
import { Toaster, toast } from 'react-hot-toast';

export default function ProductDashboardEdit({isActive , product , setActive}) {
    const [nameValue, setNameValue] = useState(product?.name);
    const [priceValue, setPriceValue] = useState(product.price);
    const [descValue, setDescValue] = useState(product.description);
    const [saleValue, setSaleValue] = useState(product.sale);
    const [saleprecValue, setSalePrecValue] = useState(product.salePrecentage);
    const [dimensionsValue, setDimensionsValue] = useState(product.dimensions);
    const [colourValue, setColourValue] = useState(product.colour);
    const [urlValue , setUrlValue] = useState(product?.url)
    const [jwt , setJwt] = useState(localStorage.getItem("jwt"))
  // Function to handle the change event for the input
  const handleChange = (event , fun) => {
    if(fun === setPriceValue()){

        setPriceValue(event?.target?.value);
        console.log(priceValue);
    }
  };
  const queryClient = useQueryClient()
    const updateProduct = useMutation({
        mutationKey:["products"],
        mutationFn: async () =>
         await AxiosConfig(`products/${product.documentId}?populate=*` , {
            method:"PUT",
            data:{
                data:{
                   
                        name: nameValue,
                        price:priceValue,
                        sale:saleValue,
                        salePrecentage:saleprecValue,
                        colour:colourValue,
                        dimensions:dimensionsValue,
                        url:urlValue,
                        description:descValue,
                    
                }
            },
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
              },
        }) , onSuccess:() => {
            queryClient.invalidateQueries(["products"])
            toast.success("product updated");

        } , onError:()=>{
            toast.error("error happened")
        }
    })
    const notActive = () => {
        setActive(false)
        updateProduct.mutate(product.documentId)
    }
  return (
    <div className={`ProductDashboardEdit  ${isActive ? "active" : ""}`}>
        <Toaster
        toastOptions={{
          style: {
            color: "red",
          },

          success: {
            style: {
              color: "black",
            },
            icon: "🛒",
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <FaCircleXmark onClick={notActive}/>
      <div className="innerWindow">

    {
        product &&
       <>
           <div className="input">
                <label htmlFor='name'>Name  :</label>
                <input type='text'  onChange={() => handleChange(setNameValue())} id='name' placeholder={product?.name} value={nameValue}></input>
           </div>
           <div className="input">
                <label htmlFor='price'>Price  :</label>
                <input type='text'  onChange={() => handleChange(setPriceValue())} id='price' placeholder={product?.price} value={priceValue}></input>
           </div>
           <div className="input">
                <label htmlFor='sale'>Before Sale  :</label>
                <input type='text'  onChange={() => handleChange(setSaleValue())} id='sale' placeholder={product?.sale} value={saleValue}></input>
           </div>
           <div className="input">
                <label htmlFor='salePrec'>Sale Precentage  :</label>
                <input type='text' onChange={()=>handleChange(setSalePrecValue())} id='salePrec' placeholder={product?.salePrecentage} value={saleprecValue}></input>
           </div>
           <div className="input">
                <label htmlFor='desc'>Description  :</label>
                <input type='text'  onChange={() => handleChange(setDescValue())} id='desc' className='description' placeholder={descValue} value={product?.description}></input>
           </div>
           <div className="input">
                <label htmlFor='img'>Img Url  :</label>
                <input type='text'  onChange={() => handleChange(setUrlValue())} id='img'  placeholder={product?.url} value={urlValue}></input>
           </div>
           <div className="input">
                <label htmlFor='colour'>Colour  :</label>
                <input type='text'  onChange={() =>handleChange(setColourValue())} id='colour'  placeholder={product?.colour} value={colourValue}></input>
           </div>
           <div className="input">
                <label htmlFor='deminsions'>Dimensions  :</label>
                <input type='text'  onChange={() =>handleChange(setDimensionsValue())}id='dimensions'  placeholder={product?.dimensions} value={dimensionsValue}></input>
           </div>
        
       </>
    }
       
      </div>
    </div>
  )
}
