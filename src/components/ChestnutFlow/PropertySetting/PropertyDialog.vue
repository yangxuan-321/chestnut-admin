<template>
  <div class="property-dialog">
    <!-- <User
      v-if="nodeData.type === 'user'"
      :node-data="nodeData"
      :lf="lf"
      @onClose="handleClose"
    /> -->

    <CommonProperty
      :node-data="nodeData"
      :lf="lf"
      :can-operate="canOperate"
      @onClose="handleClose"
    />
  </div>
</template>
<script>
import CommonProperty from './CommonProperty'
// import User from './User.vue'
/* eslint-disable */
export default {
  name: 'PropertyDialog',
  components: {
    CommonProperty
    // , User
  },
  props: {
    nodeData: Object,
    lf: Object,
    canOperate: Boolean
  },
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$emit('setPropertiesFinish')
    }
  }
}
</script>
<style>
.property-dialog{
  padding: 20px;
}
</style>
