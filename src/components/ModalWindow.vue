<template>
  <div class="wrapper">
    <div class="header">{{ settings.name }}</div>
    <div class="content">
      <component
        :is="settings.name"
        :property="settings"
        :cat_sl="catSl"
        @addNewPayment="eventEmmit"
      />
    </div>
    <div class="footer">
      <button @click="$modal.hide()">Close</button>
    </div>
  </div>
</template>

<script>
import AddPayment from "./AddPayment.vue";
import Button from "./Button.vue";
import Calc from "./Calc.vue";
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  components: { AddPayment, Calc, Button },
  props: {
    settings: Object,
    catSl: {
      type: String,
      default: "",
    },
  },
  /*computed: {
    nSettings: function (data) {
      return data;
    },
  },*/
  watch: {
    settings: {
      handler(settings) {
        this.data = settings;
      },
      immediate: true,
    },
  },
  methods: {
    eventEmmit(data) {
      console.log(data);
      this.addDataToPaymentsList(data);
    },
        ...mapMutations([
      "setPaymentListData",
      "addDataToPaymentsList",
      "addCategory",
    ]),
        ...mapActions(["fetchData", "fetchCategory"]),
    addData(data) {
      console.log("push to state", data);
      // this.paymentsList.push(data)
      // this.paymentsList = [...this.paymentsList, data]
      this.addDataToPaymentsList(data);
    },
  },
  computed: {
    ...mapGetters({
      paymentsList: "getPaymentList",
      categories: "getCategoryList",
    }),
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  padding: 20px;
  position: absolute;
  top: 70px;
  background: #adadad;
}

.footer {
  display: flex;
  justify-content: center;
}

.edit {
  visibility: hidden;
}

.delete {
  visibility: hidden;
}
</style>
