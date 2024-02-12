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
    productDetailProduct: {
      name: "Zip Tote Basket",
      id: 12,
      quantity: 1,
      price: "140",
      inStock: true,
      rating: 4,
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
        {
          name: "Dimensions",
          items: ["14” x 14” x 5”", "32L capacity"],
        },
      ],
    },
    allProductsOfCategory: [
      {
        inStock: true,
        quantity: 1,
        id: 7,
        rating: 5,
        name: "Basic Tee",
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
          {
            name: "Black",
            bgColor: "black",
            selectedColor: "ring-black",
          },
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
          {
            name: "Materials",
            items: ["100% cotton"],
          },
        ],
      },
      {
        quantity: 1,
        inStock: true,
        id: 8,
        name: "Classic Hoodie",
        rating: 4,
        href: "#",
        images: [
          {
            id: 3, // Assuming a new ID for each image
            name: "Front view",
            src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
            alt: "Front of men's Classic Hoodie in gray.",
          },
        ],
        price: "65",
        colors: [
          {
            name: "Gray",
            bgColor: "#ece7dd",
            selectedColor: "ring-black",
          },
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
          {
            name: "Materials",
            items: ["50% cotton, 50% polyester"],
          },
        ],
      },
      {
        quantity: 1,
        inStock: true,
        id: 9,
        name: "Slim Fit Jeans",
        rating: 3,
        href: "#",
        images: [
          {
            id: 4, // Assuming a new ID for each image
            name: "Front view",
            src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
            alt: "Front of men's Slim Fit Jeans in blue.",
          },
        ],
        price: "50",
        colors: [
          {
            name: "Blue",
            bgColor: "#52505b",
            selectedColor: "ring-black",
          },
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
          {
            name: "Materials",
            items: ["98% cotton, 2% elastane"],
          },
        ],
      },
      {
        quantity: 1,
        inStock: true,
        id: 10,
        name: "Leather Belt",
        href: "#",
        rating: 2,
        images: [
          {
            id: 5, // Assuming a new ID for each image
            name: "Product view",
            src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg",
            alt: "Leather Belt in brown.",
          },
        ],
        price: "25",
        colors: [
          {
            name: "Brown",
            bgColor: "#f7e2d1",
            selectedColor: "ring-black",
          },
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
          {
            name: "Materials",
            items: ["100% leather"],
          },
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
        quantity: 1,
        id: 1,
        name: "Leather Long Wallet",
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
            id: 6, // New ID for the image
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
        quantity: 1,
        id: 2,
        name: "Hatch Frame",
        inStock: true,
        colors: [
          {
            name: "Black",
            bgColor: "#84614a",
            selectedColor: "ring-black",
          },
        ],
        price: "58",
        href: "#",
        images: [
          {
            id: 7, // New ID for the image
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
        quantity: 1,
        id: 3,
        name: "Leather Key Loop",
        inStock: true,
        colors: [
          {
            name: "Natural",
            bgColor: "black",
            selectedColor: "ring-black",
          },
        ],
        price: "16",
        href: "#",
        images: [
          {
            id: 8, // New ID for the image
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
        quantity: 1,
        id: 4,
        inStock: true,
        name: "Machined Mechanical Pencil",
        colors: [],
        price: "35",
        href: "#",
        images: [
          {
            id: 9, // New ID for the image
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
  },
  mutations: {
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
      const index = state.cart.findIndex((item) => item.product.id === product.product.id);
      
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
      const index = state.cart.findIndex((item) => item.product.id === productId);
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
    FIND_PRODUCT_FROM_ALL_LISTS({ state, commit }, productId) {
      let newList = [
        ...state.allProductsOfCategory,
        ...[state.productDetailProduct], // Spread the productDetailProduct as an array
        ...state.trendingProducts,
      ];
      newList.forEach((p) => {
      });
      let product = newList.filter((p) => p.id === Number.parseInt(productId));
      return product[0];
    },
  },
  modules: {},
});
