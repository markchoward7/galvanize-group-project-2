package com.example.demo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_personnel_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User assigned;


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

    public void setEndDate(Date endDate) { this.endDate = endDate; }

    public String getAfsc() {
        return afsc;
    }

    public void setAfsc(String afsc) {
        this.afsc = afsc;
    }

    public User getAssigned() { return assigned; }

    public void setAssigned(User assigned) { this.assigned = assigned; }


    public List<Grade> getRequiredGrade() {
        return Grade.buildList(requiredGrade);
    }

    public void setRequiredGrade(List<Grade> requiredGrades) {
        this.requiredGrade = Grade.combine(requiredGrades);
    }

    public List<RequirementCode> getRequirementCodes() {
        return RequirementCode.buildList(requirementCodes);
    }

    public void setRequirementCodes(List<RequirementCode> requirementCodes) {
        this.requirementCodes = RequirementCode.combine(requirementCodes);
    }
}
