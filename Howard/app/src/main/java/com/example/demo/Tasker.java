package com.example.demo;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name = "taskers")
public class Tasker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String location;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;
    private Long requiredGrade;
    private String afsc;
    private Long requirementCodes;
    private Long assignedPersonnelId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<Grade> getRequiredGrade() {
        List<Grade> gradeList = new LinkedList<Grade>();
        for (Grade grade : Grade.values()) {
            if (grade.matches(requiredGrade)) {
                gradeList.add(grade);
            }
        }
        return gradeList;
    }

    public void setRequiredGrade(List<Grade> requiredGrades) {
        this.requiredGrade = Grade.combine(requiredGrades);
    }

    public String getAfsc() {
        return afsc;
    }

    public void setAfsc(String afsc) {
        this.afsc = afsc;
    }

    public List<RequirementCode> getRequirementCodes() {
        List<RequirementCode> codeList = new LinkedList<RequirementCode>();
        for (RequirementCode code : RequirementCode.values()) {
            if (code.matches(requirementCodes)) {
                codeList.add(code);
            }
        }
        return codeList;
    }

    public void setRequirementCodes(List<RequirementCode> requirementCodes) {
        this.requirementCodes = RequirementCode.combine(requirementCodes);
    }

    public Long getAssignedPersonnelId() {
        return assignedPersonnelId;
    }

    public void setAssignedPersonnelId(Long assignedPersonnelId) {
        this.assignedPersonnelId = assignedPersonnelId;
    }
}
