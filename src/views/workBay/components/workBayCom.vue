<template>
  <div>
    <div class="box_container">
      <div
        v-if="!showUnport"
        style="display: flex;
        width:100%;
	justify-content: space-around;"
      >
        <div v-for="(item, index) in bayData" :key="index" class="bayContainer">
          <div class="bay_tit_info">BAY {{ item.BayNum }}</div>
          <div v-for="(ite, ind) in item.Data" :key="ind" :class="[ite.DownBayStart ? 'bottomBay' : 'topBay']">
            <div v-for="(it, inx) in ite.BoxList" :key="inx" :class="[(it.Status == 1 || it.Status == 7) ? 'shipment' : it.Status == 2 ? 'error' : it.Status == 3 ? 'unconfirmed' : it.Status == 4 ? 'checked' : it.Status == 5 ? 'transit' : (it.Status == '' && it.MsgType) ? 'whiteBg' : 'noneBox']">
              <el-popover
                v-if="it.Status != 0 && it.Status != 7"
                :ref="`popover-${it.ContainerId}`"
                placement="right"
                trigger="click"
                :content="it.ContainerId"
              >
                <div class="box_menu">
                  <div class="boxNumber_tit">{{ it.ContainerId }}</div>
                  <div @click="confirmLocation(it, index)">确认位置</div>
                  <div @click="CancelLocation(it, index)">取消位置</div>
                  <div @click="ModifyLocation(it, index)">修改箱位置</div>
                  <div @click="ModifyContainerId(it, index)">修改箱号</div>
                  <div>残损箱标注</div>
                </div>
                <span slot="reference" @click="tapBox(it)">{{ it.ContainerId }}</span>
              </el-popover>
              <span v-else :class="[(it.Status === 0 && isMove) ? 'moveBox': '']" @click="tapBox(it, inx, ite.Y)">{{ it.ContainerId }}</span>
            </div>
            <span class="y_num">{{ ite.Y }}</span>
          </div>
        </div>
      </div>
      <!-- 卸货港现实，与箱号显示分开 -->
      <div v-for="(item, index) in bayData" v-else :key="index" class="bayContainer">
        <div class="bay_tit_info">BAY {{ item.BayNum }}</div>
        <div v-for="(ite, ind) in item.Data" :key="ind" :class="[ite.DownBayStart ? 'bottomBay' : 'topBay']">
          <div v-for="(it, inx) in ite.BoxList" :key="inx" :class="[unloadPortArr.indexOf(it.UnloadPort) != -1 ? `color-${unloadPortArr.indexOf(it.UnloadPort)}` : 'whiteBg']">
            <span>{{ it.UnloadPortStatus == 1 ? it.UnloadPort : '' }}</span>
          </div>
          <span class="y_num">{{ ite.Y }}</span>
        </div>
      </div>
      <div class="tuli">
        <div v-if="!showUnport" style="display: inline-block">
          <span class="zc">装船箱</span>
          <span class="yc">异常箱</span>
          <span class="dqr">待确认箱</span>
          <span class="xz">选中箱</span>
          <span class="gj">过境箱</span>
        </div>
        <span class="unportBtn" @click="showUnport = !showUnport">{{ !showUnport ? '卸货港' : '箱号' }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    bayData: {
      default: null,
      type: Array
    }
  },
  data() {
    return {
      visible2: false,
      refNamePopover: 'popover-',
      isMove: false,
      showUnport: false,
      unloadPortArr: []
    }
  },
  created() {
    this.initUnloadPortArr()
    // console.log(this.unloadPortArr)
  },
  methods: {
    initUnloadPortArr() {
      const hashArr = []
      this.bayData.forEach((item, index) => {
        item.Data.forEach((ite, ind) => {
          ite.BoxList.forEach(it => {
            if (it.UnloadPort !== '') {
              hashArr.push(it.UnloadPort)
            }
          })
        })
      })
      this.unloadPortArr = this.sortArr(hashArr)
      console.log(this.unloadPortArr)
    },
    confirmLocation(info, index) {
      const refName = this.refNamePopover + info.ContainerId
      this.$refs[refName][0].doClose()
      this.$emit('confirmLocation', info)
      this.isMove = !this.isMove
    },
    CancelLocation(info, index) {
      const refName = this.refNamePopover + info.ContainerId
      this.$refs[refName][0].doClose()
      this.$emit('CancelLocation', info)
    },
    ModifyLocation(info, index) {
      const refName = this.refNamePopover + info.ContainerId
      this.$refs[refName][0].doClose()
      this.$emit('ModifyLocation', info)
    },
    ModifyContainerId(info, index) {
      const refName = this.refNamePopover + info.ContainerId
      this.$refs[refName][0].doClose()
      this.$emit('ModifyContainerId', info)
    },
    tapBox(info, index, yPos) {
      if (this.isMove && info.Status === 0) {
        const xPos = this.bayData[0].XList[index]
        // const yPos = info.Y
        console.log(info)
        console.log('X---' + xPos, 'Y---' + yPos)
      }
      if (info.Status === 3) {
        this.isMove = true
      }
    },
    sortArr(arr) {
      const hash = []
      for (var i = 0; i < arr.length; i++) {
        if (hash.indexOf(arr[i]) === -1) {
          hash.push(arr[i])
        }
      }
      return hash
    }
  }
}
</script>
<style lang="scss">
  .el-popover {
    padding: 0 !important;
  }
  .el-popover--plain {
    padding: 0 !important;
  }
</style>
<style lang="scss" scoped>
@import '../../../styles/portColor.scss';
.box_container {
	width: 95%;
	margin-left: 2.5%;
	background: rgba(247,247,247,1);
  margin-top: 30px;
  display: flex;
	justify-content: space-around;
	padding: 26px 51px 76px 51px;
	position: relative;
}
.shipment {
  width:36px;
  height:37px;
  background:rgba(33,185,100,0.3);
  border:1px solid rgba(33,185,100,1);
  overflow: hidden;
  word-wrap:break-word;
  // line-height: 64px;
  text-align: center;
  font-size: 9px;
  color: black;
  cursor: pointer;
  span {
    display: inline-block;
    width:34px;
    height:35px;
    -webkit-transform: scale(0.9,0.9);
  }
}
.whiteBg {
  width:36px;
  height:37px;
  background: white;
  border:0.5px solid rgba(193,193,193,1);
  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
.error {
  width:36px;
  height:37px;
  background:rgba(255,94,32,0.3);
  border:1px solid rgba(255,94,32,1);
  overflow: hidden;
  text-align: center;
  font-size: 9px;
  word-wrap:break-word;
  color: #FF5E20;
  cursor: pointer;
  span {
    display: inline-block;
    width:34px;
    height:35px;
    -webkit-transform: scale(0.9,0.9);
  }
}
.unconfirmed {
  width:36px;
  height:37px;
  background: rgba(250,173,20,0.3);
  border:1px solid rgba(250,173,20,1);
  overflow: hidden;
  text-align: center;
  font-size: 9px;
  word-wrap:break-word;
  color: black;
  align-items: center;
  cursor: pointer;
  span {
    display: inline-block;
    width:34px;
    height:35px;
    -webkit-transform: scale(0.9,0.9);
  }
}
.topBay {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: center;
  position: relative;
}
.bottomBay {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: center;
  margin-top: 23px;
  position: relative;
}
.box_menu {
  text-align: left;
  margin: 0;
  .boxNumber_tit {
    text-align: center;
    height: 37px;
    line-height: 37px;
    font-size:14px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
    border-bottom: 1px solid #f7f7f7;
  }
  div {
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    cursor: pointer;
    &:hover {
      color: #0C2366;
      background:rgba(246,247,250,1);
    }
  }
}
.bayContainer {
	width: 500px;
}
.bay_tit_info {
	font-size:18px;
	font-family:HelveticaNeue-CondensedBold,HelveticaNeue;
	font-weight:normal;
	color:rgba(51,51,51,1);
	margin: 20px;
}
.tuli {
	position: absolute;
	bottom: 20px;
	left: 50px;
	span {
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		margin-left: 25px;
	}
	.zc::before {
		content: '';
		display: inline-block;
		width: 10px;
		height: 10px;
		background:rgba(33,185,100,0.3);
		border-radius: 2px;
		border:1px solid rgba(33,185,100,1);
		position: relative;
		left: -10px;
	}
	.yc::before {
		content: '';
		display: inline-block;
		width: 10px;
		height: 10px;
		background:rgba(255,94,32,0.3);
		border-radius: 2px;
		border:1px solid rgba(255,94,32,1);
		position: relative;
		left: -10px;
	}
	.dqr::before {
		content: '';
		display: inline-block;
		width: 10px;
		height: 10px;
		background:rgba(250,173,20,0.3);
		border-radius: 2px;
		border:1px solid rgba(250,173,20,1);
		position: relative;
		left: -10px;
	}
	.xz::before {
		content: '';
		display: inline-block;
		width: 10px;
		height: 10px;
		background:rgba(33,162,255,0.3);
		border-radius: 2px;
		border:1px solid rgba(33,162,255,1);
		position: relative;
		left: -10px;
	}
	.gj::before {
		content: '';
		display: inline-block;
		width: 10px;
		height: 10px;
		background:rgba(102,102,102,0.3);
		border-radius: 2px;
		border:1px solid rgba(102,102,102,1);
		position: relative;
		left: -10px;
  }
  .unportBtn {
    display: inline-block;
    cursor: pointer;
    width:70px;
    height:24px;
    background:rgba(33,162,255,1);
    border-radius:12px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 24px;
  }
}
.y_num {
  position: absolute;
  right: 20px;
  font-size:14px;
  top: 10px;
  font-family:HelveticaNeue;
  color:rgba(51,51,51,1);
}
.moveBox {
  &:hover {
    border:1px dashed rgba(33,162,255,1);
  }
}
</style>
