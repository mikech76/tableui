<template>
  <div class="filters">
    <span class="filters__label">Sorting by:</span>

    <ul v-for="item in options">
      <li v-if="showDisabled || shown[item.value]">
        <Btn :key="item.value"
             :label="item.option"
             :accent="shown[item.value] && item.value === value.name"
             :disabled="!shown[item.value]"
             @click="onSelect(item.value)"/>
      </li>
    </ul>

  </div>

</template>

<script src="./filters.js"/>

<style scoped lang="scss" src="./_filters.scss"/>
