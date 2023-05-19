package org.example.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.google.gson.Gson;
import io.swagger.annotations.Api;
import org.example.mapper.BankeMapper;
import org.example.pojo.Banke;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api(tags = "班课信息接口")
@CrossOrigin("*")
@SuppressWarnings("all")
@RestController
public class BankeController {
    Gson gson = new Gson();
    @Autowired
    private BankeMapper bankeMapper;
    @Autowired
    private JdbcTemplate jdbcTemplate;


    //路由查询
    @GetMapping("/bankess")
    public String getBankess(){
        List<Banke> bankes = bankeMapper.selectList(null);// (queryWrapper"null")不需要任何的 查询 包装类
        return gson.toJson(bankes);         //将bankes转成字符串后返回给前端
    }
    // 4.6.16.24
    @PostMapping("/banke46")
    public String banke46() {
        try {
            String sql = " SELECT\n" +
                    "\tbanke.id, \n" +
                    "\tbanke.img, \n" +
                    "\tbanke.bname, \n" +
                    "\tbanke.teacherid, \n" +
                    "\tteacher.tname\n" +
                    "FROM\n" +
                    "\tbanke\n" +
                    "\tINNER JOIN\n" +
                    "\tteacher\n" +
                    "\tON \n" +
                    "\t\tbanke.teacherid = teacher.id";
            //用List去接住上面的ta
            List<Map<String, Object>> bankes = jdbcTemplate.queryForList(sql);
            return gson.toJson(bankes);
        } catch (Exception e) {
            return "failed";
        }
    }


    // 分页查询
    @PostMapping("/bankes")
    public String getBanke(@RequestBody HashMap<String, Integer> data) {
        int page = data.get("page");
        int numberPerPage = data.get("number_per_page");
        QueryWrapper<Banke> bankeQueryWrapper = new QueryWrapper<>();
        bankeQueryWrapper.last(String.format("limit %s,%s", page * numberPerPage - numberPerPage, numberPerPage));
//        List<Banke> bankes = bankeMapper.selectList(bankeQueryWrapper);
        List<HashMap<String, Integer>> bankes = bankeMapper.getBk();
        return gson.toJson(bankes);
    }



    // 获取总数
    @GetMapping("/get_bankes_count")
    public long getBankeCount() {
        Long count = bankeMapper.selectCount(null);
        return count;
    }

    // 添加
    @PostMapping("/addbanke")
    public void addBanke(@RequestBody Banke banke) {
        bankeMapper.insert(banke);
    }

    // 删除
    @PostMapping("/deletebanke")
    public void deleteBanke(@RequestBody Banke banke) {
        bankeMapper.deleteById(banke);
    }

    // 修改信息
    @PostMapping("/updatebanke")
    public void updateBanke(@RequestBody Banke banke) {
        bankeMapper.updateById(banke);
    }

    // 根据班课名模糊查询
    @PostMapping("/searchbanke")
    public String searchBanke(@RequestBody Banke banke) {

        String bname = banke.getBname();
        QueryWrapper<Banke> bankeQueryWrapper = new QueryWrapper<>();

        bankeQueryWrapper.like("bname", bname);
        List<Banke> bankes = bankeMapper.selectList(bankeQueryWrapper);
        return gson.toJson(bankes);
    }

    //根据班课名模糊查询
    @PostMapping("/searchbankeandtname")
    //因为只传了一个 所以用一个hashmapp去接收它
//  public String searchSb(@ReduestBody HashMap<String,String> data)
    public String searchbankeandtname(@RequestBody JSONObject req) {
        //获取前端传来的 班课名
        String bname = req.getString("bname");
        try{
            //插入mysql数据库 users表中
            String sql = "SELECT\n" +
                    "\tbanke.id, \n" +
                    "\tbanke.bname, \n" +
                    "\tbanke.img, \n" +
                    "\tbanke.teacherid, \n" +
                    "\tteacher.tname\n" +
                    "\n" +
                    "FROM\n" +
                    "\tbanke\n" +
                    "\tINNER JOIN\n" +
                    "\tteacher\n" +
                    "\tON \n" +
                    "\t\tbanke.teacherid = teacher.id WHERE bname like '%"+bname+"%'";


            //用List去接住上面的ta
            List<Map<String,Object>>sbs=jdbcTemplate.queryForList(sql);
            return gson.toJson(sbs);
        }catch (Exception e){
            return "failed";
        }

    }
//教师班课列表显示
    @PostMapping("/searchbanketeaid")
    public String searchSb(@RequestBody JSONObject req) {
        //获取前端传来的 teacherid
        long teacherid = req.getLong("teacherid");
        try {
            String sql = "SELECT\n" +
                    "\tbanke.id, \n" +
                    "\tbanke.bname, \n" +
                    "\tbanke.img, \n" +
                    "\tbanke.teacherid, \n" +
                    "\tteacher.tname\n" +
                    "FROM\n" +
                    "\tbanke\n" +
                    "\tINNER JOIN\n" +
                    "\tteacher\n" +
                    "\tON \n" +
                    "\t\tbanke.teacherid = teacher.id\n" +
                    "\t\tWHERE teacherid =  " + teacherid + "";
            //用List去接住上面的ta
            List<Map<String, Object>> bankes = jdbcTemplate.queryForList(sql);
            return gson.toJson(bankes);
        } catch (Exception e) {
            return "failed";
        }
    }



}
