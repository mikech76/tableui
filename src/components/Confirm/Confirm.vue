<template>
  <div class="dropdown-confirm">

    <Btn :label="btn"
         :iconRight="iconRight"
         :square="square"
         :round="round"
         :accent="accent"
         :disabled="disabled"
         :icon="icon"
         @click="dropdown('toggle')"
    />
    <transition name="fade">
      <div class="confirm" v-if="show" @mouseleave_OFF="dropdown('close')">
        <span class="confirm__label" v-html="label"/>

        <div class="confirm__buttons">
          <Btn round label="Cancel" @click="onConfirm(false)"/>
          <Btn round accent label="Confirm" @click="onConfirm(true)"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script src="./confirm.js"/>

<style scoped lang="scss" src="./_confirm.scss"/>
