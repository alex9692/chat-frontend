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
    lobbies: [],
    error: null
  },
  mutations: {
    setUserData: (state, payload) => {
      state.token = payload.token;
      state.userId = payload.userId;
    },
    setSocket: (state, payload) => {
      if (!state.socket) state.socket = io('http://localhost:5001');
      state.socket.emit(payload, state.userId);
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
    },
    setError: (state, payload) => {
      state.error = payload;
      setTimeout(() => {
        state.error = null;
      }, 5000);
    }
  },
  actions: {
    signin: async ({ commit }, payload) => {
      try {
        const response = await userInstance.post('/sign-in', payload);

        commit('setUserData', response.data.data);
        commit('setAuth', true);
        commit('setSocket', 'connection-established');
        router.push('/enter-room');
      } catch (error) {
        commit('setError', error.response.data);
        console.log(error.response);
      }
    },
    register: async ({ commit }, payload) => {
      try {
        await userInstance.post('/sign-up', payload);
        router.push('/sign-in');
      } catch (error) {
        if (error.response.data.message.includes('duplicate')) {
          commit('setError', { message: 'User already exist!' });
        }
        console.log(error.response);
      }
    },
    enterRoom: async ({ commit }, payload) => {
      try {
        const response = await lobbyInstance.get('/', { params: payload });
        if (response.data.results === 0) {
          throw new Error("Lobby doesn't exist");
        }
        commit('setSelectedLobby', response.data.data.lobbies[0]);
        router.push(`/room/${response.data.data.lobbies[0]._id}`);
      } catch (error) {
        commit('setError', { message: error.message });
        console.log(error.message);
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
    getLobbyList: async ({ commit, state }) => {
      try {
        const response = await lobbyInstance.get('/', {
          params: { id: state.userId }
        });
        commit('setAllLobbies', response.data.data.lobbies);
      } catch (error) {
        console.log(error.response);
      }
    },
    logout: ({ commit, state }) => {
      commit('setAuth', false);
      commit('setUser', null);
      commit('setSelectedLobby', null);
      commit('setSelectedLobbyMessages', []);
      commit('setAllLobbies', []);
      commit('setSocket', 'log-out');
      commit('setUserData', { token: '', userId: '' });
      router.replace('/');
    }
  },
  getters: {}
});
