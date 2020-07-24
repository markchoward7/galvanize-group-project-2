package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;

public interface LessonRepository extends CrudRepository<Lesson, Long> {

    @Query(value = "SELECT * FROM lessons WHERE title = :title", nativeQuery = true)
    Lesson findByTitle(String title);

    @Query(value = "SELECT * FROM lessons WHERE (delivered_on >= :date1 AND delivered_on <= :date2)", nativeQuery = true)
    Iterable<Lesson> deliveredBetween(Date date1, Date date2);
}