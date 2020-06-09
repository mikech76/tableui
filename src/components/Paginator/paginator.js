import Btn from '@/components/Btn/Btn.vue'

export default {
  name: 'Paginator',

  components: {
    Btn,
  }, // components

  props: {
    // v-model первая строка
    value: {},

    // строк всего
    max: {
      type:     Number,
      required: true
    },

    // строк на странице
    perPage: {
      type:     Number,
      required: true
    },

  }, // props

  data() {
    return {
      to: 0,
    }
  }, // data

  computed: {
    // надпись
    label() {
      this.to = this.max > 0
        ? this.value + this.perPage - 1
        : 0;
      if (this.to > this.max) {
        this.to = this.max;
      }
      return `${this.value}-${this.to} of ${this.max}`;
    },
  }, // computed

  methods: {
    // переход назад на страницу
    onPrev() {
      this.$emit('input', this.value - this.perPage);
    },

    // переход вперед на страницу
    onNext() {
      this.$emit('input', this.value + this.perPage);
    },

    // исправление неккоректных параметров
    fixProps() {
      let start = this.value;
      let newStart, delta;

      // если строк нет
      if (this.max < 1) {
        // отображает пустой диапазон
        this.$emit('input', start = this.to = 0);

      } else {
        // если первая строка некорректнo -> 1
        if (start < 1 || start === undefined) {
          this.$emit('input', 1);
        }
        // если первая строка больше начала последнего блока  -> начало последнего блока
        else if (start > (newStart = this.max - this.max % this.perPage + 1)) {
          this.$emit('input', newStart);
        }
        // если первая строка больше начала текущего блока  -> начало текущего блока
        else if (delta = (start - 1) % this.perPage) {
          this.$emit('input', start - delta);
        }
      }
    },

  }, // methods

  // проверка начальных значений
  mounted() {
    this.fixProps();
  },

  //  проверка начальных значений после обновлений
  beforeUpdate() {
    this.fixProps();
  },

}
