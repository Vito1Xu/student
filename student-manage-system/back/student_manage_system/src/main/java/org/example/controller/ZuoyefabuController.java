package org.example.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.google.gson.Gson;
import io.swagger.annotations.Api;
import org.example.mapper.ZuoyefabuMapper;
import org.example.pojo.Zuoyefabu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api(tags = "作业发布信息接口")
@CrossOrigin("*")
@SuppressWarnings("all")
@RestController
public class ZuoyefabuController {
    Gson gson = new Gson();
    @Autowired
    private ZuoyefabuMapper zuoyefabuMapper;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    // 分页查询
    @PostMapping("/zuoyefabus")
    public String getZuoyefabu(@RequestBody HashMap<String, Integer> data) {
        int page = data.get("page");
        int numberPerPage = data.get("number_per_page");
        QueryWrapper<Zuoyefabu> zuoyefabuQueryWrapper = new QueryWrapper<>();
        zuoyefabuQueryWrapper.last(String.format("limit %s,%s", page * numberPerPage - numberPerPage, numberPerPage));
//        List<Zuoyefabu> zuoyefabus = zuoyefabuMapper.selectList(zuoyefabuQueryWrapper);
        List<HashMap<String, Integer>> zuoyefabus = zuoyefabuMapper.getFabu();
        return gson.toJson(zuoyefabus);
    }

    // 获取总数
    @GetMapping("/get_zuoyefabus_count")
    public long getZuoyefabuCount() {
        Long count = zuoyefabuMapper.selectCount(null);
        return count;
    }

    // 添加
    @PostMapping("/addzuoyefabu")
    public void addZuoyefabu(@RequestBody Zuoyefabu zuoyefabu) {
        zuoyefabuMapper.insert(zuoyefabu);
    }

    // 删除
    @PostMapping("/deletezuoyefabu")
    public void deleteZuoyefabu(@RequestBody Zuoyefabu zuoyefabu) {
        zuoyefabuMapper.deleteById(zuoyefabu);
    }

    // 修改信息
    @PostMapping("/updatezuoyefabu")
    public void updateZuoyefabu(@RequestBody Zuoyefabu zuoyefabu) {
        zuoyefabuMapper.updateById(zuoyefabu);
    }

    // 根据作业内容模糊查询
    @PostMapping("/searchzuoyefabu")
    public String searchZuoyefabu(@RequestBody Zuoyefabu zuoyefabu) {

        String zuoyeneirong = zuoyefabu.getZuoyeneirong();
        QueryWrapper<Zuoyefabu> zuoyefabuQueryWrapper = new QueryWrapper<>();

        zuoyefabuQueryWrapper.like("zuoyeneirong", zuoyeneirong);
        List<Zuoyefabu> zuoyefabus = zuoyefabuMapper.selectList(zuoyefabuQueryWrapper);
        return gson.toJson(zuoyefabus);
    }
    //根据班课id精准查询
    @PostMapping("/searchZuoyefabuBankeid")
    public String searchZuoyefabuBankeid(@RequestBody JSONObject req) {
        //获取前端传来的 班课id
        long bankeid = req.getLong("bankeid");
        try{
            String sql = "SELECT * FROM zuoyefabu WHERE bankeid = "+"\""+bankeid+"\"";
//            String sql="select * from users where username="+"\""+bname+"\"";
            //用List去接住上面的ta
            List<Map<String,Object>>sbs=jdbcTemplate.queryForList(sql);
            return gson.toJson(sbs);
        }catch (Exception e){
            return "failed";
        }
    }

}
