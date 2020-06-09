<template>
  <div class="dropdown-select-expanded">

    <Btn :label="label"
         :iconRight="iconRight"
         :square="square"
         :round="round"
         :accent="accent"
         :disabled="disabled"
         :icon="icon"
         @click="show=!show"
    />

    <transition name="fade">
      <ul class="select-expanded" v-if="show" @mouseleave="show=false">

        <li class="select-expanded__item select-expanded_all"
            v-if="multiple"
            @click="onSelectAll(count.selected !== count.all )">
          <Icon :class="count.selected === count.all ? 'checkbox-on' : 'checkbox-off'"/>
          <span>Select All</span>
        </li>

        <li v-for="item in options" :key="item.value" @click="onSelect(item.value)" class="select-expanded__item">

          <Icon :class="value[item.value] ? 'checkbox-on' : 'checkbox-off'" v-if="multiple"/>
          <span>{{item.option}}</span>
        </li>

      </ul>
    </transition>
  </div>
</template>

<script src="./selectExpanded.js"/>

<style scoped lang="scss" src="./_selectExpanded.scss"/>
