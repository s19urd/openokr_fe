<template>
  <div class="Login">
    <div class="LoginHeader">
      <h1>Hello</h1>
      <p>欢迎来到OKR管理系统</p>
    </div>

    <cell-group class="LoginForm">
      <Field v-model="userInfo.username"  label="账号/手机号" required></Field>
      <Field v-model="userInfo.password"  label="请输入密码" required></Field>
       <!-- <app-input :value="account" label="账号/手机号"/>
       <app-input :value="password" label="请输入密码"/> -->
      <Button type="info" class="submit" @click="submit">登陆</Button>
    </cell-group>

    <div class="LoginFooter">
      <img :src="imgUrl">
    </div>
  </div>
</template>

<script>
import { Field, CellGroup, Button } from 'vant'
import Vue from 'vue'
// import AppInput from 'components/input'
export default {
  name: 'Login',

  components: {
    Field,
    CellGroup,
    Button
  },

  data () {
    return {
      imgUrl: require('assets/background.png'),
      userInfo: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    submit () {
      Vue.api.login.signIn(this.userInfo).then(res => {
        if (res.success) {
          this.$router.push({ name: 'DailyWork' })
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .Login {
    padding: 56px 35px;

    .LoginHeader {
      margin-bottom: 80px;
      text-align: left;
      h1 {
        margin: 0;
      }
    }

    .van-cell {
      margin-bottom: 36px;

      &:not(:last-child)::after {
        border-bottom: 2px solid #c0c4cb;
      }
    }

    .submit {
      width: 100%;
      margin-top: 32px;
    }

    .LoginFooter {
      margin-left: -35px;
      margin-right: -35px;
      margin-top: 80px;

      img {
        max-width: 100%;
      }
    }
  }

  .LoginForm {
    .van-field {
      position: relative;

      &::before {
        top: -20px;
      }
    }

    .van-cell__title {
      position: absolute;
      top: -22px;
    }

    .van-field__control {
      text-align: left !important;
    }
  }
</style>
