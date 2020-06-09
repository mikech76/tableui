import Icon from '@/components/Icon/Icon.vue'

export default {
  name: 'Btn',

  components: {
    Icon,
  }, // components

  props: {
    // Надпись
    label: String,
    icon:  String,

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
    // c ошибкой
    error:     Boolean,
  }, // props

  data() {
    return {}
  }, // data

  computed: {
    /**
     * Назначает css классы при наличии параметров
     * @returns {string[]}
     */
    withClasses() {
      return ['square', 'round', 'accent', 'disabled', 'error', 'label', 'icon', 'iconRight']
        .map(attr => this[attr] ? ('is-' + attr) : '');
    },

  }, // computed

  methods: {
    onClick(e) {
      if (!this.disabled) {
        this.$emit('click', e);
      }
    }
  }, // methods

}
