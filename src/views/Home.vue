<template>
  <div class="home">
    <div v-if="lists.length > 0" class="the-container bg-white px-4 rounded-lg pb-4 relative">
      <List size="large" item-layout="vertical">
        <router-link :to="{name:'ArticleShow', params: {id: item.id}}" v-for="item in lists" :key="item.id">
          <ListItem>
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
        </router-link>
      </List>
      <Page v-if="totalPage > 1" :total="totalCount" :current="page" :page-size="pageSize" @on-change="changePage" />
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
      pageSize: 5,
      totalPage: 0,
      totalCount: 0
    }
  },
  mounted () {
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
        this.totalPage = res.data.data.paginator.total_page
      }).catch(error => {
        this.$Message.error({
          background: true,
          content: error.response.data.msg
        })
      }).then(() => {
        // this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
