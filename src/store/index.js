import { createStore } from "vuex";

const cartPersistPlugin = (store) => {
  store.subscribe((mutation, state) => {
    if (
      mutation.type.startsWith("addToCart") ||
      mutation.type.startsWith("removeProductFromCart")
    ) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  });
};

export default createStore({
  plugins: [cartPersistPlugin],
  state: {
    productsPerPage: 12,
    taxRate: 0.21,
    productDetailProduct: {
      name: "Zip Tote Basket",
      id: 12,
      quantity: 1,
      price: "140",
      inStock: true,
      rating: 4,
      gender: "women",
      size: { height: 35, width: 35 },
      images: [
        {
          id: 1,
          name: "Angled view",
          src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
          alt: "Angled front view with bag zipped and handles upright.",
        },
      ],
      colors: [
        {
          name: "Washed Black",
          bgColor: "#4A5568",
          selectedColor: "ring-black",
        },
        { name: "White", bgColor: "#FFFFFF", selectedColor: "ring-gray-400" },
        {
          name: "Washed Gray",
          bgColor: "#718096",
          selectedColor: "ring-black",
        },
      ],
      description: `
        <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
      `,
      details: [
        {
          name: "Features",
          items: [
            "Multiple strap configurations",
            "Spacious interior with top zip",
            "Leather handle and tabs",
            "Interior dividers",
            "Stainless strap loops",
            "Double stitched construction",
            "Water-resistant",
          ],
        },
        {
          name: "Materials",
          items: [
            "Full grain leather",
            "Organic cotton canvas",
            "Solid brass hardware",
            "Water-resistant finish",
          ],
        },
        { name: "Dimensions", items: ["14” x 14” x 5”", "32L capacity"] },
      ],
      categories: ["New Arrivals", "Travel"], // Example categories for this product
    },
    allProductsOfCategory: [
      {
        inStock: true,
        quantity: 1,
        id: 7,
        rating: 5,
        name: "Basic Tee",
        gender: "men",
        color: "#000000",
        size: { height: 70, width: 50 },
        href: "#",
        images: [
          {
            id: 2,
            name: "Angled view",
            src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
            alt: "Front of men's Basic Tee in black.",
          },
        ],
        price: "35",
        colors: [
          { name: "Black", bgColor: "black", selectedColor: "ring-black" },
        ],
        description:
          "<p>A classic staple, the Basic Tee is made from soft, breathable cotton for all-day comfort. Its versatile design makes it perfect for layering or wearing on its own.</p>",
        details: [
          {
            name: "Features",
            items: [
              "Soft, breathable cotton",
              "Classic crew neck",
              "Regular fit",
              "Short sleeves",
            ],
          },
          { name: "Materials", items: ["100% cotton"] },
        ],
        categories: ["New Arrivals", "Men's Fashion"], // Example categories
      },
      {
        inStock: true,
        quantity: 1,
        id: 8,
        rating: 3,
        name: "Classic Hoodie",
        gender: "men",
        color: "#ece7dd",
        size: { height: 75, width: 60 },
        href: "#",
        images: [
          {
            id: 3,
            name: "Front view",
            src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
            alt: "Front of men's Classic Hoodie in gray.",
          },
        ],
        price: "65",
        colors: [
          { name: "Gray", bgColor: "#ece7dd", selectedColor: "ring-black" },
        ],
        description:
          "<p>The Classic Hoodie offers both comfort and style. Made from a blend of soft fabrics, it features a drawstring hood and kangaroo pocket for added warmth and convenience.</p>",
        details: [
          {
            name: "Features",
            items: [
              "Soft, comfortable fabric blend",
              "Drawstring hood",
              "Kangaroo pocket",
              "Ribbed cuffs and hem",
            ],
          },
          { name: "Materials", items: ["50% cotton, 50% polyester"] },
        ],
        categories: ["Sale", "Men's Fashion"], // Example categories
      },
      {
        inStock: true,
        quantity: 1,
        id: 9,
        rating: 4,
        name: "Slim Fit Jeans",
        gender: "men",
        color: "#52505b",
        size: { height: 100, width: 35 },
        href: "#",
        images: [
          {
            id: 4,
            name: "Front view",
            src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
            alt: "Front of men's Slim Fit Jeans in blue.",
          },
        ],
        price: "50",
        colors: [
          { name: "Blue", bgColor: "#52505b", selectedColor: "ring-black" },
        ],
        description:
          "<p>The Slim Fit Jeans combine style and comfort effortlessly. Made from stretch denim, they offer a sleek, modern silhouette while providing flexibility for everyday wear.</p>",
        details: [
          {
            name: "Features",
            items: [
              "Stretch denim for comfort",
              "Slim fit",
              "Classic 5-pocket styling",
              "Zip fly with button closure",
            ],
          },
          { name: "Materials", items: ["98% cotton, 2% elastane"] },
        ],
        categories: ["New Arrivals", "Men's Fashion"], // Example categories
      },
      {
        inStock: true,
        quantity: 1,
        id: 10,
        rating:1,
        name: "Leather Belt",
        gender: "women",
        color: "#f7e2d1",
        size: { height: 5, width: 120 },
        href: "#",
        images: [
          {
            id: 5,
            name: "Product view",
            src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg",
            alt: "Leather Belt in brown.",
          },
        ],
        price: "25",
        colors: [
          { name: "Pink", bgColor: "#f7e2d1", selectedColor: "ring-black" },
        ],
        description:
          "<p>Add a touch of sophistication to any outfit with the Leather Belt. Crafted from genuine leather, it features a classic design and sturdy buckle for durability and style.</p>",
        details: [
          {
            name: "Features",
            items: [
              "Genuine leather construction",
              "Classic design",
              "Sturdy buckle",
            ],
          },
          { name: "Materials", items: ["100% leather"] },
        ],
        categories: ["Accessories", "Women's Fashion"], // Example categories
      },
    ],

    trendingProducts: [
      {
        rating: 5,
        quantity: 1,
        id: 1,
        name: "Leather Long Wallet",
        gender: "women",
        color: "#d5965f",
        size: { height: 10, width: 20 },
        colors: [
          {
            name: "Brown",
            bgColor: "#d5965f",
            selectedColor: "ring-black",
          },
        ],
        inStock: false,
        leadTime: "2 days",
        price: "75",
        href: "#",
        images: [
          {
            id: 6,
            name: "Product view",
            src: "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
            alt: "Hand stitched, orange leather long wallet.",
          },
        ],
        description:
          "<p>The Leather Long Wallet is a stylish and functional accessory. Handcrafted from premium leather, it features multiple card slots, a zippered coin pocket, and a bill compartment, providing ample space for all your essentials.</p>",
        details: [
          {
            name: "Features",
            items: [
              "Handcrafted from premium leather",
              "Multiple card slots",
              "Zippered coin pocket",
              "Bill compartment",
            ],
          },
          {
            name: "Materials",
            items: ["100% genuine leather"],
          },
        ],
        categories: ["Accessories", "New Arrivals"], // Example categories
      },
      {
        rating: 4,
        quantity: 1,
        id: 2,
        name: "Hatch Frame",
        gender: undefined,
        color: "#84614a",
        size: { height: 30, width: 40 },
        colors: [
          {
            name: "Black",
            bgColor: "#84614a",
            selectedColor: "ring-black",
          },
        ],
        inStock: true,
        price: "58",
        href: "#",
        images: [
          {
            id: 7,
            name: "Product view",
            src: "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-01.jpg",
            alt: "Front of black cotton t-shirt with hatch pattern.",
          },
        ],
        description:
          "<p>Add a modern touch to your space with the Hatch Frame. Crafted from high-quality materials, it features a sleek black finish and a unique hatch pattern, making it a stylish addition to any room.</p>",
        details: [
          {
            name: "Features",
            items: [
              "Modern design",
              "High-quality materials",
              "Sleek black finish",
              "Unique hatch pattern",
            ],
          },
          {
            name: "Materials",
            items: ["Metal frame", "Glass pane"],
          },
        ],
        categories: ["Home Decor", "Sale"], // Example categories
      },
      {
        rating: 3,
        quantity: 1,
        id: 3,
        name: "Leather Key Loop",
        gender: undefined,
        color: "black",
        size: { height: 2, width: 10 },
        colors: [
          {
            name: "Natural",
            bgColor: "black",
            selectedColor: "ring-black",
          },
        ],
        inStock: true,
        price: "16",
        href: "#",
        images: [
          {
            id: 8,
            name: "Product view",
            src: "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-03.jpg",
            alt: "Hand-stitched, orange leather key loop.",
          },
        ],
        description:
          "<p>The Leather Key Loop is a stylish and practical accessory for keeping your keys organized. Handcrafted from premium leather, it features a sturdy metal key ring and a secure snap closure.</p>",
        details: [
          {
            name: "Features",
            items: [
              "Handcrafted from premium leather",
              "Sturdy metal key ring",
              "Secure snap closure",
            ],
          },
          {
            name: "Materials",
            items: ["100% genuine leather", "Metal key ring"],
          },
        ],
        categories: ["Accessories", "Best Sellers"], // Example categories
      },
      {
        inStock: false,
        leadTime: "2 days",
        rating: 2,
        quantity: 1,
        id: 4,
        name: "Machined Mechanical Pencil",
        gender: undefined,
        color: "black",
        size: { height: 15, width: 1.5 },
        colors: [],
        price: "35",
        href: "#",
        images: [
          {
            id: 9,
            name: "Product view",
            src: "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-04.jpg",
            alt: "Black machined steel mechanical pencil.",
          },
        ],
        description:
          "<p>The Machined Mechanical Pencil combines precision engineering with sleek design. Crafted from durable materials, it features a retractable tip and a comfortable grip for effortless writing.</p>",
        details: [
          {
            name: "Features",
            items: [
              "Precision engineering",
              "Retractable tip",
              "Comfortable grip",
            ],
          },
          {
            name: "Materials",
            items: ["Steel construction", "Rubber grip"],
          },
        ],
        categories: ["Office Supplies", "New Arrivals"], // Example categories
      },
    ],

    currency: { id: "eur", name: "EUR", description: "Euro", symbol: "€" },
    currencies: [
      { id: "cad", name: "CAD", description: "Canadian Dollar", symbol: "$" },
      { id: "usd", name: "USD", description: "US Dollar", symbol: "$" },
      { id: "aud", name: "AUD", description: "Australian Dollar", symbol: "$" },
      { id: "eur", name: "EUR", description: "Euro", symbol: "€" },
      { id: "gbp", name: "GBP", description: "British Pound", symbol: "£" },
    ],

    cart: JSON.parse(localStorage.getItem("cart")) || [],
    notification: {
      show: false,
      title: "TEST",
      message: "test",
      type: "success",
      closeButton: "Close",
    },

    sortOptions: [
      { name: "Best Rating", href: "#", current: false },
      { name: "Newest", href: "#", current: false },
      { name: "Price: Low to High", href: "#", current: false },
      { name: "Price: High to Low", href: "#", current: false },
    ],
    subCategories: [
      { name: "All", href: "#" },
      { name: "Totes", href: "#" },
      { name: "Backpacks", href: "#" },
      { name: "Travel Bags", href: "#" },
      { name: "Hip Bags", href: "#" },
      { name: "Laptop Sleeves", href: "#" },
    ],
    filters: [
      {
        id: "color",
        name: "Colors",
        options: [
          { value: "black", label: "Black", checked: false },
          { value: "blue", label: "Blue", checked: false },
          { value: "brown", label: "Brown", checked: false },
          { value: "gray", label: "Gray", checked: false },
          { value: "white", label: "White", checked: false },
          { value: "green", label: "Green", checked: false },
          { value: "purple", label: "Purple", checked: false },
          { value: "pink", label: "Pink", checked: false },
        ],
      },
      // {
      //   id: "category",
      //   name: "Category",
      //   options: [
      //     { value: "new-arrivals", label: "New Arrivals", checked: false },
      //     { value: "sale", label: "Sale", checked: false },
      //     { value: "travel", label: "Travel", checked: false },
      //     { value: "organization", label: "Organization", checked: false },
      //     { value: "accessories", label: "Accessories", checked: false },
      //   ],
      // },
      // {
      //   id: "size",
      //   name: "Size",
      //   options: [
      //     { value: "2l", label: "2L", checked: false },
      //     { value: "6l", label: "6L", checked: false },
      //     { value: "12l", label: "12L", checked: false },
      //     { value: "18l", label: "18L", checked: false },
      //     { value: "20l", label: "20L", checked: false },
      //     { value: "40l", label: "40L", checked: false },
      //   ],
      // },
    ],
  },
  mutations: {
    SET_FILTERS_FROM_URL(state, filtersFromUrl) {
      // Loop through all filters in the state
      state.filters.forEach((filter) => {
        // Reset the checked state of all options
        filter.options.forEach((option) => {
          option.checked = false;
        });

        // If the filter is present in the URL, update the checked state
        if (filtersFromUrl[filter.id]) {
          const values = filtersFromUrl[filter.id].split(",");
          filter.options.forEach((option) => {
            if (values.includes(option.value)) {
              option.checked = true;
            }
          });
        }
      });
    },
    updateProductQuantity(state, { productId, quantity }) {
      const productIndex = state.cart.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        state.cart[productIndex].quantity = quantity;
        // Persist the updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    setCurrency(state, currency) {
      state.currency = currency;
    },
    addToCart(state, { product, color }) {
      // More detailed log to see exactly what's in the cart before attempting to add
      console.log('Current cart:', JSON.parse(JSON.stringify(state.cart)));
    
      // Find index of the product with the same id and color name
      const index = state.cart.findIndex(
        (item) => item.product.id === product.id && item.color.name === color.name
      );

      state.cart.forEach((item) => {
        console.log('Item:', item);
      });

      console.log(index);
    
      // Debug log to see if the product was found
      console.log('Product index found:', index);
    
      if (index !== -1) {
        // Increase the quantity of the existing cart item
        state.cart[index].product.quantity += 1;
        console.log(`Increased quantity of product with ID ${product.id} and color ${color.name}`);
      } else {
        // Add new product with color as a new cart item
        product.quantity = 1;
        const newCartItem = {
          product: { ...product },
          color: color,
        };
        state.cart.push(newCartItem);
        console.log(`Added new product with ID ${product.id} and color ${color.name}`);
      }
    
      // Update notification state
      state.notification = {
        show: true,
        title: "Success",
        message: "Product added to cart",
        type: "success",
        closeButton: "Close",
      };
      // Clear the notification after 5 seconds
      setTimeout(() => {
        state.notification.show = false;
      }, 5000);
    },
    
    
    removeProductFromCart(state, productId) {
      const index = state.cart.findIndex(
        (item) => item.product.id === productId
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
        // Persist the updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    closeNotification(state) {
      state.notification.show = false;
    },
  },
  actions: {
    SUBMIT_NEWSLETTER({ state, commit }, email) {
      // Submit the email to your API here
      console.log(`Submitting email: ${email}`);
    },
    FIND_PRODUCT_FROM_ALL_LISTS({ state, commit }, productId) {
      let newList = [
        ...state.allProductsOfCategory,
        ...[state.productDetailProduct], // Spread the productDetailProduct as an array
        ...state.trendingProducts,
      ];
      newList.forEach((p) => {});
      let product = newList.filter((p) => p.id === Number.parseInt(productId));
      return product[0];
    },
    /**
     * Finds products from all lists based on given filters.
     *
     * @param {Object} state - The state object.
     * @param {Object} commit - The commit object.
     * @param {Object} filtersFromUrl - The filters from URL object.
     * @param {number} currentPage - The current page number.
     * @returns {Object} - An object containing paginated products and total number of filtered products.
     */
    FIND_PRODUCTS_FROM_ALL_LISTS_BY_FILTERS(
      { state, commit },
      { filtersFromUrl, currentPage }
    ) {
      const startIndex = (currentPage - 1) * state.productsPerPage;
      const endIndex = startIndex + state.productsPerPage;

      let newList = [
        ...state.allProductsOfCategory,
        state.productDetailProduct,
        ...state.trendingProducts,
      ];

      // Create a separate filters object without the sort key
      let filters = {};
      Object.keys(filtersFromUrl).forEach((filterKey) => {
        if (filterKey !== "sort") {
          // Exclude 'sort' from the filters
          filters[filterKey] = filtersFromUrl[filterKey].includes(",")
            ? filtersFromUrl[filterKey].split(",")
            : [filtersFromUrl[filterKey]];
        }
      });

      const normalizeColor = (color) =>
        typeof color === "string" ? color.toLowerCase() : "";

      const colorMatches = (productColors, filterColors) => {
        if (!filterColors || filterColors.length === 0) return true;
        return (
          productColors &&
          productColors.some((productColor) =>
            filterColors.some(
              (filterColor) =>
                normalizeColor(productColor.name) ===
                  normalizeColor(filterColor) ||
                normalizeColor(productColor.bgColor) ===
                  normalizeColor(filterColor)
            )
          )
        );
      };

      const matchesFilter = (product, filters) => {
        for (const filterKey in filters) {
          const filterValue = filters[filterKey];

          if (filterKey === "color") {
            if (!colorMatches(product.colors, filterValue)) return false;
          } else if (filterKey === "gender") {
            // Adjusted logic for gender filtering
            if (
              product.gender !== undefined &&
              !filterValue.includes(product.gender)
            ) {
              return false;
            }
          } else {
            // Handle other filters
            const productAttribute = product[filterKey];
            if (!filterValue.includes(productAttribute)) {
              return false;
            }
          }
        }
        return true; // Product passes all filters
      };

      let filteredProducts = newList.filter((product) =>
        matchesFilter(product, filters)
      );

      // Sort based on the selected sorter
      if (filtersFromUrl.sort === 'best-rating') {
        filteredProducts.sort((a, b) => {
          // Assign a default rating for products without a rating to ensure they end up at the end of the list
          const ratingA = a.rating !== undefined ? a.rating : -1;
          const ratingB = b.rating !== undefined ? b.rating : -1;
          return ratingB - ratingA;
        });
      }
      
      // if (filtersFromUrl.sort === 'newest') {
      //   // Ensure that a `createdAt` date string exists in your product data for this to work
      //   filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      // }
      if (filtersFromUrl.sort === "price-low-to-high") {
        // Convert price to number if it's a string
        filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
      }
      if (filtersFromUrl.sort === "price-high-to-low") {
        // Convert price to number if it's a string
        filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
      }

      // Continue with pagination
      let paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      return {
        paginatedProducts,
        totalProducts: filteredProducts.length,
      };
    },
  },
  modules: {},
});
