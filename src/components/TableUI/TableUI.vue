<template>
  <div class="tableui">
    <table>
      <caption>
        <div class="tableui__panel">

          <Filters :options="columns" :shown="shownColumns" show-disabled v-model="orderColumn"/>

          <div class="space"></div>

          <!--     <Btn square :disabled="countSelected === 0" :accent="countSelected > 0" :label="labelDelete" @click=""/> -->

          <Confirm label="Are you sure you want to <b>delete items</b>?"
                   square :disabled="countSelected === 0" :accent="countSelected > 0" :btn="labelDelete"
                   @opened=""
                   @confirm="onDelete(Object.keys(selected))"
                   @closed=""/>

          <SelectExpanded v-model="perPage"
                          :options="perPages"
                          autoclose
                          square icon-right icon="chevron-down"/>

          <Paginator v-model="start" :per-page="perPage" :max="products.length"/>

          <SelectExpanded v-model="shownColumns"
                          :options="columns"
                          multiple
                          square btn="$ columns selected" icon-right icon="chevron-down"/>

        </div>
      </caption>

      <tr class="tableui__header">
        <template v-if="countColumn.shown && products.length">

          <th class="tableui__selectAll select" @click="onSelectAll(!isAllSelected)">
            <Icon :class="isAllSelected ? 'checkbox-on' : 'checkbox-off'"/>
          </th>

          <th class="tableui__order-column" v-if="orderColumn.name && shownColumns[orderColumn.name]"
              @click="orderColumn.order=!orderColumn.order">
            <div>
              {{titles[orderColumn.name].option}}
              <Icon :class="orderColumn.order ? 'arrow-up' : 'arrow-down'"/>
            </div>
          </th>

          <template v-for="column in columns">
            <th :key="column.value" v-if="shownColumns[column.value] && column.value !== orderColumn.name">
              {{column.option}}
            </th>
          </template>

          <th class="tableui__confirm-column"></th>

        </template>

        <template v-else>
          <th class="error-message">
            <span v-if="!products.length"> no data </span>
            <span v-else> no visible columns </span>
          </th>
        </template>

      </tr>

      <template v-if="countColumn.shown">
        <tr class="row" :class="{locked: row.id in locked}" v-for="row in dataSlice" :key="row.id"
            @mouseenter="singleRemoval.hovered = row.id"
            @mouseleave="singleRemoval.hovered = null">

          <template v-if="row.id in locked">
            <td></td>
          </template>
          <template v-else>
            <td class="select" @click="onSelect(row.id)">
              <Icon :class="row.id in selected ? 'checkbox-on' : 'checkbox-off'"/>
            </td>
          </template>

          <td class="tableui__order-column" v-if="orderColumn.name && shownColumns[orderColumn.name]">
            {{row[orderColumn.name]}}
          </td>


          <template v-for="column in columns">
            <td :key="column.value" v-if="shownColumns[column.value] && column.value !== orderColumn.name">
              {{row[column.value]}}
            </td>
          </template>

          <td>

            <Confirm
                    v-if="!(row.id in locked) && (singleRemoval.hovered === row.id || singleRemoval.openedConfirm === row.id)"
                    label="Are you sure you want to <b>delete item</b>?"
                    btn="delete" icon="rubbish-bin"
                    @opened="singleRemoval.openedConfirm = row.id"
                    @confirm="onDelete([row.id])"
                    @closed="singleRemoval.openedConfirm = null"/>

          </td>
        </tr>
      </template>

    </table>

    <!-- Debug -->
    <!--
   orderColumn: {{orderColumn}} <br>
   confirmOpened: {{confirmOpened}} <br>
   selected: {{selected}} : {{countSelected}} <br>
   singleRemoval: {{singleRemoval}} <br>
   locked: {{locked}} <br>
   -->
  </div>
</template>

<script src="./tableUI.js"/>

<style scoped lang="scss" src="./_tableUI.scss"/>
