package org.example.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.google.gson.Gson;
import io.swagger.annotations.Api;
import org.example.mapper.SbMapper;
import org.example.pojo.Sb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Transactional
@Api(tags = "班级学生信息接口")
@CrossOrigin("*")
@SuppressWarnings("all")
@RestController
public class SbController {
    Gson gson = new Gson();
    @Autowired//关联  pojo.sb类与mapper.sbmapper接口 然后去数据库里操作数据
    private SbMapper sbMapper;//定义一个sbmapper属性

    @Autowired//自动去找 下面这个jdbcTemplate 找到后用其直接对数据库进行操作
    private JdbcTemplate jdbcTemplate;


    // 分页查询
    @PostMapping("/sbs")
    public String getSb(@RequestBody HashMap<String, Integer> data) {
        int page = data.get("page");
        int numberPerPage = data.get("number_per_page");
        QueryWrapper<Sb> sbQueryWrapper = new QueryWrapper<>();
        sbQueryWrapper.last(String.format("limit %s,%s", page * numberPerPage - numberPerPage, numberPerPage));
//        List<Sb> sbs = sbMapper.selectList(sbQueryWrapper);
        List<HashMap<String, Integer>> sbs = sbMapper.getSbm();
        return gson.toJson(sbs);
    }

    // 获取总数
    @GetMapping("/get_sbs_count")
    public long getSbCount() {
        Long count = sbMapper.selectCount(null);
        return count;
    }

    // 添加
    @PostMapping("/addsb")
    public void addSb(@RequestBody Sb sb) {
        sbMapper.insert(sb);
    }

    // 删除
    @PostMapping("/deletesb")
    public void deleteSb(@RequestBody Sb sb) {
        sbMapper.deleteById(sb);
    }

    // 修改信息
    @PostMapping("/updatesb")
    public void updateSb(@RequestBody Sb sb) {
        sbMapper.updateById(sb);
    }

     //根据班课名模糊查询
    @PostMapping("/searchsb")
    //因为只传了一个 所以用一个hashmapp去接收它
//  public String searchSb(@ReduestBody HashMap<String,String> data)
    public String searchSb(@RequestBody JSONObject req) {
////      String name=data.get("name")  来获取 前端输入框的值
//        long  bankeid = sb.getBankeid();
//        QueryWrapper<Sb> sbQueryWrapper = new QueryWrapper<>();
////      QueryWrapper有一个like方法
//        sbQueryWrapper.like("bankeid", bankeid);
//        List<Sb> sbs = sbMapper.selectList(sbQueryWrapper);
////        List<HashMap<String, Integer>> sbs = sbMapper.getSbid();
//        return gson.toJson(sbs);

        //获取前端传来的 班课名
        String bname = req.getString("bname");
        try{
            //插入mysql数据库 users表中
            String sql = "SELECT sb.id, bankeid,bname,banke.img, tname, student.sname, student.place FROM banke INNER JOIN sb ON  banke.id = sb.bankeid INNER JOIN student ON  sb.studentid = student.id INNER JOIN teacher ON  banke.teacherid = teacher.id WHERE bname like '%"+bname+"%'";

//            String sql="select * from users where username="+"\""+bname+"\"";
            //用List去接住上面的ta
            List<Map<String,Object>>sbs=jdbcTemplate.queryForList(sql);
            return gson.toJson(sbs);
        }catch (Exception e){
            return "failed";
        }

    }
    //根据班课内studentid精准查询
    @PostMapping("/searchsbstudentid=sid")
    public String searchsbstudentid(@RequestBody JSONObject req) {
        //获取前端传来的 studentid bankeid
        long studentid = req.getLong("studentid");
        long bankeid = req.getLong("bankeid");

        try{
            String sql = "SELECT  sb.*  FROM sb WHERE studentid = "+"\""+studentid+"\" and bankeid = "+"\""+bankeid+"\"";
//            String sql="select * from users where username="+"\""+bname+"\"";
            //用List去接住上面的ta
            System.out.println("1");
            List<Map<String,Object>>maps=jdbcTemplate.queryForList(sql);
            System.out.println("2");
            //判断map的size 为0 则说明数据库 无此用户
            if(maps.size()==0){
                return "no student";
            }else{
                return "exist";
            }
        }catch (Exception e){
            return "failed";
        }
    }
    //根据班课id精准查询
    @PostMapping("/searchsbid")
    public String searchSbid(@RequestBody JSONObject req) {
        //获取前端传来的 班课id
        long bankeid = req.getLong("bankeid");
        try{
            String sql = "SELECT sb.id, bankeid,bname, tname, studentid,student.sname,student.img, student.place FROM banke INNER JOIN sb ON  banke.id = sb.bankeid INNER JOIN student ON  sb.studentid = student.id INNER JOIN teacher ON  banke.teacherid = teacher.id WHERE bankeid = "+"\""+bankeid+"\"";
//            String sql="select * from users where username="+"\""+bname+"\"";
            //用List去接住上面的ta
//            String sql = " SELECT SELECT sb.*  FROM sb WHERE bankeid = "+"\""+bankeid+"\"";

            List<Map<String,Object>>sbs=jdbcTemplate.queryForList(sql);
            return gson.toJson(sbs);
        }catch (Exception e){
            return "failed";
        }

    }
    //根据班课id与学生姓名sname模糊查询
    @PostMapping("/searchsbidsname")
    public String searchSbidsname(@RequestBody JSONObject req) {
        //获取前端传来的 班课id
        long bankeid = req.getLong("bankeid");
        String sname = req.getString("sname");
        try{
            //插入mysql数据库 users表中
            String sql = "SELECT sb.id, bankeid,bname, tname, studentid,student.sname,student.img, student.place FROM banke INNER JOIN sb ON  banke.id = sb.bankeid INNER JOIN student ON  sb.studentid = student.id INNER JOIN teacher ON  banke.teacherid = teacher.id WHERE bankeid = "+"\""+bankeid+"\" and sname like '%"+sname+"%' ";
//            String sql="select * from users where username="+"\""+bname+"\"";
            //用List去接住上面的ta
            List<Map<String,Object>>sbs=jdbcTemplate.queryForList(sql);
            return gson.toJson(sbs);
        }catch (Exception e){
            return "failed";
        }

    }

    //学生班课列表显示
    @PostMapping("/searchbankestuid")
    public String searchSbstuid(@RequestBody JSONObject req) {
        //获取前端传来的 studentid
        long studentid = req.getLong("studentid");
        try {
            String sql = " SELECT\n" +
                    "\tsb.id, \n" +
                    "\tsb.bankeid, \n" +
                    "\tbanke.bname, \n" +
                    "\tbanke.img, \n" +
                    "\tbanke.teacherid, \n" +
                    "\tteacher.tname, \n" +
                    "\tsb.studentid, \n" +
                    "\tstudent.sname, \n" +
                    "\tstudent.place\n" +
                    "FROM\n" +
                    "\tsb\n" +
                    "\tINNER JOIN\n" +
                    "\tstudent\n" +
                    "\tON \n" +
                    "\t\tsb.studentid = student.id\n" +
                    "\tINNER JOIN\n" +
                    "\tbanke\n" +
                    "\tON \n" +
                    "\t\tsb.bankeid = banke.id\n" +
                    "\tINNER JOIN\n" +
                    "\tteacher\n" +
                    "\tON \n" +
                    "\t\tbanke.teacherid = teacher.id" +
                    "\t\tWHERE studentid =  " + studentid + "";
            //用List去接住上面的ta
            List<Map<String, Object>> bankes = jdbcTemplate.queryForList(sql);
            return gson.toJson(bankes);
        } catch (Exception e) {
            return "failed";
        }
    }


}
