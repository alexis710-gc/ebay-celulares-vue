<script setup>
import Navbar from './components/Navbar.vue/index.js';
</script>

<template>
  <div> class="app-layout">
    <Navbar/>

    <router-view/>
  </div>
</template>

<style>

body{
  margin:0;
  padding:0;
  background-color: #f9fafb;
}



</style>
