<template>
<div>
    <div>
        <input type="number" 
               placeholder="op1" 
               v-model.number="operand1"
        />
        <input placeholder="op2" 
               v-model.number="operand2" 
               type="number"
        />
        = {{ result }} 
    </div>
        
    <div class="error" v-if="error">
        Ошибка: {{ error }}
    </div>    
        <!-- <div class="error" v-show="error">
           Ошибка: {{ error }}
        </div>  
        <div class="strange-message">
            <template v-if="result < 0">Отрицательное число</template>
            <template v-else-if="result < 100">Число меньше 100</template>
            <template v-else>Число больше 100</template>
        </div>-->

    <div class="buttons">
            <button v-for="btn in buttons" 
                    :key="btn"
                    v-bind:title="btn"
                    @click="calculate(btn)"
            >
                    {{ btn }}
            </button>
    </div>

    <div id="selector">
            <label><input type="checkbox" v-model="checked">Отобразить экранную клавиатуру</label>
    
            <div class="collection" v-if="checked">
            <button v-for="(item, idx) in collection" 
                    :key="idx"
                    @click="input(item)"
            >
                {{ item }}
                </button>

                <div class="backspace">
                    <button
                    @click="clear"
                    >←</button>
                </div>


            </div>

      
    </div>

    <div>

        <input id="one" type="radio" v-model="picked" value="operand1">
        <label for="one">Операнд 1</label>
            
        <input id="two" type="radio" v-model="picked" value="operand2">
        <label for="two">Операнд 2</label>

    </div> 





</div>
 
</template>

<script>
export default {
    name: "Calc",
    data:()=>({
        operand1: "",
        operand2: "",
        result: 0,
        buttons: ['+','-','*','/'],
        collection: [0,1,2,3,4,5,6,7,8,9],
        error: "",
        checked :false,
        picked: ''
    }),
    methods: {
        input: function (item) {
            if ( this.picked === 'operand1') {
                this.operand1+=item;
            }else{
                this.operand2+=item;
            }
            
        },
        clear: function(){
            if ( this.picked === 'operand1') {
                this.operand1 = this.operand1.substring(0, this.operand1.length - 1);
            }else{
            this.operand2 = this.operand2.substring(0, this.operand2.length - 1);
            }
        },
        calculate(operation = '+'){
            this.error = ""
            switch(operation) {
                case "+": 
                    this.add()
                    break;
                case "-": 
                    this.substract()
                    break;
                case "*": 
                    this.multiply()
                    break;
                case "/": 
                    this.divide()
                    break;
            }
       
        },
        add(){
            this.result = parseInt(this.operand1) + parseInt(this.operand2)
        },
        substract(){
            this.result = this.operand1 - this.operand2 
        },
        divide(){
            const { operand1, operand2 } = this
            if(operand2 === 0) {
                this.error = "На 0 делить нельзя!!"
            } else {
                this.result = operand1 / operand2
            }
        },
        multiply(){
            this.result = this.operand1 * this.operand2
        },
    },

}
</script>

<style lang="scss" scoped>
.error {
    color: red
}

.collection {
    display: flex;
    justify-content: center;
}
</style>