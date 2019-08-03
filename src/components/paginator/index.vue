<template>
  <div class="ui-pageTurn" v-if="pages > 0">
    <a @click.prevent="change(currentPage - 1)" class="btn-page" :class="{ 'disabled': currentPage == 1 }">上一页</a>
    <a @click.prevent="change(1)" class="btn-page" :class="{ 'active': 1 == currentPage }">{{1}}</a>
    <a v-if="pageStart > 2" class="ellipsis">...</a>
    <a v-for="n in pageArr"
       class="btn-page" :class="{ 'active': n == currentPage }"
       v-if="n != 1 && n != pages"
       @click.prevent="change(n)">{{n}}</a>
    <a v-if="pageEnd < pages - 1" class="ellipsis">...</a>
    <a @click.prevent="change(pages)" v-if="pages > 1" class="btn-page" :class="{ 'active': pages == currentPage }">{{pages}}</a>
    <a @click.prevent="change(currentPage + 1)" class="btn-page" :class="{ 'disabled': currentPage == pages }">下一页</a>
    <div class="page-goto">
        <p class="text">共 <span class="num">{{pages}}</span> 页</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        distPage: ''
      }
    },
    props: {
      total: {
        type: [Number, String],
        required: false
      },
      pageSize: {
        type: [Number],
        required: false
      },
      pageCount: {
        type: [Number],
        required: false
      },
      currentPage: {
        type: [Number],
        required: false,
        default () {
          return 1
        }
      }
    },
    watch: {
      distPage (value) {
        if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
          this.distPage = ''
        }
      }
    },
    computed: {
      pages () {
        let pages = 0
        if (!this.pageCount) {
          const total = this.total || 0
          const pageSize = this.pageSize || 10
          pages = Math.ceil(total / pageSize)
        } else {
          pages = this.pageCount
        }
        return pages
      },
      pageStart () {
        return (this.currentPage - 2) > 0 ? (this.currentPage) - 2 : 1
      },
      pageEnd () {
        return (this.pageStart + 4) >= this.pages ? this.pages : (this.pageStart + 4)
      },
      pageArr () {
        const arr = []
        for (let i = this.pageStart, j = 0; i <= this.pageEnd; i++, j++) {
          arr[j] = i
        }
        return arr
      },
      validatePage () {
        return (this.distPage | 0) === Number(this.distPage) && this.distPage > 0 && this.distPage <= this.pages
      }
    },
    methods: {
      change (pageNum) {
        if (pageNum > 0 && pageNum <= this.pages && Number(pageNum) !== this.currentPage) {
          this.$emit('change', Number(pageNum))
        }
      }
    }
  }
</script>
<style scoped>
.ui-pageTurn {
  text-align: right;
  height: 50px;
  line-height: 50px;
  margin: 5px 0;
}
.ui-pageTurn .btn-page {
    padding: 8px 12px;
    margin: 0 5px;
    background-color: #1f7ff7;
    background: rgba(31,127,247,.1);
    box-sizing: border-box;
    border: 1px solid #1f7ff7;
    font-family: Arial Normal,Arial;
    font-weight: 400;
    font-size: 14px;
    color: #60a1f3;
    text-align: center;
    -webkit-user-select: none;
    user-select: none;
}
.ui-pageTurn .btn-page.disabled {
    cursor: no-drop;
}
.ui-pageTurn .btn-page.active, .ui-pageTurn .btn-page:active, .ui-pageTurn .btn-page:hover {
    background: #1f7ff7;
    color: #fff;
}
.ui-pageTurn .ellipsis {
    cursor: pointer;
    color: #666;
}
.ui-pageTurn .page-goto {
    display: inline-block;
    margin-left: 25px;
}
</style>
