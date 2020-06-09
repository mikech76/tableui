<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Table UI</router-link>
      |
      <router-link to="/components">Components</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap');
  @import './css/null';

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  #nav {
    padding: 10px;

    a {
      font-size: 12px;
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
