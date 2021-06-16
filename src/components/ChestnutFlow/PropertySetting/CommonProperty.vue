<template>
  <div>
    <el-form label-width="80px" :model="formData">
      <el-form-item label="标签">
        <el-input v-model="formData.text" />
      </el-form-item>
      <el-form-item label="脚本">
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
        text: '',
        name: '',
        region: '',
        type: '',
        a: {
          a1: '',
          a2: ''
        },
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
    }
  }
}
</script>
<style scoped>
</style>
