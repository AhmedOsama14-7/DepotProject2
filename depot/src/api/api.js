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
export const getCategories = (slug) => {
  return useQuery({
    queryKey: ["products "],
    queryFn: () => AxiosConfig(`categories?populate=*`),
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

  export const admin = () => {
    return useQuery({
      queryKey:["admins"],
      queryFn: () => AxiosConfig(`admins?populate=*`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTczNDI4MDM3NCwiZXhwIjoxNzM2ODcyMzc0fQ.goQNW3szLxI6_aG8kgZQbzAnyQYDAUE1YmqFc21PZHk`,
          "Content-Type": "application/json",
        },
      })
    })
  }
  export const getAdmins = (page , limit) => {
    return useQuery({
      queryKey:["admins"],
      queryFn: () => AxiosConfig(`admins?populate=*&pagination[pageSize]=${limit}&pagination[page]=${page}`, {
      })
    })
  }
export const users = (limit , page) => {
  return useQuery({
    queryKey:["admins"],
    queryFn:()=>AxiosConfig(`users?populate=*&pagination[pageSize]=${limit}&pagination[page]=${page}`)
  })
}
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

export const getOrders = (page , limit) => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => AxiosConfig(`orders?populate=*&pagination[pageSize]=${limit}&pagination[page]=${page}`)
  })
}
export const getNewProducts = (page , limit) => {
  return useQuery({
    queryKey: ["newProducts"],
    queryFn: () => AxiosConfig(`new-products?populate=*&pagination[pageSize]=${limit}&pagination[page]=${page}`)
  })
}
