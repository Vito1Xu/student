package org.example;


import org.example.mapper.*;
import org.example.pojo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class Test {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private StudentMapper studentMapper;
    @Autowired
    private TeacherMapper teacherMapper;
    @Autowired
    private BankeMapper bankeMapper;
    @Autowired
    private SbMapper sbMapper;
    @Autowired
    private ZuoyefabuMapper zuoyefabuMapper;
    @Autowired
    private ZuoyetijiaoMapper zuoyetijiaoMapper;
    @Autowired
    private LiaotianMapper liaotianMapper;


    @org.junit.jupiter.api.Test
    public void testUser(){
        List<User> users = userMapper.selectList(null);
        users.forEach(System.out::print);
    }
    public void testStudent(){
        List<Student> students = studentMapper.selectList(null);
        students.forEach(System.out::print);
    }
    public  void testTeacher(){
        List<Teacher> teachers = teacherMapper.selectList(null);
        teachers.forEach(System.out::print);
    }
    public void testBanke(){
        List<Banke>bankes = bankeMapper.selectList(null);
        bankes.forEach(System.out::print);
    }
    public void testZuoyefabu(){
        List<Zuoyefabu>zuoyefabus = zuoyefabuMapper.selectList(null);
        zuoyefabus.forEach(System.out::print);
    }
    public void testZuoyetijiao(){
        List<Zuoyetijiao>zuoyetijiaos = zuoyetijiaoMapper.selectList(null);
        zuoyetijiaos.forEach(System.out::print);
    }
    public void testSb(){
        List<Sb>sbs = sbMapper.selectList(null);
        sbs.forEach(System.out::print);
    }
    public void testLiaotian(){
        List<Liaotian>liaotians = liaotianMapper.selectList(null);
        liaotians.forEach(System.out::print);
    }





}
