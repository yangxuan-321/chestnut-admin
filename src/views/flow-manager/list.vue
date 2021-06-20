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
    <el-table />
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
      listQuery: {
        name: 'yangxuan',
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
      }
    }
  },
  methods: {
    handleFilter() {
      // console.log('xxxxxxxx')
    },
    handleCreate() {
      this.$router.push('/flow-manager/create')
    }
  }
}
</script>

<style scoped>

</style>
