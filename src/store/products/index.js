import Vue from 'vue'

const state = {
  // продукты
  products: [],

  // строки в процессе изменения
  locked: {},
};

const getters = {};

const mutations = {
  lock(state, ids) {
    ids.forEach(id => Vue.set(state.locked,  id, true));
  },

  unLock(state, ids) {
    // ids.forEach(id => Vue.delete(state.locked, id, true));
  },

  AFTER_GET(state, payload) {
    console.log('AFTER_GET', payload);
    payload.data.forEach(item => state.products.push(item));
  },

  AFTER_DELETE(state, payload) {
    console.log('AFTER_DELETE', payload)

    // разблокировать и удалить
    payload.requestData.forEach(id => {
      // разблокировать
      Vue.delete(state.locked, id);
      // удалить из products
      state.products.splice(state.products.findIndex(i => i.id == id), 1);
    });

  },
};

const actions = {
  delete({commit, dispatch}, ids) {
    // блокируем строки
    commit('lock', ids);

    dispatch('api/request', ['products/delete', ids], {root: true});
  },
};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
