<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>
      <button @click="showLogin()">Log in</button>
      <button @click="showSignup()">Sign up</button>
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import netlifyIdentity from 'netlify-identity-widget';

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  created() {
    netlifyIdentity.init();
  },
  methods: {
    showLogin() {
      netlifyIdentity.open('login');
    },
    showSignup() {
      netlifyIdentity.open('signup');
    },
  },
}
</script>
