package org.example.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.google.gson.Gson;

import io.swagger.annotations.Api;
import org.example.mapper.TeacherMapper;
import org.example.pojo.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api(tags = "教师信息接口")
@CrossOrigin("*")
@SuppressWarnings("all")
@RestController
public class TeacherController {
    Gson gson = new Gson();
    @Autowired
    private TeacherMapper teacherMapper;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 分页查询
    @PostMapping("/teachers")
    public String getTeacher(@RequestBody HashMap<String, Integer> data) {
        int page = data.get("page");
        int numberPerPage = data.get("number_per_page");
        QueryWrapper<Teacher> teacherQueryWrapper = new QueryWrapper<>();
        teacherQueryWrapper.last(String.format("limit %s,%s", page * numberPerPage - numberPerPage, numberPerPage));
        List<Teacher> teachers = teacherMapper.selectList(teacherQueryWrapper);
        return gson.toJson(teachers);
    }

    // 获取总数
    @GetMapping("/get_teachers_count")
    public long getTeacherCount() {
        Long count = teacherMapper.selectCount(null);
        return count;
    }

    // 添加
    @PostMapping("/addteacher")
    public void addTeacher(@RequestBody Teacher teacher) {
        teacherMapper.insert(teacher);
    }

    // 删除
    @PostMapping("/deleteteacher")
    public void deleteTeacher(@RequestBody Teacher teacher) {
        teacherMapper.deleteById(teacher);
    }

    // 修改信息
    @PostMapping("/updateteacher")
    public void updateTeacher(@RequestBody Teacher teacher) {
        teacherMapper.updateById(teacher);
    }

    // 根据姓名模糊查询
    @PostMapping("/searchteacher")
    public String searchTeacher(@RequestBody Teacher teacher) {

        String tname = teacher.getTname();
        QueryWrapper<Teacher> teacherQueryWrapper = new QueryWrapper<>();

        teacherQueryWrapper.like("tname", tname);
        List<Teacher> teachers = teacherMapper.selectList(teacherQueryWrapper);
        return gson.toJson(teachers);
    }


//    @PostMapping("loginteacher")
//    public String loginUser(@RequestBody Teacher teacher) {
////        selectOne()在数据库里查出一条数据：找到就返回那一条数据；找不到返回null
////        ()中接收的参数是queryWrapper 所以要先定义一个
//        QueryWrapper<Teacher> teacherQueryWrapper = new QueryWrapper<>();
////        给实体setEntity()传接收到的参数user
//        teacherQueryWrapper.setEntity(teacher);
////        user_result去接住查出来的 结果
//        Teacher user_result = teacherMapper.selectOne(teacherQueryWrapper);
////        判断user_result是否为null 来判断是否找到结果
//        if (user_result == null) {
////            给前端返回0 告诉它登录失败
//            return "0";
//        } else {
//            return "1";
//        }
//    }

    @PostMapping("/loginteacher")
    public String login(@RequestBody JSONObject req){
        //获取前端传来的 用户名密码
        String tname = req.getString("tname");
        String password = req.getString("password");


        try{
            String sql="select * from teacher where tname="+"\""+tname+"\"";
            //用List去接住上面的ta
            List<Map<String,Object>>maps=jdbcTemplate.queryForList(sql);
            //判断map的size 为0 则说明数据库 无此用户

            if(maps.size()==0){
                return "no teacher";
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
