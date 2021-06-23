<template>
  <div class="logic-flow-view">
    <!--    <el-select v-model="formData.script.type" placeholder="请选择">-->
    <!--      <el-option v-for="item in flowDatas." :key="item.value" :value="item.value" :label="item.label" />-->
    <!--    </el-select>-->
    <!-- 节点面板 -->
    <!--    <NodePanel v-if="lf" :lf="lf" :node-list="nodeList" />-->
    <!-- 画布 -->
    <div id="LF-view" />
    <!-- 用户节点自定义操作面板 -->
    <AddPanel
      v-if="showAddPanel"
      class="add-panel"
      :style="addPanelStyle"
      :lf="lf"
      :node-data="addClickNode"
      @addNodeFinish="hideAddPanel"
    />
    <!-- 属性面板 -->
    <el-drawer
      title="设置节点属性"
      :visible.sync="dialogVisible"
      direction="rtl"
      size="500px"
      :before-close="closeDialog"
    >
      <PropertyDialog
        v-if="dialogVisible"
        :node-data="clickNode"
        :lf="lf"
        @setPropertiesFinish="closeDialog"
      />
    </el-drawer>
    <!-- 数据查看面板 -->
    <el-dialog
      title="数据"
      :visible.sync="dataVisible"
      width="50%"
    >
      <DataDialog :graph-data="graphData" />
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import NodePanel from "@/components/ChestnutFlow/LFComponents/NodePanel";
import AddPanel from "@/components/ChestnutFlow/LFComponents/AddPanel";
import Control from "@/components/ChestnutFlow/LFComponents/Control";
import PropertyDialog from "@/components/ChestnutFlow/PropertySetting/PropertyDialog";
import DataDialog from "@/components/ChestnutFlow/LFComponents/DataDialog";
import {nodeList} from "@/views/flow-manager/config";
import LogicFlow from "@logicflow/core";
import {Menu, Snapshot} from "@logicflow/extension";
import {
  registerEnd,
  registerPolyline,
  registerStart,
  registerSwitch,
  registerTask
} from "@/components/ChestnutFlow/registerNode";
const demoData = require('../data/data2.json')
export default {
  name: 'FlowDetail',
  components: { NodePanel, AddPanel, Control, PropertyDialog, DataDialog },
  props: ['templateFlowDataList', 'flowData'],
  data() {
    return {
      loading: false,
      lf: null,
      showAddPanel: false,
      addPanelStyle: {
        top: 0,
        left: 0
      },
      nodeData: null,
      addClickNode: null,
      clickNode: null,
      dialogVisible: false,
      graphData: null,
      dataVisible: false,
      config: {
        background: {
          color: '#f7f9ff'
        },
        grid: {
          size: 10,
          // visible: false
          visible: true
        },
        keyboard: {
          enabled: true
        },
        style: {
          rect: {
            radius: 6
          },
          edgeText: { // 边文本样式
            background: {
              fill: '#fff'
            }
          }
        },
        edgeTextDraggable: true,
        guards: {
          beforeClone(data) {
            console.log('beforeClone', data)
            return true
          },
          beforeDelete(data) {
            // 可以根据data数据判断是否允许删除，允许返回true,不允许返回false
            // 文档： http://logic-flow.org/guide/basic/keyboard.html#%E5%A6%82%E4%BD%95%E9%98%BB%E6%AD%A2%E5%88%A0%E9%99%A4%E6%88%96%E8%80%85%E6%8B%B7%E8%B4%9D%E8%A1%8C%E4%B8%BA
            console.log('beforeDelete', data)
            // _this.$message('不允许删除', 'error')
            return true
          }
        }
      },
      moveData: {},
      nodeList,
      flowVersion: 'v1.0'
    }
  },
  mounted() {
    this.$_initLf()
  },
  methods: {
    $_initLf() {
      // 画布配置

      // 使用插件
      LogicFlow.use(Menu)
      LogicFlow.use(Snapshot)
      const lf = new LogicFlow(
        { ...this.config, container: document.querySelector('#LF-view') }
      )
      this.lf = lf
      // 设置主题
      lf.setTheme({
        circle: {
          r: 20,
          stroke: '#000000',
          outlineColor: '#88f',
          strokeWidth: 1
        },
        rect: {
          outlineColor: '#88f',
          strokeWidth: 1,
          radius: 10
          // width: 90,
          // height: 60
        },
        polygon: {
          strokeWidth: 1
        },
        polyline: {
          stroke: '#000000',
          hoverStroke: '#000000',
          selectedStroke: '#000000',
          outlineColor: '#88f',
          strokeWidth: 1
        },
        nodeText: {
          color: '#000000' // 节点文本内容颜色
        },
        edgeText: {
          color: '#000000', // 节点之间连线的颜色
          background: {
            fill: '#f7f9ff'
          }
        }
      })
      this.$_registerNode()
    },
    // 自定义
    $_registerNode() {
      registerStart(this.lf)
      // registerUser(this.lf)
      registerSwitch(this.lf) // 注册该自定义的组件，基本就可以将该组件 拖拽到画布上
      registerEnd(this.lf)
      // registerPush(this.lf, this.clickPlus, this.mouseDownPlus)
      // registerDownload(this.lf)
      registerPolyline(this.lf)
      registerTask(this.lf)
      this.$_render()
    },
    $_render() {
      // console.log('xxxxxxxxxxx', this.flowData)
      this.lf.render(demoData)
      this.$_LfEvent()
    },
    $_getData() {
      const data = this.lf.getGraphData()
      console.log(JSON.stringify(data))
    },
    $_LfEvent() {
      this.lf.on('node:click', ({ data }) => {
        // console.log('node:click', data)
        this.$data.clickNode = data
        this.$data.dialogVisible = true
      })
      this.lf.on('edge:click', ({ data }) => {
        console.log('edge:click', data)
        this.$data.clickNode = data
        this.$data.dialogVisible = true
      })
      this.lf.on('element:click', () => {
        this.hideAddPanel()
      })
      this.lf.on('edge:add', ({ data }) => {
        console.log('edge:add', data)
      })
      this.lf.on('node:mousemove', ({ data }) => {
        console.log('node:mousemove')
        this.moveData = data
      })
      this.lf.on('blank:click', () => {
        this.hideAddPanel()
      })
      this.lf.on('connection:not-allowed', (data) => {
        this.$message({
          type: 'error',
          message: data.msg
        })
      })
      this.lf.on('node:mousemove', () => {
        console.log('on mousemove')
      })
    },
    clickPlus(e, attributes) {
      e.stopPropagation()
      console.log('clickPlus', e, attributes)
      const { clientX, clientY } = e
      console.log(clientX, clientY)
      this.$data.addPanelStyle.top = (clientY - 40) + 'px'
      this.$data.addPanelStyle.left = clientX + 'px'
      this.$data.showAddPanel = true
      this.$data.addClickNode = attributes
    },
    mouseDownPlus(e, attributes) {
      e.stopPropagation()
      console.log('mouseDownPlus', e, attributes)
    },
    hideAddPanel() {
      this.$data.showAddPanel = false
      this.$data.addPanelStyle.top = 0
      this.$data.addPanelStyle.left = 0
      this.$data.addClickNode = null
    },
    closeDialog() {
      this.$data.dialogVisible = false
    },
    $_catData() {
      this.$data.graphData = this.$data.lf.getGraphData()
      this.$data.dataVisible = true
    }
  }
}
</script>

<style scoped>

</style>
