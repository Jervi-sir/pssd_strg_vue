<template>
  <div class="add">
    <SearchDropdown
      :options="socials"
      v-on:selected="getSelected"
    />
    <br>
    <input type="email" placeholder="email" v-model="email">
    <br>
    <input type="text" placeholder="password" v-model="password">
    <br>
    <textarea rows="10"  v-model="details"></textarea>
    <br>
    <button @click="addAccount()">Add</button>
  </div>
</template>

<script>
import SearchDropdown from 'search-dropdown-vue'
import axios from 'axios';
import netlifyIdentity from 'netlify-identity-widget'
export default {
  
  methods: {
    async getAllSocials () { 
        try {
          const response = await axios.get('/.netlify/functions/socialAll', {});
          this.socials = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async getSelected(payload) {
        try {
          this.social_id = payload.id;
        } catch (error) {
          console.error(error);
        }
      },
    async addAccount () { 
      let user_id = netlifyIdentity.currentUser().id;
      try {
          await axios.get('/.netlify/functions/accountAdd' 
                    + '?email=' + this.email 
                    + '&user_id=' + user_id 
                    + '&password=' + this.password 
                    + '&social_id=' + this.social_id 
                    + '&details=' + this.details, {});
        } catch (error) {
          console.error(error);
        }
    },
  },
  async created() {
      await this.getAllSocials();
  },
  name: 'AddAccount',
  components: {
      SearchDropdown,
    },
  data () {
    return {
      email: '',
      password: '',
      details: '',
      social_id: '',
      socials: []
    }
  },
  
}
</script>
