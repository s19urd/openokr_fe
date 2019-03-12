<template>
  <div class="field">
    <input class="input" v-model="value"/>
    <label class="input_label"> {{ label }}</label>
  </div>
</template>
<script>
export default {
  name: 'app-input',

  props: {
    label: {
      type: String,
      default: 'i am a label'
    },

    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      active: false
    }
  }
}
</script>

<style lang="scss">
  .field {
    padding: 20px 10px 0;
    margin-bottom: 20px;
    text-align: left;
    position: relative;

    .input {
      border: none;
      border-bottom: solid 1px;
      width: 100%;
      line-height: 28px;

      &:focus,
      &.active {
        + .input_label {
          transform: translate3d(0, -30px, 0);
        }
      }
    }

    .input_label {
      display: block;
      position: absolute;
      bottom: 0;
      transition: transform 0.3s;
      font-size: 17px;
      color: #c5ced6;
    }

  }
</style>
