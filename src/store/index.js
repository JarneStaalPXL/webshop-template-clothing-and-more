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
      color: "#676767",
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
          bgColor: "bg-gray-700",
          selectedColor: "ring-black",
        },
        { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
        {
          name: "Washed Gray",
          bgColor: "bg-gray-500",
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
      },
      {
        inStock: true,
        quantity: 1,
        id: 8,
        rating:3,
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
      },
      {
        inStock: true,
        quantity: 1,
        id: 10,
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
          { name: "Brown", bgColor: "#f7e2d1", selectedColor: "ring-black" },
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
    trendingProducts: [
      {
        rating: 5,
        quantity: 1,
        id: 1,
        name: "Leather Long Wallet",
        gender: "women",
        color: "#d5965f", // Color matching with "Natural"
        size: { height: 10, width: 20 }, // Assumed size based on product type
        colors: [
          {
            name: "Natural",
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
      },
      {
        rating: 4,
        quantity: 1,
        id: 2,
        name: "Hatch Frame",
        gender: undefined,
        color: "#84614a", // Color matching with "Black"
        size: { height: 30, width: 40 }, // Assumed size for a frame
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
      },
      {
        rating: 3,
        quantity: 1,
        id: 3,
        name: "Leather Key Loop",
        gender: undefined,
        color: "black", // Color explicitly stated
        size: { height: 2, width: 10 }, // Assumed size for a key loop
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
      },
      {
        rating: 2,
        quantity: 1,
        id: 4,
        name: "Machined Mechanical Pencil",
        gender: undefined,
        color: "black", // Assuming color based on description
        size: { height: 15, width: 1.5 }, // Assumed size for a mechanical pencil
        colors: [], // No colors defined in the original array
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
      { name: "All", href: "#"},
      { name: "Totes", href: "#" },
      { name: "Backpacks", href: "#" },
      { name: "Travel Bags", href: "#" },
      { name: "Hip Bags", href: "#" },
      { name: "Laptop Sleeves", href: "#" },
    ],
    filters: [
      {
        id: "color",
        name: "Color",
        options: [
          { value: "white", label: "White", checked: false },
          { value: "beige", label: "Beige", checked: false },
          { value: "blue", label: "Blue", checked: true },
          { value: "brown", label: "Brown", checked: false },
          { value: "green", label: "Green", checked: false },
          { value: "purple", label: "Purple", checked: false },
        ],
      },
      {
        id: "category",
        name: "Category",
        options: [
          { value: "new-arrivals", label: "New Arrivals", checked: false },
          { value: "sale", label: "Sale", checked: false },
          { value: "travel", label: "Travel", checked: true },
          { value: "organization", label: "Organization", checked: false },
          { value: "accessories", label: "Accessories", checked: false },
        ],
      },
      {
        id: "size",
        name: "Size",
        options: [
          { value: "2l", label: "2L", checked: false },
          { value: "6l", label: "6L", checked: false },
          { value: "12l", label: "12L", checked: false },
          { value: "18l", label: "18L", checked: false },
          { value: "20l", label: "20L", checked: false },
          { value: "40l", label: "40L", checked: true },
        ],
      },
    ],
  },
  mutations: {
    createColorFilters(state) {
      let newList = [
        ...state.allProductsOfCategory,
        state.productDetailProduct,
        ...state.trendingProducts,
      ];

      let colors = [];
      newList.forEach((p) => {
        if (p.colors) {
          p.colors.forEach((c) => {
            if (!colors.find((color) => color.value === c.name.toLowerCase())) {
              colors.push({
                value: c.bgColor,
                label: c.name,
                checked: false,
              });
            }
          });
        }
      });
      
      // Remove dups
      colors = colors.filter((c, index, self) =>
        index === self.findIndex((t) => t.value === c.value)
      );

      

      state.filters[0].options = colors;
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
    addToCart(state, product) {
      const index = state.cart.findIndex(
        (item) => item.product.id === product.product.id
      );

      if (index !== -1) {
        // Product exists in the cart, increase its quantity
        state.cart[index].quantity += 1;
      } else {
        // Product does not exist in the cart, add it
        // Ensure the product object has a quantity field or set it explicitly here
        const newProduct = { ...product, quantity: 1 }; // Ensure a quantity field is set
        state.cart.push(newProduct);
      }

      state.notification = {
        show: true,
        title: "Success",
        message: "Product added to cart",
        type: "success",
        closeButton: "Close",
      };
      setInterval(() => {
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
    FIND_PRODUCTS_FROM_ALL_LISTS_BY_FILTERS({ state, commit }, filters) {
      let newList = [
        ...state.allProductsOfCategory,
        state.productDetailProduct,
        ...state.trendingProducts,
      ];
    
      const matchesFilter = (product, filters) => {
        // Adjusted gender filter check
        const genderMatch = filters.gender ? 
          product.gender === undefined || // Include if gender is undefined
          product.gender.toLowerCase() === filters.gender.toLowerCase() : 
          true; // If no gender filter is specified, do not filter out this product
    
        // Additional filter checks (e.g., color, size) can follow the same pattern
        // Example for a color filter:
        const colorMatch = filters.color ?
          product.color && product.color.toLowerCase() === filters.color.toLowerCase() :
          true;
    
        // Example for a size filter:
        const sizeMatch = filters.size ?
          product.size && product.size.height === filters.size.height && product.size.width === filters.size.width :
          true;
    
        // Product must match all filters to be included
        return genderMatch && colorMatch && sizeMatch;
      };
    
      let products = newList.filter(product => matchesFilter(product, filters));
    
      // Assuming you want to do something with the filtered products, like return them
      console.log(products); // For debug purposes
      return products; // Or handle them as needed
    },
    
  },
  modules: {},
});
