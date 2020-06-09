import Btn from '@/components/Btn/Btn.vue'

export default {
  name: 'Confirm',

  components: {
    Btn,
  }, // components

  props: {
    // Надпись вопроса
    label: String,

    // кнопка
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
      show: false,
    }
  }, // data

  methods: {
    // открыть/закрыть окно
    dropdown(todo) {
      switch (todo) {
        case   'open':
          this.show = true;
          this.$emit('opened');
          break;

        case   'close':
          this.show = false;
          this.$emit('closed');
          break;

        case   'toggle':
          this.show ? this.dropdown('close') : this.dropdown('open');
      }
    },

    // событие отмены/подтверждения
    onConfirm(confirm) {
      this.$emit(confirm ? 'confirm' : 'cancel');
      // закрыть
      this.show = false;
      this.$emit('closed');

    },
  }, // methods
}
