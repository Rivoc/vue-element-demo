<template>
  <div class="nav-menu-wrap">
    <el-menu
      :collapse="isCollapse"
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      :default-openeds="openeds"
      router
    >
      <div class="text-right px-1 py-1">
        <i
          :class="[isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold', 'fs-lg']"
          @click="CollapseF"
        ></i>
      </div>
      <template v-for="menu in menus">
        <!-- 循环没有子菜单的一级菜单 -->
        <el-menu-item v-if="!menu.child" :index="menu.path" :key="menu.path">
          <i class="el-icon-setting"></i
          ><span slot="title">{{ menu.title }}</span>
        </el-menu-item>
        <!-- 循环有子菜单的一级菜单和其子菜单 -->
        <el-submenu v-if="menu.child" :index="menu.path" :key="menu.path">
          <template slot="title">
            <i class="el-icon-office-building"></i>
            <span>{{ menu.title }}</span>
          </template>
          <el-menu-item
            style="padding-left: 30px;"
            v-for="child in menu.child"
            :index="child.path"
            :key="child.path"
          >
            <i class="el-icon-menu"></i>{{ child.title }}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      openeds: [],
      menus: [
        {
          icon: 'el-icon-setting',
          title: '首页',
          path: '/home'
        },
        {
          icon: 'el-icon-setting',
          title: '门店管理',
          path: '/shop',
          child: [
            {
              title: '1A门店管理',
              path: '/shop/1A'
            },
            {
              title: '1B门店管理',
              path: '/shop/1B'
            },
            {
              title: '1C门店管理',
              path: '/shop/1C'
            }
          ]
        }
      ]
    }
  },
  watch: {
    '$route' (to) {
      this.openeds.splice(0, this.openeds.length)
      if (/shop/.test(to.path)) {
        this.openeds.push('/shop')
      }
    }
  },
  methods: {
    CollapseF () {
      this.$store.commit('set_collapse')
    }
  },

  // mounted () {
  //   console.log('当前路由' + this.$route.path)
  //   // 直接输入url，根据当前路由生成tab
  //   if (this.$route.path !== '/') {
  //     console.log('输入地址不是' + this.$route.path)
  //     this.$store.commit('add_tabs', { route: '/', name: '首页' })
  //     this.$store.commit('add_tabs', {
  //       route: this.$route.path,
  //       name: this.$route.meta.title
  //     })
  //     this.$store.commit('set_active_index', this.$route.path)
  //   }
  //   // 输入的url不匹配
  //   // else {
  //   //   this.$store.commit('add_tabs', { route: '/', name: '首页' })

  //   //   this.$store.commit('set_active_index', '/')
  //   // }
  // },
  computed: {
    isCollapse () {
      return this.$store.state.isCollapse
    }
  }
}
</script>
