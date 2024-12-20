import React, { useEffect, useRef, useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { useMutation, useQueryClient } from "react-query";
import { AxiosConfig } from "../../axios/axiosConfig";
import { Toaster, toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getSingleproduct } from "../../api/api";

export default function ProductDashboardEdit() {
  const { id } = useParams();
  const [product , SetProduct] = useState([])
  const {data , isLoading} = getSingleproduct(id)

  const [productValue, setProductValue] = useState({
    name:  product?.name ,
    description: product?.description ,
    price: product?.price ,
    url: product?.url ,
    sale: product?.sale ,
    salePrecentage: product?.salePrecentage ,
    colour: product?.colour ,
    dimensions: product?.dimensions ,
    material: product?.material ,

  });
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setProductValue((prev) => ({ ...prev, [name]: value }));
  };

  const queryClient = useQueryClient();
  const updateProduct = useMutation({
    mutationKey: ["products"],
    mutationFn: async () =>
      await AxiosConfig(`products/${product.documentId}`, {
        method: "PUT",
        data: {
         
            data:productValue,

          
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("product updated");
    },
    onError: () => {
      toast.error("error happened");
    },
  });
  const submitMutate = () => {
    updateProduct.mutate(product.documentId);
  };
  const updateValues = () => {
    SetProduct(data?.data?.data)
    setProductValue({
        name:  product?.name ,
        description: product?.description ,
        price: product?.price ,
        url: product?.url ,
        sale: product?.sale ,
        salePrecentage: product?.salePrecentage ,
        colour: product?.colour ,
        dimensions: product?.dimensions ,
        material: product?.material ,
      })
  }
  useEffect(() => {
    SetProduct(data?.data?.data)
    
    setProductValue({
        name:  product?.name ,
        description: product?.description ,
        price: product?.price ,
        url: product?.url ,
        sale: product?.sale ,
        salePrecentage: product?.salePrecentage ,
        colour: product?.colour ,
        dimensions: product?.dimensions ,
        material: product?.material ,
      })
    console.log(productValue);
    },[data])

  return (
    <div className={`ProductDashboardEdit`}>
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
      <div className="innerWindow">
        <form >

        {product && (
          <>
            <div className="input">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                onChange={handleChange}
                id="name"
                name="name"
                placeholder={productValue.name}
                value={productValue.name}
              ></input>
            </div>
            <div className="input">
              <label htmlFor="price">Price :</label>
              <input
                type="text"
                name="price"
                onChange={handleChange}
                id="price"
                placeholder={productValue.price}
                
              ></input>
            </div>
            <div className="input">
              <label htmlFor="sale">Before Sale :</label>
              <input
                type="text"
                name="sale"
                onChange={handleChange}
                id="sale"
                placeholder={productValue.sale}
                value={productValue.sale}
              ></input>
            </div>
            <div className="input">
              <label htmlFor="salePrec">Sale Precentage :</label>
              <input
                type="text"
                name="salePrecentage"
                onChange={handleChange}
                id="salePrec"
                placeholder={productValue.salePrecentage}
                value={productValue.salePrecentage}
              ></input>
            </div>
            <div className="input">
              <label htmlFor="desc">Description :</label>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                id="desc"
                className="description"
                placeholder={productValue.description}
                value={productValue.description}
                ></input>
            </div>
            <div className="input">
              <label htmlFor="img">Img Url :</label>
              <input
                type="text"
                name="url"
                onChange={handleChange}
                id="img"
                placeholder={productValue.url}
                value={productValue.url}
              ></input>
            </div>
            <div className="input">
              <label htmlFor="colour">Colour :</label>
              <input
                type="text"
                name="colour"
                onChange={handleChange}
                id="colour"
                placeholder={productValue.colour}
                value={productValue.colour}
                ></input>
            </div>
            <div className="input">
              <label htmlFor="deminsions">Dimensions :</label>
              <input
                type="text"
                onChange={handleChange}
                name="dimensions"
                id="dimensions"
                placeholder={productValue.dimensions}
                value={productValue.dimensions}
                ></input>
            </div>

            <div className="input">
            <label htmlFor="material">Material :</label>
            <input
              type="text"
              onChange={handleChange}
              name="material"
              id="material"
              placeholder={productValue.material}
              value={productValue.material}
              required
            ></input>
          </div>
          <div className="input btn">
            <button type="submit" onClick={submitMutate}>
              {updateProduct.isLoading ? "Adding ....." : "Add product"}
            </button>
          </div>
          </>
        )}
                </form>
      </div>
    </div>
  );
}
