// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { mapState,mapMutations,mapGetters,mapActions } from 'vuex'

Vue.config.productionTip = false

/* eslint-disable no-new */
const historyStack = {
    data: {
        history: [],
        forward: true
    },
    watch: {
        '$route' (to, from) {
            document.title=to.meta.txt;
            if(this.history.length > 0 && to.path == this.history[this.history.length - 1]){
                this.forward = false;
                this.history.pop();
            }else{
                this.forward = true;
                this.history.push(from.path);
            }
        }
    }
};

new Vue({
  el: '#app',
  router,
  store,
  mixins: [historyStack],
  template: '<App :forward="forward"/>',
  components: { App }
  // render: x => x(App),
})
