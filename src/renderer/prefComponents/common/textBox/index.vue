<template>
  <section class="pref-text-box-item" :class="{'ag-underdevelop': disable}">
    <div class="description">
      <span>{{description}}</span>
      <em class="el-icon-info" v-if="more"
        @click="handleMoreClick"
      ></em>
    </div>
    <el-input
      class="input"
      :class="{error: invalidInput}"
      :placeholder="defaultValue"
      v-model="inputText"
      @input="handleInput"
      style="width: 240px"
      size="small"
      clearable>
    </el-input>
  </section>
</template>

<script>
import { shell } from 'electron'

export default {
  data () {
    this.inputTimer = null
    return {
      inputText: this.input,
      invalidInput: false
    }
  },
  props: {
    description: String,
    input: String,
    onChange: Function,
    more: String,
    disable: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: String,
      default: ''
    },
    regexValidator: {
      type: RegExp,
      default: /(.*?)/
    }
  },
  watch: {
    input: function (value, oldValue) {
      if (value !== oldValue) {
        this.inputText = value
      }
    }
  },
  methods: {
    handleMoreClick () {
      if (typeof this.more === 'string') {
        shell.openExternal(this.more)
      }
    },
    handleInput (value) {
      const result = this.regexValidator.test(value)
      this.invalidInput = !result

      if (result) {
        // Only clear timer when input is valid, otherwise write the last value.
        if (this.inputTimer) {
          clearTimeout(this.inputTimer)
        }

        // Setting delay a little bit higher to prevent continuously file writes when typing.
        this.inputTimer = setTimeout(() => {
          this.inputTimer = null
          this.onChange(value)
        }, 800)
      }
    }
  }
}
</script>

<style>
  .pref-text-box-item {
    font-size: 14px;
    user-select: none;
    margin: 20px 0;
    color: var(--editorColor);
    & input.el-input__inner {
      height: 30px;
      background: transparent;
      color: var(--editorColor);
      border-color: var(--editorColor10);
    }
    & .el-input.is-active .el-input__inner,
    & .el-input__inner:focus {
      border-color: var(--themeColor);
    }
    & .el-input__icon,
    & .el-input__inner {
      line-height: 30px;
    }
  }
  .pref-text-box-item .description {
    margin-bottom: 10px;
    & i {
      cursor: pointer;
      opacity: .7;
      color: var(--iconColor);
    }
    & i:hover {
      color: var(--themeColor);
    }
  }
  .pref-text-box-item .el-input.error input {
    color: #f56c6c;
  }
</style>
