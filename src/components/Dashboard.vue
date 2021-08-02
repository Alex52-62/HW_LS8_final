<template>
  <v-row id="Dashboard" :class="[$style.wrapper]">
    <v-col>
      <div class="text-h5 text-md-h3 mb-8">My personal cost</div>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <!--          <v-btn color="teal" dark v-on="on">ADD NEW CATEGORY <v-icon>mdi-plus</v-icon></v-btn>-->
          <v-btn color="teal" dark v-on="on"
            >ADD NEW COST <v-icon>mdi-plus</v-icon></v-btn
          >
        </template>

        <v-card>
          <AddPayment :cat-sl="catSl" @addNewPayment="addData" />
        </v-card>
      </v-dialog>

      <PaymentsDisplay
        :list="paymentsList"
        :sl="catSl"
        @sendSelected="checkIn($event)"
        @addNewCategory="addingCat($event)"
      />
      <br />

      <br />

      <CategorySelect />
      <h4>Total: {{ getFPV }} units</h4>

      <!--<Pagination :pd="paymentsList" @sendPage="getPage($event)" />-->
    </v-col>
    <v-col>
      <vc-donut v-bind="props" has-legend legend-placement="right">
        <small>
          <strong>Costs by categories</strong>
        </small>
      </vc-donut>
    </v-col>
  </v-row>
</template>

<script>
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import AddPayment from "../components/AddPayment.vue";
//import Pagination from "../components/pagination.vue";
import CategorySelect from "../components/CategorySelect.vue";
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "Dashboard",
  components: {
    PaymentsDisplay,
    CategorySelect,
    AddPayment,
    //Pagination,
  },
  data: () => ({
    sd: 0,
    fd: 0,
    ed: 0,
    ad: 0,
    fmd: 0,
    hd: 0,
    catSl: "",
    pageList: [],
    page: "",
    curPage: 1,
    n: 5,
    dialog: false,
    props: {
      size: 250,
      sections: [
        { label: "Food", value: 0, color: "red" },
        { label: "Sport", value: 0, color: "green" },
        { label: "Education", value: 0, color: "blue" },
        { label: "Auto", value: 0, color: "yellow" },
        { label: "Family", value: 0, color: "pink" },
        { label: "Health", value: 0, color: "black" },
      ],
      thickness: 35, // set this to 100 to render it as a pie chart instead
      hasLegend: true,
      // specify more props here
    },
  }),

  methods: {
    checkIn(category) {
      this.catSl = category;
    },
    addingCat(category) {
      this.addCategory(category);
      console.log("push to state", category);
    },
    getPage(page) {
      this.pageList = page;
    },
    ...mapMutations([
      "setPaymentListData",
      "addDataToPaymentsList",
      "addCategory",
    ]),
    ...mapActions(["fetchData", "fetchCategory"]),
    addData(data) {
      console.log("push to state", data);
      this.addDataToPaymentsList(data);
      const food1 = this.paymentsList.reduce((newArr, item) => {
        if (item.category === "Food") {
          newArr.push(item);
        }
        return newArr;
      }, []);
      const food2 = food1.reduce((res, cur) => res + cur.value, 0);
      console.log("Food", ((food2 / this.getFPV) * 100), "%");
      this.fd = ((food2 / this.getFPV) * 100);
      this.props.sections[0].value = this.fd;
      /////////////////////////////////////////////////////
      const sport1 = this.paymentsList.reduce((newArr, item) => {
        if (item.category === "Sport") {
          newArr.push(item);
        }
        return newArr;
      }, []);
      const sport2 = sport1.reduce((res, cur) => res + cur.value, 0);
      console.log("Sport", ((sport2 / this.getFPV) * 100), "%");
      this.sd = ((sport2 / this.getFPV) * 100);
      this.props.sections[1].value = this.sd;
      /////////////////////////////////////////////////////
      const ed1 = this.paymentsList.reduce((newArr, item) => {
        if (item.category === "Education") {
          newArr.push(item);
        }
        return newArr;
      }, []);
      const ed2 = ed1.reduce((res, cur) => res + cur.value, 0);
      console.log("Education", ((ed2 / this.getFPV) * 100), "%");
      this.ed = ((ed2 / this.getFPV) * 100);
      this.props.sections[2].value = this.ed;
      ////////////////////////////////////////////////////
      const au1 = this.paymentsList.reduce((newArr, item) => {
        if (item.category === "Auto") {
          newArr.push(item);
        }
        return newArr;
      }, []);
      const au2 = au1.reduce((res, cur) => res + cur.value, 0);
      console.log("Auto", ((au2 / this.getFPV) * 100), "%");
      this.ad = ((au2 / this.getFPV) * 100);
      this.props.sections[3].value = this.ad;
      ////////////////////////////////////////////////////
      const f1 = this.paymentsList.reduce((newArr, item) => {
        if (item.category === "Family") {
          newArr.push(item);
        }
        return newArr;
      }, []);
      const f2 = f1.reduce((res, cur) => res + cur.value, 0);
      console.log("Family", ((f2 / this.getFPV) * 100), "%");
      this.fmd = ((f2 / this.getFPV) * 100);
      this.props.sections[4].value = this.fmd;
      /////////////////////////////////////////////////////
        const h1 = this.paymentsList.reduce((newArr, item) => {
          if (item.category === "Health") {
            newArr.push(item);
          }
          return newArr;
        }, []);
        console.log(h1);
        const h2 = h1.reduce((res, cur) => res + cur.value, 0);
        console.log(h2);
        console.log("Health", ((h2 / this.getFPV) * 100), "%");
        this.hd = ((h2 / this.getFPV) * 100);
        this.props.sections[5].value = this.hd;
      //console.log(this.hd,this.fmd,this.ad,this.ed,this.sd,this.fd);
    },
  },
  computed: {
    ...mapGetters({
      paymentsList: "getPaymentList",
      categories: "getCategoryList",
    }),
    currentElements() {
      const { n, curPage } = this;
      return this.paymentsList.slice(n * (curPage - 1), n * (curPage - 1) + n);
    },
    getFPV() {
      return this.$store.getters.getFullPyamentValue;
    },
  },
  created() {
    if (this.paymentsList.length == 1) {
      this.fetchData().then(() => {
        const food1 = this.paymentsList.reduce((newArr, item) => {
          if (item.category === "Food") {
            newArr.push(item);
          }
          return newArr;
        }, []);
        const food2 = food1.reduce((res, cur) => res + cur.value, 0);
        console.log("Food", parseInt((food2 / this.getFPV) * 100), "%");
        this.fd = parseInt((food2 / this.getFPV) * 100);
        this.props.sections[0].value = this.fd;
        //console.log(this.props.sections[0].value);
        /////////////////////////////////////////////////////
        const sport1 = this.paymentsList.reduce((newArr, item) => {
          if (item.category === "Sport") {
            newArr.push(item);
          }
          return newArr;
        }, []);
        const sport2 = sport1.reduce((res, cur) => res + cur.value, 0);
        console.log("Sport", parseInt((sport2 / this.getFPV) * 100), "%");
        this.sd = parseInt((sport2 / this.getFPV) * 100);
        this.props.sections[1].value = this.sd;
        /////////////////////////////////////////////////////
        const ed1 = this.paymentsList.reduce((newArr, item) => {
          if (item.category === "Education") {
            newArr.push(item);
          }
          return newArr;
        }, []);
        const ed2 = ed1.reduce((res, cur) => res + cur.value, 0);
        console.log("Education", Math.ceil((ed2 / this.getFPV) * 100), "%");
        this.ed = Math.ceil((ed2 / this.getFPV) * 100);
        this.props.sections[2].value = this.ed;
        ////////////////////////////////////////////////////
        const au1 = this.paymentsList.reduce((newArr, item) => {
          if (item.category === "Auto") {
            newArr.push(item);
          }
          return newArr;
        }, []);
        const au2 = au1.reduce((res, cur) => res + cur.value, 0);
        console.log("Auto", Math.ceil((au2 / this.getFPV) * 100), "%");
        this.ad = Math.ceil((au2 / this.getFPV) * 100);
        this.props.sections[3].value = this.ad;
        ////////////////////////////////////////////////////
        const f1 = this.paymentsList.reduce((newArr, item) => {
          if (item.category === "Family") {
            newArr.push(item);
          }
          return newArr;
        }, []);
        const f2 = f1.reduce((res, cur) => res + cur.value, 0);
        console.log("Family", Math.ceil((f2 / this.getFPV) * 100), "%");
        this.fmd = Math.ceil((f2 / this.getFPV) * 100);
        this.props.sections[4].value = this.fmd;
        /////////////////////////////////////////////////////
        const h1 = this.paymentsList.reduce((newArr, item) => {
          if (item.category === "Health") {
            newArr.push(item);
          }
          return newArr;
        }, []);
        const h2 = h1.reduce((res, cur) => res + cur.value, 0);
        console.log("Health", Math.ceil((h2 / this.getFPV) * 100), "%");
        this.hd = Math.ceil((h2 / this.getFPV) * 100);
        this.props.sections[5].value = this.hd;
      });
    } else {
      console.log(this.paymentsList.length);
    }
    if (!this.categories.length) {
      this.fetchCategory();
    }
  },

  mounted() {
    const page = this.$route.params.page || 1;
    this.curPage = Number(page);
  },
};
</script>

<style lang="scss" module>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  display: flex;
  align-items: center;
  flex-direction: column;
}

h4 {
  color: red;
  display: flex;
  justify-content: center;
  font-weight: 500;
  background: gainsboro;
}
</style>