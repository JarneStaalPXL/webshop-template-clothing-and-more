function applySorting(products, sortType) {
    if (sortType === "best-rating") {
      products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortType === "price-low-to-high") {
      products.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortType === "price-high-to-low") {
      products.sort((a, b) => Number(b.price) - Number(a.price));
    }
  }
  

  function matchesFilter(product, filters) {
    return Object.entries(filters).every(([key, filterValues]) => {
      if (key === "category") {
        return product.product_categories.some(category =>
          filterValues.includes(category.name.toLowerCase())
        );
      } else if (key === "color") {
        return product.product_colors.some(color =>
          filterValues.includes(color.name.toLowerCase())
        );
      } else {
        // For other filters that match directly against product properties
        const productValue = product[key];
        if (Array.isArray(productValue)) {
          // Assuming other potential array filters follow a similar structure to categories/colors
          return filterValues.some(value => productValue.map(val => val.toLowerCase()).includes(value.toLowerCase()));
        } else if (typeof productValue === 'string' || typeof productValue === 'number') {
          return filterValues.includes(productValue.toString().toLowerCase());
        }
        // Add more conditionals here for other specific filter types as needed
      }
      return false; // If the filter doesn't match any known criteria
    });
  }

  
  export {
    applySorting,
    matchesFilter
  }