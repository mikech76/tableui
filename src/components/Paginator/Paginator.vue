<template>
  <div class="paginator">
    <Btn square icon="chevron-left" :disabled="this.value===1" @click="onPrev"/>
    <span class="paginator__label">{{label}}</span>
    <Btn round icon="chevron-right" :disabled="this.to===this.max" @click="onNext"/>
  </div>
</template>

<script src="./paginator.js"/>

<style scoped lang="scss" src="./_paginator.scss"/>
