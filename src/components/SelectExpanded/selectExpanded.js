import Btn from '@/components/Btn/Btn.vue'
import Icon from '@/components/Icon/Icon.vue'

export default {
  name: 'SelectExpanded',

  components: {
    Btn,
    Icon
  },  // components

  props: {
    // Данные списка [{value: 'id', option: 'ID'},...]
    options: {
      type:     Array,
      required: true,
    },

    // v-model выбранный(е) пункт(ы)
    value: {
      required: true,
    },

    // множественный выбор (чекбоксы)
    multiple: {
      type:    Boolean,
      default: false
    },

    // закрыть после выбора
    autoclose: Boolean,

    /// оформление кнопки
    // надпись
    btn:       String,
    // иконка
    icon:      String,
    // иконку справа
    iconRight: Boolean,
    // квадратная кнопка
    square:    Boolean,
    // Закругленная кнопка
    round:     Boolean,
    // Выделенная
    accent:    Boolean,
    // Неактивная
    disabled:  Boolean,

  }, // props

  data() {
    return {
      // открыто меню
      show: false,
    }
  }, // data

  computed: {
    // Надпись кнопки
    label() {
      return this.multiple
        // передали
        ? this.btn.replace(/\$/, this.count.selected)
        // выбранный пункт
        : (this.options.find(item => item.value === this.value) || this.options[0]).option;
    },

    // выбраных/ всего (multiple)
    count() {
      return {
        selected: Object.values(this.value).filter(i => i).length,
        all:      Object.keys(this.value).length
      };
    },

  }, //computed

  methods: {
    // выбрать пункт
    onSelect(value) {
      this.$emit(
        'input',
        this.multiple
          ? {...this.value, [value]: !this.value[value]}
          : value
      );

      // закрыть после выбора
      if (this.autoclose) {
        this.show = false;
      }
    },

    // отметить все пункты
    onSelectAll(value) {
      const all = {...this.value};
      for (let i in all) {
        all[i] = value;
      }

      this.$emit('input', all);

      // закрыть после выбора
      if (this.autoclose) {
        this.show = false;
      }
    },

  }, // methods
}
