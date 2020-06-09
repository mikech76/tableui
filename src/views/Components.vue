<template>
  <div class="about">

    <h2>Icon:</h2>
    <div class="demo-block">

      <Icon rubbish-bin class="rubbish-bin"/>
      <Icon class="trash"/>
      <Icon class="arrow-down"/>
      <Icon class="arrow-up"/>
      <Icon class="checkbox-off"/>
      <Icon class="checkbox-on"/>
      <Icon class="chevron-down"/>
      <Icon class="chevron-left"/>
      <Icon class="chevron-right"/>

    </div>

    <h2>Btn:</h2>
    <div class="demo-block">

      <Btn label="No border"/>

      <Btn square icon="trash" @click="onClick"/>

      <Btn square label="Square" icon="trash" @click="onClick"/>

      <Btn square label="Select" icon-right icon="chevron-down" @click="onClick"/>

      <Btn label="Round" round @click="onClick"/>

      <Btn square accent label="Square Accent" @click="onClick"/>

      <Btn square error label="Square Error" @click="onClick"/>

      <Btn square disabled label="Square Disabled" @click="onClick"/>

      <Btn square icon="chevron-left" @click="onClick"/>

      <Btn round disabled icon="chevron-right" @click="onClick"/>

      <Btn square icon="rubbish-bin" @click="onClick"/>

      <Btn icon="checkbox-off"/>

    </div>

    <h2>Modal:</h2>
    <div class="demo-block">

      <Confirm label="Are you sure you want to <b>delete item</b>?"
               btn="delete" icon="rubbish-bin"
               @confirm="log"
               @opened="log('Confirm opened')"
               @closed="log('Confirm closed')"/>

      <Confirm label="Are you sure you want to delete item?" square
               btn="Select" icon-right icon="chevron-down"
               @confirm="log"
               @opened="log('Confirm opened')"
               @closed="log('Confirm closed')"/>


      <SelectExpanded v-model="perPage"
                      :options="perPages"
                      autoclose
                      square icon-right icon="chevron-down"/>

      <SelectExpanded v-model="shownColumns"
                      :options="columns"
                      multiple
                      square btn="$ columns selected" icon-right icon="chevron-down"/>

    </div>
    perPage: {{perPage}} <br>
    shownColumns: {{shownColumns}}

    <h2>Filters:</h2>
    <div class="demo-block">

      <Filters :options="columns" :shown="shownColumns" show-disabled v-model="sortColumn"/>

    </div>
    sortColumn : {{ sortColumn }}

    <h2>Paginator:</h2>
    <div class="demo-block">
      <Btn square accent label="Randon start" @click="start=Math.floor(Math.random() * Math.floor(1010))"/>

      <Paginator v-model="start" :per-page="perPage" :max="1000"/>

    </div>
    start: {{start}}


  </div>
</template>


<script>

  import Icon from '@/components/Icon/Icon.vue'
  import Btn from '@/components/Btn/Btn.vue'
  import Confirm from '@/components/Confirm/Confirm.vue'
  import SelectExpanded from '@/components/SelectExpanded/SelectExpanded.vue'
  import Filters from '@/components/Filters/Filters.vue'
  import Paginator from '@/components/Paginator/Paginator.vue'

  export default {
    name: 'Componets',

    components: {
      Icon,
      Btn,
      Confirm,
      SelectExpanded,
      Filters,
      Paginator,
    }, // components

    data() {
      return {

        // колонки
        columns: [
          {value: 'id', option: 'ID'},
          {value: 'product', option: 'Product (100g serving)'},
          {value: 'calories', option: 'Calories'},
          {value: 'fat', option: 'Fat (g)'},
          {value: 'carbs', option: 'Carbs (g)'},
          {value: 'protein', option: 'Protein (g)'},
          {value: 'iron', option: 'Iron (%)'},
        ],

        columnTitles: {
          'id':       {option: 'ID'},
          'product':  {option: 'Product (100g serving)'},
          'calories': {option: 'Calories'},
          'fat':      {option: 'Fat (g)'},
          'carbs':    {option: 'Carbs (g)'},
          'protein':  {option: 'Protein (g)'},
          'iron':     {option: 'Iron (%)'},
        },

        // отмеченные столбцы
        //  shownColumns: ['id', 'product', 'calories', 'fat', 'carbs', 'protein', 'iron'],
         shownColumns: {product: true, calories: false, fat: true, carbs: true, protein: true, iron: true},

        // поле сортировки true/false => asc/desc
        sortColumn: {name: 'fat', order: true},

        // варианты: строк на странице
        perPages: [
          {value: 10, option: '10 Per Page'},
          {value: 13, option: '13 Per Page'},
          {value: 15, option: '15 Per Page'},
          {value: 20, option: '20 Per Page'},
        ],

        // строк на странице
        perPage: 15,

        // начальная строка
        start: 1095,
      }
    }, // data

    computed: {}, //computed

    methods: {
      onClick(e) {
        console.log('onClick', e)
      },

      log(...message) {
        console.log(...message)
      },

    }, // methods

  }
</script>

<style lang="scss">

  h2 {
    font-size: 15px;
  }

  .demo-block {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    & > * {
      margin: 10px;
    }
  }
</style>
