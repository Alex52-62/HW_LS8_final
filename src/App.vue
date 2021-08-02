<template>
  <v-app>
    <v-app-bar app>
      <v-btn plain :ripple="false" to="/Dashboard">Dashboard</v-btn>

      <v-btn plain :ripple="false" to="/about">About</v-btn>

      <v-btn plain :ripple="false" to="/NotFound">NotFound</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <transition name="fade">
      <modal-window v-if="modalSettings.name" :settings="modalSettings" />
    </transition>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    ModalWindow: () =>
      import(
        /* webpackChunkName: 'ModalWindow' */ "./components/ModalWindow.vue"
      ),
  },
  data() {
    return {
      modalShown: false,
      modalSettings: {},
    };
  },
  methods: {
    onShown(settings) {
      this.modalSettings = settings;
      // console.log(this)
    },
    onHide() {
      this.modalSettings = {};
    },
  },
  mounted() {
    this.$modal.EventBus.$on("shown", this.onShown);
    this.$modal.EventBus.$on("hide", this.onHide);
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("shown", this.onShown);
    this.$modal.EventBus.$off("hide", this.onHide);
  },
};
</script>

<style lang="scss" module>
html,
body,
.app {
  width: 100%;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

