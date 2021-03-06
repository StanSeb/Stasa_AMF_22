package com.stasa.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name="groups", schema="stasa", catalog="stasa")
public class Group {
    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "NATIVE")
    @GenericGenerator(name = "NATIVE", strategy = "native")
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name ="user_id")
    private long userId;

    @Column(name="deletion_timestamp")
    private String deletionTimestamp;

    @JsonProperty
    public String getTitle() {
        if(getDeletionTimestamp() != null) {
            return "DeletedGroup";
        }
        return title;
    }
}