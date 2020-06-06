<template>
  <div class="register flex items-center justify-center">
    <form action="" class="mx-auto w-1/4 p-5 bg-white rounded-lg shadow-lg" @keyup.enter="login">
      <Input prefix="ios-contact" class="my-2" v-model="nick_name" size="large" placeholder="请输入昵称" />
      <Input prefix="ios-mail" class="my-2" v-model="email" size="large" placeholder="请输入邮箱" />
      <Input prefix="ios-lock" class="my-2" v-model="password" size="large" type="password" password placeholder="请输入密码" />
      <Alert type="error" v-if="errorCount>0" closable @on-close="clearError">
        <p v-for="(item,index) in errors" :key="index">{{ item }}</p>
      </Alert>
      <Button class="my-2" type="primary" @click="register">登录</Button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      nick_name: '',
      email: '',
      password: '',
      errors: {}
    }
  },
  computed: {
    errorCount: function () {
      return (Object.keys(this.errors)).length
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (vm.$store.state.user) {
        vm.$router.push('/')
      }
    })
  },
  methods: {
    register () {
      this.$http({
        method: 'post',
        url: '/api/users',
        data: {
          nick_name: this.nick_name,
          email: this.email,
          password: this.password
        }
      }).then(res => {
        this.$router.push('/login')
      }).catch(err => {
        const status = err.response.status
        switch (status) {
          case 403:
            this.$Message.error({
              background: true,
              content: err.response.data.msg
            })
            break
          case 422:
            this.errors = err.response.data.data.errors
            break
          default:
            this.$Message.error({
              background: true,
              content: '服务器发生错误，请联系管理员'
            })
        }
      })
    },
    clearError () {
      this.errors = {}
    }
  }
}
</script>

<style scoped>

</style>
