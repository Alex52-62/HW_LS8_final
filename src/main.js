import Vue from 'vue'
import App from './App.vue'

import modal from './plugins/ModalWindow'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';

Vue.use(Donut);


Vue.config.productionTip = false;
Vue.use(modal);

new Vue({
    render: h => h(App),
    store,
    vuetify,
    router
}).$mount('#app')