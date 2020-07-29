package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface UserRepository extends CrudRepository<User, Long> {

    @Query(value = "SELECT taskers.start_date FROM users JOIN taskers ON users.id = taskers.assigned_personnel_id WHERE users.id = :id", nativeQuery = true)
    Iterable<Date> retrieveStartDates(Long id);

    @Query(value = "SELECT taskers.end_date FROM users JOIN taskers ON users.id = taskers.assigned_personnel_id WHERE users.id = :id", nativeQuery = true)
    Iterable<Date> retrieveEndDates(Long id);

    @Query(value = "SELECT * FROM users WHERE afsc = :afsc AND role = :role", nativeQuery = true)
    Iterable<User> findMatchingPersonnel(String afsc, String role);

    @Query(value = "SELECT users.*, taskers.start_date, taskers.end_date, taskers.location, taskers.id AS tasker_id " +
            "FROM users LEFT JOIN taskers ON users.id = taskers.assigned_personnel_id WHERE users.id = :id", nativeQuery = true)
    List<Map<String, Object>> retrieveUserWithTaskingHistory(Long id);
}
