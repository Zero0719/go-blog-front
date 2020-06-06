<template>
  <div class="the-header h-16 bg-white mb-3">
    <div class="the-container h-full">
      <div class="navbar h-full flex items-center justify-between">
        <div class="navbar-left">
          <div class="logo">
            <router-link to="/" class="font-bold text-xl">Go Blog</router-link>
          </div>
        </div>
        <div class="navbar-right">
          <div v-if="user" class="flex justify-center text-base">
            <div>
              <router-link to="/articles" class="mr-4">
                <Icon type="md-add" />
              </router-link>
            </div>
            <div>
              <Dropdown @on-click="dropdownClick">
                <a href="javascript:void(0)">
                  {{ user.nick_name }}
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="logout">退出</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div v-else>
            <router-link to="login" class="mx-2 text-base">登录</router-link>
            <router-link to="register" class="mx-2 text-base">注册</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'TheHeader',
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    dropdownClick (name) {
      switch (name) {
        case 'logout':
          this.$store.dispatch('logout')
          this.$router.push('/login')
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
