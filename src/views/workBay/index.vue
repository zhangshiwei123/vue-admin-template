<template>
  <div class="workBay-container">
    <el-row :gutter="30">
      <el-col :span="15" class="left_container">
        <div class="bay_info_text">
          <div class="bay_info_text_left">
            <span>岸桥：<b>{{chooseInfo.chooseCrane}}</b></span><span>装/卸：<b>{{ bayInfo.vessel_action_type }}</b></span><span>停靠方向：<b>左停靠</b></span><span>集卡号：<b>{{ bayInfo.car_num }}</b></span><span>当前车道：<b>{{ bayInfo.lane_num }}</b></span>
          </div>
          <div class="bay_info_text_right">
            <span>过境箱显示</span>
            <span @click="changeBay">切换作业</span>
            <span @click="FinishJob">结束作业</span>
          </div>
        </div>
        <div class="container_info">
          <div class="info_tit">
            <div>集装箱号</div>
            <div>ISO</div>
            <div>计划位置</div>
            <div>实际位置</div>
            <div>状态</div>
          </div>
          <div class="info_tit">
            <div class="info_item">COPL5263293</div>
            <div class="info_item">22G1</div>
            <div class="info_item">070984</div>
            <div class="info_item">070984</div>
            <div class="info_item">待确认</div>
          </div>
          <div class="info_tit">
            <div class="info_item">AFTS1726362</div>
            <div class="info_item">22G1</div>
            <div class="info_item">090984</div>
            <div class="info_item">090984</div>
            <div class="info_item">待确认</div>
          </div>
        </div>
        <workBayCom v-if="bayData.length != 0" ref="child" :bay-data="bayData" @confirmLocation="confirmLocation" @CancelLocation="CancelLocation" @ModifyLocation="ModifyLocation" @ModifyContainerId="ModifyContainerId" @confirmFirstLocation="confirmFirstLocation" />
      </el-col>
      <el-col :span="7" class="right_container" style="margin-left: 30px;">
        <div class="table_tittle_box">
          <div class="tab_box">
            <span>识别列表</span>
            <span style="margin-left: 30px;">作业列表</span>
          </div>
          <div class="icon_box">
            <div><img src="../../assets/icon/add.png" alt="" @click="addListInfo"></div>
            <div><img src="../../assets/icon/del.png" alt=""></div>
          </div>
        </div>
        <div class="table_th">
          <span>集装箱号</span>
          <span>ISO</span>
          <span>计划位置</span>
          <span>实际位置</span>
          <span>照片</span>
          <span>状态</span>
        </div>
        <div v-for="(item, index) in identificationList" :key="index" class="table_bg">
          <div v-for="(it, ind) in item" :key="ind" class="table_item">
            <div v-if="it.Status == 3 || it.Status == 2" :class="[it.Status == 3 ? 'unconfirmed_line' : it.Status == 2 ? 'error_line' : '']" />
            <el-popover
              :ref="`popover-${it.ContainerId}`"
              placement="right"
              trigger="click"
              :content="it.ContainerId"
            >
              <div class="box_menu">
                <div class="boxNumber_tit">{{ it.ContainerId }}</div>
                <div @click="confirmLocation(it)">确认位置</div>
                <div @click="CancelLocation(it)">取消位置</div>
                <div @click="ModifyLocation(it)">修改箱位置</div>
                <div @click="ModifyContainerId(it)">修改箱号</div>
                <div>残损箱标注</div>
              </div>
              <!-- <span slot="reference">{{ it.ContainerId }}</span> -->
              <div slot="reference" class="table_item_pover">
                <span>{{ it.ContainerId }}</span>
                <span>{{ it.ISO }}</span>
                <span>{{ it.PlanePos }}</span>
                <span>{{ it.ActualPos }}</span>
                <span
                  style="font-size:14px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(12,35,102,1);
                        position: relative;
                        left: -15px;
                        cursor: pointer;"
                >查看</span>
                <span :class="[it.Status == 3 ? 'unconfirmed' : it.Status == 2 ? 'error' : '']">{{ it.Status == 3 ? '待确认' : it.Status == 2 ? '匹配异常' : it.Status == 6 ? '未识别' : '已确认' }}</span>
              </div>
            </el-popover>
          </div>
          <img v-if="item.length == 2" class="link_icon" src="../../../src/assets/icon/link_icon.png">
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" width="428px" height="291px">
      <h3
        style="ont-size:18px;
            font-family:PingFangSC-Semibold,PingFang SC;
            font-weight:600;
            color:rgba(51,51,51,1);
            line-height:20px;
            text-shadow:0px 2px 20px rgba(0,0,0,0.3);"
      >修改箱位置</h3>
      <div class="modify_info_box">
        <span class="info_containerId">{{ modifyLocationInfo.ContainerId }}</span><span class="info_actualPos">{{ modifyLocationInfo.ActualPos }}</span><span class="info_text">修改为</span><el-input v-model="changePos" style="width: 100px;height: 40px" />
      </div>
      <div style="text-align: right; margin-top: 30px;">
        <div class="cancel_media_btn" @click="dialogFormVisible = !dialogFormVisible">取消</div>
        <div class="finish_media_btn" @click="confirmPos">确认</div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible2" width="330px" height="241px">
      <h3
        style="ont-size:18px;
            font-family:PingFangSC-Semibold,PingFang SC;
            font-weight:600;
            color:rgba(51,51,51,1);
            line-height:20px;
            text-shadow:0px 2px 20px rgba(0,0,0,0.3);"
      >修改箱号</h3>
      <div class="modify_info_box">
        <span class="info_containerId">{{ modifyLocationInfo.ContainerId }}</span><span class="info_text">修改为</span><el-input v-model="changeContainerId" style="width: 250px;height: 40px;margin-top: 12px;" />
      </div>
      <div style="text-align: right; margin-top: 30px;">
        <div class="cancel_media_btn" @click="dialogFormVisible2 = !dialogFormVisible2">取消</div>
        <div class="finish_media_btn" @click="confirmContainerId">确认</div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible3" width="300px" height="200px">
      <h3
        style="ont-size:18px;
            font-family:PingFangSC-Semibold,PingFang SC;
            font-weight:600;
            color:rgba(51,51,51,1);
            line-height:20px;
            text-shadow:0px 2px 20px rgba(0,0,0,0.3);"
      >结束作业</h3>
      <div class="finish_job_text">
        <img src="../../assets/icon/jinggao.png" alt=""><span>是否确认结束作业?</span>
      </div>
      <div style="text-align: right; margin-top: 30px;">
        <div class="cancel_small_btn" @click="dialogFormVisible3 = !dialogFormVisible3">取消</div>
        <div class="finish_small_btn" @click="confirmFinishJob">确认</div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible4" width="500px" height="200px">
      <h3
        style="ont-size:18px;
            font-family:PingFangSC-Semibold,PingFang SC;
            font-weight:600;
            color:rgba(51,51,51,1);
            line-height:20px;
            text-shadow:0px 2px 20px rgba(0,0,0,0.3);"
      >切换贝位</h3>
      <div class="bay_pos">
        <span
          style="font-size:20px;
                 font-family:PingFangSC-Semibold,PingFang SC;
                 font-weight:600;
                 color:rgba(51,51,51,1);
                 margin-right: 26px"
        >贝位</span>
        <!-- chooseInfo.chooseBay.indexOf(items.Bay) != -1 -->
        <span v-for="(items, indexs) in bayList" :key="indexs" :class="[chooseInfo.chooseBay.indexOf(items.Bay) != -1 ? 'cannot_choose' : chooseBayInfo.indexOf(items.Bay) != -1 ? 'bay_num isActive' : 'bay_num']" @click="chooseBay(items, indexs)">{{ items.Bay }}</span>
      </div>
      <div style="text-align: right; margin-top: 30px;">
        <div class="cancel_small_btn" @click="dialogFormVisible4 = !dialogFormVisible4">取消</div>
        <div class="finish_small_btn" @click="confirmChangeBay">确认</div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible5" width="300px" height="200px">
      <h3
        style="ont-size:18px;
            font-family:PingFangSC-Semibold,PingFang SC;
            font-weight:600;
            color:rgba(51,51,51,1);
            line-height:20px;
            text-shadow:0px 2px 20px rgba(0,0,0,0.3);"
      >添加记录</h3>
      <el-form ref="ruleForm" label-position="left" label-width="80px" :model="ArgsMsg">
        <el-form-item label="集装箱号" prop="ContainerId">
          <el-input v-model="ArgsMsg.ContainerId" />
        </el-form-item>
        <el-form-item label="ISO" prop="ISO">
          <el-select v-model="ArgsMsg.ISO" placeholder="请选择ISO">
            <el-option label="42G1" value="42G1" />
            <el-option label="22G1" value="22G1" />
          </el-select>
        </el-form-item>
        <el-form-item label="实际位置" prop="ActualPos">
          <el-input v-model="ArgsMsg.ActualPos" />
        </el-form-item>
      </el-form>
      <div style="text-align: right; margin-top: 30px;">
        <div class="cancel_small_btn" @click="dialogFormVisible5 = !dialogFormVisible5">取消</div>
        <div class="finish_small_btn" @click="confirmAddListInfo">确认</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import workBayCom from './components/workBayCom'
export default {
  name: 'WorkBay',
  components: {
    workBayCom
  },
  data() {
    return {
      bayData: [],
      bayInfo: '',
      identificationList: [],
      dialogFormVisible: false, // 修改箱位置弹窗
      dialogFormVisible2: false, // 修改箱号弹窗
      dialogFormVisible3: false, // 结束作业弹窗
      dialogFormVisible4: false, // 切换贝位弹窗
      dialogFormVisible5: false, // 识别列表添加信息弹窗
      modifyLocationInfo: '',
      refNamePopover: 'popover-',
      changePos: '', // 修改后箱位置Pos,
      changeContainerId: '', // 修改后箱号，
      ArgsMsg: {
        ContainerId: '',
        ISO: '',
        PlanePos: '',
        ActualPos: '',
        PictureUrl: '',
        Status: 1
      },
      chooseInfo: JSON.parse(window.localStorage.getItem('bayInfo')), // 船页面，用户选择的bay & crane信息
      bayList: JSON.parse(window.localStorage.getItem('bayList')),
      shipInfo: JSON.parse(window.localStorage.getItem('shipInfo')),
      chooseBayInfo: [] // 修改贝位时，选择的贝位信息
    }
  },
  computed: {
  },
  // sockets: {
  //   reply({ value }) {
  //     console.log(value)
  //   },
  //   connect: function() {
  //     console.log('socket connected')
  //   }
  // },
  created() {
    // this.$socket.emit('notice', 'westwell')
    this.initWebSocket()
  },
  methods: {
    initWebSocket() { // 初始化weosocket
      const wsurl = 'ws://10.66.66.18:8888/wsTest/msg'
      this.websock = new WebSocket(wsurl)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    chooseBay(bayInfo, index) { // 切换贝位的时候选择贝位
      if (this.chooseInfo.chooseBay.indexOf(bayInfo.Bay) !== -1) {
        return
      }
      const findIndex = this.chooseBayInfo.indexOf(bayInfo.Bay)
      if (findIndex > -1) {
        this.chooseBayInfo.splice(findIndex, 1)
      } else if (this.chooseBayInfo.length !== 2) {
        this.chooseBayInfo.push(bayInfo.Bay)
      }
      if (bayInfo.Link === 'None' && this.chooseBayInfo.length > 1) {
        this.$message({
          message: '请选择相邻贝位!',
          type: 'warning'
        })
      }
      console.log(this.chooseBayInfo)
    },
    confirmLocation(data) { // 确认位置
      // console.log(data)
      const refName = this.refNamePopover + data.ContainerId
      this.$refs[refName][0].doClose()
      const sentData = {
        Action: 'ConfirmLocation',
        ArgsMsg: data
      }
      this.websocketsend('ConfirmLocation', sentData)
    },
    CancelLocation(data) { // 取消位置
      const refName = this.refNamePopover + data.ContainerId
      this.$refs[refName][0].doClose()
      const sentData = {
        Action: 'CancelLocation',
        ArgsMsg: data
      }
      this.websocketsend('CancelLocation', sentData)
    },
    ModifyLocation(data) { // 修改箱位置
      const refName = this.refNamePopover + data.ContainerId
      this.$refs[refName][0].doClose()
      this.dialogFormVisible = true
      this.modifyLocationInfo = data
    },
    confirmPos() { // 确认修改箱位置
      const sentData = {
        Action: 'ModifyLocation',
        ArgsMsg: {
          Original: this.modifyLocationInfo,
          NewMsg: this.changePos
        }
      }
      this.websocketsend('ModifyLocation', sentData)
    },
    ModifyContainerId(data) { // 修改箱号
      const refName = this.refNamePopover + data.ContainerId
      this.$refs[refName][0].doClose()
      this.dialogFormVisible2 = true
      this.modifyLocationInfo = data
    },
    confirmContainerId() { // 确认修改箱号
      const sentData = {
        Action: 'ModifyContainerId',
        ArgsMsg: {
          Original: this.modifyLocationInfo,
          NewMsg: this.changeContainerId
        }
      }
      this.websocketsend('ModifyContainerId', sentData)
    },
    FinishJob() { // 结束作业
      this.dialogFormVisible3 = true
    },
    confirmFinishJob() { // 确认结束作业
      const sentData = {
        Action: 'FinishJob',
        ArgsMsg: {}
      }
      this.websocketsend('FinishJob', sentData)
    },
    changeBay() { // 切换贝位
      this.dialogFormVisible4 = true
    },
    confirmChangeBay() { // 确认切换贝位
      const sentData = {
        'Action': 'ReInitOperationPage',
        'ArgsMsg': {
          'visit_id': this.shipInfo.VisitId,
          'vessel_name': this.shipInfo.Vessel,
          'bay_num': this.chooseBayInfo,
          'crane_num': this.chooseInfo.chooseCrane
        }
      }
      const bayInfo = {
        chooseBay: this.chooseBayInfo,
        chooseCrane: this.chooseInfo.chooseCrane
      }
      window.localStorage.setItem('bayInfo', JSON.stringify(bayInfo))
      this.websocketsend('ReInitOperationPage', sentData)
    },
    addListInfo() { // 识别列表添加数据
      this.dialogFormVisible5 = true
    },
    confirmAddListInfo() { // 确认添加识别列表一条数据
      console.log(this.ArgsMsg)
      const sentData = {
        'Action': 'AddIdentificationList',
        'ArgsMsg': [this.ArgsMsg]
      }
      this.websocketsend('AddIdentificationList', sentData)
    },
    confirmFirstLocation(pos) { // 首箱标定，识别列表第一条数据的实际位置和计划位置都为空都时候触发
      const sentData = {
        'Action': 'ConfirmFirstLocation',
        'ArgsMsg': {
          'NewMsg': pos + ''
        }
      }
      this.websocketsend('ConfirmFirstLocation', sentData)
    },
    websocketonopen() { // 连接建立之后执行send方法发送数据
      const sentInitData = {
        'Action': 'InitOperationPage',
        'ArgsMsg': {
          'visit_id': this.shipInfo.VisitId,
          'vessel_name': this.shipInfo.Vessel,
          'bay_num': this.chooseInfo.chooseBay,
          'crane_num': this.chooseInfo.chooseCrane
        }
      }
      console.log(this.chooseInfo.chooseBay)
      this.websocketsend('initData', sentInitData)
    },
    websocketonerror() { // 连接建立失败重连
      this.initWebSocket()
      console.log('Reconnection...')
    },
    websocketonmessage(e) { // 数据接收
      const redata = JSON.parse(e.data)
      this.bayData = redata.E // 贝位图数据
      this.bayInfo = redata.A // 贝位信息
      this.identificationList = redata.B // 识别列表
      console.log(this.identificationList)
      // 如果识别列表的第一条数据没有实际位置 && 没有计划位置，则触发首箱标定条件
      if (this.identificationList[0][0].ActualPos === '' && this.identificationList[0][0].PlanePos === '') {
        this.$alert('请选择首个箱子的位置', '首箱标定', {
          confirmButtonText: '知道了',
          callback: action => {
            this.$refs.child.triggerMove()
          }
        })
      }
      if (redata.OK === 'error') {
        this.$notify.error({
          title: 'Failed',
          message: '操作失败!',
          duration: 3000
        })
      } else if (redata.OK === 'success') {
        this.$notify({
          title: 'Success',
          message: '操作成功!',
          type: 'success',
          duration: 3000
        })
      }
    },
    websocketsend(type, data) { // 数据发送
      if (type === 'ConfirmLocation') { // 确认位置
        console.log('Send Success', data)
        this.websock.send(JSON.stringify(data))
      }
      if (type === 'CancelLocation') { // 取消位置
        console.log('Send Success', data)
        this.websock.send(JSON.stringify(data))
      }
      if (type === 'ModifyLocation') { // 修改箱位置
        console.log('Send Success', data)
        this.websock.send(JSON.stringify(data))
        this.dialogFormVisible = false
      }
      if (type === 'ModifyContainerId') { // 修改箱号
        console.log('Send Success', data)
        this.websock.send(JSON.stringify(data))
        this.dialogFormVisible2 = false
      }
      if (type === 'FinishJob') { // 结束作业
        console.log('Send Success', data)
        this.websock.send(JSON.stringify(data))
        this.dialogFormVisible3 = false
      }
      if (type === 'initData') { // 初始化数据
        this.websock.send(JSON.stringify(data))
        console.log(JSON.stringify(data))
      }
      if (type === 'ReInitOperationPage') { // 切换贝位重新获取数据
        this.websock.send(JSON.stringify(data))
        console.log(JSON.stringify(data))
        this.dialogFormVisible4 = false
      }
      if (type === 'AddIdentificationList') { // 识别列表添加一条信息
        this.websock.send(JSON.stringify(data))
        console.log(JSON.stringify(data))
        this.dialogFormVisible5 = false
      }
      if (type === 'ConfirmFirstLocation') { // 首箱标定
        this.websock.send(JSON.stringify(data))
        console.log(JSON.stringify(data))
      }
    },
    websocketclose(e) { // 关闭
      console.log('断开连接', e)
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
<style lang="scss">
  .el-select .el-input .el-select__caret {
    position: relative;
    right: 5px;
  }
  #my_change .el-input__inner {
    border: none !important;
    height: 38px;
    line-height: 38px;
    padding-right: 0;
    // width: 120px;
    font-size:14px;
    font-family:HelveticaNeue;
    color:rgba(51,51,51,1);
  }
  .el-table {
    font-size:14px;
    font-family:HelveticaNeue;
    color:rgba(51,51,51,1);
    margin-top: 50px;
  }
.el-table th {
    background: #F7F7F7;
}
.el-table th>.cell {
  font-size:14px;
  font-family:HelveticaNeue;
  color:rgba(51,51,51,1);
}
.el-table__row {
  height: 62px;
  background:rgba(255,255,255,1);
}
.el-table td,.building-top .el-table th.is-leaf {
    border-bottom:  5px solid #F7F7F7;
  }
.el-table--enable-row-hover .el-table__body tr:hover>td {
    background:rgba(246,247,250,1);
}
.el-dialog__header {
    background: #0C2366;
    padding: 9px 20px 10px !important;
  }
  .el-dialog__headerbtn {
    .el-dialog__close {
      &::before {
        content: "\e6db";
        font-weight: bold;
        color: white;
        position: relative;
        top: -20px;
        right: -10px;
        font-size: 8px;
      }
    }
  }
.el-dialog__body {
  padding: 0 40px 30px 40px !important;
}
.el-dialog {
  top: 20vh;
}
.el-button--primary{
    width: 71px;
    height: 28px;
    background: #3D4F85;
    border:1px solid #3D4F85;
    color: white;
    border-radius: 2px;
    text-align: center;
    margin-left: 10px;
    cursor: pointer;
    // span {
    //   position: relative;
    //   left: -9.5px;
    //   font-size: 13px;
    //   top: -6px;
    // }
  }
  .el-button--primary:hover{
    background-color: rgba(12,35,102,1);
    border-color: rgba(12,35,102,1);
  }
  .el-button--primary:focus{
    background-color: rgba(12,35,102,1);
    border-color: rgba(12,35,102,1);
  }
</style>
<style lang="scss" scoped>
@import '../../styles/btn.scss';
.workBay-container {
  background:rgba(247,247,247,1);
  padding: 40px;
  min-height: 100vh;
}
.left_container {
  padding: 24px;
  min-height: 100vh;
  background: white;
}
.bay_info_text {
  display: flex;
  justify-content: space-between;

}
.bay_info_text_left {
  span {
    font-size: 14px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color:rgba(51,51,51,1);
    margin-left: 50px;
    b {
      font-size: 14px;
      font-family: PingFangSC-Regular,PingFang SC;
      font-weight: 400;
      color:rgba(51,51,51,1);
    }
  }
}
.bay_info_text_right {
  margin-right: 50px;
  span {
    border:1px solid rgba(231,231,231,1);
    padding: 3px 6px;
    font-size: 10px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color:rgba(51,51,51,1);
    margin-left: 5px;
    cursor: pointer;
  }
}
.container_info {
  width: 95%;
  margin: 20px auto;
  height: 152px;
  background: #FBFBFB;
  padding: 11px 153px;
  .info_tit {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    div {
      width: 150px;
      text-align: left;
      font-size: 14px;
      font-family: PingFangSC-Regular,PingFang SC;
      font-weight: 400;
      color:rgba(51,51,51,1);
    }
    .info_item {
      font-size: 20px;
      font-family: PingFangSC-Light,PingFang SC;
      font-weight: 300;
      color:rgba(51,51,51,1);
    }
  }
}
.right_container {
  padding: 24px 27px;
  background: white;
  min-height: 100vh;
}
.tab_box {
  display: inline-block;
  span {
    font-size: 20px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color:rgba(51,51,51,1);
  }
}
.icon_box {
  div {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(231,231,231,1);
    text-align: center;
    line-height: 40px;
    color: #333;
    font-weight: bold;
    font-size: 14px;
    img {
      width: 16px;
      height: 16px;
      position: relative;
      top: 3px;
    }
  }
}
.table_tittle_box {
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
}
.table_th {
  width: 100%;
  height: 54px;
  background: #FBFBFB;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  span {
    display: inline-block;
    width: 66px;
    text-align: center;
    font-size:14px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight: bold;
    color:rgba(51,51,51,1);
  }
}
.table_bg:nth-child(2n) {
  width: 100%;
  background: #FBFBFB;
}
.table_bg {
  position: relative;
}
.table_item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0px 14px 20px;
  position: relative;
  span {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .unconfirmed {
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(240,158,0,1);
  }
  .error {
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,94,32,1);
  }
  .unconfirmed_line {
    display: inline-block;
    width: 2px;
    height: 100%;
    background:rgba(250,173,20,1);
    position: absolute;
    top: 0px;
    left: 0px
  }
  .error_line {
    display: inline-block;
    width: 2px;
    height: 100%;
    background:rgba(255,94,32,1);
    position: absolute;
    top: 0px;
    left: 0px
  }
}
.link_icon {
  display: inline-block;
  width: 3px;
  height: 9px;
  position: absolute;
  top: 40px;
  left: 57px;
  font-size: 10px;
}
.modify_info_box {
  margin-top: 20px;
  .info_containerId, .info_actualPos{
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .info_actualPos {
    margin-left: 24px;
  }
  .info_text {
    margin: 0 15px;
  }
}
.table_item_pover {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  // &:hover {
  //   background:rgba(12,35,102,0.09);
  // }
  // padding: 0px 0px 0px 20px;
  span {
    display: inline-block;
    width: 76px;
    // text-align: center;
    font-size:14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
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
.finish_job_text {
  display: flex;
  align-items: center;
  span {
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-left: 15px;
  }
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
    text-align: center;
    line-height: 30px;
}
.isActive {
    background: rgba(12,35,102,1);
    color: white;
  }
.cannot_choose {
  display: inline-block;
  width: 40px;
  height: 30px;
  font-size:20px;
  font-family:HelveticaNeue-CondensedBold,HelveticaNeue;
  font-weight:normal;
  color:rgba(197,197,197,1);
  text-shadow:0px 2px 20px rgba(0,0,0,0.3);
  margin-left: 20px;
}
</style>
