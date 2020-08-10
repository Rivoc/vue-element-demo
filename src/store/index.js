import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({

  state: {
    // 菜单折叠
    isCollapse: false,
    // 标签页数组容器、当前激活的标签页
    options: [],
    activeIndex: '/home',
    // 分页查询表格相关
    tableData: '',
    tableHeader: '',
    currentPage: 1,
    // 每页能显示几条
    pageSizes: [10, 20, 40, 60],
    // 当前每页显示的条数
    limit: 10
  },

  mutations: {
    // 设置折叠状态
    set_collapse (state) {
      state.isCollapse = !state.isCollapse
    },
    // 添加tabs

    add_tabs (state, data) {
      this.state.options.push(data)
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0
      for (const option of state.options) {
        if (option.route === route) {
          break
        }

        index++
      }

      this.state.options.splice(index, 1)
    },

    // 设置当前激活的tab

    set_active_index (state, index) {
      this.state.activeIndex = index
    },
    // 设置表格表头
    set_table_data (state, data) {
      state.tableData = data
    },
    set_table_header (state, data) {
      state.tableHeader = data
    },
    set_current_page (state, currentPage) {
      state.currentPage = currentPage
    },
    set_limit (state, limit) {
      state.limit = limit
    }

  }

})

export default store
