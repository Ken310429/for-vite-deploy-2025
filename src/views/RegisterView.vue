<template>
  <!-- sign up -->
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
          <router-link class="formControls_btnLink" to="/login">登入</router-link>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, inject } from 'vue';
import { signupAPI } from '../../utils/TodoAPI';
import { useRouter } from 'vue-router';


const notify = inject('notify');
const router = useRouter();
const signupField = ref({
  email: '',
  nickname: '',
  password: '',
});
const doublepassword = ref('');
const signupRes = ref(null);



const isPasswordMatch = computed(() => {
  return signupField.value.password === doublepassword.value && signupField.value.password.length > 0;
});

const isFormValid = computed(() => {
  return signupField.value.email.length > 0 && signupField.value.nickname.length > 0 && isPasswordMatch.value;
});

const signup = async () => {
  const result = await signupAPI(signupField.value);
  if (result) {
    signupRes.value = result.uid;
    notify('註冊成功');
    router.push('/login');
  }
  else {
    notify('註冊失敗');
  }
};

</script>
