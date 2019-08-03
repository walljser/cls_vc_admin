<template>
  <div class="com-datepicker" :class="{'control-on': active}">
    <input type="text" name="rangeDate" class="com-form-control" :value="rangeDate" readonly />
  </div>
</template>
<script>
  import $ from 'jquery'
  // import 'bootstrap-daterangepicker'
  import datepickerConfig from './config'
  import moment from 'moment'

  const rangeDatepickerConfig = {
    ...datepickerConfig,
    singleDatePicker: false,
    showDropdowns: false
  }

  export default {
    data () {
      return {
        active: false
      }
    },
    mounted () {
      var $datepicker = $(this.$el).find('.com-form-control')
      $datepicker.daterangepicker({
        ...rangeDatepickerConfig,
        parentEl: $(this.$el)
      })
      $datepicker.val(this.rangeDate)
      $datepicker.on('apply.daterangepicker', (ev, picker) => {
        $datepicker.val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'))
        this.emitValue({
          startDateTime: picker.startDate.format('YYYY-MM-DD'),
          endDateTime: picker.endDate.format('YYYY-MM-DD')
        })
      })
      $datepicker.on('cancel.daterangepicker', (ev, picker) => {
        console.log('cancel')
      })
      $datepicker.on('show.daterangepicker', (ev, picker) => {
        this.active = true
      })
      $datepicker.on('hide.daterangepicker', (ev, picker) => {
        this.active = false
      })

      this.$datepicker = $datepicker
    },
    props: {
      startDateTime: {
        type: String,
        default () {
          return ''
        }
      },
      endDateTime: {
        type: String,
        default () {
          return ''
        }
      }
    },
    computed: {
      rangeDate () {
        if (this.startDateTime && this.endDateTime) {
          return moment(this.startDateTime).format('MM/DD/YYYY') + ' - ' + moment(this.endDateTime).format('MM/DD/YYYY')
        }
        return '选择日期'
      }
    },
    methods: {
      handleClear () {
        this.emitValue({
          startDateTime: '',
          endDateTime: ''
        })
      },
      emitValue ({
        startDateTime,
        endDateTime
      }) {
        this.$emit('update', {
          startDateTime,
          endDateTime,
          startTimeStamp: startDateTime ? moment(startDateTime, 'YYYY-MM-DD').valueOf() : '',
          endTimeStamp: endDateTime ? moment(endDateTime, 'YYYY-MM-DD').valueOf() + 24 * 60 * 60 * 1000 - 1 : ''
        })
      }
    },
    watch: {
      rangeDate (val) {
        this.$datepicker && this.$datepicker.val(val)
      }
    }
  }
</script>
<style>
  .com-datepicker .com-form-control {
    min-width: 212px;
  }
  .daterangepicker {
    top: 30px !important;
    right: -12px !important;
    width: 552px;
  }
</style>
