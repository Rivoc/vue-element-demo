<template>
  <div class="app-wrap">
    <!-- 此处放置el-tabs代码 -->
    <el-tabs
      v-model="activeIndex"
      type="card"
      closable
      @tab-click="tabClick"
      v-if="options.length"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        :key="item.name"
        v-for="item in options"
        :label="item.name"
        :name="item.route"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

export default {

  name: 'Tabs',

  mounted () {
    console.log('a')
  },
  methods: {

    // 路由跳转至点击的tab

    tabClick (tab) {
      const path = this.activeIndex

      this.$router.push({ path: path })
    },

    tabRemove (targetName) {
      // 首页不可删除
      if (targetName === '/home') {
        return
      }
      // 从数组中移除tab
      this.$store.commit('delete_tabs', targetName)
      console.log('删除了')
      // 如果删除的tab处于激活状态，则跳转至最后一个tab
      if (this.activeIndex === targetName) {
        // 若options为空，则默认打开首页
        if (this.options && this.options.length >= 1) {
          // this.$store.commit('set_active_index', this.options[this.options.length - 1].route)
          // this.$router.push({ path: this.activeIndex })
          this.$router.push({ path: this.options[this.options.length - 1].route })
        } else {
          this.$router.push({ path: '/home' })
        }
      }
    }

  },

  computed: {

    options () {
      return this.$store.state.options
    },

    activeIndex: {

      get () {
        return this.$store.state.activeIndex
      },

      set (val) {
        this.$store.commit('set_active_index', val)
      }

    }

  },
  // 监听路由变化来进行激活、添加tab
  watch: {
    '$route' (to) {
      console.log(this.$route)
      let flag = false
      // 已经存在该tab，仅激活
      for (const option of this.options) {
        if (option.name === to.meta.title) {
          flag = true
          // this.$store.commit('set_active_index', '/' + to.path.split('/')[1])
          this.$store.commit('set_active_index', to.path)
          break
        }
      }
      // 不存在则添加tab
      if (!flag) {
        // this.$store.commit('add_tabs', { route: '/' + to.path.split('/')[1], name: to.meta.title })
        this.$store.commit('add_tabs', { route: to.path, name: to.meta.title })

        // this.$store.commit('set_active_index', '/' + to.path.split('/')[1])
        this.$store.commit('set_active_index', to.path)
      }
    }

  }

}

</script>
