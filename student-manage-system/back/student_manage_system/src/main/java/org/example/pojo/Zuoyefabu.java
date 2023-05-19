package org.example.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;
import java.sql.Timestamp;

@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")

@Data
public class Zuoyefabu {
    private long id;
    private String zuoyeneirong;
    private String fabudate;
    private long bankeid;
}

