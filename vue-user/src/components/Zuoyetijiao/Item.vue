<template>
    <tr><td >{{ zuoyetijiao.fabuid }}</td>
        <td >{{ zuoyetijiao.id }}</td>
        <td v-if="isEdited==false">{{ zuoyetijiao.daan }}</td>
        <!-- v-if="isEdited==false  点击修改后的input输入框显示设置-->
        <td v-if="isEdited==false">{{ zuoyetijiao.grade }}</td>

        <td v-if="isEdited==false">{{ zuoyetijiao.zuoyeneirong }}</td>
        <td v-if="isEdited==false">{{ zuoyetijiao.sname}}</td>

        <td v-if="isEdited==false">
            <el-button type="primary" icon="el-icon-edit" circle @click='edit'></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete"></el-button>
        </td>
        <!-- 
             1.隐藏上面的代码 
             2.显示下面的代码
             3.同时输入框： <el-input type="text" v-model.number="zuoyetijiao.age" class="w-50"></el-input>    显示
             4.以此进行编辑修改学生信息 
        -->
            
         <td v-if="isEdited==true">
                <el-input type="text" v-model="zuoyetijiao.daan" class="w-50"></el-input> <!-- class="w-50"使输入框变成原来的一半宽度 -->
                <!-- v-model.number后.number：的将输入框输入的数字解析成数字，变成数字的100； 而非字符串的100 -->
        </td>
        <td v-if="isEdited==true">
                <el-input type="text" v-model.number="zuoyetijiao.grade" class="w-50"></el-input> <!-- class="w-50"使输入框变成原来的一半宽度 -->
                <!-- v-model.number后.number：的将输入框输入的数字解析成数字，变成数字的100； 而非字符串的100 -->
        </td>
        <td v-if="isEdited==true">
                <el-input type="text" v-model="zuoyetijiao.fabuid" class="w-50"></el-input> <!-- class="w-50"使输入框变成原来的一半宽度 -->
                <!-- v-model.number后.number：的将输入框输入的数字解析成数字，变成数字的100； 而非字符串的100 -->
        </td>
        <td v-if="isEdited==true">
                <el-input type="text" v-model="zuoyetijiao.studentid" class="w-50"></el-input> <!-- class="w-50"使输入框变成原来的一半宽度 -->
                <!-- v-model.number后.number：的将输入框输入的数字解析成数字，变成数字的100； 而非字符串的100 -->
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
    props:["zuoyetijiao"],
    data() {
        return {
            isEdited:false,
          
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
           if (this.zuoyetijiao.grade<0||this.zuoyetijiao.grade>100) {
                this.$alert('所修改的成绩不符合标准,必须0~100之间哦！', '温馨提示', {
                 confirmButtonText: '知道啦',
                });
            }else{
                await axios({
                url:"http://localhost:8080/updatezuoyetijiao",
                method:"POST",
                data:this.zuoyetijiao
            })
            this.isEdited=false;
            }
        },
        
        handleDelete(){
           this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await  axios({
                url:"http://localhost:8080/deletezuoyetijiao/",
                method: 'POST',
                data:{
                    id:this.zuoyetijiao.id
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


