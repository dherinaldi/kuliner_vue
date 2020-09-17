// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuex from 'vuex'

/*import Abbreviaton from '@/assets/js/abbreviation-autocomplete.js';
import '@/assets/css/abbreviation-autocomplete.css';*/

Vue.use(VueToast);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Vuex);


Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
  	increment: state => state.count++,
  	add_increment (state, payload){
  		state.count += payload;
  	}, 
    decrement: state => state.count--,
    min_decrement : (state, payload) => {
    	state.count -= payload;
    }
  },
  actions:{
  	increment_act ({commit}) {
  		commit('increment');
  	},
  	add_increment_act ({commit}, payload){
  		commit('add_increment', payload);
  	},
  	decrement_act ({commit}){
  		commit('decrement');
  	},
  	min_decrement_act ({commit}, payload){
  		commit('min_decrement', payload);
  	},
  },
  getters:{
  	double_data : (state) =>{
  		return state.count * 2;
  	}
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
