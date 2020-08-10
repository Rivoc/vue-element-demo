<template>
  <div>
    <el-container>
      <el-aside :width="isCollapse ? '63px' : '150px'">
        <navMenu></navMenu>
      </el-aside>
      <el-container>
        <el-header
          ><keep-alive><tabs></tabs> </keep-alive
        ></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import navMenu from './components/NavMenu'
import tabs from './components/Tabs'
export default {
  name: 'Layout',
  components: {
    navMenu,
    tabs
  },
  computed: {
    isCollapse () {
      return this.$store.state.isCollapse
    }
  }
}
</script>
<style lang="stylus">
.el-main {
  padding: 10px;
}

.el-aside {
  transition: all 0.3s ease-out;
}
</style>
