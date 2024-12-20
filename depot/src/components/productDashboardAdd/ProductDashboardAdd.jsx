import React, { useEffect, useRef, useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { useMutation, useQueryClient } from "react-query";
import { AxiosConfig } from "../../axios/axiosConfig";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/api";
import Loader from "../loader/Loader";

export default function ProductDashboardAdd() {
  const [productValue, setProductValue] = useState({
    name: "",
    description: "",
    price: "",
    url: "",
    sale: null,
    salePrecentage: null,
    colour: "",
    dimensions: "",
    material: "",
    categories: [parseFloat()],
  });
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));

  const [category, setCategory] = useState([]);
  const { data, isLoading } = getCategories();
  const handleChange = (e) => {
    const { name, value } = e?.target;
    setProductValue((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const addProduct = useMutation({
    mutationKey: ["products"],
    mutationFn:  () =>
       AxiosConfig(`products?populate=*`, {
        method: "POST",
        data: {
          data: {

              name: productValue.name,
              price: parseFloat(productValue.price),
              description: productValue.description,
              sale: parseFloat(productValue.sale),
              salePrecentage: parseFloat(productValue.salePrecentage),
              colour: productValue.colour,
              material: productValue.material,
              dimensions: productValue.dimensions,
              wieght : 5,
              dataID : 5,
              rating : 5,
            
        
          },
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("product updated");
      navigate("/admin-dashboard");
    },
    onError: () => {
      toast.error("error happened");
    },
  });

  const submitMutate = () => {
    addProduct.mutate();
  };
  useEffect(() => {
    console.log(productValue);
    setCategory(data?.data?.data);
  });
  if (isLoading) return <Loader></Loader>;
  return (
    <div className={`productDashboardAdd`}>
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
        <form>
          <div className="input">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              onChange={handleChange}
              id="name"
              name="name"
              placeholder={productValue.name}
              value={productValue.name}
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
          <div className="input">
            <label htmlFor="material">Catgories :</label>

            <select
              name="categories"
              value={productValue.categories}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              {category &&
                category?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))}
            </select>
          </div>

          <div className="input btn">
            <button type="submit" onClick={submitMutate}>
              {addProduct.isLoading ? "Adding ....." : "Add product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
