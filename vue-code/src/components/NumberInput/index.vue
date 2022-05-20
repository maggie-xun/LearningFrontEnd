<template>
  <div class="input-container">
    <input type="text"
           :value="currentValue"
           @change="handleChange">
    <button @click="handleDown">-</button>
    <button @click="handleUp">+</button>
  </div>
</template>

<script>
export default {
  props: {
    max: {
      type: Number,
      default: Infinity,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      currentValue: this.value,
    };
  },
  methods: {
    handleChange(event) {
      let val = event.target.value.trim();
      let max = this.max;
      let min = this.min;
      let valNum = Number(val);
      if (valNum) {
        this.currentValue = valNum;
        if (valNum > max) {
          this.currentValue = max;
        }
        if (valNum < min) {
          this.currentValue = min;
        }
      } else {
        event.target.value = this.currentValue;
      }
    },
    handleUp() {
      if (this.currentValue >= this.max) {
        return;
      }
      this.currentValue++;
    },
    handleDown() {
      if (this.currentValue <= this.min) {
        return;
      }
      this.currentValue--;
    },
    updateValue(val) {
      if (val > this.max) {
        val = this.max;
      }
      if (val < this.min) {
        val = this.min;
      }
      this.currentValue = val;
    },
  },
  watch: {
    curentValue(newValue, oldValue) {
      this.$emit('input', newValue);
      this.$emit('onChange', newValue);
    },
    value(value) {
      this.updateValue(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
}
</style>