<template>
  <div class="d-flex">
    <el-form-item label="省市区" style="width:110px">
      <el-select
        v-model="selectProvince"
        filterable
        size="small"
        @change="selectProvinceF($event)"
        placeholder="请选择省份"
        style="width:100px"
      >
        <el-option value="" label="全部"></el-option>
        <el-option
          :value="item"
          :label="item.name"
          v-for="(item, index) in city"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item style="width:110px">
      <el-select
        v-model="selectCity"
        filterable
        size="small"
        @change="selectCityF($event)"
        placeholder="请选择城市"
        style="width:100px"
      >
        <el-option value="" label="全部"></el-option>
        <el-option
          :value="item"
          :label="item.name"
          v-for="(item, index) in cityList"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item style="width:110px">
      <el-select
        v-model="selectArea"
        filterable
        size="small"
        @change="selectAreaF($event)"
        placeholder="请选择区县"
        style="width:100px"
      >
        <el-option value="" label="全部"></el-option>
        <el-option
          :value="item"
          :label="item.name"
          v-for="(item, index) in areaList"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
import city from '@/assets/json/city.json'
export default {
  name: 'linkage',
  props: ['form'],
  data () {
    return {
      // 整个省市县数据
      city: city,
      // 被选中的市数据
      cityList: [],
      // 被选中的县数据
      areaList: [],
      selectProvince: '',
      selectCity: '',
      selectArea: ''
    }
  },
  mounted () {
  },
  methods: {
    // 省份 市 县联动
    // 选择省
    selectProvinceF (event) {
      console.log(event)
      if (event) {
        this.cityList = event.sub
      } else {
        this.cityList = []
      }
      this.areaList = []
      this.selectProvince = event.name
      this.$emit('getSelectProvince', event.name)
    },
    selectCityF (event) {
      console.log(event)
      if (event) {
        this.areaList = event.sub
      } else {
        this.areaList = []
      }
      this.selectCity = event.name
      this.$emit('getSelectCity', event.name)
    },
    selectAreaF (event) {
      console.log(event)
      this.selectArea = event.name
      this.$emit('getSelectArea', event.name)
    },
    clear () {
      this.selectArea = ''
      this.selectCity = ''
      this.selectProvince = ''
    }
  }
}
</script>
