<template>
  <div class="com-datepicker month-picker" :class="{'control-on': active}">
    <input type="text" name="rangeDate" class="com-form-control" :value="month" readonly />
  </div>
</template>
<script>
  import $ from 'jquery'
  // import 'bootstrap-datepicker'
  import moment from 'moment'

  export default {
    data () {
      return {
        active: false,
        month: moment().format('YYYY-MM')
      }
    },
    mounted () {
      var $datepicker = $(this.$el).find('.com-form-control')
      $.fn.datepicker.dates['en'].monthsShort = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      $datepicker.datepicker({
        format: 'yyyy-mm',
        minViewMode: 1,
        maxViewMode: 2,
        autoclose: true
      }).on('changeMonth', e => {
        this.month = moment(e.date).format('YYYY-MM')
        const month = moment(e.date).format('YYYYMM')
        // console.log('选择的月份', month)
        this.emitValue(month)
      }).on('show', e => {
        this.active = true
      }).on('hide', e => {
        this.active = false
      })
      this.$datepicker = $datepicker
    },
    props: {
    },
    methods: {
      emitValue (month) {
        this.$emit('update', {
          month
        })
      }
    },
    watch: {
    }
  }
</script>
<style>
  .month-picker{
    width: 220px;
  }

  .datepicker{
    width:220px;
    color: #fff!important;
    border: 1px solid #1f7ff7!important;
    background: #12255e!important;
    background: rgba(18,37,94,.9)!important;
    border-radius: 0!important;
  }
  .datepicker-dropdown:before{
    display:none!important;
  }
  .datepicker-dropdown:after{
    display:none!important;
  }

  .datepicker table tr td span{
    border-radius: 0!important;
  }
  .datepicker table tr td span.focused{
    background: #12255e!important;
    background: rgba(18,37,94,.9)!important;
    border-color: transparent;
    color: #fff;
  }
  .datepicker table tr td span:hover{
    background-color: #1f7ff7!important;
    border-color: transparent;
    color: #fff;
  }
  .datepicker table tr td span.active{
    background-color: #357ebd!important;
    border-color: transparent;
    color: #fff;
  }

  .datepicker .datepicker-switch, .datepicker .next, .datepicker .prev, .datepicker tfoot tr th{
    border-radius: 0!important;
  }
  .datepicker .datepicker-switch:hover, .datepicker .next:hover, .datepicker .prev:hover, .datepicker tfoot tr th:hover{
    background-color: #1f7ff7!important;
    border-color: transparent;
    color: #fff;
  }
  
</style>
<style src="bootstrap-datepicker/dist/css/bootstrap-datepicker3"></style>
<style src="bootstrap-datepicker/dist/css/bootstrap-datepicker3.standalone.min"></style>
