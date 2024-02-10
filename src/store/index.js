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
    cart: [],
  },
  mutations: {
    setCurrency(state, currency) {
      state.currency = currency;
    },
  },
  actions: {},
  modules: {},
});
