package org.example.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.google.gson.Gson;
import io.swagger.annotations.Api;
import org.example.mapper.ZuoyetijiaoMapper;
import org.example.pojo.Zuoyetijiao;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Api(tags = "作业提交信息接口")
@CrossOrigin("*")
@SuppressWarnings("all")
@RestController

public class ZuoyetijiaoController {
    Gson gson = new Gson();
    @Autowired
    private ZuoyetijiaoMapper zuoyetijiaoMapper;
    @Autowired
    private JdbcTemplate jdbcTemplate;




    // 分页查询
    @PostMapping("/zuoyetijiaos")
    public String getZuoyetijiao(@RequestBody HashMap<String, Integer> data) {
        int page = data.get("page");
        int numberPerPage = data.get("number_per_page"); //接收分页数据
        QueryWrapper<Zuoyetijiao> zuoyetijiaoQueryWrapper = new QueryWrapper<>();//  <Zuoyetijiao>------泛型传的是zuoyetijiao
        zuoyetijiaoQueryWrapper.last(String.format("limit %s,%s", page * numberPerPage - numberPerPage, numberPerPage));//分页

        //  将 搜索到的zuoyetijiaoQueryWrapper 传入 selectList()的括号里;并用变量zuoyetijiaos 接收
//        List<Zuoyetijiao> zuoyetijiaos = zuoyetijiaoMapper.selectList(zuoyetijiaoQueryWrapper);

        //  使用zuoyetijiaoMapper中的自定义方法 getTijiao（）；并用变量zuoyetijiaos 接收
        List<HashMap<String, Integer>> zuoyetijiaos = zuoyetijiaoMapper.getTijiao();
        return gson.toJson(zuoyetijiaos);

    }

    // 获取总数
    @GetMapping("/get_zuoyetijiaos_count")
    public long getZuoyetijiaoCount() {
        Long count = zuoyetijiaoMapper.selectCount(null);
        return count;



    }

    // 添加
    @PostMapping("/addzuoyetijiao")
    public void addZuoyetijiao(@RequestBody Zuoyetijiao zuoyetijiao) {
        zuoyetijiaoMapper.insert(zuoyetijiao);
    }

    // 删除
    @PostMapping("/deletezuoyetijiao")
    public void deleteZuoyetijiao(@RequestBody Zuoyetijiao zuoyetijiao) {
        zuoyetijiaoMapper.deleteById(zuoyetijiao);
    }

    // 修改信息
    @PostMapping("/updatezuoyetijiao")
    public void updateZuoyetijiao(@RequestBody Zuoyetijiao zuoyetijiao) {
        zuoyetijiaoMapper.updateById(zuoyetijiao);
    }

    // 根据学生id模糊查询
    @PostMapping("/searchzuoyetijiao")
    public String searchZuoyetijiao(@RequestBody Zuoyetijiao zuoyetijiao) {

        Long studentid = zuoyetijiao.getStudentid();
        QueryWrapper<Zuoyetijiao> zuoyetijiaoQueryWrapper = new QueryWrapper<>();

        zuoyetijiaoQueryWrapper.like("studentid", studentid);
        List<Zuoyetijiao> zuoyetijiaos = zuoyetijiaoMapper.selectList(zuoyetijiaoQueryWrapper);
        return gson.toJson(zuoyetijiaos);
    }
    //根据fabuid精准查询
    @PostMapping("/searchZuoyefabuTIjiaoid")
    public String searchZuoyefabuTIjiaoid(@RequestBody JSONObject req) {
        //获取前端传来的 fabuid
        long fabuid = req.getLong("fabuid");
        try{
            String sql = "SELECT\n" +
                    "\tzuoyetijiao.id, \n" +
                    "\tzuoyetijiao.daan, \n" +
                    "\tzuoyetijiao.grade, \n" +
                    "\tzuoyetijiao.fabuid, \n" +
                    "\tzuoyefabu.zuoyeneirong, \n" +
                    "\tzuoyetijiao.studentid, \n" +
                    "\tzuoyetijiao.tijiaodate, \n" +
                    "\tstudent.sname, \n" +
                    "\tstudent.place\n" +
                    "FROM\n" +
                    "\tzuoyetijiao\n" +
                    "\tINNER JOIN\n" +
                    "\tzuoyefabu\n" +
                    "\tON \n" +
                    "\t\tzuoyetijiao.fabuid = zuoyefabu.id\n" +
                    "\tINNER JOIN\n" +
                    "\tstudent\n" +
                    "\tON \n" +
                    "\t\tzuoyetijiao.studentid = student.id WHERE fabuid = "+"\""+fabuid+"\"";

            //用List去接住上面的ta
            List<Map<String,Object>>sbs=jdbcTemplate.queryForList(sql);
            return gson.toJson(sbs);
        }catch (Exception e){
            return "failed";
        }
    }
    //根据fabuid,stuid精准查询
    @PostMapping("/searchZuoyefabuTIjiaoidstuid")
    public String searchZuoyefabuTIjiaoidstuid(@RequestBody JSONObject req) {
        //获取前端传来的 fabuid
        long fabuid = req.getLong("fabuid");
        long studentid = req.getLong("studentid");
        try{
            String sql = "SELECT\n" +
                    "\tzuoyetijiao.id, \n" +
                    "\tzuoyetijiao.daan, \n" +
                    "\tzuoyetijiao.grade, \n" +
                    "\tzuoyetijiao.fabuid, \n" +
                    "\tzuoyefabu.zuoyeneirong, \n" +
                    "\tzuoyetijiao.studentid, \n" +
                    "\tstudent.sname, \n" +
                    "\tstudent.place\n" +
                    "FROM\n" +
                    "\tzuoyetijiao\n" +
                    "\tINNER JOIN\n" +
                    "\tzuoyefabu\n" +
                    "\tON \n" +
                    "\t\tzuoyetijiao.fabuid = zuoyefabu.id\n" +
                    "\tINNER JOIN\n" +
                    "\tstudent\n" +
                    "\tON \n" +
                    "\t\tzuoyetijiao.studentid = student.id WHERE fabuid = "+"\""+fabuid+"\" and  studentid = "+"\""+studentid+"\"";

            //用List去接住上面的ta
            List<Map<String,Object>>sbs=jdbcTemplate.queryForList(sql);
            return gson.toJson(sbs);
        }catch (Exception e){
            return "failed";
        }
    }

}
