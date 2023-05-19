package org.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;
import org.example.pojo.Banke;

import java.util.HashMap;
import java.util.List;

public interface BankeMapper extends BaseMapper<Banke> {
    @Select("SELECT\n" +
            "\tbanke.id, \n" +
            "\tbanke.`bname`, \n" +
            "\tbanke.teacherid, \n" +
            "\tteacher.number, \n" +
            "\tteacher.tname\n" +
            "FROM\n" +
            "\tbanke\n" +
            "\tINNER JOIN\n" +
            "\tteacher\n" +
            "\tON \n" +
            "\t\tbanke.teacherid = teacher.id;")
    public List<HashMap<String,Integer>> getBk();
}
