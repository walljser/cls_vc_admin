<template>
  <div class="ui-dropdown" :class="{ 'open': isShow }">
    <a href="javascript:;" class="selector" tabindex="-1" @blur="hideDropdown" @click="showList">{{computeSelectOption}}</a>
    <div class="dropdown"  @mousemove="hoverFunc" @mouseleave="leaveFunc">
      <ul class="droplist">
        <li v-for="option in options" class="dropitem" @click="select(option)" :title="customLabel(option)">
          <a href="javascript:;" class="dropitem">{{customLabel(option)}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      isHover: false
    }
  },
  props: {
    options: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    labelKey: {
      type: [String, Function],
      default () {
        return 'label'
      }
    }
  },
  mounted () {
  },
  computed: {
    computeSelectOption () {
      const option = Object.keys(this.value).length > 0
        ? this.value
        : (this.options[0] || {})
      return this.customLabel(option)
    }
  },
  methods: {
    customLabel (option) {
      return typeof (this.labelKey) === 'function'
        ? this.labelKey(option) || ''
        : option[this.labelKey] || ''
    },
    hideDropdown () {
      if (!this.isHover) {
        this.isShow = false
      }
    },
    hoverFunc () {
      if (!this.isHover) {
        this.isHover = true
      }
    },
    leaveFunc () {
      if (this.isHover) {
        this.isHover = false
      }
    },
    showList () {
      this.isShow = !this.isShow
    },
    select (option) {
      this.isSelected = true
      this.isShow = false
      this.emitValue(option)
    },
    emitValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style scoped>
.ui-dropdown .selector {
  min-width: 120px;
}
</style>
