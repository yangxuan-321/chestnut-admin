<template>
  <div>
    <el-form ref="flowForm" label-width="80px" :model="flowForm" :rules="saveFlowRules">
      <el-form-item label="流程名称" prop="flowName">
        <el-input v-model="flowForm.flowName" />
      </el-form-item>
      <el-form-item label="版本" prop="flowVersion">
        <el-input v-model="flowForm.flowVersion" disabled />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:30%; margin-left: 25%; margin-top: 10px;" :loading="loading" @click="onSubmit">
          保存
        </el-button>
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
      // console.log("xxxx => ", this.flowData.getGraphData())
      // if (!validUsername(value)) {
      // 如果用户名为空 或者 用户名的长度为0
      if (!value || value.length === 0) {
        callback(new Error('请输入正确流程名称'))
      } else {
        // console.log("xxxxxxxxxxx1")
        this.$store.dispatch('flow/validateFlowName', value)
          .then(res => { // 成功
              callback()
            }
          )
          .catch(res =>
            // 失败
            callback(new Error('请输入正确流程名称'))
          )
      }
    }
    const validateFlowVersion = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入正确的版本号'))
      } else {
        callback()
      }
    }
    return {
      flowForm: {
        flowName: '',
        flowVersion: 'v1.0'
      },
      saveFlowRules: {
        flowName: [{ required: true, trigger: 'blur', validator: validateFlowName }],
        flowVersion: [{ required: true, trigger: 'blur', validator: validateFlowVersion }]
      },
      loading: false
    }
  },
  /* eslint-disable */
  methods: {
    onSubmit() {
      this.$refs.flowForm.validate(valid => {
        if (valid) {
          this.loading = true
          const data = {
            metaData: this.flowForm,
            flowData: this.flowData.getGraphData()
          }
          this.$store.dispatch('flow/flowManagerSave', data)
            .then(res =>
              this.onSubmitSuccess(res)
            )
            .catch(res =>
              this.onSubmitFail(res)
            )
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // this.$emit("flowFormSubmit", this.flowForm)
    },
    onSubmitSuccess(res) {
      // console.log("返回了:", res)
      this.$message({
        message: '保存成功',
        type: 'success',
      })
      this.loading = false
      this.$emit('flowFormSubmit')
      this.flowForm.flowName = ''
      this.flowForm.flowVersion = ''
    },
    onSubmitFail(res) {
      // this.$emit('flowFormSubmit')
      // this.$message({
      //   message: "保存失败:" + (res.message || ""),
      //   type: "error"
      // })
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
