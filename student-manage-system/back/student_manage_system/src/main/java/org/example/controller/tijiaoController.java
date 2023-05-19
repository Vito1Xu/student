package org.example.controller;

import com.google.gson.Gson;
import io.swagger.annotations.Api;
import org.example.mapper.ZuoyetijiaoMapper;
import org.example.pojo.Zuoyetijiao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@Api(tags = "tijiao接口")
@SuppressWarnings("all")
@CrossOrigin("*")
@RestController
public class tijiaoController {
    Gson gson = new Gson();
    @Autowired
    private ZuoyetijiaoMapper zuoyetijiaoMapper;


//
//    @GetMapping("tijiao")
//    public String Tijiao() {
//        List<HashMap<String, Integer>> avg = zuoyetijiaoMapper.getTijiao(QueryWrapper< Zuoyetijiao > zuoyetijiaoQueryWrapper);
//        return gson.toJson(avg);
//    }
}
