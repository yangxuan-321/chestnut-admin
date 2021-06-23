<template>
  <div class="app-container">
    <el-dialog
      :visible="isFlowDetailShow"
      top="10vh"
      width="80%"
      style="height: 90%; margin-left: 10vh"
      @close="closeShowFlowDetailDialog"
    >
      <FlowDetail :flow-data="flowData" :template-flow-data-list="flowDatas" />
    </el-dialog>
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
        :picker-options="dateLimit.pickerOptionsStart"
        value-format="yyyy-MM-dd"
      />
      <span> 至 </span>
      <el-date-picker
        v-model="listQuery.endDate"
        type="date"
        placeholder="结束日期"
        :picker-options="dateLimit.pickerOptionsEnd"
        value-format="yyyy-MM-dd"
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
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="100"
      />
      <el-table-column
        label="流程名称"
        width="399"
        align="center"
      >
        <template slot-scope="{row: {name}}">
          <span>{{ name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="listQuery.showVersion"
        label="流程版本"
        width="150"
        align="center"
      >
        <template slot-scope="{row: {name}}">
          <span>{{ name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建者"
        width="200"
        align="center"
      >
        <template slot-scope="{row: {createUserName}}">
          <span>{{ createUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新者"
        width="200"
        align="center"
      >
        <template slot-scope="{row: {updateUserName}}">
          <span>{{ updateUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="200"
        align="center"
      >
        <template slot-scope="{row: {createdAt}}">
          <span>{{ createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        width="200"
        align="center"
      >
        <template slot-scope="{row: {updatedAt}}">
          <span>{{ updatedAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="320" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text" @click="showFlowDetail(row.id)">查看详情</el-button>
          <el-button type="info" @click="modifyFlow(row.id)">修改</el-button>
          <el-button type="info" @click="deleteFlow(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="100" />
  </div>
</template>

<script>

import Pagination from '../../components/Pagination/index'
import waves from '../../directive/waves/index'
import FlowDetail from './components/FlowDetail'
import { detailFlow, listFlow } from '@/api/flow'
import { nowDatePlusDayStr, nowDateStr } from '@/utils/date-time'

export default {
  components: { Pagination, FlowDetail },
  directives: { waves },
  data() {
    return {
      // tableKey为了区分有多个table时候
      tableKey: 0,
      listLoading: false,
      listQuery: {
        flowName: '',
        showVersion: false,
        startDate: nowDatePlusDayStr(-7),
        endDate: nowDateStr()
      },
      dateLimit: {
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
      templateList: [],
      flowDatas: [],
      flowData: {},
      isFlowDetailShow: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleFilter() {
      this.getList()
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
    },
    getList() {
      this.listLoading = true
      const listQueryDropNull = this.copyDropStringNull(this.listQuery)
      listFlow(listQueryDropNull).then(res => {
        // console.log('响应:', res.data)
        this.templateList = res.data
        this.listLoading = false
      }).catch(err => {
        console.log(err)
        this.listLoading = false
      })
    },
    copyDropStringNull(obj) {
      const nObj = {}
      Object.keys(obj).forEach(item => {
        if (this.isStringType(obj[item])) {
          if (obj[item]) nObj[item] = obj[item]
        } else nObj[item] = obj[item]
      })
      return nObj
    },
    isStringType(obj) {
      return typeof obj === 'string'
    },
    showFlowDetail(id) {
      // console.log('show detail:', id)
      // this.$router.push(`/flow-manager/detail/:${id}`)
      // 请求数据
      detailFlow(id).then((res) => {
        // console.log(res.data)
        this.flowDatas = res.data
        this.flowData = res.data[0].flowData
        this.isFlowDetailShow = true
      }).catch((err) => {
        console.log('查看流程详情出错!', err)
        this.isFlowDetailShow = false
        this.$message.error('查看流程详情出错')
      })
    },
    modifyFlow(id) {
      console.log('modify flow:', id)
    },
    deleteFlow(id) {
      console.log('delete flow:', id)
    },
    closeShowFlowDetailDialog() {
      this.isFlowDetailShow = false
    }
  }
}
</script>

<style scoped>

</style>
