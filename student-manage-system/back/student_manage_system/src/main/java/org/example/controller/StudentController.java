package org.example.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.google.gson.Gson;
import io.swagger.annotations.Api;
import org.example.mapper.StudentMapper;
import org.example.mapper.UserMapper;
import org.example.pojo.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api(tags = "学生信息接口")
@CrossOrigin("*")
@SuppressWarnings("all")
@RestController
//@RequestMapping("/api/student")
public class StudentController {
    Gson gson = new Gson();
    @Autowired//关联  pojo.student类与mapper.studentmapper接口 然后去数据库里操作数据
    private StudentMapper studentMapper;//定义一个stumapper属性
    @Autowired
    private JdbcTemplate jdbcTemplate;


    // 4.6.16.24
    @PostMapping("/allstu")
    public String allstu() {
        try {
            String sql = " SELECT\n" +
                    "\tstudent.*\n" +
                    "FROM\n" +
                    "\tstudent";
            //用List去接住上面的ta
            List<Map<String, Object>> students = jdbcTemplate.queryForList(sql);
            return gson.toJson(students);
        } catch (Exception e) {
            return "failed";
        }
    }

    // 分页查询学生
    @PostMapping("/students")
    public String getStudent(@RequestBody HashMap<String, Integer> data) {
        int page = data.get("page");
        int numberPerPage = data.get("number_per_page");
        QueryWrapper<Student> studentQueryWrapper = new QueryWrapper<>();
        studentQueryWrapper.last(String.format("limit %s,%s", page * numberPerPage - numberPerPage, numberPerPage));
        List<Student> students = studentMapper.selectList(studentQueryWrapper);
        return gson.toJson(students);
    }

    // 获取学生总数
    @GetMapping("/get_students_count")
    public long getStudentCount() {
        Long count = studentMapper.selectCount(null);
        return count;
    }

    // 添加学生
    @PostMapping("/addstu")
    public void addStudent(@RequestBody Student student) {
        studentMapper.insert(student);
    }

    // 删除学生
    @PostMapping("/deletestu")
    public void deleteStudent(@RequestBody Student student) {
        studentMapper.deleteById(student);
    }

    // 修改学生信息
    @PostMapping("/updatestu")
    public void updateStudent(@RequestBody Student student) {
        studentMapper.updateById(student);
    }

    // 根据姓名模糊查询学生
    @PostMapping("/searchstu")
    //因为只传了一个字符串string 所以用一个hashmapp去接收它
//  public String searchStudent(@ReduestBody HashMap<String,Strina> data)
    public String searchStudent(@RequestBody Student student) {
//      String name=data.get("name")  来获取 前端输入框的值
        String sname = student.getSname();
        QueryWrapper<Student> studentQueryWrapper = new QueryWrapper<>();
//      QueryWrapper有一个like方法
        studentQueryWrapper.like("sname", sname);
        //        上面这行 等价于 下面这行
        // select * from student where sname like '%小黑子%'(sname);

        List<Student> students = studentMapper.selectList(studentQueryWrapper);
        return gson.toJson(students);
    }

    @PostMapping("/loginstudent")
    public String login(@RequestBody JSONObject req){
        //获取前端传来的 用户名密码
        String sname = req.getString("sname");
        String password = req.getString("password");


        try{
            String sql="select * from student where sname="+"\""+sname+"\"";
            //用List去接住上面的ta
            List<Map<String,Object>>maps=jdbcTemplate.queryForList(sql);
            //判断map的size 为0 则说明数据库 无此用户

            if(maps.size()==0){
                return "no student";
            }

            if(maps.size()==1){
                //得到 对象maps.get(0) 的第一个元素，再去访问他的object
                String pwd = (String) maps.get(0).get("password");

                if(pwd.equals(password)){
                    return gson.toJson(maps);
                }else{
                    return "pwd error";
                }

            }else {
                return "known error1";
            }

        }catch (Exception e){
            return "known error2";
        }

    }

}
