<template>
  <div>Dashboard 
    <Dashboard ref="Dashboard"></Dashboard>
  </div>
</template>

<script>
import Dashboard from '../components/Dashboard.vue'

export default {
    name: "Dashboard",
      components: { Dashboard },
  props: {},
  data() {
    return {};
  },
  computed: {},
};
</script>