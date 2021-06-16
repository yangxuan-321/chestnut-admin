<template>
  <div>
    <el-form ref="flowForm" label-width="80px" :model="flowForm" :rules="saveFlowRules">
      <el-form-item label="流程名称" prop="flowName">
        <el-input v-model="flowForm.flowName" />
      </el-form-item>
      <el-form-item label="版本" prop="flowVersion">
        <el-input v-model="flowForm.flowVersion" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:30%; margin-left: 25%; margin-top: 10px;" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ['flowData'],
  data() {
    const validateFlowName = (rule, value, callback) => {
      console.log("xxxx => ", this.flowData)
      // if (!validUsername(value)) {
      // 如果用户名为空 或者 用户名的长度为0
      if (!value || value.length === 0) {
        callback(new Error('请输入正确流程名称'))
      } else {
        callback()
      }
    }
    const validateFlowVersion = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('请输入正确的版本号'))
      } else {
        callback()
      }
    }
    return {
      flowForm: {
        flowName: '',
        flowVersion: ''
      },
      saveFlowRules: {
        flowName: [{ required: true, trigger: 'blur', validator: validateFlowName }],
        flowVersion: [{ required: true, trigger: 'blur', validator: validateFlowVersion }]
      }
    }
  },
  /* eslint-disable */
  methods: {
    onSubmit() {
      this.$refs.flowForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('flow/flowManagerSave', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // this.$emit("flowFormSubmit", this.flowForm)
    }
  }
}
</script>

<style scoped>

</style>
