<template>
 
    <Navbar/>
    <div class="navBar">
        
    </div>
    <ListRestaurant/>
    
 
</template>

<script>

import Navbar from './components/NavbarComponent.vue'
import ListRestaurant from './views/ListRestaurant.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    ListRestaurant
  }
}
</script>

<style>
#app {
  font-family: 'Prompt', sans-serif;
  color: #2c3e50;
 
}
.navBar {
  width: 100%;
  height: 70px;
}
</style>

