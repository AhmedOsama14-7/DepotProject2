import { useQuery } from "react-query";
import { AxiosConfig } from "../axios/axiosConfig";

export const getProducts = (page, limit) => {
  return useQuery({
    queryKey: ["products" , page],
    queryFn: () => AxiosConfig(`products?populate=*&pagination[pageSize]=${limit}&pagination[page]=${page}`),
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
export const getRelatedProducts = (category , page , limit) => {
  return useQuery({
    queryKey: ["relatedProducts"],
    queryFn: () => AxiosConfig(`categories/${category}/?populate=*&pagination[pageSize]=${limit}&pagination[page]=${page}`),
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
