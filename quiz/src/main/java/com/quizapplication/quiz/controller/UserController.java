package com.quizapplication.quiz.controller;

import com.quizapplication.quiz.model.User;
import com.quizapplication.quiz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        // Validate if the name is not empty
        if (user.getName() == null || user.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Name cannot be empty");
        }

        // Check if a user with the same name already exists
        Optional<User> existingUser = userService.findUserByName(user.getName());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User with this name already exists");
        }

        // Save the user
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    // You can add more endpoints and methods as needed
}
