<template>
  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer ">
      <div class="side">
        <a href="#"><img class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""></a>
        <img class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg">
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input class="formControls_input" v-model="signInField.email" type="text" id="email" name="email"
            placeholder="請輸入 email" required>
          <span v-if="!isEmail">此欄位不可留空</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input class="formControls_input" v-model="signInField.password" type="password" name="pwd" id="pwd"
            placeholder="請輸入密碼" required>
          <input class="formControls_btnSubmit" type="button" @click="signIn" value="登入">
          <a class="formControls_btnLink" href="#register">註冊帳號</a>
        </form>
      </div>
    </div>
  </div>
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#"><img class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""></a>
        <img class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg">
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input class="formControls_input" v-model="signupField.email" type="text" id="email" name="email"
            placeholder="請輸入 email" required>
          <label class="formControls_label" for="name">您的暱稱</label>
          <input class="formControls_input" v-model="signupField.nickname" type="text" name="name" id="name"
            placeholder="請輸入您的暱稱">
          <label class="formControls_label" for="pwd">密碼</label>
          <input class="formControls_input" v-model="signupField.password" type="password" name="pwd" id="pwd"
            placeholder="請輸入密碼" required>
          <label class="formControls_label" for="confirmpwd">再次輸入密碼</label>
          <input class="formControls_input" v-model="doublepassword" type="password" name="pwd" id="confirmpwd"
            placeholder="請再次輸入密碼" required>
          <Message v-if="!isPasswordMatch" severity="error" variant="simple" size="small">密碼不相同</Message>
          <input :disabled="!isFormValid" class="formControls_btnSubmit" type="button"
            :class="{ 'disabled': !isFormValid }" @click="signup" value="註冊帳號">
          <a class="formControls_btnLink" href="#login">登入</a>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import '@/assets/todo.css'
useRouter
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter()
const api = 'https://todolist-api.hexschool.io/';
const signupField = ref({
  email: '',
  password: '',
  nickname: ''
})
const doublepassword = ref('')
const signupRes = ref('')

const isPasswordMatch = computed(() => {
  return signupField.value.password === doublepassword.value &&
    signupField.value.password.length > 0
})
const isFormValid = computed(() => {
  return isPasswordMatch.value && signupField.value.nickname && signupField.value.email
})
const signup = async () => {
  try {
    const res = await axios.post(`${api}users/sign_up`, signupField.value);
    signupRes.value = res.data.uid
    if (res.data.status) {
      alert('註冊成功！')
      window.location.hash = '#loginPage'
    }
  }
  catch (error) {
    console.log(error)
  }
}

//signIn
const signInField = ref({
  email: '',
  password: ''
})
const signInRes = ref('')

const isEmail = computed(() => {
  return signInField.value.email.length > 0
})
const signIn = async () => {
  try {
    const res = await axios.post(`${api}users/sign_in`, signInField.value);
    if (res.data.token) {
      signInRes.value = res.data.token
      document.cookie = `customTodoToken=${res.data.token};path=/`
      router.push('/todo')
    }
  }
  catch (error) {
    console.log(error)
  }
}

</script>
<style></style>
