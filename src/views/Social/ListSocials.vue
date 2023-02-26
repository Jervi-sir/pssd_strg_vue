<template>
  <div class="list">
    <table>
      <thead>
        <tr>
          <th scope="col">name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(social, index) in socials" :key="index">
          <td data-label="Name">{{social.name}}</td>
          <td data-label="Actions">
            <button @click="edit(social)">Edit</button>
            <button @click="confirmDelete(social)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- UPDATE modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModalEdit" class="modal-mask">
          <div class="modal-container">
            <div class="modal-header">
              <h3>Edit Account</h3>
            </div>
            <input type="email" v-model="modalSocial.name">
            <div class="modal-footer">
              <button class="modal-default-button" @click="updateSocial(modalSocial)" >update</button>
              <button  class="modal-default-button" @click="showModalEdit = false">cancel</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- DELETE modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModalDelete" class="modal-mask">
          <div class="modal-container">
            <div class="modal-header">
              <h3>Delete Account</h3>
            </div>
            <span>
              Do you want to delete this account
              <small>{{ modalDelete.name }}</small>
            </span>
            <div class="modal-footer">
              <button class="modal-default-button" @click="deleteSocial(modalDelete)" >Yes</button>
              <button  class="modal-default-button" @click="showModalEdit = false">cancel</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
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
      edit (account) { 
        this.modalSocial = account;
        this.showModalEdit = true
      },
      confirmDelete(account) {
        this.modalDelete = account;
        this.showModalDelete = true
      },
      async updateSocial(account) { 
        try {
          await axios.get('/.netlify/functions/socialUpdate' 
                    + '?id=' + account.id 
                    + '&name=' + account.name, {});
          this.showModalEdit = false;
        } catch (error) {
          console.error(error);
        }
      },
      async deleteSocial(social) {
        try {
          await axios.get('/.netlify/functions/socialDelete' 
                    + '?id=' + social.id , {});
          this.socials = this.socials.filter(function(item) { 
            return item.id !== social.id;  
          });
          this.showModalDelete = false;
        } catch (error) {
          console.error(error);
        }
      },
  },
  data () {
    return {
      socials: [],
      showModalEdit: false,
      showModalDelete: false,
      modalSocial: [],
      modalDelete: [],
    }
  },
  name: 'ListSocials',
  async created() {
      await this.getAllSocials();
    },
    
}
</script>
