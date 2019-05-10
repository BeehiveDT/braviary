
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueClipboards from 'vue-clipboards';
import VTooltip from 'v-tooltip';
import {routes} from './routes';    // {routes} because importing a const.
import StoreData from './store/store';
import MainApp from './components/MainApp.vue';
import { config as BraviaryConfig } from './config';

import Bootstrap from 'bootstrap'

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faClipboard, faEdit, faTrashAlt, faPaperPlane, faPlus, faFeatherAlt, faRedo, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
// import { faGooglePlus } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faClipboard, faEdit, faTrashAlt, faTimesCircle, faPaperPlane, faPlus, faFeatherAlt, faRedo, faExclamationTriangle);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueClipboards);
Vue.use(VTooltip);

// moment
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
let _timeZone = moment.tz.guess();
moment.tz.setDefault(_timeZone);
Vue.use(VueMoment, { moment })

// 設定 config
Vue.prototype.$config = BraviaryConfig;

const store = new Vuex.Store(StoreData);

export const router = new VueRouter({
    mode: 'history',
    base: '/braviary', 
    routes,                         // short for `routes: routes`
    linkActiveClass: 'active'
});

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// Vue.component('example-component', require('./components/ExampleComponent.vue'));



// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key)))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    moment,
    store,
    router,
    components:{
        MainApp
    },
    beforeCreate() {
        console.log(`before create`);
    },
    created(){
        console.log(`created`);
        // this.$store.commit('user/initializeStore');
        // if(this.$store.state.user.userLoggedIn){
        //     this.$store.dispatch('user/retrieveUserProfile')
        // }
        // 設定 API URL
        this.$config.setAPI_BaseURL();
    },
    beforeMount(){
        console.log(`before mount`)
        this.$store.commit('user/initializeStore');
        if(this.$store.state.user.userLoggedIn){
            this.$store.dispatch('user/retrieveUserProfile');
        }
    },
    mounted(){
        console.log(`mounted`)
    },
    beforeUpdate(){
        console.log(`beforeUpdate`)
    },
    updated(){
        console.log(`updated`)
    },
    beforeDestroy(){
        console.log(`beforeDestroy`)
    },
    destroyed(){
        console.log(`destroyed`)
    }
});
