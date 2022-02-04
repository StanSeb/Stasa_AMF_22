package com.stasa.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "report_type")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class ReportType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 20)
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReportType that = (ReportType) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @JsonIgnore
    public EReportType toEnum() throws Exception {
        return switch (id) {
            case 1 -> EReportType.USER;
            case 2 -> EReportType.COMMENT;
            case 3 -> EReportType.GROUP;
            case 4 -> EReportType.THREAD;
            default -> throw new Exception("ERROR");
        };
    }
}