<template>
  <button class="btn" :class="withClasses" @click="onClick">
    <icon v-if="icon" :class="icon"/>
    <span v-if="label" class="btn__label">{{label}}</span>
  </button>
</template>

<script src="./btn.js"></script>

<style scoped lang="scss" src="./_btn.scss"></style>
