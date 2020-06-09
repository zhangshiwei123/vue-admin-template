<template>
  <div class="workBay-container">
    <el-row :gutter="30">
      <el-col :span="16" class="left_container">
        <div class="bay_info_text">
          <div class="bay_info_text_left">
            <span>岸桥：<b>QC107</b></span><span>装/卸：<b>装船</b></span><span>停靠方向：<b>左停靠</b></span><span>集卡号：<b>01</b></span><span>当前车道：<b>1车道</b></span>
          </div>
          <div class="bay_info_text_right">
            <span>过境箱现实</span>
            <span>切换作业</span>
            <span>结束作业</span>
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
        <workBayCom :bay-data="bayData" />
      </el-col>
      <el-col :span="6" class="right_container" style="margin-left: 30px;">
        <div class="tab_box">
          <span>识别列表</span>
          <span style="margin-left: 30px;">作业列表</span>
        </div>
        <div class="icon_box">
          <span>+</span>
          <span>del</span>
        </div>
      </el-col>
    </el-row>
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
      xData: [{ type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }],
      yData: [{ type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }, { type: 1 }],
      bayData: [
        {
          cols: '92',
          boxList: [
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            }
          ]
        },
        {
          cols: '90',
          boxList: [
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            }
          ]
        },
        {
          cols: '88',
          boxList: [
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            }
          ]
        },
        {
          cols: '88',
          boxList: [
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            }
          ]
        },
        {
          cols: '88',
          boxList: [
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '3' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            }
          ]
        },
        {
          cols: '88',
          boxList: [
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '2' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            }
          ]
        },
        {
          cols: '92',
          isBottom: '1',
          boxList: [
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            }
          ]
        },
        {
          cols: '92',
          boxList: [
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            }
          ]
        },
        {
          cols: '92',
          boxList: [
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            }
          ]
        },
        {
          cols: '92',
          boxList: [
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            }
          ]
        },
        {
          cols: '92',
          boxList: [
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            }
          ]
        },
        {
          cols: '92',
          boxList: [
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            }
          ]
        },
        {
          cols: '92',
          boxList: [
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: '',
              boxType: '6' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            },
            {
              boxNumber: 'TRDU3452124',
              boxType: '1' // 1:装船箱  2:异常箱  3:待确认箱  4:选中箱  5:过境箱  6:空白可占位  7:不占位
            }
          ]
        }
      ]
    }
  },
  created() {
  },
  methods: {
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
  padding: 20px 23px;
  background: white;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
}
.tab_box {
  span {
    font-size: 20px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color:rgba(51,51,51,1);
  }
}
</style>
