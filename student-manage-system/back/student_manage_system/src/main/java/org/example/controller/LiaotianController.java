package org.example.controller;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import io.swagger.annotations.Api;
import org.example.mapper.LiaotianMapper;
import org.example.pojo.Liaotian;
import org.example.pojo.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Transactional
@Api(tags = "聊天信息接口")
@CrossOrigin("*")
@SuppressWarnings("all")
@RestController
public class LiaotianController {
    Gson gson = new Gson();
    @Autowired
    private LiaotianMapper liaotianMapper;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    //路由查询
//    @GetMapping("/liaotians")
//    public String getLiaotians(){
//        List<Liaotian> liaotians = liaotianMapper.selectList(null);// (queryWrapper"null")不需要任何的 查询 包装类
//        return gson.toJson(liaotians);         //将bankes转成字符串后返回给前端
//    }

//    // 添加消息
//    @PostMapping("/addliaotian")
//    public void addLiaotian(@RequestBody Liaotian liaotian) {
//        liaotianMapper.insert(liaotian);
//    }


//    // 删除消息
//    @PostMapping("/deletechat")
//    public void deleteLiaotian() {
//        List<Integer> liaotian = new ArrayList<>();
//
//        liaotian.add();
//        liaotian.add(45);
//        liaotianMapper.deleteBatchIds(liaotian);
//
//
//    }
//    另一种添加xiaoxi的方法
    @PostMapping("/addchat")
    public String Chat(@RequestBody JSONObject req){
        String sendid = req.getString("sendid");
        String text = req.getString("text");
        String sendtime = req.getString("sendtime");
        String bankeid = req.getString("bankeid");
        try{
            //插入mysql数据库 表中
            String sql = "insert into liaotian(sendid,text,sendtime,bankeid) value(?,?,?,?)";
            //用jdbcTemplate 去update
            jdbcTemplate.update(sql,sendid,text,sendtime,bankeid);
            return "success";
        }catch (Exception e){
            return "failed";
        }

    }

    //根据自己的sendid,dangqianbankeid精准查询
//    @PostMapping("/qunliao")
//    public String searchSendidStuid(@RequestBody JSONObject req) {
//        long bankeid = req.getLong("bankeid");
////        long studentid = req.getLong("studentid");
//
//        try{
//            String sql = "SELECT\n" +
//                    "\tliaotian.id, \n" +
//                    "\tliaotian.text, \n" +
//                    "\tliaotian.sendtime, \n" +
//                    "\tliaotian.sendid, \n" +
//                    "\tstudent.sname, \n" +
//                    "\tstudent.img AS simg, \n" +
//                    "\tstudent.place, \n" +
//                    "\tliaotian.bankeid, \n" +
//                    "\tbanke.bname, \n" +
//                    "\tbanke.teacherid, \n" +
//                    "\tteacher.tname, \n" +
//                    "\tteacher.img AS timg\n" +
//                    "FROM\n" +
//                    "\tbanke\n" +
//                    "\tINNER JOIN\n" +
//                    "\tteacher\n" +
//                    "\tON \n" +
//                    "\t\tbanke.teacherid = teacher.id\n" +
//                    "\tINNER JOIN\n" +
//                    "\tliaotian\n" +
//                    "\tON \n" +
//                    "\t\tbanke.id = liaotian.bankeid\n" +
//                    "\tINNER JOIN\n" +
//                    "\tstudent\n" +
//                    "\tON \n" +
//                    "\t\tliaotian.sendid = student.id WHERE bankeid = "+"\""+bankeid+"\" ";
//
//            //用List去接住上面的ta
//            List<Map<String,Object>>sbs=jdbcTemplate.queryForList(sql);
//            return gson.toJson(sbs);
//        }catch (Exception e){
//            return "failed";
//        }
//    }

    //测试
    @PostMapping("/qunliaoce")
    public String qunliaoce(@RequestBody JSONObject req) {

        long bankeid = req.getLong("bankeid");
//        long studentid = req.getLong("studentid");

        try{
            String sql = "SELECT\n" +
                    "  liaotian.id,\n" +
                    "\tliaotian.sendid, \n" +
                    "\tstudent.sname, \n" +
                    "\tstudent.place,\n" +
                    "\tstudent.img AS simg, \n" +
                    "\tliaotian.text, \n" +
                    "\tliaotian.sendtime, \n" +
                    "\tliaotian.bankeid, \n" +
                    "\tbanke.bname, \n" +
                    "\tbanke.teacherid, \n" +
                    "\tteacher.tname, \n" +
                    "\tteacher.img AS timg\n" +
                    "\t\n" +
                    "FROM\n" +
                    "\tbanke\n" +
                    "\tINNER JOIN\n" +
                    "\tliaotian\n" +
                    "\tON \n" +
                    "\t\tbanke.id = liaotian.bankeid\n" +
                    "\tLEFT  JOIN\n" +
                    "\tstudent\n" +
                    "\tON \n" +
                    "\t\tliaotian.sendid = student.id\n" +
                    "\tINNER JOIN\n" +
                    "\tteacher\n" +
                    "\tON \n" +
                    "\t\tbanke.teacherid = teacher.id WHERE bankeid = "+"\""+bankeid+"\" ";

            //用List去接住上面的ta
            List<Map<String,Object>>sbs=jdbcTemplate.queryForList(sql);
            return gson.toJson(sbs);
        }catch (Exception e){
            return "failed";
        }
    }



}
