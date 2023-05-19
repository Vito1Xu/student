<template>
    <tr>

        <td>{{ sb.id }}</td>
        <!-- v-if="isEdited==false  点击修改后的input输入框显示设置-->
        <td v-if="isEdited==false">{{ sb.bname }}</td>
        <td v-if="isEdited==false">{{ sb.tname }}</td>
        <td v-if="isEdited==false">{{ sb.sname }}</td>
        <td v-if="isEdited==false">{{ sb.place }}</td>
            
        <td v-if="isEdited==false">
            <el-button type="primary" icon="el-icon-edit" circle @click='edit'></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete"></el-button>
        </td>

        <!-- 
             1.隐藏上面的代码 
             2.显示下面的代码
             3.同时输入框： <el-input type="text" v-model.number="sb.age" class="w-50"></el-input>    显示
             4.以此进行编辑修改学生信息 
        -->


        <td v-if="isEdited==true">
                <el-input type="text" v-model.number="sb.bankeid" class="w-75"></el-input>   
        </td>
        <td v-if="isEdited==true" >
                
        </td>
   
         <td v-if="isEdited==true">
                <el-input type="text" v-model.number="sb.studentid" class="w-75"></el-input>   
        </td>

        <td v-if="isEdited==true" >
                
        </td>
   

   
        <td v-if="isEdited==true">
            <!-- save保存 将数据发送到后端去  -->
         <el-button type="success" icon="el-icon-check" circle @click="save"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete"></el-button>
        </td>
    </tr>
    
    
</template>

<script>
import axios from 'axios'
export default {
    name:"Item",
    props:["sb"],
    data() {
        return {
            isEdited:false
        }
    },
    components: {
        // SelectPlace
    },
    methods: {
        edit(){
            this.isEdited=true;
            console.log(this.$route.params);
        },
       async save(){
           
                await axios({
                url:"http://localhost:8080/updatesb",
                method:"POST",
                data:this.sb
            })
            this.isEdited=false;
          
        },
        handleDelete(){
           this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await  axios({
                url:"http://localhost:8080/deletesb/",
                method: 'POST',
                data:{
                    id:this.sb.id
                }
            })
            this.$emit('reloadTable');
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        }
    },
}
</script>

<style scoped>
    input{
        height:30px
    }
    td{
        width:60px
    }
</style>





