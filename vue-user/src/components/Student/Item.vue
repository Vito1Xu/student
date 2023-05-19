<template>
    <tr>
        <td >{{ student.id }}</td>
        <!-- v-if="isEdited==false  点击修改后的input输入框显示设置-->
        <td v-if="isEdited==false">{{ student.number }}</td>
        <td v-if="isEdited==false">{{ student.sname }}</td>
        <td v-if="isEdited==false">{{ student.password }}</td>
        <td v-if="isEdited==false">{{ student.place }}</td>
        
  
        <td v-if="isEdited==false">
            <el-button type="primary" icon="el-icon-edit" circle @click='edit'></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete"></el-button>
        </td>
        <!-- 
             1.隐藏上面的代码 
             2.显示下面的代码
             3.同时输入框： <el-input type="text" v-model.number="student.age" class="w-50"></el-input>    显示
             4.以此进行编辑修改学生信息 
        -->
            
         <td v-if="isEdited==true">
                <el-input type="text" v-model.number="student.number" class="w-50"></el-input> <!-- class="w-50"使输入框变成原来的一半宽度 -->
                <!-- v-model.number后.number：的将输入框输入的数字解析成数字，变成数字的100； 而非字符串的100 -->
        </td>
        <td v-if="isEdited==true">
                <el-input type="text" v-model="student.sname" class="w-75"></el-input>   
                <!-- <SelectPlace/> -->
        </td>
        <td v-if="isEdited==true">
                <el-input type="text" v-model.number="student.password" class="w-50"></el-input>
        </td>
        <td v-if="isEdited==true">
                <el-input type="text" v-model="student.place" class="w-50"></el-input>
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
// import SelectPlace from "./SelectPlace"
export default {
    name:"Item",
    props:["student"],
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
                url:"http://localhost:8080/updatestu",
                method:"POST",
                data:this.student
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
                url:"http://localhost:8080/deletestu/",
                method: 'POST',
                data:{
                    id:this.student.id
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