package org.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;
import org.example.pojo.Zuoyefabu;

import java.util.HashMap;
import java.util.List;

public interface ZuoyefabuMapper extends BaseMapper<Zuoyefabu> {
    @Select("SELECT\n" +
            "\tzuoyefabu.id, \n" +
            "\tzuoyefabu.zuoyeneirong, \n" +
            "\tzuoyefabu.fabudate, \n" +
            "\tzuoyefabu.bankeid, \n" +
            "\tbanke.`bname`, \n" +
            "\tbanke.teacherid, \n" +
            "\tteacher.tname\n" +
            "FROM\n" +
            "\tzuoyefabu\n" +
            "\tINNER JOIN\n" +
            "\tbanke\n" +
            "\tON \n" +
            "\t\tzuoyefabu.bankeid = banke.id\n" +
            "\tINNER JOIN\n" +
            "\tteacher\n" +
            "\tON \n" +
            "\t\tbanke.teacherid = teacher.id;")
    public List<HashMap<String,Integer>> getFabu();
}
