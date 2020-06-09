<template>
  <div class="home">
    <TableUIApp></TableUIApp>
  </div>
</template>

<script>
  // @ is an alias to /src
  import TableUIApp from '@/components/TableUIApp.vue'

  export default {
    name: 'Home',

    components: {
      TableUIApp,
    }, // components
  }
</script>


<style lang="scss">
  $bg-color: #FBFBFB;

  .home {
    background-color: $bg-color;
  }
</style>
