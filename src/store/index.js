import { createStore } from "vuex";
import { redirectToStripeCheckoutWithProducts } from "../helpers/paymentHelper";

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
    showSearchDialog: false,
    productsPerPage: 12,
    taxRate: 0.21,
    productDetailProduct: {
      name: "Zip Tote Basket",
      id: 12,
      quantity: 1,
      price: "140",
      inStock: true,
      rating: 4,
      // category: "women",
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
      categories: ["New Arrivals", "Travel", "women"],
    },
    allProductsOfCategory: [
      {
        inStock: true,
        quantity: 1,
        id: 7,
        rating: 5,
        name: "Basic Tee",
        category: "men",
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
        price: "1",
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
        categories: ["New Arrivals", "Men's Fashion", "men"], // Example categories
      },
      {
        inStock: true,
        quantity: 1,
        id: 8,
        rating: 3,
        name: "Classic Hoodie",
        category: "men",
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
          { name: "Beige", bgColor: "#ece7dd", selectedColor: "ring-black" },
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
        categories: ["Sale", "Men's Fashion", "men"], // Example categories
      },
      {
        inStock: true,
        quantity: 1,
        id: 9,
        rating: 4,
        name: "Slim Tshirt",
        category: "men",
        color: "#52505b",
        size: { height: 100, width: 35 },
        href: "#",
        images: [
          {
            id: 4,
            name: "Front view",
            src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
            alt: "Front of men's Slim Fit Tshirt in black.",
          },
        ],
        price: "50",
        colors: [
          { name: "Black", bgColor: "#52505b", selectedColor: "ring-black" },
        ],
        description:
          "<p>The Slim Fit Tshirt combine style and comfort effortlessly. Made from stretch denim, they offer a sleek, modern silhouette while providing flexibility for everyday wear.</p>",
        details: [
          {
            name: "Features",
            items: ["Stretch denim for comfort", "Slim fit"],
          },
          { name: "Materials", items: ["98% cotton, 2% elastane"] },
        ],
        categories: ["New Arrivals", "Men's Fashion", "men"], // Example categories
      },
      {
        inStock: true,
        quantity: 1,
        id: 10,
        rating: 1,
        name: "Leather Belt",
        category: "women",
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
        categories: ["Women's Fashion", "women"], // Example categories
      },
    ],

    trendingProducts: [
      {
        rating: 5,
        quantity: 1,
        id: 1,
        name: "Leather Long Wallet",
        category: "women",
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
        categories: ["Accessories", "New Arrivals", "women"], // Example categories
      },
      {
        rating: 4,
        quantity: 1,
        id: 2,
        name: "Hatch Frame",
        category: undefined,
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
        categories: ["Home Decor", "Sale", "accessories"], // Example categories
      },
      {
        rating: 3,
        quantity: 1,
        id: 3,
        name: "Leather Key Loop",
        category: undefined,
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
        categories: ["accessories", "Best Sellers"], // Example categories
      },
      {
        inStock: false,
        leadTime: "2 days",
        rating: 2,
        quantity: 1,
        id: 4,
        name: "Machined Mechanical Pencil",
        category: undefined,
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
        categories: ["Office Supplies", "New Arrivals", "accessories"], // Example categories
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
      { name: "Men", href: "#" },
      { name: "Women", href: "#" },
      { name: "Accessories", href: "#" },
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
      // Find index of the product with the same id and color name
      const index = state.cart.findIndex(
        (item) =>
          item.product.id === product.id && item.color.name === color.name
      );

      if (index !== -1) {
        // Increase the quantity of the existing cart item
        state.cart[index].product.quantity += 1;
      } else {
        // Add new product with color as a new cart item
        product.quantity = 1;
        const newCartItem = {
          product: { ...product },
          color: color,
        };
        state.cart.push(newCartItem);
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
    async FIND_PRODUCTS_FROM_ALL_LISTS_BY_FILTERS(
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

      // Filter by name if specified
      if (filtersFromUrl.name) {
        let filteredByNameList = newList.filter((p) =>
          p.name.toLowerCase().includes(filtersFromUrl.name.toLowerCase())
        );

        // Apply sorting to the list filtered by name
        applySorting(filteredByNameList, filtersFromUrl.sort);

        // Return the sorted and paginated list
        return {
          paginatedProducts: filteredByNameList.slice(startIndex, endIndex),
          totalProducts: filteredByNameList.length,
        };
      }

      // Check if the query category is "all" or undefined
      if (!filtersFromUrl.category || filtersFromUrl.category === "all") {
        // Apply sorting to all products if specified
        applySorting(newList, filtersFromUrl.sort);

        // Return all products after sorting, without applying filters
        return {
          paginatedProducts: newList.slice(startIndex, endIndex),
          totalProducts: newList.length,
        };
      }

      console.log("Before filtering:", newList);

      // Filter logic for categories, correctly handling "Accessories"
      let filteredList;
      if (filtersFromUrl.category.toLowerCase() === "accessories") {
        filteredList = newList.filter(
          (product) =>
            product.categories &&
            product.categories
              .map((category) => category.toLowerCase())
              .includes("accessories") // Ensure case-insensitive match
        );
      } else {
        filteredList = newList.filter(
          (product) =>
            product.categories &&
            product.categories.includes(filtersFromUrl.category)
        );
      }

      console.log("After filtering:", filteredList);

      // Apply additional filters excluding 'sort'
      let filters = {};
      Object.keys(filtersFromUrl).forEach((key) => {
        if (key !== "sort") {
          filters[key] = filtersFromUrl[key].includes(",")
            ? filtersFromUrl[key].split(",")
            : [filtersFromUrl[key]];
        }
      });

      console.log("Filtered List before MatchesFilter", filteredList);

      // Filter products based on filters
      filteredList = filteredList.filter((product) =>
        matchesFilter(product, filters)
      );

      console.log("Filtered List after MatchesFilter", filteredList);
      

      // Apply sorting to the filtered list
      applySorting(filteredList, filtersFromUrl.sort);

      // Pagination
      const paginatedProducts = filteredList.slice(startIndex, endIndex);

      return {
        paginatedProducts,
        totalProducts: filteredList.length,
      };

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
          console.log("🚀 ~ returnObject.entries ~ key:", key)
          const productValue = product[key];

          
      
          // If color, check if product colors contain any of the filter colors
          if (key === "color") {
            const colorMatch = product.colors?.some(productColor =>
              filterValues.includes(productColor.name?.toLowerCase())
            );
            console.log('Color match for', product.name, ':', colorMatch);
            return colorMatch;
          }

          if(key === "category") {
            const categoryMatch = product.categories?.some(productCategory =>
              filterValues.includes(productCategory.toLowerCase())
            );
            console.log('Category match for', product.name, ':', categoryMatch);
            return categoryMatch;
          }
      
          // If the product value is an array, check if it includes any of the filter values
          if (Array.isArray(productValue)) {
            const arrayMatch = filterValues.some(value =>
              productValue.map(val => val.toLowerCase()).includes(value.toLowerCase())
            );
            console.log('Array match for', product.name, ':', arrayMatch);
            return arrayMatch;
          }
      
          // If it's a string or number, check for an exact match (case insensitive)
          if (typeof productValue === 'string' || typeof productValue === 'number') {
            const directMatch = filterValues.includes(productValue.toString().toLowerCase());
            console.log('Direct match for', product.name, ':', directMatch);
            return directMatch;
          }
      
          // If none of the above, log and return false
          console.log('No match for', product.name, 'and filter', key);
          return false;
        });
      }
      
      
    },
    FIND_PRODUCTS_FROM_ALL_LISTS_BY_NAME({ state, commit }, name) {
      let newList = [
        ...state.allProductsOfCategory,
        ...[state.productDetailProduct], // Spread the productDetailProduct as an array
        ...state.trendingProducts,
      ];
      console.log(name);
      let products = newList.filter((p) => p.name.toLowerCase().includes(name));
      console.log(products);

      return products;
    },

    SUBMIT_ORDER({ state, commit }, { checkoutForm, cart }) {
      // First grab the payment method from the checkoutForm
      const paymentMethod = checkoutForm.paymentType;

      // Then submit the payment and the cart to your server
      console.log(checkoutForm);
      if (paymentMethod === "stripe") {
        // Initiatate the payment process with Stripe
        console.log("Payment initiated with Stripe");
        redirectToStripeCheckoutWithProducts(cart, state.currency.id);
      }
    },
  },
  modules: {},
});
