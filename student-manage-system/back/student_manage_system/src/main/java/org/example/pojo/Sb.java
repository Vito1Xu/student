package org.example.pojo;

import lombok.Data;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Data
public class Sb {
    private long id;
    private long studentid;
    private long bankeid;

}
