import { useQuery } from "react-query";
import { AxiosConfig } from "../axios/axiosConfig";
import { useMutation , useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
export const getProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => AxiosConfig("products?populate=*"),
  });
};
export const getSingleproduct = (slug) => {
  return useQuery({
    queryKey: ["single-product"],
    queryFn: () => AxiosConfig(`products/${slug}?populate=*`),
  });
};

export const getSponsors = () => {
  return useQuery({
    queryKey: ["sponsors"],
    queryFn: () => AxiosConfig(`sponsors?populate=*`),
  });
};
export const getRelatedProducts = (category) => {
  return useQuery({
    queryKey: ["relatedProducts"],
    queryFn: () => AxiosConfig(`categories/${category}/?populate=*`),
  });
};

export const accountDetails = (id) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => AxiosConfig(`users/${id}?populate=*`),
  });
};

export const wishList = (id) => {
  return useQuery({
    queryKey: ["wishList"],
    queryFn: () => {
      AxiosConfig(`user-wish-list/${id}/?populate=*`) ;
   } },
)}
export const cart = (id) => {
  return useQuery({
    queryKey: ["cart" , "wish-list"],
    queryFn: () => AxiosConfig(`users/${id}?populate=*`)},
)}
