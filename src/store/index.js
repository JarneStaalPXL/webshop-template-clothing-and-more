import { createStore } from "vuex";

export default createStore({
  state: {
    currency:  { id: "eur", name: "EUR", description: "Euro", symbol: "€" },
    currencies: [
        { id: "cad", name: "CAD", description: "Canadian Dollar", symbol: "$" },
        { id: "usd", name: "USD", description: "US Dollar", symbol: "$" },
        { id: "aud", name: "AUD", description: "Australian Dollar", symbol: "$" },
        { id: "eur", name: "EUR", description: "Euro", symbol: "€" },
        { id: "gbp", name: "GBP", description: "British Pound", symbol: "£" },
      ],
      trendingProducts: [
        {
          id: 1,
          name: "Leather Long Wallet",
          color: "Natural",
          price: "75",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
          imageAlt: "Hand stitched, orange leather long wallet.",
        },
        {
          id: 2,
          name: "Hatch Frame",
          color: "Black",
          price: "58",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-01.jpg",
          imageAlt: "Front of black cotton t-shirt with hatch pattern.",
        },
        {
          id: 3,
          name: "Leather Key Loop",
          color: "Natural",
          price: "16",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-03.jpg",
          imageAlt: "Hand-stitched, orange leather key loop.",
        },
        {
          id: 4,
          name: "Machined Mechanical Pencil",
          color: "Black",
          price: "35",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-04.jpg",
          imageAlt: "Black machined steel mechanical pencil.",
        },
      ],
    cart: [],
    notification:
      {
        show: false,
        title: "TEST",
        message: "test",
        type: "success",
        closeButton: "Close"
      },
  },
  mutations: {
    setCurrency(state, currency) {
      state.currency = currency;
    },
    addToCart(state, product) {
      state.cart.push(product);
      state.notification = {
        show: true,
        title: "Success",
        message: "Product added to cart",
        type: "success",
        closeButton: "Close"
      
      };
      //TODO: Fix this cuz it's buggy
      setInterval(() => {
        state.notification.show = false;
      }, 5000);
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1);
    },
    closeNotification(state) {
      state.notification.show = false;
    }
  },
  actions: {},
  modules: {},
});
