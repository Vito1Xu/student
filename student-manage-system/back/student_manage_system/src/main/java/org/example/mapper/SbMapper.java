package org.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;
import org.example.pojo.Sb;

import java.util.HashMap;
import java.util.List;

public interface SbMapper extends BaseMapper<Sb>{
    @Select("SELECT\n" +
            "\tsb.id, \n" +
            "\tsb.bankeid, \n" +
            "\tbanke.bname, \n" +
            "\tbanke.teacherid, \n" +
            "\tteacher.tname, \n" +
            "\tsb.studentid, \n" +
            "\tstudent.number, \n" +
            "\tstudent.sname, \n" +
            "\tstudent.place\n" +
            "FROM\n" +
            "\tbanke\n" +
            "\tINNER JOIN\n" +
            "\tsb\n" +
            "\tON \n" +
            "\t\tbanke.id = sb.bankeid\n" +
            "\tINNER JOIN\n" +
            "\tstudent\n" +
            "\tON \n" +
            "\t\tsb.studentid = student.id\n" +
            "\tINNER JOIN\n" +
            "\tteacher\n" +
            "\tON \n" +
            "\t\tbanke.teacherid = teacher.id")
    public List<HashMap<String,Integer>> getSbm();
    @Select("SELECT\n" +
            "\tsb.id, \n" +
            "\tbankeid,\n" +
            "\tbname, \n" +
            "tname, \n" +
            "\tstudent.sname, \n" +
            "\tstudent.place\n" +
            "FROM\n" +
            "\tbanke\n" +
            "\tINNER JOIN\n" +
            "\tsb\n" +
            "\tON \n" +
            "\t\tbanke.id = sb.bankeid\n" +
            "\tINNER JOIN\n" +
            "\tstudent\n" +
            "\tON \n" +
            "\t\tsb.studentid = student.id\n" +
            "\tINNER JOIN\n" +
            "\tteacher\n" +
            "\tON \n" +
            "\t\tbanke.teacherid = teacher.id\n" +
            "\t\tWHERE bname like  '%数据%'")
    public List<HashMap<String,Integer>> getSbid();
}
