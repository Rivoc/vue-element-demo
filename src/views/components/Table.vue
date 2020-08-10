<template>
  <div>
    <div id="table-container" v-if="tableData">
      <el-table :data="tableData" style="width: 100% height:1000px">
        <el-table-column
          v-for="info in tableHeader"
          :key="info.key"
          :property="info.key"
          :label="info.label"
          type="index"
          width="170"
        >
          <template slot-scope="scope">
            {{ scope.row[scope.column.property] }}
            <!-- 渲染对应表格里面的内容 -->
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getTableData } from '../../api/table.js'
import { mapState, mapMutations } from 'vuex'
export default {

  computed: {
    ...mapState(['tableData', 'tableHeader', 'currentPage', 'pageSizes', 'limit'])
  },
  props: ['form'],
  created () {
    this.getData(this.currentPage, this.limit, this.form)
  },
  methods: {
    ...mapMutations([
      'set_table_data',
      'set_table_header',
      'set_limit',
      'set_current_page'
    ]),
    async getData (currentPage, limit, form) {
      const res = await getTableData(currentPage, limit, form)
      // this.$store.commit('set_table_data', res.data.shopInfo)
      this.set_table_data(res.data.shopInfo)
      // this.$store.commit('set_table_header', res.data.header)
      this.set_table_header(res.data.header)
      this.total = this.tableData.length
    },
    // 每页显示条数控制
    handleSizeChange (val) {
      // 改变每页显示条数，重新请求数据，重置当前页为第一页
      // this.$store.commit('set_limit', val)
      this.set_limit(val)
      this.getData(1, val)
      // this.$store.commit('set_current_page', 1)
      this.set_current_page(1)
    },
    // 页码变化
    handleCurrentChange (val) {
      // 改变默认的页数
      // this.$store.commit('set_current_page', val)
      this.set_current_page(val)
      this.getData(val, this.limit, this.form)
    }
  }

}
</script>
