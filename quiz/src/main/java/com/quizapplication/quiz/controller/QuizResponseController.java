package com.quizapplication.quiz.controller;

import com.quizapplication.quiz.model.QuizResponse;
import com.quizapplication.quiz.repository.QuizResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz/responses")
public class QuizResponseController {

    private final QuizResponseRepository quizResponseRepository;

    @Autowired
    public QuizResponseController(QuizResponseRepository quizResponseRepository) {
        this.quizResponseRepository = quizResponseRepository;
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitQuizResponse(@RequestBody QuizResponse quizResponse) {
        try {
            // You can add validation logic here if needed
            quizResponseRepository.save(quizResponse);
            return new ResponseEntity<>("Quiz response submitted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error submitting quiz response", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
