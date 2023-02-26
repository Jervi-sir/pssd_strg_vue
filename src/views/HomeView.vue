<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
      <button @click="showLogin()">Log in</button>
      <button @click="showSignup()">Sign up</button>
      <button @click="logout()">Logout</button>
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import netlifyIdentity from 'netlify-identity-widget';

export default {
  name: 'HomeView',
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
    logout() {
      netlifyIdentity.logout();
    }
  },
}
</script>
