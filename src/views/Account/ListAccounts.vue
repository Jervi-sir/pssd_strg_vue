<template>
  <div class="list">

    <table>
      <caption>    
        <SearchDropdown
            :options="socials"
            v-on:selected="getSelected"
          />
      </caption>
      <thead>
        <tr>
          <th scope="col">Email</th>
          <th scope="col">Password</th>
          <th scope="col">Old password</th>
          <th scope="col">Details</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(account, index) in accounts" :key="index">
          <td data-label="Email" @click="copyText($event)">{{account.email}}</td>
          <td data-label="Password" @click="copyText($event)">{{account.password}}</td>
          <td data-label="Old password">{{account.old_password}}</td>
          <td data-label="Details">{{account.details}}</td>
          <td data-label="Actions">
            <button @click="edit(account)">Edit</button>
            <button @click="confirmDelete(account)">Delete</button>
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
            <input type="email" v-model="modalAccount.email">
            <input type="text" v-model="modalAccount.password">
            <input type="text" v-model="modalAccount.old_password" disabled>
            <textarea rows="10"  v-model="modalAccount.details"></textarea>
            <div class="modal-footer">
              <button class="modal-default-button" @click="updateAccount(modalAccount)" >update</button>
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
              <small>{{ modalDelete.email }}</small>
            </span>
            <div class="modal-footer">
              <button class="modal-default-button" @click="deleteAccount(modalDelete)" >Yes</button>
              <button  class="modal-default-button" @click="showModalEdit = false">cancel</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script>
  import SearchDropdown from 'search-dropdown-vue'
  import axios from 'axios';
  import netlifyIdentity from 'netlify-identity-widget'

  export default {
  
    components: {
      SearchDropdown,
    },
    data () {
      return {
        socials: [],
        accounts: [],
        showModalEdit: false,
        showModalDelete: false,
        modalAccount: [],
        modalDelete: [],
      }
    },
    props: {
    },
    name: 'ListAccounts',
    async created() {
      await this.getAllSocials();
    },

    methods: {
      edit (account) { 
        this.modalAccount = account;
        this.showModalEdit = true
      },
      confirmDelete(account) {
        this.modalDelete = account;
        this.showModalDelete = true
      },
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
          const social_id = payload.id;
          const user_id = netlifyIdentity.currentUser().id;
          const response = await axios.get('/.netlify/functions/accountAll?user_id=' + user_id + '&social_id=' + social_id, {});
          this.accounts = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async updateAccount(account) { 
        try {
          await axios.get('/.netlify/functions/accountUpdate' 
                    + '?id=' + account.id 
                    + '&user_id=' + account.user_id 
                    + '&email=' + account.email 
                    + '&password=' + account.password 
                    + '&details=' + account.details, {});
          this.showModalEdit = false;
        } catch (error) {
          console.error(error);
        }
      },
      async deleteAccount(account) {
        try {
          await axios.get('/.netlify/functions/accountDelete' 
                    + '?id=' + account.id 
                    + '&user_id=' + account.user_id, {});
          this.accounts = this.accounts.filter(function(item) { 
            return item.id !== account.id;  
          });
          this.showModalDelete = false;
        } catch (error) {
          console.error(error);
        }
      },

      copyText(event) {
        let obj = event.target;
        navigator.clipboard.writeText(obj.innerText);
        obj.classList.add('copied-run');
        setTimeout(function(){
            obj.classList.remove('copied-run');
        }, 1000); // wait
      }
    },
    
  }
</script>


<style lang="scss" scoped>
.copied-run {
  color:red;
  transform: scale(1.2);
  transition: 0.2s;
}
.copied-stop {
  color:black;
  transform: scale(1);
  transition: 0.2s;
}

table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
  caption {
    font-size: 1.5em;
    margin: .5em 0 .75em;
  }
  tr {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: .35em;
  }
  th, td {
    padding: .625em;
    text-align: center;
  }
  th {
    font-size: .85em;
    letter-spacing: .1em;
    text-transform: uppercase;
  }

}

@media screen and (max-width: 600px) {
  table {
    border: 0;
    caption {
      font-size: 1.3em;
    }
    thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
    tr {
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: .625em;
    }
    td {
      border-bottom: 1px solid #ddd;
      display: block;
      font-size: .8em;
      text-align: right;
    }
    td::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }
    td:last-child {
      border-bottom: 0;
    }
  }
}
</style>


<style scroped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>