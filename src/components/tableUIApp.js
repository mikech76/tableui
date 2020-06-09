import Btn from '@/components/Btn/Btn.vue'
import TableUI from '@/components/TableUI/TableUI.vue'

import {mapGetters, mapActions, mapState} from 'vuex'

export default {
  name:       'TableUIApp',
  components: {
    Btn,
    TableUI,
  }, // components

  data() {
    return {}
  }, // data

  computed: {
    ...mapGetters('api', ['errorQueries']),

    // подпись кнопки с ошибкой
    errorMessage() {
      return this.errorQueries ? 'Server error. repeat ' + this.errorQueries + ' queries?' : false;
    },
  }, // computed

  methods: {
    ...mapActions('api', ['request', 'repeatQueries']),
  }, // methods

  mounted() {
    // загрузка данных
    this.request(['products/get']);
  },
}
