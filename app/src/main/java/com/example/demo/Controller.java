package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.text.ParseException;
import java.util.*;

@RestController
public class Controller {

    private final TaskerRepository taskerRepository;
    private final UserRepository userRepository;

    public Controller(TaskerRepository taskerRepository, UserRepository userRepository) {
        this.taskerRepository = taskerRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/api")
    public String home() {
        return "home page";
    }

    @GetMapping("/api/taskers")
    public Iterable<Tasker> listTaskers() {
        return this.taskerRepository.findAll();
    }

    @PostMapping("/api/taskers")
    public Tasker createTasker(@RequestBody Tasker tasker) {
        return this.taskerRepository.save(tasker);
    }

    @GetMapping("/api/taskers/{id}")
    public Tasker retrieveTasker(@PathVariable Long id) {
        return this.taskerRepository.findById(id).get();
    }

    @PatchMapping("/api/taskers/{id}")
    public Tasker patchTasker(@PathVariable Long id, @RequestBody Tasker tasker) {
        tasker.setId(id);
        return this.taskerRepository.save(tasker);
    }

    @PutMapping("/api/taskers/{id}")
    public Tasker updateAssignedToTasker(@PathVariable Long id, @RequestBody User user) {
        Tasker taskerToUpdate = this.taskerRepository.findById(id).get();
        if (user.getId() != null) {
            taskerToUpdate.setAssigned(user);
        } else {
            taskerToUpdate.setAssigned(null);
        }
        return this.taskerRepository.save(taskerToUpdate);
    }

    @DeleteMapping("/api/taskers/{id}")
    public Map<String, String> deleteTasker(@PathVariable Long id) {
        this.taskerRepository.deleteById(id);
        Map<String, String> returnStatement = new HashMap<>();
        returnStatement.put("value", "deleted");
        return returnStatement;
    }

    @GetMapping("/api/users")
    public Iterable<User> listUsers() {
        return this.userRepository.findAll();
    }

    @PostMapping("/api/users")
    public User createUser(@RequestBody User user) {
        return this.userRepository.save(user);
    }

    @GetMapping("/api/users/{id}")
    public Map<String, Object> retrieveUser(@PathVariable Long id) {

        List<Map<String, Object>> queryResults = this.userRepository.retrieveUserWithTaskingHistory(id);
        Map<String, Object> userData = new HashMap<>();

        userData.put("id", queryResults.get(0).get("id"));
        userData.put("afsc", queryResults.get(0).get("afsc"));
        userData.put("base", queryResults.get(0).get("base"));
        userData.put("edipi", queryResults.get(0).get("edipi"));
        userData.put("email", queryResults.get(0).get("email"));
        userData.put("firstName", queryResults.get(0).get("first_name"));
        userData.put("lastName", queryResults.get(0).get("last_name"));
        userData.put("role", queryResults.get(0).get("role"));
        userData.put("unit", queryResults.get(0).get("unit"));

        for (Grade grade : Grade.values()) {
            if (grade.matches(((BigInteger) queryResults.get(0).get("grade")).longValue())) {
                userData.put("grade", grade.toString());
            }
        }

        List<Map<String, Object>> taskings = new LinkedList<>();
        for (Map<String, Object> tasking : queryResults) {
            Map<String, Object> newTasking = new HashMap<>();
            newTasking.put("startDate", tasking.get("start_date"));
            newTasking.put("endDate", tasking.get("end_date"));
            newTasking.put("location", tasking.get("location"));
            newTasking.put("id", tasking.get("tasker_id"));
            if (newTasking.get("id") != null) {
                taskings.add(newTasking);
            }
        }
        userData.put("taskingHistory", taskings);

        return userData;
    }

    @PatchMapping("/api/users/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        return this.userRepository.save(user);
    }

    @GetMapping("/api/taskers/{id}/available")
    public Iterable<User> listAvailablePersonnel(@PathVariable Long id) throws ParseException {
        Tasker tasker = this.taskerRepository.findById(id).get();
        Iterable<User> personnel = this.userRepository.findMatchingPersonnel(tasker.getAfsc(), Role.MEMBER.toString());
        List<User> availalablePersonnel = new LinkedList<>();
        for (User member : personnel) {
            if (!member.getGrade().matches(Grade.combine(tasker.getRequiredGrade()))) {
                continue;
            }
            boolean isAvailable = true;
            Iterable<Date> startDates = this.userRepository.retrieveStartDates(member.getId());
            Iterable<Date> endDates = this.userRepository.retrieveEndDates(member.getId());

            for (Date startDate : startDates) {
                if (startDate.compareTo(tasker.getStartDate()) >= 0 && startDate.compareTo(tasker.getEndDate()) <= 0) {
                    isAvailable = false;
                    break;
                }
            }
            for (Date endDate : endDates) {
                if (endDate.compareTo(tasker.getStartDate()) >= 0 && endDate.compareTo(tasker.getEndDate()) <= 0) {
                    isAvailable = false;
                    break;
                }
            }
            if (isAvailable) {
                availalablePersonnel.add(member);
            }
        }
        return availalablePersonnel;
    }

    @GetMapping("/api/enums")
    public Map<String, Object> getEnums() {
        Map<String, Object> enums = new HashMap<>();
        enums.put("grades", Grade.values());
        enums.put("codes", RequirementCode.values());
        enums.put("roles", Role.values());
        return enums;
    }
}
