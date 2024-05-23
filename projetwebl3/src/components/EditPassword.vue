<template>
  <div>
    <AppMenu></AppMenu>
    <h1>Change Password</h1>
    <form @submit.prevent="updatePassword">
      <div>
        <label for="email">Email:</label>
        <input type="text" v-model="email" id="email" required />
      </div>
      <div>
        <label for="currentPassword">Current Password:</label>
        <input type="password" v-model="currentPassword" id="currentPassword" required />
      </div>
      <div>
        <label for="newPassword">New Password:</label>
        <input type="password" v-model="newPassword" id="newPassword" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm New Password:</label>
        <input type="password" v-model="confirmPassword" id="confirmPassword" required />
      </div>
      <button type="submit">Update Password</button>
      <p v-if="message">{{ message }}</p>
    </form>
  </div>
</template>

  <script>
  import AppMenu from './AppMenu.vue';

  export default {
  name: 'EditPassword',
  components: {
      AppMenu
    },
  data() {
    return {
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      message: ''
    };
  },
  methods: {
    async updatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.message = 'New passwords do not match.';
        return;
      }
      fetch('http://localhost:3000/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword
          })
        })

      // try {
      //   const response = await axios.post('http://localhost:3000/change-password', {
      //     currentPassword: this.currentPassword,
      //     newPassword: this.newPassword
      //   });

      //   this.message = 'Password updated successfully!';
      // } catch (error) {
      //   this.message = 'Failed to update password: ' + error.response.data.message;
      // }
    }
  }
};
</script>

<style scoped>
.error {
    color: red;
  }
</style>