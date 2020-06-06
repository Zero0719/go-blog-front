<template>
  <div class="article-show">
    <div class="the-container bg-white p-5">
      <div class="article-show-title text-center">
        <div class="text-2xl">
          {{ article.title }}
        </div>
        <div class="mt-2 text-gray-500">
          <span class="mx-2">发布时间: {{ article.created_at }}</span>
          <span class="mx-2">修改时间: {{ article.updated_at }}</span>
        </div>
      </div>
      <mavon-editor class="mt-3" id="editor" v-model="article.body" :toolbarsFlag="false" :subfield="false" :boxShadow="false" defaultOpen="preview" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleShow',
  data () {
    return {
      article: {}
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    getArticle () {
      const id = this.$route.params.id
      this.$http({
        method: 'get',
        url: '/api/articles/' + id
      }).then(res => {
        this.article = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.v-note-panel {
  border: none;
  text-transform: uppercase;
}
.v-show-content {
  background-color: #ffffff;
}
</style>
