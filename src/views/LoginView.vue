<template>
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
          <router-link class="formControls_btnLink" to="/register">註冊帳號</router-link>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, inject } from 'vue';
import { signinAPI } from '../../utils/TodoAPI';
import { useRouter } from 'vue-router';
const router = useRouter();

const notify = inject('notify');
const signInField = ref({
  email: '',
  password: '',
});
const signInRes = ref(null);


const isEmail = computed(() => {
  return signInField.value.email.length > 0;
});

const signIn = async () => {
  const result = await signinAPI(signInField.value);
  if (result) {
    signInRes.value = result.token;
    document.cookie = `customTodoToken=${result.token};path=/`
    notify('登入成功')
    router.push('/todo');
  }
  else {
    notify('登入失敗')
  }
}

</script>
