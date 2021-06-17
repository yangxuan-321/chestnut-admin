<template>
  <div>
    <el-form label-width="80px" :model="formData">
      <el-form-item label="描述">
        <el-input v-model="formData.desc" />
      </el-form-item>
      <el-form-item v-if="judgeScriptType()" label="脚本">
        <el-select v-model="formData.script.type" placeholder="请选择">
          <el-option v-for="item in labelList" :key="item.value" :value="item.value" :label="item.label" />
        </el-select>
        <el-input v-model="formData.script.content" type="textarea" :rows="8" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    nodeData: Object,
    lf: Object || String
  },
  data() {
    return {
      text: '',
      formData: {
        desc: '',
        script: {
          type: 0,
          content: ''
        }
      },
      labelList: [
        {
          value: 0,
          label: 'JavaScript'
        },
        {
          value: 1,
          label: 'Scala'
        },
        {
          value: 2,
          label: 'Java'
        }
      ]
    }
  },
  mounted() {
    const { properties, text } = this.$props.nodeData
    if (properties) {
      this.$data.formData = Object.assign({}, this.$data.formData, properties)
    }
    if (text && text.value) {
      this.$data.formData.text = text.value
    }
    if (text && text.value) {
      this.$data.text = text.value
    }
  },
  methods: {
    onSubmit() {
      const { id } = this.$props.nodeData
      this.$props.lf.setProperties(id, this.$data.formData)
      this.$props.lf.updateText(id, this.$data.formData.text)
      this.$emit('onClose')
    },
    // 判断是否需要显示script
    // 判断是不是从分支出来的线 || 普通节点-非开始节点和终止节点
    judgeScriptType() {
      // console.log("hello: ", this.nodeData)
      const nodeList = this.lf.getGraphData().nodes
      // console.log("world: ", nodeList)
      const nodeType = this.nodeData.type
      if (nodeType === 'polyline') {
        // 根据sourceNodeId找到sourceNode
        const sourceNode = nodeList.find(n => n.id === this.nodeData.sourceNodeId)
        // console.log("node: ", sourceNode)
        return sourceNode && sourceNode.type === 'switch'
      } else if (nodeType === 'start' || nodeType === 'end') {
        return false
      } else return true
    }
  }
}
</script>
<style scoped>
</style>
