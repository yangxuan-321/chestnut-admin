<template>
  <div>
    <el-button-group>
      <el-button type="primary" size="small" round @click="saveFlow">保存流程</el-button>
      <!-- <el-button type="plain" size="small" @click="$_zoomIn">放大</el-button>-->
      <!-- <el-button type="plain" size="small" @click="$_zoomOut">缩小</el-button>-->
      <!-- <el-button type="plain" size="small" @click="$_zoomReset">大小适应</el-button>-->
      <!-- <el-button type="plain" size="small" @click="$_translateRest">定位还原</el-button>-->
      <!-- <el-button type="plain" size="small" @click="$_reset">还原(大小&定位)</el-button>-->
      <el-button type="plain" size="small" :disabled="undoDisable" @click="$_undo">重做(ctrl+z)</el-button>
      <el-button type="plain" size="small" :disabled="redoDisable" @click="$_redo">撤销(ctrl+y)</el-button>
      <el-button type="plain" size="small" @click="$_download">下载图片</el-button>
      <el-button type="plain" size="small" round @click="$_catData">查看数据</el-button>
      <!-- <el-button v-if="catTurboData" type="plain" size="small" @click="$_catTurboData">查看turbo数据</el-button>-->
    </el-button-group>
  </div>
</template>
<script>
export default {
  name: 'Control',
  props: {
    lf: Object || String,
    catTurboData: Boolean
  },
  data() {
    return {
      undoDisable: true,
      redoDisable: true,
      graphData: null,
      dataVisible: false
    }
  },
  mounted() {
    this.$props.lf.on('history:change', ({ data: { undoAble, redoAble }}) => {
      this.$data.undoDisable = !undoAble
      this.$data.redoDisable = !redoAble
    })
  },
  methods: {
    $_zoomIn() {
      this.$props.lf.zoom(true)
    },
    $_zoomOut() {
      this.$props.lf.zoom(false)
    },
    $_zoomReset() {
      this.$props.lf.resetZoom()
    },
    $_translateRest() {
      this.$props.lf.resetTranslate()
    },
    $_reset() {
      this.$props.lf.resetZoom()
      this.$props.lf.resetTranslate()
    },
    $_undo() {
      this.$props.lf.undo()
    },
    $_redo() {
      this.$props.lf.redo()
    },
    $_download() {
      this.$props.lf.getSnapshot()
    },
    $_catData() {
      this.$emit('catData')
    },
    $_catTurboData() {
      this.$emit('catTurboData')
    },
    /* eslint-disable */
    saveFlow() {
      console.log("yyyyyyyyyy")
      this.$emit('saveFlow')
    }
  }
}
</script>
<style scoped>
</style>
