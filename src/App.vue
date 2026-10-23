<script setup>

import Navbar from './components/Navbar.vue';
</script>

<template>
  
  <div class="app-layout">
    <Navbar />

    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f9fafb;
}
</style>