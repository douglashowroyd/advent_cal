package uk.douglas.adventcal.adventcaladmin;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static java.util.stream.Collectors.toList;

@CrossOrigin
@RestController
public class UserResource {

    private List<User> users = new ArrayList<>();
    {
        users.add(new User(1, "Doug", "dog", "Password123$", Arrays.asList("www.image.com", "www.image.com")));
        users.add(new User(2, "James", "cat", "Password123$", Arrays.asList("www.image.com", "www.image.com")));
        users.add(new User(3, "Amber", "fox", "Password123$", Arrays.asList("www.image.com", "www.image.com")));
    }


    @GetMapping("/{userName}")
    public User getUserByName(@PathVariable String userName) {
        return users.stream()
                .filter(user -> user.getUserName().equals(userName))
                //.map(user -> new User(user.getId(), user.getUserName(), user.getTheme(), null, user.getImages()))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }

    @PostMapping("/{userName}/password")
    public boolean checkPassword(@PathVariable("userName") String userName, @RequestBody String password) {
        return users.stream()
                .filter(user -> user.getUserName().equals(userName))
                .map(user -> user.getPassword().equals(password))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }

    @PostMapping(consumes="application/json")
    public boolean addUser(@RequestBody final User newUser) {
        if ( users.stream()
                .filter(user -> user.getUserName().equals(newUser.getUserName()))
                .collect(toList()).size() == 0) {
            users.add(newUser);
            return true;
        } else {
            return false;
        }
    }

    @PostMapping("/{userName}")
    public ResponseEntity<Integer> updateUser(@RequestBody final User newUser, @PathVariable("userName") String userName) {
        User oldUser = users.stream()
                .filter(user -> user.getUserName().equals(userName))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
        users.set( users.indexOf(oldUser), newUser);
        int response = newUser.getId();
        users.forEach(user -> System.out.println(user.getId() + " " + user.getUserName() + " " + user.getTheme() + " " + user.getPassword() + " " + user.getImages()));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }
}
