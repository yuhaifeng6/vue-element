<template>
  <div class='manage'>
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary">+ 新增</el-button>
      <common-form :inline="inline" :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary">搜索</el-button>
      </common-form>
    </div>
    <div class="manage-content">
      <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList()" @edit="editUser" @del="delUser"></common-table>
    </div>
  </div>
</template>

<script>
import commonForm from '../../components/commonForm'
import commonTable from '../../components/commonTable'
export default {
name: 'userManage',
  data() {
    return {
      uid: JSON.parse(this.$store.state.user.userinfo).uid,
      operateType: 'add',
      isShow: false,
      tableData: [],
      operateType: "add",
      tableLabel: [
        {
          prop: 'username',
          label: '姓名'
        },
        {
          prop: 'sex',
          label: '性别'
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateForm: {
        username: '',
        sex: ''
      },
      operateFormLabel: [
        {
          model: 'username',
          label: '姓名'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        }
      ],
      searchFrom: {
        keyword: ""
      },
      inline: true,
      formLabel: [
        {
          model: "keyword",
          label: ""
        }
      ]
    };
  },
  components: {
    commonForm,
    commonTable
  },

  created() {
    this.getList()
  },

  mounted() {},

  methods: {
    getList(name = '') {
      // this.config.loading = true
      // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
      name ? (this.config.page = 1) : ''
      this.api.postAPI('/api/getUser', {
        uid: this.uid
      })
      .then(res => {
        let data = res.data.data
        if (res.data.code < 0) {
          this.$message({
            message: data.msg,
            type: 'warning'
          })
          return
        }
        this.tableData = data.map(item => {
          item.sex = item.sex == 0 ? '女' : '男'
          return item
        })
      })
    },
    addUser() {
      this.operateForm = {}
      this.operateType = 'add'
      this.isShow = true
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    confirm() {
      if (this.operateType === 'edit') {
        this.api.postAPI('/api/editUser', this.operateForm).then(res => {
          var type = res.data.code == 0 ? 'success' : 'warning'
          if (res.data.code == 0) this.getList()
          this.$message({
            type: type,
            message: res.data.msg
          })
          this.isShow = false
        })
      } else {
        this.api.postAPI('/api/editUser', this.operateForm).then(res => {
          console.log(222, res.data)
          this.isShow = false
          this.getList()
        })
      }
    },
    /** 删除用户 */
    delUser(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let uid = row.uid
          this.api.postAPI('/api/delUser', {
            uid: uid
          })
          .then(res => {
            var type = res.data.code == 0 ? 'success' : 'warning'
            if (res.data.code == 0) this.getList()
            this.$message({
              type: type,
              message: res.data.msg
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
}

</script>
<style lang='scss' scoped>
@import "../../assets/scss/common.scss"
</style>