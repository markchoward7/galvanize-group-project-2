package com.example.demo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private Long edipi;
    private String unit;
    private String base;
    private String afsc;
    private String role;
    private String email;
    private String password;
    private Long grade;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Long getEdipi() {
        return edipi;
    }

    public void setEdipi(Long edipi) {
        this.edipi = edipi;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getBase() {
        return base;
    }

    public void setBase(String base) {
        this.base = base;
    }

    public String getAfsc() {
        return afsc;
    }

    public void setAfsc(String afsc) {
        this.afsc = afsc;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }


    public Role getRole() {
        return Role.valueOf(role);
    }

    public void setRole(Role role) {
        this.role = role.toString();
    }

    public Grade getGrade() {
        return Grade.fromValue(grade);
    }

    public void setGrade(Grade grade) {
        this.grade = grade.getValue();
    }
}
