<template>
  <div class="nav">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router
      @select="handleSelect"
    >
      <el-menu-item index="/dashboard">自动验残</el-menu-item>
      <el-menu-item index="/historical">历史记录</el-menu-item>
      <div class="to_left"><span class="nav-info nav-time">{{ dateStr }}</span><b class="nav-info">|</b><span class="nav-info nav-weather">Good</span></div>
    </el-menu>
    <div class="line" />
  </div>
</template>
<script>
import { formatTime } from '../../utils/format'
export default {
  data() {
    return {
      navList: ['残箱识别', '历史记录']
    }
  },
  computed: {
    dateStr: function() {
      return formatTime(this.date, 'HH:mm MMM DD, YYYY')
    },
    activeIndex: function() {
      return this.$route.meta.nav || this.$route.path
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss" scoped>
  .nav {
    width: 100%;
    height: 40px;
    padding: 0 20px;
    align-items: center;
    .el-menu-item {
      padding: 0 5px;
      margin: 0 15px;
      height: 38px;
      line-height: 38px;
      color: #0c2366;
      border-bottom: 3px solid transparent;
      &.is-active {
        color: #333;
        font-weight: bold;
        border-bottom: 3px solid #0c2366;
      }
      .nav-info {
        display: inline-block;
        font-weight: bold;
        color: #333;
        &.nav-time {
          margin-right: 15px;
        }
      }
    }
    .to_left {
      line-height: 40px;
      text-align: right;
      font-size: 14px;
      .nav-info {
      display: inline-block;
      font-weight: bold;
      color: #333;
      &.nav-time {
        margin-right: 15px;
      }
      &.nav-weather {
        padding-right: 25px;
        margin-left: 15px;
        margin-right: 40px;
        background: url("../../assets/logo/nav-sunny.png") no-repeat center right;
      }
    }
    }
  }
</style>