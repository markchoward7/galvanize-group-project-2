package com.example.demo;

import org.springframework.data.repository.CrudRepository;

public interface TaskerRepository extends CrudRepository<Tasker, Long> {
}
