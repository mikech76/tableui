import Btn from '@/components/Btn/Btn.vue'

export default {
  name: 'Filters',

  components: {
    Btn,
  }, // components

  props: {
    // v-model поле сортировки true/false => asc/desc {name: 'fat', order: true},
    value: {
      type:     Object,
      required: true
    },

    // пункты меню   {value: 'product', option: 'id'},
    options: {
      type:     Array,
      required: true
    },

    // отображаемые столбцы
    shown:        {
      type:     Object,
      required: true
    },
    // отобразить отключенные как disabled
    showDisabled: Boolean,

  }, // props

  data() {
    return {}
  }, // data

  computed: {}, // computed

  methods: {
    // отметить пункт
    onSelect(name) {
      this.$emit('input', {
        name:  name,
        order: (this.value.name === name) ? !this.value.order : true
      });
    },
  }, // methods

}
