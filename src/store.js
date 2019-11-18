import Vue from 'vue';
import Vuex from 'vuex';

import * as io from 'socket.io-client';
import { userInstance, lobbyInstance, chatInstance } from './axios';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false,
    token: '',
    userId: '',
    user: null,
    selectedLobby: null,
    messages: [],
    socket: null,
    lobbies: []
  },
  mutations: {
    setUserData: (state, payload) => {
      state.token = payload.token;
      state.userId = payload.userId;
    },
    setSocket: state => {
      state.socket = io('http://localhost:5001');
      state.socket.emit('connection-established', state.userId);
    },
    setAuth: (state, payload) => {
      state.isAuth = payload;
    },
    setSelectedLobby: (state, payload) => {
      state.selectedLobby = payload;
    },
    setSelectedLobbyMessages: (state, payload) => {
      state.messages = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    pushNewMessage: (state, payload) => {
      state.messages.push(payload);
    },
    setAllLobbies: (state, payload) => {
      state.lobbies = payload;
    }
  },
  actions: {
    signin: async ({ commit }, payload) => {
      try {
        const response = await userInstance.post('/sign-in', payload);

        commit('setUserData', response.data.data);
        commit('setAuth', true);
        commit('setSocket');
        router.push('/enter-room');
      } catch (error) {
        console.log(error.response);
      }
    },
    register: async (_, payload) => {
      try {
        await userInstance.post('/sign-up', payload);
        router.push('/sign-in');
      } catch (error) {
        console.log(error.response);
      }
    },
    enterRoom: async ({ commit, state }, payload) => {
      try {
        const response = await lobbyInstance.get('/', { params: payload });
        commit('setSelectedLobby', response.data.data.lobbies[0]);
        router.push(`/room/${response.data.data.lobbies[0]._id}`);
      } catch (error) {
        console.log(error.response);
      }
    },
    submitMessage: async ({ state }, payload) => {
      try {
        const response = await lobbyInstance.post(
          `/${state.selectedLobby._id}/messages`,
          payload,
          { headers: { Authorization: `Bearer ${state.token}` } }
        );
        state.socket.emit('get-message-id', response.data.data.message._id);
      } catch (error) {
        console.log(error.response);
      }
    },
    getMessages: async ({ commit, state }) => {
      try {
        const response = await lobbyInstance.get(
          `/${state.selectedLobby._id}/messages`,
          { headers: { Authorization: `Bearer ${state.token}` } }
        );
        commit('setSelectedLobbyMessages', response.data.data.messages);
      } catch (error) {
        console.log(error.response);
      }
    },
    getUser: async ({ commit, state }) => {
      try {
        const response = await userInstance.get(`/${state.userId}`);
        commit('setUser', response.data.data.user);
      } catch (error) {
        console.log(error.response);
      }
    },
    pushMessage: ({ commit }, payload) => {
      commit('pushNewMessage', payload);
    },
    getLobbyList: async ({ commit }) => {
      try {
        const response = await lobbyInstance.get('/');
        commit('setAllLobbies', response.data.data.lobbies);
      } catch (error) {
        console.log(error.response);
      }
    },
    logout: ({ commit, state }) => {
      commit('setUserData', { token: '', userId: '' });
      commit('setAuth', false);
      commit('setUser', null);
      state.socket.emit('disconnect');
      router.replace('/');
    }
  },
  getters: {}
});
