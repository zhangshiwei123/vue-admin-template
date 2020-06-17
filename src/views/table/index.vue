<template>
  <div class="app-container">
    <h1>船名代码:{{ shipInfo.VisitId }} 进口航次:{{ shipInfo.VesselIn }} 出口航次:{{ shipInfo.VesselOut }}</h1>
    <div class="shipContainer" style="display: flex;">
      <div v-for="( item, index) in dataLsit" :key="index" class="ship_item">
        <div v-for="(it, ind) in item.top" :key="ind" :class="[it == '1' ? 'top_color' : 'top_no_color']" />
        <span class="ship_num">{{ item.num }}</span>
        <div v-for="(it, ind) in item.bottom" :key="ind" :class="[it == '1' ? 'top_color' : 'top_no_color']" />
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
        <span v-for="(item, index) in dataLsit" :key="index" class="bay_num">{{ item.num }}</span>
      </div>
      <div class="crane_pos">
        <span
          style="font-size:20px;
                 font-family:PingFangSC-Semibold,PingFang SC;
                 font-weight:600;
                 color:rgba(51,51,51,1);"
        >岸桥</span>
        <span v-for="(item, index) in craneList" :key="index" class="crane_num">{{ item }}</span>
      </div>
      <div class="finish_small_btn" style="margin-top: 5vh;margin-left: 20vw;" @click="toWorkBay">确定</div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      shipInfo: JSON.parse(window.localStorage.getItem('shipInfo')),
      dataLsit: [
        {
          num: '001',
          top: ['1', '1', '1'],
          bottom: ['1', '1', '1']
        },
        {
          num: '003',
          top: ['0', '1', '1'],
          bottom: ['1', '1', '1']
        },
        {
          num: '005',
          top: ['1', '1', '1'],
          bottom: ['1', '1', '1']
        },
        {
          num: '007',
          top: ['1', '1', '1'],
          bottom: ['1', '1', '1']
        },
        {
          num: '009',
          top: ['1', '1', '1'],
          bottom: ['1', '1', '1']
        },
        {
          num: '011',
          top: ['1', '1', '1'],
          bottom: ['1', '1', '1']
        },
        {
          num: '013',
          top: ['0', '0', '0'],
          bottom: ['1']
        },
        {
          num: '015',
          top: ['0', '1', '1'],
          bottom: ['1', '1', '1']
        },
        {
          num: '017',
          top: ['1', '1', '1'],
          bottom: ['1', '1', '1']
        },
        {
          num: '019',
          top: ['0', '1', '1'],
          bottom: ['1', '1']
        },
        {
          num: '021',
          top: ['0', '1', '1'],
          bottom: ['1', '1', '1']
        },
        {
          num: '023',
          top: ['1', '1', '1'],
          bottom: ['1', '1']
        },
        {
          num: '023',
          top: ['1', '1', '1'],
          bottom: ['1', '1']
        },
        {
          num: '023',
          top: ['1', '1', '1'],
          bottom: ['1', '1']
        },
        {
          num: '023',
          top: ['1', '1', '1'],
          bottom: ['1', '1']
        },
        {
          num: '023',
          top: ['1', '1', '1'],
          bottom: ['1', '1']
        },
        {
          num: '023',
          top: ['1', '1', '1'],
          bottom: ['1', '1']
        },
        {
          num: '023',
          top: ['1', '1', '1'],
          bottom: ['1', '1']
        },
        {
          num: '023',
          top: ['1', '1', '1'],
          bottom: ['1', '1']
        },
        {
          num: '023',
          top: ['1', '1', '1'],
          bottom: ['1', '1']
        },
        {
          num: '023',
          top: ['1', '1', '1'],
          bottom: ['1', '1']
        },
        {
          num: '023',
          top: ['1', '1', '1'],
          bottom: ['1', '1']
        }
      ],
      craneList: ['QC101', 'QC102', 'QC103', 'QC104', 'QC105', 'QC106', 'QC107', 'QC108', 'QC109']
    }
  },
  created() {
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    toWorkBay() {
      const newUrl = this.$router.resolve({ name: '#/workBay' })
      console.log(newUrl)
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
      max-width: 1844px;
      height: 358px;
      background: url('../../assets/bg/shipBg.png') no-repeat;
      background-size: cover;
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
      font-size:20px;
      font-family:HelveticaNeue-CondensedBold,HelveticaNeue;
      font-weight:normal;
      color:rgba(12,35,102,1);
      margin-left: 20px;
    }
    .crane_num {
      display: inline-block;
      width: 40px;
      height: 30px;
      font-size:20px;
      font-family:HelveticaNeue-CondensedBold,HelveticaNeue;
      font-weight:normal;
      color:rgba(12,35,102,1);
      margin-left: 40px;
    }
    .crane_pos {
      margin-top: 40px;
    }
</style>
