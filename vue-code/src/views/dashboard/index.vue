<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// @ is an alias to /src
import adminDashboard from './admin'

export default {
  name: 'Dashboard',
  data() {
    return {
      currentRole: adminDashboard
    }
  },
  created () {
    this.currentRole=this.roles+'Dashboard';
  },
  components: {
    adminDashboard
  },
  computed: {
    ...mapGetters(['roles'])
  },
}
</script>
