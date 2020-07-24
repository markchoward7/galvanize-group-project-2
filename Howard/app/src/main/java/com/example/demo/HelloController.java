package com.example.demo;

import com.fasterxml.jackson.databind.util.JSONPObject;
import netscape.javascript.JSObject;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletResponse;
import java.util.*;

@RestController
public class HelloController {

    private final LessonRepository repository;

    public HelloController(LessonRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/")
    public String home() { return "home page"; }

    @GetMapping("/movies")
    public List<Map<String, Object>> searchMovies(@RequestParam(name = "q") String query) {

        List<Map<String, String>> results = (List<Map<String, String>>) MovieService.getMovies(query).get("Search");
        List<Map<String, Object>> returnValue = new LinkedList<Map<String, Object>>();

        for (Map<String, String> movie : results) {
            Map<String, Object> newMovie = new LinkedHashMap<>();
            newMovie.put("title", movie.get("Title"));
            newMovie.put("imdbId", movie.get("imdbID"));
            newMovie.put("poster", movie.get("Poster"));
            newMovie.put("year", Integer.parseInt(movie.get("Year")));
            returnValue.add(newMovie);
        }

        return returnValue;
    }

    @GetMapping("/lessons")
    public Iterable<Lesson> all() {
        return this.repository.findAll();
    }

    @GetMapping("/lessons/{id}")
    public Optional<Lesson> getLesson(@PathVariable long id) { return this.repository.findById(id); }

    @PostMapping("/lessons")
    public Lesson create(@RequestBody Lesson lesson) {
        return this.repository.save(lesson);
    }

    @DeleteMapping("/lessons/{id}")
    public void deleteLesson(@PathVariable long id) { this.repository.deleteById(id); }

    @PatchMapping("/lessons/{id}")
    public Lesson update(@PathVariable long id, @RequestBody Lesson lesson) {
        Lesson oldLesson = this.repository.findById(id).get();
        oldLesson.setTitle(lesson.getTitle());
        oldLesson.setDeliveredOn(lesson.getDeliveredOn());
        return this.repository.save(oldLesson);
    }

    @GetMapping("/lessons/find")
    public Lesson getLessonByTitle(@RequestParam(name = "title") String title) { return this.repository.findByTitle(title); }

    @GetMapping("lessons/between")
    public Iterable<Lesson> between(@RequestParam(name = "date") Date[] dates) { return this.repository.deliveredBetween(dates[0], dates[1]);}

    @GetMapping("/math/pi")
    public String helloWorld() {
        return "3.141592653589793";
    }

    @GetMapping("/math/calculate")
    public String calculate(WebRequest request, HttpServletResponse response) {
        int x = 0;
        int y = 0;
        try {
            x = Integer.parseInt(request.getParameter("x"));
            y = Integer.parseInt(request.getParameter("y"));
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return "";
        }
        String operator = request.getParameter("operation");
        int result = 0;
        switch (operator==null?"add":operator) {
            case "multiply":
                result = x * y;
                break;
            case "subtract":
                result = x - y;
                break;
            case "divide":
                result = x / y;
                break;
            case "add":
                result = x + y;
                break;
        }
        return String.valueOf(result);
    }

    @PostMapping("/sum")
    public String sum(WebRequest request, HttpServletResponse response) {
        String[] values = request.getParameterValues("n");
        if (values == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return "";
        }
        int result = 0;
        for (String value : values) {
            result += Integer.parseInt(value);
        }
        return String.valueOf(result);
    }

    @RequestMapping(value="/math/volume/{length}/{width}/{height}", method={ RequestMethod.GET, RequestMethod.POST })
    public String volume(@PathVariable int length, @PathVariable int width, @PathVariable int height) {
        return String.format("The volume of a %d, %d, %d rectangle is %d.", length, width, height, length * width * height);
    }

    @PostMapping("/math/area")
    public String area(WebRequest request, HttpServletResponse response) {
        float r = 0f;
        int w = 0;
        int h = 0;

        String type = request.getParameter("type");
        if (type.equals("circle")) {
            try {
                r = Float.parseFloat(request.getParameter("radius"));
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return "Invalid";
            }
            return String.format("Area of a circle with a radius of %.1f is %.1f", r, 3.14 * Math.pow(r, 2));
        } else {
            try {
                w = Integer.parseInt(request.getParameter("width"));
                h = Integer.parseInt(request.getParameter("height"));
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return "Invalid";
            }
            return String.format("Area of a %dx%d rectangle is %d", w, h, w*h);
        }
    }

    @GetMapping("/flights/flight")
    public Flight getFlight() {
        Flight flight = new Flight();
        flight.setDeparts(new Date());
        Flight.Ticket[] tickets = new Flight.Ticket[2];
        Flight.Ticket.Person person1 = new Flight.Ticket.Person();
        Flight.Ticket.Person person2 = new Flight.Ticket.Person();
        person1.setFirstName("Homer");
        person1.setLastName("Simpson");
        person2.setFirstName("Marge");
        tickets[0] = new Flight.Ticket();
        tickets[0].setPassenger(person1);
        tickets[0].setPrice(200);
        tickets[1] = new Flight.Ticket();
        tickets[1].setPassenger(person2);
        tickets[1].setPrice(199);
        flight.setTickets(tickets);
        return flight;
    }

    @GetMapping("/flights")
    public Flight[] getFlights() {
        Flight[] flights = new Flight[2];
        flights[0] = new Flight();
        flights[0].setDeparts(new Date());
        Flight.Ticket[] tickets1 = new Flight.Ticket[2];
        Flight.Ticket.Person person1 = new Flight.Ticket.Person();
        Flight.Ticket.Person person2 = new Flight.Ticket.Person();
        person1.setFirstName("Homer");
        person1.setLastName("Simpson");
        person2.setFirstName("Marge");
        tickets1[0] = new Flight.Ticket();
        tickets1[0].setPassenger(person1);
        tickets1[0].setPrice(200);
        tickets1[1] = new Flight.Ticket();
        tickets1[1].setPassenger(person2);
        tickets1[1].setPrice(199);
        flights[0].setTickets(tickets1);

        flights[1] = new Flight();
        flights[1].setDeparts(new Date());
        Flight.Ticket[] tickets2 = new Flight.Ticket[1];
        Flight.Ticket.Person person3 = new Flight.Ticket.Person();
        person3.setLastName("Flanders");
        tickets2[0] = new Flight.Ticket();
        tickets2[0].setPassenger(person3);
        tickets2[0].setPrice(500);
        flights[1].setTickets(tickets2);

        return flights;
    }

    @PostMapping("flights/tickets/total")
    public Map<String, Integer> sum(@RequestBody() Flight flight) {
        Map<String, Integer> result = new HashMap<>();
        int cost = 0;
        for (Flight.Ticket ticket : flight.getTickets()) {
            cost += ticket.getPrice();
        }
        result.put("result", cost);
        return result;
    }

}
