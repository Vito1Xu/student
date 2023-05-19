package org.example.mapper;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import org.apache.ibatis.annotations.Select;
import org.example.pojo.Zuoyetijiao;

import java.util.HashMap;
import java.util.List;


public interface ZuoyetijiaoMapper extends BaseMapper<Zuoyetijiao> {
@Select("SELECT\n" +
        "\tzuoyetijiao.id, \n" +
        "\tzuoyetijiao.daan, \n" +
        "\tzuoyetijiao.grade, \n" +
        "\tzuoyetijiao.fabuid, \n" +
        "\tzuoyetijiao.studentid, \n" +
        "\tstudent.`sname`, \n" +
        "\tzuoyefabu.zuoyeneirong, \n" +
        "\tzuoyefabu.bankeid\n" +
        "FROM\n" +
        "\tzuoyetijiao\n" +
        "\tINNER JOIN\n" +
        "\tstudent\n" +
        "\tON \n" +
        "\t\tzuoyetijiao.studentid = student.id\n" +
        "\tINNER JOIN\n" +
        "\tzuoyefabu\n" +
        "\tON \n" +
        "\t\tzuoyetijiao.fabuid = zuoyefabu.id;")
public List<HashMap<String,Integer>> getTijiao();



}
