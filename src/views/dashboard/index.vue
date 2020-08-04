<template>
  <div class="dashboard-container">
    <div class="dashboard-functionBox">
      <div id="my_change" class="dashboard-findBox">
        <el-select v-model="assets" placeholder="All assets" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-divider direction="vertical" />
        <el-input v-model="searchkeyWord" placeholder="Search by Keywords" class="change_inp" clearable>
          <i
            slot="suffix"
            class="el-icon-search el-input__icon"
            style="cursor: pointer;"
            @click="searchOperationsInfo(1)"
          />
        </el-input>
      </div>
      <div class="dashboard-add_box" @click="addInfo">
        <img src="../../assets/icon/add.png" alt="">
      </div>
      <div class="dashboard-del_box" @click="delOperationsInfo">
        <img src="../../assets/icon/del.png" alt="">
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
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
        >{{ scope.row.VisitId }}</span></template>
      </el-table-column>
      <el-table-column
        prop="VesselRoute"
        label="航线"
      />
      <el-table-column
        prop="Vessel"
        label="船名"
      />
      <el-table-column
        prop="Park"
        label="泊位"
      />
      <el-table-column
        prop="Direction"
        label="停靠方向"
      />
      <el-table-column
        prop="VesselIn"
        label="进口航次"
      />
      <el-table-column
        prop="VesselOut"
        label="出口航次"
      />
      <el-table-column
        prop="status"
        label="状态"
      >
        <template slot-scope="scope" class="status_info">
          <span :class="[scope.row.Status == 'Created' ? 'create' : scope.row.Status == 'Arrived' ? 'arrived' : scope.row.Status == 'Working' ? 'working' : scope.row.Status == 'Complete' ? 'complete' : 'departed']">{{ scope.row.Status }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="CreatedTime"
        label="创建时间"
        width="180"
      />
      <el-table-column
        prop="ship"
        label="船图结构"
      >
        <template slot-scope="scope">
          <span :class="[scope.row.VesselStruct ? 'has_VesselStruct' : '']" />
        </template>
      </el-table-column>
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
      <el-form ref="ruleForm" label-position="left" label-width="80px" :model="formLabelAlign" :rules="rules">
        <el-form-item label="Visit ID" prop="VisitId">
          <el-input v-model="formLabelAlign.VisitId" />
        </el-form-item>
        <el-form-item label="状态" prop="Status">
          <el-select v-model="formLabelAlign.Status" placeholder="请选择状态">
            <el-option label="Created" value="Created" />
            <el-option label="Arrived" value="Arrived" />
            <el-option label="Working" value="Working" />
            <el-option label="Complete" value="Complete" />
            <el-option label="Departed" value="Departed" />
          </el-select>
        </el-form-item>
        <el-form-item label="航名" prop="Vessel">
          <el-input v-model="formLabelAlign.Vessel" />
        </el-form-item>
        <el-form-item label="进口航次" prop="VesselIn">
          <el-input v-model="formLabelAlign.VesselIn" />
        </el-form-item>
        <el-form-item label="出口航次" prop="VesselOut">
          <el-input v-model="formLabelAlign.VesselOut" />
        </el-form-item>
        <el-form-item label="航线" prop="VesselRoute">
          <el-input v-model="formLabelAlign.VesselRoute" />
        </el-form-item>
        <el-form-item label="泊位" prop="Park">
          <el-input v-model="formLabelAlign.Park" />
        </el-form-item>
        <el-form-item label="停靠方向" prop="Direction">
          <el-select v-model="formLabelAlign.Direction" placeholder="请选择停靠方向">
            <el-option label="Left" value="Left" />
            <el-option label="Right" value="Right" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <template>
            <div slot="footer" class="dialog-footer">
              <div class="cancel_small_btn">取消</div>
              <div class="finish_small_btn" @click="commitAddInfo(ruleForm)">确定</div>
            </div>
          </template>
        </el-form-item> -->
        <el-form-item>
          <el-button type="danger" @click="dialogFormVisible = !dialogFormVisible">取消</el-button>
          <el-button type="primary" @click="commitAddInfo('ruleForm')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="20"
      hide-on-single-page
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  Message
} from 'element-ui'
// import Pagination from './components/Pagination'
export default {
  name: 'Dashboard',
  // components: {
  //   Pagination
  // },
  data() {
    return {
      options: [{
        value: 'VisitId',
        label: 'VisitId'
      }, {
        value: 'VesselRoute',
        label: '航线'
      }, {
        value: 'Vessel',
        label: '船名'
      }, {
        value: 'Park',
        label: '泊位'
      }, {
        value: 'Direction',
        label: '停靠方向'
      }, {
        value: 'VesselIn',
        label: '进口航次'
      }, {
        value: 'VesselOut',
        label: '出口航次'
      }, {
        value: 'Status',
        label: '状态'
      }, {
        value: 'CreatedTime',
        label: '创建时间'
      }
      ],
      formLabelAlign: {
        VisitId: '',
        VesselIn: '',
        Vessel: '',
        VesselOut: '',
        VesselRoute: '',
        Park: '',
        Status: '',
        Direction: ''
      },
      assets: '',
      searchkeyWord: '',
      dialogFormVisible: false,
      tableData: [],
      total: 1,
      rules: {
        VisitId: [
          { required: true, message: '请输入VisitId', trigger: 'blur' }
        ],
        Status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        Vessel: [
          { required: true, message: '请输入航名', trigger: 'blur' }
        ],
        VesselIn: [
          { required: true, message: '请输入进口航次', trigger: 'blur' }
        ],
        VesselOut: [
          { required: true, message: '请输入出口航次', trigger: 'blur' }
        ],
        Park: [
          { required: true, message: '请输入泊位', trigger: 'blur' }
        ],
        Direction: [
          { required: true, message: '请选择停靠方向', trigger: 'change' }
        ]
      },
      delInfo: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getOperationsList()
  },
  methods: {
    addInfo() {
      this.dialogFormVisible = true
    },
    handleCurrentChange(val) {
      if (this.assets !== '' && this.searchkeyWord !== '') {
        this.searchOperationsInfo(val)
      } else {
        this.getOperationsList(val)
      }
    },
    commitAddInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addOperationsInfo()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSelectionChange(val) {
      this.delInfo = []
      val.forEach(item => {
        console.log(item.Id)
        this.delInfo.push(item.Id)
      })
      this.delInfo = [...new Set(this.delInfo)]
      console.log(this.delInfo)
    },
    async delOperationsInfo() {
      if (this.delInfo.length !== 0) {
        console.log(this.delInfo)
        const res = await API.wellBayList.delOperationsInfo({
          Data: this.delInfo.toString()
        })
        if (res.message === 'success') {
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: '删除信息成功！',
            type: 'success',
            duration: 3000
          })
          this.getOperationsList()
        } else {
          this.$notify.error({
            title: 'Failed',
            message: '删除信息失败！',
            duration: 3000
          })
        }
      }
    },
    async addOperationsInfo() {
      const res = await API.wellBayList.addOperationsInfo(this.formLabelAlign)
      if (res.message === 'success') {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '信息提交成功！',
          type: 'success',
          duration: 3000
        })
        this.getOperationsList()
      } else {
        this.$notify.error({
          title: 'Failed',
          message: '信息提交失败！',
          duration: 3000
        })
      }
    },
    async searchOperationsInfo(page) {
      if (this.assets !== '' && this.searchkeyWord !== '') {
        const res = await API.wellBayList.searchOperationsInfo({
          Key: this.assets,
          Value: this.searchkeyWord,
          Page: page
        })
        this.tableData = res.data
        this.total = res.total
      } else {
        this.getOperationsList()
        // Message({
        //   message: '请填写完整搜索信息!',
        //   type: 'error',
        //   duration: 5 * 1000
        // })
      }
    },
    toShipPlane(info) {
      console.log(info.row)
      window.localStorage.setItem('shipInfo', JSON.stringify(info.row))
      this.$router.push('/example')
    },
    async getOperationsList(page = 1) {
      const res = await API.wellBayList.getOperationsList({
        Page: page
      })
      this.tableData = res.data
      this.total = res.total
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
    span {
      position: relative;
      left: -9.5px;
      font-size: 13px;
      top: -6px;
    }
  }
  .el-button--danger{
    width: 71px;
    height: 28px;
    background:rgba(197,197,197,1);
    border:1px solid rgba(197,197,197,1);
    color: white;
    border-radius: 2px;
    text-align: center;
    margin-left: 10px;
    cursor: pointer;
    span {
      position: relative;
      font-size: 13px;
      top: -6px;
    }
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
.has_VesselStruct {
  &::after {
    content: '';
    display: inline-block;
    width:8px;
    height:8px;
    background:rgba(51,51,51,1);
    border-radius:5px;
    opacity:0.75
  }
}
</style>
