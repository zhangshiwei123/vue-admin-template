<template>
  <div>
    <div class="box_container">
      <div class="bayContainer">
        <div class="bay_tit_info">BAY 07</div>
        <div v-for="(item, index) in bayData" :key="index" :class="[item.isBottom == '1' ? 'bottomBay' : 'topBay']">
          <div v-for="(it, ind) in item.boxList" :key="ind" :class="[it.boxType == 1 ? 'shipment' : it.boxType == 2 ? 'error' : it.boxType == 3 ? 'unconfirmed' : it.boxType == 4 ? 'checked' : it.boxType == 5 ? 'transit' : it.boxType == 6 ? 'whiteBg' : 'noneBox']">
            <el-popover
              placement="right"
              trigger="click"
              :content="it.boxNumber"
            >
              <div class="box_menu">
                <div class="boxNumber_tit">{{ it.boxNumber }}</div>
                <div>确认位置</div>
                <div>取消位置</div>
                <div>修改箱位置</div>
                <div>修改箱号</div>
                <div>残损箱标注</div>
              </div>
              <span slot="reference">{{ it.boxNumber }}</span>
            </el-popover>
          </div>
        </div>
      </div>
      <div class="bayContainer">
        <div class="bay_tit_info">BAY 09</div>
        <div v-for="(item, index) in bayData" :key="index" :class="[item.isBottom == '1' ? 'bottomBay' : 'topBay']">
          <div v-for="(it, ind) in item.boxList" :key="ind" :class="[it.boxType == 1 ? 'shipment' : it.boxType == 2 ? 'error' : it.boxType == 3 ? 'unconfirmed' : it.boxType == 4 ? 'checked' : it.boxType == 5 ? 'transit' : it.boxType == 6 ? 'whiteBg' : 'noneBox']">
            <el-popover
              placement="right"
              trigger="click"
              :content="it.boxNumber"
            >
              <div class="box_menu">
                <div class="boxNumber_tit">{{ it.boxNumber }}</div>
                <div>确认位置</div>
                <div>取消位置</div>
                <div>修改箱位置</div>
                <div>修改箱号</div>
                <div>残损箱标注</div>
              </div>
              <span slot="reference">{{ it.boxNumber }}</span>
            </el-popover>
          </div>
        </div>
      </div>
      <div class="tuli">
        <span class="zc">装船箱</span>
        <span class="yc">异常箱</span>
        <span class="dqr">待确认箱</span>
        <span class="xz">选中箱</span>
        <span class="gj">过境箱</span>
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
    return {}
  },
  created() {
    console.log(this.bayData)
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
.box_container {
	width: 95%;
	margin-left: 2.5%;
	background: rgba(247,247,247,1);
	display: flex;
	justify-content: space-around;
	margin-top: 30px;
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
}
.bottomBay {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: center;
  margin-top: 23px;
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
}
</style>
