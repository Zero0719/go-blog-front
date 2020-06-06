<template>
  <div class="article-form">
    <form action="" class="mx-auto w-3/4 p-5 bg-white rounded-lg shadow-lg">
      <Alert type="error" v-if="errorCount>0" closable @on-close="clearError">
        <p v-for="(item,index) in errors" :key="index">{{ item }}</p>
      </Alert>
      <Input class="my-2" v-model="title" size="large" placeholder="请输入标题" />
      <mavon-editor :toolbars="toolbars" v-model="body"/>
      <Button class="my-2" type="primary" @click="submit">提交</Button>
    </form>
  </div>
</template>

<script>
import req from '@/utils/request.js'
export default {
  name: 'ArticleForm',
  data () {
    return {
      title: '',
      body: '',
      errors: {},
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: false, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  computed: {
    errorCount: function () {
      return (Object.keys(this.errors)).length
    }
  },
  methods: {
    submit () {
      req.authRequest({
        method: 'post',
        url: '/articles',
        data: {
          title: this.title,
          body: this.body
        }
      }).then(res => {
        const id = res.data.data.id
        this.$router.push('/articles/' + id)
      }).catch(err => {
        const status = err.response.status
        switch (status) {
          case 401:
            this.$store.dispatch('logout')
            this.$router.push('/login')
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
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
