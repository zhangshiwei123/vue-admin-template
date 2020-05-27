<template>
  <div class="dashboard-container">
    <div class="dashboard-functionBox">
      <div id="my_change" class="dashboard-findBox">
        <el-select v-model="value" placeholder="All assets">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-divider direction="vertical" />
        <el-input v-model="input" placeholder="Search by Keywords" class="change_inp">
          <i
            slot="suffix"
            class="el-icon-search el-input__icon"
            style="cursor: pointer;"
          />
        </el-input>
      </div>
      <div class="dashboard-add_box" @click="addInfo">
        <img src="../../assets/icon/add.png" alt="">
      </div>
      <div class="dashboard-del_box">
        <img src="../../assets/icon/del.png" alt="">
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="Visit ID"
      >
        <template slot-scope="scope"><span
          style="font-size:16px;
                 font-family:HelveticaNeue-CondensedBold,HelveticaNeue;
                  font-weight:normal;
                  cursor: pointer;
                  color:rgba(51,51,51,1);"
          @click="toShipPlane(scope)"
        >{{ scope.row.date }}</span></template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="航线"
      />
      <el-table-column
        prop="address"
        label="船名"
      />
      <el-table-column
        prop="stopNum"
        label="泊位"
      />
      <el-table-column
        prop="stopPos"
        label="停靠方向"
      />
      <el-table-column
        prop="inPlane"
        label="进口航次"
      />
      <el-table-column
        prop="outPlane"
        label="出口航次"
      />
      <el-table-column
        prop="status"
        label="状态"
      >
        <template slot-scope="scope" class="status_info">
          <span :class="[scope.row.status == 1 ? 'create' : scope.row.status == 2 ? 'arrived' : scope.row.status == 3 ? 'working' : scope.row.status == 4 ? 'complete' : 'departed']">{{ scope.row.status == 1 ? 'Create' : scope.row.status == 2 ? 'Arrived' : scope.row.status == 3 ? 'Working' : scope.row.status == 4 ? 'Complete' : 'Departed' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180"
      />
      <el-table-column
        prop="ship"
        label="船图结构"
      />
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible" width="404px" height="640px">
      <h3
        style="ont-size:18px;
            font-family:PingFangSC-Semibold,PingFang SC;
            font-weight:600;
            color:rgba(51,51,51,1);
            line-height:20px;
            text-shadow:0px 2px 20px rgba(0,0,0,0.3);"
      >添加记录</h3>
      <el-form label-position="left" label-width="80px" :model="formLabelAlign">
        <el-form-item label="Visit ID">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formLabelAlign.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="航名">
          <el-input v-model="formLabelAlign.type" />
        </el-form-item>
        <el-form-item label="进口航次">
          <el-input v-model="formLabelAlign.type" />
        </el-form-item>
        <el-form-item label="出口航次">
          <el-input v-model="formLabelAlign.type" />
        </el-form-item>
        <el-form-item label="航线">
          <el-input v-model="formLabelAlign.type" />
        </el-form-item>
        <el-form-item label="泊位">
          <el-input v-model="formLabelAlign.type" />
        </el-form-item>
        <el-form-item label="停靠方向">
          <el-select v-model="formLabelAlign.region" placeholder="请选择停靠方向">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="cancel_small_btn">取消</div>
        <div class="finish_small_btn">确定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      value: '',
      input: '',
      dialogFormVisible: false,
      tableData: [{
        date: 'ABH814W',
        name: 'ZIM',
        address: 'BAHAMAS',
        stopNum: '105',
        stopPos: 'left',
        inPlane: '813E',
        outPlane: '814W',
        status: '1',
        createTime: '2020.01.14 12:10:30',
        ship: ''
      }, {
        date: 'ABH814W',
        name: 'ZIM',
        address: 'BAHAMAS',
        stopNum: '105',
        stopPos: 'left',
        inPlane: '813E',
        outPlane: '814W',
        status: '1',
        createTime: '2020.01.14 12:10:30',
        ship: ''
      }, {
        date: 'ABH814W',
        name: 'ZIM',
        address: 'BAHAMAS',
        stopNum: '105',
        stopPos: 'left',
        inPlane: '813E',
        outPlane: '814W',
        status: '1',
        createTime: '2020.01.14 12:10:30',
        ship: ''
      }, {
        date: 'ABH814W',
        name: 'ZIM',
        address: 'BAHAMAS',
        stopNum: '105',
        stopPos: 'left',
        inPlane: '813E',
        outPlane: '814W',
        status: '2',
        createTime: '2020.01.14 12:10:30',
        ship: ''
      }, {
        date: 'ABH814W',
        name: 'ZIM',
        address: 'BAHAMAS',
        stopNum: '105',
        stopPos: 'left',
        inPlane: '813E',
        outPlane: '814W',
        status: '3',
        createTime: '2020.01.14 12:10:30',
        ship: ''
      }, {
        date: 'ABH814W',
        name: 'ZIM',
        address: 'BAHAMAS',
        stopNum: '105',
        stopPos: 'left',
        inPlane: '813E',
        outPlane: '814W',
        status: '4',
        createTime: '2020.01.14 12:10:30',
        ship: ''
      }, {
        date: 'ABH814W',
        name: 'ZIM',
        address: 'BAHAMAS',
        stopNum: '105',
        stopPos: 'left',
        inPlane: '813E',
        outPlane: '814W',
        status: '1',
        createTime: '2020.01.14 12:10:30',
        ship: ''
      }, {
        date: 'ABH814W',
        name: 'ZIM',
        address: 'BAHAMAS',
        stopNum: '105',
        stopPos: 'left',
        inPlane: '813E',
        outPlane: '814W',
        status: '1',
        createTime: '2020.01.14 12:10:30',
        ship: ''
      }, {
        date: 'ABH814W',
        name: 'ZIM',
        address: 'BAHAMAS',
        stopNum: '105',
        stopPos: 'left',
        inPlane: '813E',
        outPlane: '814W',
        status: '1',
        createTime: '2020.01.14 12:10:30',
        ship: ''
      }, {
        date: 'ABH814W',
        name: 'ZIM',
        address: 'BAHAMAS',
        stopNum: '105',
        stopPos: 'left',
        inPlane: '813E',
        outPlane: '814W',
        status: '3',
        createTime: '2020.01.14 12:10:30',
        ship: ''
      }, {
        date: 'ABH814W',
        name: 'ZIM',
        address: 'BAHAMAS',
        stopNum: '105',
        stopPos: 'left',
        inPlane: '813E',
        outPlane: '814W',
        status: '3',
        createTime: '2020.01.14 12:10:30',
        ship: ''
      }]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    addInfo() {
      this.dialogFormVisible = true
    },
    toShipPlane(info) {
      console.log(info.row)
      window.localStorage.setItem('shipInfo', JSON.stringify(info.row))
      this.$router.push('/example')
    }
  }
}
</script>
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
  padding: 0 60px 30px 60px !important;
}
</style>
<style lang="scss" scoped>
@import '../../styles/btn.scss';

.dashboard {
  &-container {
    padding: 8vh 15vh;
    min-height: 100vh;
    background:rgba(247,247,247,1);
  }
  &-functionBox {
    display: flex;
  }
  &-findBox {
    width: 392px;
    height: 40px;
    background: white;
    border: 1px solid rgba(231,231,231,1);
    display: flex;
    align-items: center;
  }
  &-add_box, &-del_box {
    display: inline-block;
    width:40px;
    height:40px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(231,231,231,1);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
  }
}
.create{
  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #07216A;
    position: relative;
    right: 8px;
    top: -2px;
  }
}
.arrived{
  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #21B964;
    position: relative;
    right: 8px;
    top: -2px;
  }
}
.working{
  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #21A2FF;
    position: relative;
    right: 8px;
    top: -2px;
  }
}
.complete{
  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #8391B5;
    position: relative;
    right: 8px;
    top: -2px;
  }
}
.departed{
  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #D9D9D9;
    position: relative;
    right: 8px;
    top: -2px;
  }
}
</style>
