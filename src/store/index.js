import { createStore } from "vuex";
import { redirectToStripeCheckoutWithProducts } from "../helpers/paymentHelper";
import router from "../router";
import {
  createGETRequestAsync,
  createPOSTRequestAsync,
  createPUTRequestAsync,
} from "../helpers/requestHelper";
import { applySorting, matchesFilter } from "../helpers/productHelper";

const cartPersistPlugin = (store) => {
  store.subscribe((mutation, state) => {
    if (
      mutation.type.startsWith("ADD_TO_CART") ||
      mutation.type.startsWith("SET_CART") ||
      mutation.type.startsWith("removeProductFromCart")
    ) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }

    if (mutation.type.startsWith("SET_ISLOGGEDIN")) {
      localStorage.setItem("isLoggedIn", state.isLoggedIn);
      localStorage.setItem("user", JSON.stringify(state.user));
    }

    if (mutation.type.startsWith("setCurrency")) {
      localStorage.setItem("currency", JSON.stringify(state.currency));
    }
  });
};

export default createStore({
  plugins: [cartPersistPlugin],
  state: {
    deliveryMethods: [
      {
        id: 1,
        title: "Standard",
        turnaround: "4–10 business days",
        price: "5.00",
        active: false,
      },
      {
        id: 2,
        title: "Express",
        turnaround: "2–5 business days",
        price: "16.00",
        active: false,
      },
    ],
    shippingRate: import.meta.env.VITE_SHIPPING_RATE || 5,
    showSearchDialog: false,
    productsPerPage: 12,
    taxRate: import.meta.env.VITE_TAX_RATE_PERCENTAGE || 0.21,
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
        price: "10",
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
        categories: ["New Arrivals", "Men's Fashion", "men"],
      },
      {
        inStock: true,
        quantity: 1,
        id: 8,
        rating: 3,
        name: "Essential Cotton T-Shirt",
        category: "men",
        color: "#ece7dd",
        size: { height: 70, width: 50 }, // Update these dimensions if necessary
        href: "#",
        images: [
          {
            id: 3,
            name: "Front view",
            src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg", // Replace with the actual URL of the t-shirt image
            alt: "Front of men's Essential Cotton T-Shirt in beige.",
          },
        ],
        price: "20", // Update the price if necessary
        colors: [
          {
            name: "Off-White",
            bgColor: "#ece7dd",
            selectedColor: "ring-black",
          }, // Adjust the color name and value if needed
        ],
        description:
          "<p>Our Essential Cotton T-Shirt is a must-have in any wardrobe. Made from 100% pure cotton, it offers unparalleled comfort and a classic fit for everyday wear.</p>",
        details: [
          {
            name: "Features",
            items: [
              "100% cotton for full comfort",
              "Classic fit",
              "Crew neck",
              "Short sleeves",
            ],
          },
          { name: "Materials", items: ["100% cotton"] },
        ],
        categories: ["Basics", "Men's Fashion", "T-Shirts", "men"], // Adjust the categories to fit the product
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
        name: "Casual T-Shirt",
        category: "women",
        color: "#f7e2d1",
        size: { height: 70, width: 50 }, // Assuming the size represents a t-shirt, adjust if necessary
        href: "#",
        images: [
          {
            id: 5,
            name: "Product view",
            src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg", // Keep or update the image URL if you have a new one
            alt: "Casual T-Shirt in pink.",
          },
        ],
        price: "25",
        colors: [
          { name: "Pink", bgColor: "#f7e2d1", selectedColor: "ring-black" },
        ],
        description:
          "<p>This casual t-shirt is perfect for everyday wear. Made from soft fabric, it offers comfort and style with its unique dot pattern design.</p>",
        details: [
          {
            name: "Features",
            items: [
              "Soft fabric",
              "Unique dot pattern",
              "Comfortable fit",
              "Easy to wash",
            ],
          },
          { name: "Materials", items: ["Cotton blend"] }, // Assuming it's a cotton blend, adjust if necessary
        ],
        categories: ["Women's Fashion", "T-Shirts", "women"], // Adjusted categories
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
        shipsInAmountOfDays: 2,
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
        name: "Desk Organizer Set",
        category: "office",
        color: "#84614a", // This is a brown color that seems to match the wooden part
        size: { height: 10, width: 40 }, // Update these dimensions if necessary
        colors: [
          {
            name: "White & Wood",
            bgColor: "#84614a",
            selectedColor: "ring-black",
          },
        ],
        inStock: true,
        price: "58", // Update the price if necessary
        href: "#",
        images: [
          {
            id: 7,
            name: "Product view",
            src: "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-01.jpg", // Replace with the actual URL of the desk organizer image
            alt: "Elegant desk organizer set in white and wood.",
          },
        ],
        description:
          "<p>Keep your desk tidy and stylish with this Desk Organizer Set. Featuring a combination of white compartments and a rich wooden base, it's perfect for sorting all your office essentials.</p>",
        details: [
          {
            name: "Features",
            items: [
              "Multi-compartment design",
              "Elegant white and wood finish",
              "Durable construction",
              "Perfect for office organization",
            ],
          },
          {
            name: "Materials",
            items: ["Wood", "Plastic compartments"],
          },
        ],
        categories: ["Accessories", "Desk Organizers"],
      },
      {
        rating: 3,
        quantity: 1,
        id: 3,
        name: "Precision Roller Pens",
        category: "office",
        color: "black",
        size: { height: 15, width: 1 }, // Update these dimensions if necessary
        colors: [
          {
            name: "Black",
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
            alt: "Two black precision roller pens.",
          },
        ],
        description:
          "Experience smooth writing with our Precision Roller Pens. Engineered for clean lines and precision detail, these pens are perfect for your office needs.",
        details: [
          {
            name: "Features",
            items: [
              "Precision rollerball tip",
              "Ergonomic design",
              "Waterproof ink",
            ],
          },
          {
            name: "Materials",
            items: ["Aluminum body", "Stainless steel tip"],
          },
        ],
        categories: ["Office Supplies", "Writing Instruments", "Accessories"], // Example categories
      },
      {
        inStock: false,
        shipsInAmountOfDays: 2,
        rating: 2,
        quantity: 1,
        id: 4,
        name: "Inspirational Notebook Set",
        category: "stationery",
        color: "mixed",
        size: { height: 20, width: 13 }, // Approximate size of a notebook, adjust as necessary
        colors: [
          {
            name: "Beige",
            bgColor: "#d2b48c",
            selectedColor: "ring-black",
          },
          {
            name: "Dark Brown",
            bgColor: "#5a504f",
            selectedColor: "ring-black",
          },
        ],
        price: "12", // Adjust the price as necessary
        href: "#",
        images: [
          {
            id: 9,
            name: "Product view",
            src: "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-04.jpg",
            alt: "Three-piece inspirational notebook set in kraft and black.",
          },
        ],
        description:
          "This set of three notebooks inspires creativity and motivation with its unique quotes and sturdy kraft paper construction. Perfect for jotting down ideas, sketches, or journaling.",
        details: [
          {
            name: "Features",
            items: [
              "3-piece set",
              "Inspirational quotes",
              "Compact and portable",
            ],
          },
          {
            name: "Materials",
            items: ["Kraft paper", "Recycled paper"],
          },
        ],
        categories: ["Accessories", "Stationery", "Notebooks", "Gift Ideas"],
      },
    ],
    currency: JSON.parse(localStorage.getItem("currency")) || {
      code: "EUR",
      name: "Euro",
      fullDescription: "Euro",
      symbol: "€",
    },
    currencies: [
      {
        code: "CAD",
        name: "Canadian Dollar",
        symbol: "$",
      },
      { code: "USD", name: "US Dollar", symbol: "$" },
      {
        code: "AUD",
        name: "Australian Dollar",
        fullDescription: "Australian Dollar",
        symbol: "$",
      },
      { code: "EUR", name: "Euro", symbol: "€" },
      {
        code: "GBP",
        name: "British Pound",
        symbol: "£",
      },
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
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    products: [],
  },
  mutations: {
    updateProductPrice(state, { productId, price }) {
      const productIndex = state.cart.findIndex(
        (product) => product.product.id === productId
      );
      if (productIndex !== -1) {
        state.cart[productIndex].product.price = price;
      }
    },
    UPDATE_PRODUCT_PRICE(state, { productId, price }) {
      const productIndex = state.cart.findIndex(
        (product) => product.product.id === productId
      );
      if (productIndex !== -1) {
        state.cart[productIndex].product.price = price;
      }
    },
    
    SET_CART(state, cart) {
      state.cart = cart;
    },
    ADD_TO_CART(state, { product, color }) {
      // Ensure that product and color are defined before proceeding
      if (!product || !color) {
        console.error('Product or color is undefined', product, color);
        return; // Exit the mutation if the check fails
      }
  
      // Use optional chaining to safely access nested properties
      const index = state.cart.findIndex((item) =>
        item.product?.id === product.id && item.color?.id === color.id
      );
  
      if (index !== -1) {
        // Increase the quantity of the existing cart item
        state.cart[index].quantity += 1;
      } else {
        // Create a new cart item with the product and color
        const newCartItem = {
          product: {
            ...product,
            quantity: 1 // Start with a quantity of 1
          },
          color, // Use the color object directly
        };
        state.cart.push(newCartItem);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    TRIGGER_NOTIFICATION(state, notification) {
      state.notification = notification;
      const { duration } = notification;
      if (duration) {
        setTimeout(() => {
          state.notification.show = false;
        }, duration);
      }
    },
    SET_ISLOGGEDIN(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
      localStorage.setItem("isLoggedIn", isLoggedIn);
    },
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
        (product) => product.product.id === productId
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
    async REMOVE_FROM_CART({ commit }, productId) {
      commit("removeProductFromCart", productId);
      // If user is logged in, remove the product from the cart in the database
      if (state.isLoggedIn && state.user) {
        // Also remove the product from the cart in the database
        const data = {
          cartId: localStorage.getItem("cartId"),
          productId: productId,
        };
        const response = await createDELETERequest(
          "/shoppingcart/"+localStorage.getItem("cartId"),
          data
        );
      }
    },
    async GET_PRODUCT_PRICE_BY_ID({ commit }, productId) {
      const response = await createGETRequestAsync(
        `/product-detail/getProductPriceById/${productId}`
      );
      const product = await response.json();
      commit('UPDATE_PRODUCT_PRICE', { productId, price: product });
    },
    async CREATE_OR_LOAD_CART({ state, commit }, uid) {
      // If user is logged in, create or load the cart from the database
      if (state.isLoggedIn) {
        // if user already added things to cart and cartId is not present in localStorage
        if (!localStorage.getItem("cartId" )) {
          // Upload the cart to the database
          const data = {
            uid: uid,
            products: JSON.parse(localStorage.getItem("cart")),
          };

          const response = await createPOSTRequestAsync(
            "/shoppingcart-detail/createCart",
            data
          );
          const dt = await response.json();
          localStorage.setItem("cartId", dt.id);
        }
        else {
          // Load the cart from the database
          const response = await createGETRequestAsync(
            `/shoppingcart-detail/getCartById/${localStorage.getItem("cartId")}`
          );
          const cart = await response.json();
          commit("SET_CART", cart.Products);
        }
      }
    },
    async UPDATE_PRODUCT_QUANTITY_IN_CART(
      { state, commit },
      { productId, quantity }
    ) {
      commit("updateProductQuantity", { productId, quantity });
      const productIndex = state.cart.findIndex(
        (product) => product.product.id === productId
      );

      if (productIndex !== -1) {
        state.cart[productIndex].quantity = quantity;
        // Persist the updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));

        // If user is logged in, update the cart in the database
        if (state.isLoggedIn && state.user) {
          // Also update the cart in the database
          const data = {
            cartId: localStorage.getItem("cartId"),
            productId: state.cart[productIndex].product.id,
            newQuantity: quantity,
          };
          const response = await createPUTRequestAsync(
            "/shoppingcart-detail/changeProductQuantityInCart",
            data
          );
        }
      }
    },
    async GET_TRENDING_PRODUCTS({ state, commit }) {
      // Fetch trending products from your API here
      const response = await createGETRequestAsync(
        "/product-detail/getTrendingProducts"
      );
      const trendingProducts = await response.json();
      return trendingProducts.slice(
        0,
        import.meta.env.VITE_TRENDING_PRODUCTS_COUNT
      );
    },
    async addToCart({ commit }, { product, color, cartId }) {
      // Commit the ADD_TO_CART mutation with the product and color
      commit("ADD_TO_CART", { product, color });
    
      // Prepare the data to be sent to the server, including the product_color
      const data = {
        cartId: cartId,
        uid: JSON.parse(localStorage.getItem("user")).id,
        productToAdd: {
          ...product,
          product_color: color.name, // Ensure the product_color is included
        },
      };

    
      if (localStorage.getItem("user")) {
        // Make the API call to update or create the cart with the product_color
        const response = await createPUTRequestAsync(
          "/shoppingcart-detail/updateOrCreateCart",
          data
        );

    
        try {
          const dt = await response.json();
          localStorage.setItem("cartId", dt.id);
        } catch (err) {

        }
      }
    
      // Update notification state
      commit("TRIGGER_NOTIFICATION", {
        show: true,
        title: "Success",
        message: "Product added to cart",
        type: "success",
        duration: 3000,
      });
    },
    
    async LOAD_PRODUCTS_FROM_STRAPI({ state, commit }) {
      // Fetch all products from your API here

      const response = await createGETRequestAsync(
        "/product-detail/getAllProducts"
      );
      const products = await response.json();

      commit("SET_PRODUCTS", products);
    },
    async CREATE_USER_ON_STRAPI({ state, commit }, user) {
      // Submit the user to your API here
      const response = await createPOSTRequestAsync(
        "/authentication/signInWithGoogle",
        {
          email: user.email,
          name: user.displayName,
          uid: user.uid,
        }
      );

      const data = await response.json();

    },
    SIGN_OUT({ state, commit }) {
      commit("SET_USER", null);
      commit("SET_ISLOGGEDIN", false);
      router.push("/");
    },
    SUBMIT_NEWSLETTER({ state, commit }, email) {
      // Submit the email to your API here

    },
    async FIND_PRODUCT_FROM_ALL_LISTS({ state, commit }, productId) {
      const response = await createGETRequestAsync(
        `/product-detail/getProductById/${productId}`
      );
      const product = await response.json();
      return product;
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

      const response =
        (await createPOSTRequestAsync("/product-detail/getFilteredProducts", {
          filters: filtersFromUrl,
        })) || [];

      const filteredList = await response.json();

      // Pagination
      if (!Array.isArray(filteredList)) {
        return {
          paginatedProducts: [],
          totalProducts: 0,
        };
      }
      const paginatedProducts = filteredList.slice(startIndex, endIndex);

      return {
        paginatedProducts,
        totalProducts: filteredList.length,
      };
    },
    FIND_PRODUCTS_FROM_ALL_LISTS_BY_NAME({ state, commit }, name) {
      let products = state.products.filter((p) =>
        p.name.toLowerCase().includes(name)
      );

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
        redirectToStripeCheckoutWithProducts(cart, state.currency.code);
      }
    },
  },
  modules: {},
});
