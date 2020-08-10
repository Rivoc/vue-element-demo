<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-row>
        <el-col :span="5">
          <el-form-item label="门店编号:" prop="shop_num">
            <el-input
              v-model="form.shop_num"
              placeholder="请输入门店编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="门店名称:" prop="shop_name">
            <el-input
              v-model="form.shop_name"
              placeholder="请输入门店名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="门店账号:" prop="account_num">
            <el-input
              v-model="form.account_num"
              placeholder="请输入门店账号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <city
            ref="city"
            @getSelectProvince="getSelectProvince"
            @getSelectCity="getSelectCity"
            @getSelectArea="getSelectArea"
          ></city>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5">
          <el-form-item prop="data_source" label="数据来源:">
            <el-select
              v-model="form.data_source"
              placeholder="请选择"
              size="small"
              style="width:120px"
            >
              <el-option
                v-for="item in data_source"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="inceptor" label="总监编码:">
            <el-select
              v-model="form.inceptor"
              placeholder="请选择"
              size="small"
              style="width:120px"
            >
              <el-option
                v-for="item in data_source"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="status" label="状态:">
            <el-select
              v-model="form.status"
              placeholder="请选择"
              size="small"
              style="width:120px"
            >
              <el-option
                v-for="item in data_source"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="area" label="区域:">
            <el-select
              v-model="form.area"
              placeholder="请选择"
              size="small"
              style="width:120px"
            >
              <el-option
                v-for="item in data_source"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="老板姓名:" prop="account_name">
            <el-input
              v-model="form.account_name"
              placeholder="请输入老板姓名"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 时间选择 -->
      <el-row>
        <el-col :span="5">
          <el-form-item label="上线时间:" prop="online_time">
            <el-date-picker
              class="date-picker"
              v-model="form.online_time"
              type="date"
              placeholder="上线时间"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            label="录入列表时间:"
            prop="add_time"
            label-width="100px"
          >
            <el-date-picker
              class="date-picker"
              v-model="form.add_time"
              type="date"
              placeholder="录入列表时间"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item
            label="首次配置线路时间:"
            prop="first_config_time"
            label-width="150px"
          >
            <el-date-picker
              class="date-picker"
              v-model="form.first_config_time"
              type="date"
              placeholder="首次配置线路时间"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            label="签署合同时间:"
            prop="sign_time"
            label-width="100px"
          >
            <el-date-picker
              class="date-picker"
              v-model="form.sign_time"
              type="date"
              placeholder="签署合同时间"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="首次下单时间:"
            prop="first_order_time"
            label-width="100px"
          >
            <el-date-picker
              class="date-picker"
              v-model="form.first_order_time"
              type="date"
              placeholder="首次下单时间"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" class="px-4" @click="submit"
            >查询</el-button
          ><el-button
            type="info"
            size="small"
            class="px-4"
            @click="resetForm('form')"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <div>
      <ttable ref="table" :form="form"> </ttable>
    </div>
  </div>
</template>
<script>
import city from './City'
import ttable from './Table.vue'
export default {
  name: '1A',
  components: { ttable, city },
  computed: {
    limit () {
      return this.$store.state.limit
    }
  },
  data () {
    return {
      form: {
        shop_name: '',
        shop_num: '',
        account_num: '',
        account_name: '',
        phone: '',
        inceptor: '',
        status: '',
        area: '',
        online_time: '',
        add_time: '',
        first_config_time: '',
        sign_time: '',
        first_order_time: '',
        province: '',
        city: '',
        prefecture: ''
      },
      data_source: [{ label: '来源一', value: 1 }, { label: '来源二', value: 2 }]
    }
  },
  methods: {
    getSelectProvince (val) {
      this.form.province = val
    },
    getSelectCity (val) {
      this.form.city = val
    },
    getSelectArea (val) {
      this.form.prefecture = val
    },
    submit () {
      // 提交后获取查询结果并回到第一页
      this.$refs.table.getData(1, this.limit, this.form)
      this.$refs.table.handleCurrentChange(1)
    },
    resetForm () {
      this.$refs.form.resetFields()
      this.$refs.city.clear()
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-col {
  display: flex;
}

.date-picker {
  width: 150px;
}
</style>
