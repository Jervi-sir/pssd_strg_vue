<script>

export default {
  
  
  props: {
    show: Boolean,
    accountObj: Object,
  },
  data () {
    return {
      account: {
        email: '',
        password: '',
        old_password: '',
        details: ''
      }
    }
  },
  created() {
    this.account.email = this.accountObj.email;
    this.account.password = this.accountObj.password;
    this.account.details = this.accountObj.details;
    this.account.old_password = this.accountObj.old_password;

  },
  name: 'ModalEdit',
  methods: {
    async update () { 
      try {
        /*eslint-disable */
        const response = await 
        axios.get('/.netlify/functions/accountAll' 
                  + '?id=' + this.account.id 
                  + '&user_id=' + this.account.user_id 
                  + '&email=' + this.account.email 
                  + '&password=' + this.account.password 
                  + '&details=' + this.account.details, {});
        /*eslint-enable */
      } catch (error) {
        console.error(error);
      }
    },
    
  },
}
</script>


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