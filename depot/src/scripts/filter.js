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
export const FilterPrice = (products , minPrice , maxPrice) => {
    return [...products].filter(product => minPrice <= product.price && product.price <= maxPrice )
};
export const relatedProducts = (products , selectedProduct) => {
    return [...products].filter(product => selectedProduct.categories[0].category == categories.category ?  categories.products.map(product) : "")
};
  