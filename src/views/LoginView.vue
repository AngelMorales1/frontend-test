<script setup></script>

<template>
  <div class="home">
    <div class="content">
      <div class="logo"><img src="../assets/logo.png" alt="asd" /></div>
      <form @submit.prevent="handleSubmit">
        <div>
          <h1>Login to account</h1>
          <p>Enter your credentials to access your account</p>
          <p><i>"if you don't have an account, it will be created when you press submit"</i></p>
        </div>
        <div class="form-field">
          <input type="email" name="email" placeholder="Enter email" v-model="formData.email" />
          <span class="error">{{ errors.email }}</span>
        </div>
        <div class="form-field">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            v-model="formData.password"
          />
          <span class="error">{{ errors.password }}</span>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    <div class="img"></div>
  </div>
  <div class="footer">
    <p>@2023 Angel Morales</p>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const router = useRouter()

const formData = reactive({
  email: '',
  password: ''
})

const errors = ref({
  email: '',
  password: ''
})

watch(formData, () => {
  validateForm()
})

const validateForm = () => {
  let isValid = true;

  if (!formData.email) {
    errors.value.email = 'Please enter your email';
    isValid = false;
  } else {
    errors.value.email = '';
  }

  if (!formData.password) {
    errors.value.password = 'Please enter your password';
    isValid = false;
  } else {
    errors.value.password = '';
  }

  return isValid;
};

const handleSubmit =  async ()=> {

  if (validateForm()) {
    try {
      let {data} = await axios.post("http://localhost:3000/login",formData)
      useToast().success(data.msg)
      localStorage.setItem('token', data.token);
      router.push({ path: '/convert' })
    } catch (error) {
      useToast().error(error)
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  flex-direction: row;
  text-align: center;
}
.content {
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid grey;
}

.form-field {
  display: flex;
  flex-direction: column;
  text-align: start;
}

.error {
  color: red;
}

button {
  background: #1751d0;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
}

.footer {
  position: absolute;
  padding: 10px 30px;
  bottom: 0;
}
@media screen and (min-width: 768px) {
  .home {
    display: grid;
    flex-direction: row;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 100%;
  }
  .img {
    height: 100vh;
    background-image: url('../assets/image.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .content {
    margin: auto;
    padding: 150px 30px;
    max-width: 400px;
  }

  .logo {
    position: absolute;
    top: 30px;
    left: 30px;
  }
}
</style>
