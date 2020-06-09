import Vue from 'vue'
import {mapState, mapActions} from 'vuex'

import Icon from '@/components/Icon/Icon.vue'
import Btn from '@/components/Btn/Btn.vue'
import Confirm from '@/components/Confirm/Confirm.vue'
import SelectExpanded from '@/components/SelectExpanded/SelectExpanded.vue'
import Filters from '@/components/Filters/Filters.vue'
import Paginator from '@/components/Paginator/Paginator.vue'


export default {
  name: 'TableUI',

  components: {
    Icon,
    Btn,
    Confirm,
    SelectExpanded,
    Filters,
    Paginator,
  }, // components

  props: {}, // props

  data() {
    return {
      // колонки/фильтры
      columns: [
        // {value: 'id', option: 'ID'},
        {value: 'product', option: 'Product (100g serving)'},
        {value: 'calories', option: 'Calories'},
        {value: 'fat', option: 'Fat (g)'},
        {value: 'carbs', option: 'Carbs (g)'},
        {value: 'protein', option: 'Protein (g)'},
        {value: 'iron', option: 'Iron (%)'},
      ],

      // видимость столбцов
      shownColumns: {product: true, calories: true, fat: true, carbs: true, protein: true, iron: true},

      // поле сортировки true/false => asc/desc
      orderColumn: {name: 'product', order: true},

      // варианты: строк на странице
      perPages: [
        {value: 10, option: '10 Per Page'},
        {value: 15, option: '15 Per Page'},
        {value: 20, option: '20 Per Page'},
      ],

      // строк на странице
      perPage: 15,

      // начальная строка
      start: 1,

      // выделенные столбцы {id}
      selected: {},

      // id строки с открытым запросом на удаление
      confirmOpened: 3,

      // флаг одиночного удаления
      singleRemoval: {
        hovered:       null, // строка hover - показать кнопку удаления
        openedConfirm: false // строка где открыто окно подтверждения
      },

    }
  }, // data

  computed: {
    ...mapState('products', ['products', 'locked']),

    // имена колонок в объект
    titles() {
      const titles = {};
      this.columns.forEach(item => titles[item.value] = item);
      return titles;
    },

    // сколько колонок выделено.всего
    countColumn() {
      return {
        shown: Object.values(this.shownColumns).filter(i => i).length,
        all:   Object.keys(this.shownColumns).length
      };
    },

    // сколько строк выделено
    countSelected() {
      return Object.keys(this.selected).length;
    },

    // Упорядоченные данные
    dataSort() {
      let data = this.products;

      // сортировать все строки
      if (this.orderColumn) {
        const ord = (a, b) => (this.orderColumn.order ? 1 : -1) * // asc/desc
          (a[this.orderColumn.name] > b[this.orderColumn.name]) - (a[this.orderColumn.name] < b[this.orderColumn.name])
          || (a.product > b.product) - (a.product < b.product); // + сортировка по имени

        data.sort(ord);
      }

      return data;
    },

    // одна страница
    dataSlice() {
      // закрыть высплывающие окна
      this.singleRemoval.openedConfirm = null;
      // строки для страницы
      return this.dataSort.slice(this.start - 1, this.start + this.perPage - 1);
    },

    // выделены все на странице?
    isAllSelected() {
      return this.dataSlice.every(item => (item.id in this.selected) || (item.id in this.locked))
    },

    // подпись для кнопки удаления
    labelDelete() {
      const count = this.countSelected;
      return 'Delete' + (count ? ` (${count})` : '');
    },

  }, // computed

  methods: {
    ...mapActions('products', ['delete']),

    // отметить/отменить строку (чекбокс) -> selected{}
    onSelect(id) {
      if (id in this.selected) {
        Vue.delete(this.selected, id)
      } else {
        Vue.set(this.selected, id, true)
      }
    },

    // отметить/отменить все строки (чекбокс) на текущей странице -> selected{}
    onSelectAll(value) {
      this.dataSlice.forEach(item => value && !(item.id in this.locked)
        ? Vue.set(this.selected, item.id, true)
        : Vue.delete(this.selected, item.id)
      );
    },

    // навели мышку на строку
    onMouseEnter(id) {
      this.singleRemoval.hovered = id;
    },

    // Удалить заиписи
    onDelete(ids) {
      ids.forEach(id => Vue.delete(this.selected, id));
      this.delete(ids);
    }

  }, // methods

}
