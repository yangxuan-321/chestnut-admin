<template>
  <div>{{ detailTemplateId }}</div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'FlowDetail',
  props: ['detailTemplateId'],
  data() {
    return {
      loading: false
    }
  },
  created() {
    // const templateId = this.$route.params && this.$route.params.id
    console.log('获得模板id', this.detailTemplateId)
  },
  deactivated() {
    // const templateId = this.$route.params && this.$route.params.id
    console.log('获得模板id', this.detailTemplateId)
  }
}
</script>

<style scoped>

</style>
