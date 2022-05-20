<template>
  <div>
    <el-form :model='form'>
      <el-row>
        <el-col :span=6>
          <el-form-item label="任务类型">
            <el-select v-model="selectedTaskType">
              <el-option v-for="item in task_type"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task_type: [
        {
          value: "1",
          label: "重点人员排查",
        },
        {
          value: "2",
          label: "重点环境排查",
        },
        {
          value: "3",
          label: "就诊行为排查",
        },
      ],
      selectedTaskType: "",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>