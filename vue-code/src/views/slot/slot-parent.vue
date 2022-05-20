<template>
  <div>
    <slotChild>
      <template v-slot:header>我是header</template>
      <template v-slot:default>我是纷纷分default</template>
      <template v-slot:footer>我是footer</template>
    </slotChild>
  </div>
</template>

<script>
import slotChild from './slot-child.vue'
export default {
  components: { slotChild }
}
</script>

<style lang="scss" scoped>
</style>