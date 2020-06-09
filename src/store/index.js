import Vue from 'vue'
import Vuex from 'vuex'

import api from './api'
import products from './products'

Vue.use(Vuex);

export default function () {
  const Store = new Vuex.Store({
    modules: {
      api,
      products
    },
  });

  return Store
}
