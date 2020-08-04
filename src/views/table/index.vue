<template>
  <div class="app-container">
    <h1>船名代码:{{ shipInfo.VisitId }} 进口航次:{{ shipInfo.VesselIn }} 出口航次:{{ shipInfo.VesselOut }}</h1>
    <div class="shipContainer" style="display: flex;">
      <div v-for="( item, index) in dataLsit" :key="index" class="ship_item">
        <div v-for="(it, ind) in item.top" :key="ind" :class="[it == '1' ? 'top_color' : 'top_no_color']" />
        <span class="ship_num">{{ item.Bay }}</span>
        <div v-for="(its, inds) in item.bottom" :key="'info' + inds" :class="[its == '1' ? 'top_color' : 'top_no_color']" />
      </div>
    </div>
    <div class="ship_info_container">
      <div class="bay_pos">
        <span
          style="font-size:20px;
                 font-family:PingFangSC-Semibold,PingFang SC;
                 font-weight:600;
                 color:rgba(51,51,51,1);
                 margin-right: 26px"
        >贝位</span>
        <span v-for="(items, indexs) in dataLsit" :key="indexs" :class="[(chooseBayInfo.indexOf(items.Bay) != -1) ? 'bay_num isActive' : 'bay_num']" style="cursor: pointer;" @click="chooseBay(items, indexs)">{{ items.Bay }}</span>
      </div>
      <div class="crane_pos">
        <span
          style="font-size:20px;
                 font-family:PingFangSC-Semibold,PingFang SC;
                 font-weight:600;
                 color:rgba(51,51,51,1);"
        >岸桥</span>
        <span v-for="(item1, index) in craneList" :key="index" :class="[isChange == index ? 'crane_num isActive_crane' : 'crane_num']" style="cursor: pointer;">{{ item1 }}</span>
      </div>
      <div :class="[chooseBayInfo.length == 0 || chooseCraneInfo == '' ? 'disable_small_btn' : 'finish_small_btn']" style="margin-top: 5vh;margin-left: 20vw;" @click="toWorkBay">确定</div>
    </div>
  </div>
</template>

<script>
// import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      shipInfo: JSON.parse(window.localStorage.getItem('shipInfo')),
      // isFirstChooseBay: false,
      dataLsit: [],
      craneList: [],
      isChange: -1,
      chooseBayInfo: [],
      chooseCraneInfo: ''
    }
  },
  created() {
    this.getWellPage()
  },
  methods: {
    async getWellPage() {
      const res = await API.wellPage.getWellPage({
        v_id: this.shipInfo.VisitId
      })
      const littleBox = {
        top: ['1', '1', '1'],
        bottom: ['1', '1']
      }
      res.Bay.forEach((item, index) => {
        const newobj = Object.assign(item, littleBox)
        this.dataLsit.push(newobj)
      })
      this.craneList = res.CraneId
    },
    chooseBay(bayInfo, index) {
      const findIndex = this.chooseBayInfo.indexOf(bayInfo.Bay)
      if (findIndex > -1) {
        this.chooseBayInfo.splice(findIndex, 1)
      } else if (this.chooseBayInfo.length !== 2) {
        this.chooseBayInfo.push(bayInfo.Bay)
      }
      if (bayInfo.Link === 'None' && this.chooseBayInfo.length > 1) { // 如果不是相邻贝位，或单贝位，提示用户选择有误
        this.$message({
          message: '请选择相邻贝位!',
          type: 'warning'
        })
      }
    },
    chooseCrane(crane, index) {
      console.log(crane)
      if (index !== this.isChange) {
        this.isChange = index
        this.chooseCraneInfo = crane
      } else {
        this.chooseCraneInfo = ''
        this.isChange = -1
      }
    },
    toWorkBay() {
      if (this.chooseBayInfo.length === 0 || this.chooseCraneInfo === '') {
        return
      }
      const newUrl = this.$router.resolve({ name: '#/workBay' })
      // console.log(this.dataLsit)
      const bayInfo = {
        chooseBay: this.chooseBayInfo,
        chooseCrane: this.chooseCraneInfo
      }
      // 跳转时把贝位列表，和用户选择的贝位 & 岸桥存入localstorage
      window.localStorage.setItem('bayInfo', JSON.stringify(bayInfo)) // 用户选择的贝位和岸桥信息
      window.localStorage.setItem('bayList', JSON.stringify(this.dataLsit)) // 全部贝位列表
      window.open(newUrl.location.name, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/btn.scss';
  h1 {
    font-size:18px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,0.75);
  }
    .shipContainer {
      margin: 20vh auto;
      // max-width: 1844px;
      height: 358px;
      background: url('../../assets/bg/shipBg.png') no-repeat;
      background-size: contain;
      display: flex;
      justify-content: center;
    }
    .ship_item {
      margin-right: 20px;
      line-height: 35px;
      text-align: center;
      // position: absolute;
      position: relative;
      top: 150px;
      .top_color {
        width: 40px;
        height: 16px;
        background: #3B4D83;
        margin-bottom: 5px;
      }
      .top_no_color {
        width: 40px;
        height: 16px;
        background:rgba(59,77,131,0.2);
        margin-bottom: 5px;
      }
      .ship_num {
        font-size:14px;
        font-family:HelveticaNeue-CondensedBold,HelveticaNeue;
        font-weight:normal;
        width: 40px;
        height: 16px;
        display: inline-block;
        color:rgba(12,35,102,1);
        background: white;
      }
    }
    .ship_info_container {
      margin-left: 25vw;
      margin-top: -15vh;
    }
    .bay_num {
      display: inline-block;
      width: 40px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size:20px;
      font-family:HelveticaNeue-CondensedBold,HelveticaNeue;
      font-weight:normal;
      color:rgba(12,35,102,1);
      margin-left: 20px;
    }
    .isActive {
      background: rgba(12,35,102,1);
      color: white;
    }
    .crane_num {
      display: inline-block;

      font-size:20px;
      font-family:HelveticaNeue-CondensedBold,HelveticaNeue;
      font-weight:normal;
      color:rgba(12,35,102,1);
      margin-left: 40px;
    }
    .isActive_crane {
      background: rgba(12,35,102,1);
      color: white !important;
      padding: 1px 2px;
    }
    .crane_pos {
      margin-top: 40px;
    }
</style>
