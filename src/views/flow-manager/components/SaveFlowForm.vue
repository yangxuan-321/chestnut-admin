<template>
  <div>
    <el-form label-width="80px" :model="flowForm">
      <el-form-item label="流程名称">
        <el-input v-model="flowForm.flowName" />
      </el-form-item>
      <el-form-item label="版本">
        <el-input v-model="flowForm.flowVersion" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flowForm: {
        flowName: '',
        flowVersion: ''
      }
    }
  },
  /* eslint-disable */
  methods: {
    onSubmit() {
      this.$emit("flowFormSubmit", this.flowForm)
    }
  }
}
</script>

<style scoped>

</style>
