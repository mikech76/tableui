<template>
  <div class="container">
    <div class="tableUIApp">

      <div class="panel">
        <h1>Table UI</h1>

        <Btn v-if="errorMessage" error round :label="errorMessage"  @click="repeatQueries">test</Btn>

      </div>

      <TableUI/>

    </div>
  </div>
</template>

<script src="./tableUIApp.js"/>

<style scoped lang="scss" src="./_tableUIApp.scss"/>
