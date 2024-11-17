export const sortByPriceAsc = (products) => {
    return [...products].sort((a, b) => a.price - b.price);
};
  
export const sortByPriceDesc = (products) => {
    return [...products].sort((a, b) => b.price - a.price);
};
export const sortByNameAsc = (products) => {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
};
export const sortByNameDesc = (products) => {
    return [...products].sort((a, b) => b.name.localeCompare(a.name));
};
export const sortByRating = (products) => {
    return [...products].sort((a, b) => a.rating - b.rating);
};
  