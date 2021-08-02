<template>
  <div class="payments-list">
                <input
              class="i"
              v-model.trim="category"
              @keyup.enter="addCat(category)"
              placeholder="add category"
            />
      <v-data-table :headers="headers" :items="list">
        <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.id" label="id"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.date" label="Date"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.category" label="Category"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.value" label="Value"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
  
                <v-card-actions>
                  <v-btn color="teal" dark  text @click="close">Cancel</v-btn>
                  <v-btn color="teal" dark  text @click="save">Save</v-btn>
                </v-card-actions>
            </v-dialog>
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <v-icon small class="mr-2" @click="popUp">mdi-pencil</v-icon>
          <v-icon small @click="erase(item)">mdi-delete</v-icon>
        </template>
        
      </v-data-table>
    <!--<v-data-table :headers="headers" :items="list">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.date }}</td>
        <td class="text-xs-right">{{ props.item.category }}</td>
        <td class="text-xs-right">{{ props.item.value }}</td>
      </template>   
    </v-data-table>-->
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "PaymentsDisplay",

  methods: {
 /*       initialize () {
      this.list = [
        { id: 1, date: '20.05.2021', category: 'Sport', value: 124 },
        { id: 2, date: '20.05.2021', category: 'Education', value: 317 },
        { id: 3, date: '20.05.2021', category: 'Food', value: 523 },
      ]
    },*/

    /*editItem (item) {
    this.editedIndex = this.list.indexOf(item)
    this.editedItem = Object.assign({}, item)
     //addDataToPaymentsList(item);
      this.dialog = true
    },*/

   /* deleteItem (item) { 
      const index = this.list.indexOf(item)
      this.list.splice(index, 1)
    },*/

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.list[this.editedIndex], this.editedItem)
      } else {
        this.list.push(this.editedItem)
      }
      this.close()
    },

    popUp() {
        this.$modal.show("AddPayment", { name: "AddPayment" });
    },
    erase(item) {
      this.delDataFromPaymentsList(item);
    },
    ...mapMutations(["delDataFromPaymentsList"]),
       addCat(category) {
      this.$emit("addNewCategory", category);
      console.log("addNewCategory", category);
    },
  },
  props: {
    list: [],
  },
  data() {
    return {
      dialog: false,
      category: "",
    headers: [
      { text: '#', value: 'id', sortable: false },
      { text: 'Date', value: 'date', sortable: false },
      { text: 'Category', value: 'category', sortable: false },
      { text: 'Value', value: 'value', sortable: false },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    editedIndex: -1,
    editedItem: { id: '', date: 0, category: 0, value: 0 },
    defaultItem: { id: '', date: 0, category: 0, value: 0 },
    };
  },
};
</script>

<style scoped>
.payments-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  /*border: 2px solid grey;
  width: 60%;
  margin: auto;*/
  padding-bottom: 30px;
}

td {
  border-bottom: 1px solid grey;
}

/*th {
  display: flex;
  align-items: flex-start;
  padding-top: 30px;
}*/

.i {
  width: 120px;
  background-color: #fff3ce;
}

.threePoints:after {
  content: "\2807";
  font-size: 25px;
}

.dropdown-item {
  border: none;
  background-color: inherit;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
}

.dropdown-item:hover {
  background: #eee;
}

/* Убираем стандартный маркер Chrome */
details summary::-webkit-details-marker {
  display: none;
}
/* Убираем стандартный маркер Firefox */
details > summary {
  list-style: none;
}
</style>