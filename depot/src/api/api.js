import { useQuery } from "react-query";
import { AxiosConfig } from "../axios/axiosConfig";

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
        queryKey : ["sponsors"],
        queryFn: () => AxiosConfig(`sponsors/?populate=*`)
    })
}
export const getRelatedProducts = (category) => {
    return useQuery({
        queryKey : ["relatedProducts"],
        queryFn: () => AxiosConfig(`categories/${category}/?populate=*`)
    })
}


