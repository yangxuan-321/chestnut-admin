<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.flowName"
        placeholder="流程名称"
        style="width: 260px; margin-right: 2%"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-date-picker
        v-model="listQuery.startDate"
        type="date"
        placeholder="开始日期"
        :picker-options="listQuery.pickerOptionsStart"
      />
      <span> 至 </span>
      <el-date-picker
        v-model="listQuery.endDate"
        type="date"
        placeholder="结束日期"
        :picker-options="listQuery.pickerOptionsEnd"
      />
      <el-checkbox
        v-model="listQuery.showVersion"
        class="filter-item"
        style="margin-left: 1%"
        @change="changeShowVersion"
      >
        显示版本
      </el-checkbox>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        style="margin-left: 2%"
        icon="el-icon-search"
        @click="handleFilter"
      >
        查询
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        style="margin-left: 1%"
        @click="handleCreate"
      >
        新增
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="templateList"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    />
    <pagination :total="100" />
  </div>
</template>

<script>

import Pagination from '../../components/Pagination/index'
import waves from '../../directive/waves/index'

export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      // tableKey为了区分有多个table时候
      tableKey: 0,
      listLoading: false,
      listQuery: {
        flowName: '',
        showVersion: '',
        startDate: '',
        endDate: '',
        // 开始结束日期限制
        pickerOptionsStart: {
          disabledDate: time => {
            return time.getTime() > new Date() || (
              this.listQuery.endDate &&
              (
                time.getTime() > this.listQuery.endDate.getTime() ||
                time.getTime() < this.listQuery.endDate.getTime() - 1000 * 3600 * 24 * 365
              )
            )
          }
        },
        pickerOptionsEnd: {
          disabledDate: time => {
            // console.log(this.listQuery.startDate)
            return time.getTime() > new Date() || (this.listQuery.startDate && this.listQuery.startDate > time.getTime)
          }
        }
      },
      templateList: []
    }
  },
  methods: {
    handleFilter() {
      // console.log('xxxxxxxx')
    },
    handleCreate() {
      this.$router.push('/flow-manager/create')
    },
    sortChange(data) {
      console.log('sort......', data)
    },
    changeShowVersion(value) {
      console.log('changeShowVersion......', value)
      this.listQuery.showVersion = value
    }
  }
}
</script>

<style scoped>

</style>
