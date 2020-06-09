import Vue from 'vue'
import * as request from './api/request.js'

const NEW = 0, SEND = 1, ERROR = 2, RECIVED = 3;

/* requestId: {
  module:  '', // модуль отправивший запрос
  action:  '', // экшен
  params:  {}, // прааметры запроса
  status:  '',
  message: ''
}; */

const state = {
  // пул запросов
  pool: {},
};

const getters = {
  // количество ошибочных запросов в пуле
  errorQueries(state) {
    return Object.values(state.pool).filter(i => i.status === ERROR).length;
  },
};

const mutations = {
  // добавить запрос в очередь pool
  open(state, request) {
    Vue.set(state.pool, request.id, request);
  },

  // изменить статус запроса
  setStatus(state, payload) {
    if (payload.status === RECIVED) {
      Vue.delete(state.pool, payload.id);
    } else {
      state.pool[payload.id].status  = payload.status;
      state.pool[payload.id].message = payload.message;
    }
  },
};

const actions = {

  /**
   * создать запрос
   *
   * @param commit
   * @param dispatch
   * @param params
   */
  request({commit, dispatch}, params) {
    const [module, action] = params[0].split('/');
    const id               = Date.now();
    // создать запрос
    commit('open', {
      id,
      module,
      action,
      data:    params[1] || {},
      status:  NEW,
      message: '',
    });

    // отправить
    dispatch('send', id);
  },

  /**
   * Отправить запрос к api
   *
   * @param state
   * @param id
   */
  send({commit}, id) {
    const r = state.pool[id] || {};

    console.log('api/send', r);

    if (status in r && r.status === SEND) { // уже отправлен
      return;
    }
    commit('setStatus', {id, status: SEND, message: 'send'});

    const method = r.action + r.module.replace(/^./, r.module[0].toUpperCase());

    request[method](r.data)
      .then(data => {
        commit(r.module + '/AFTER_' + r.action.toUpperCase(), {requestData: r.data, data}, {root: true}); // передать результат
        //   commit('products/AFTER_GET', {requestData: r.data, data}, {root: true}); // передать результат
        commit('setStatus', {id, status: RECIVED, message: 'recived'}); // удалить запрос
      })
      .catch(reason => {
        commit('setStatus', {id, status: ERROR, message: reason.error});
      });
  },

  /**
   * Повторить запросы с ошибкой
   * @param state
   * @param dispatch
   */
  repeatQueries({state, dispatch}) {
    for (let id in state.pool) {
      if (state.pool[id].status === ERROR) {
        // отправить
        dispatch('send', id);
      }
    }
  },

};


export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
