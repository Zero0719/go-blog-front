<template>
  <div class="home">
    <div v-if="lists.length">
      <div class="the-container bg-white px-4 rounded-lg pb-4">
        <List v-if="lists.length > 0" size="large" item-layout="vertical" :loading="loading">
          <ListItem v-for="item in lists" :key="item.id">
            <ListItemMeta :title="item.title" />
            <template slot="action">
              <li>
                <Icon type="ios-time-outline" /> {{ item.created_at }}
              </li>
              <li>
                <Icon type="ios-time-outline" /> {{ item.updated_at }}
              </li>
            </template>
          </ListItem>
        </List>
        <Page :total="totalCount" :current="page" :page-size="pageSize" @on-change="changePage" />
      </div>
    </div>
    <div class="the-container" v-else>
      啥也没得~
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      lists: [],
      page: 1,
      pageSize: 20,
      totalPage: 0,
      totalCount: 0,
      loading: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getArticles()
    },
    changePage (changePage) {
      this.page = changePage
      this.getArticles()
    },
    getArticles () {
      this.loading = true
      this.$http({
        method: 'get',
        url: '/api/articles',
        params: {
          page: this.page,
          pageSize: this.pageSize
        }
      }).then(res => {
        if (res.data.data.lists !== null) {
          this.lists = res.data.data.lists
        } else {
          this.lists = []
        }
        this.totalCount = res.data.data.paginator.count
      }).catch(error => {
        this.$Message.error({
          background: true,
          content: error.response.data.msg
        })
      }).then(() => {
        this.loading = false
      })
    }
  }
}
</script>
