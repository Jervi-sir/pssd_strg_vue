<template>
  <div class="add">
    <input type="text" placeholder="platform" v-model="name">
    <br>
    <button @click="addAccount()">Add</button>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    async addAccount () { 
      try {
          await axios.get('/.netlify/functions/socialAdd' 
                    + '?name=' + this.name, {});
        } catch (error) {
          console.error(error);
        }
    },
  },
  name: 'AddSocial',
}
</script>
