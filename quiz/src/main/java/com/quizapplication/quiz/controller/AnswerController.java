package com.quizapplication.quiz.controller;

import com.quizapplication.quiz.model.Answer;
import com.quizapplication.quiz.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping("/question/{questionId}")
    public List<Answer> getAnswersByQuestionId(@PathVariable String questionId) {
        return answerService.getAnswersByQuestionId(questionId);
    }

    @GetMapping("/text/{text}")
    public List<Answer> getAnswersByText(@PathVariable String text) {
        return answerService.getAnswersByText(text);
    }

    @GetMapping("/textContaining/{keyword}")
    public List<Answer> getAnswersByTextContaining(@PathVariable String keyword) {
        return answerService.getAnswersByTextContaining(keyword);
    }

    @GetMapping("/user/{userId}")
    public List<Answer> getAnswersByUserId(@PathVariable String userId) {
        return answerService.getAnswersByUserId(userId);
    }

    @GetMapping("/userAndQuestion")
    public List<Answer> getAnswersByUserIdAndQuestionId(
            @RequestParam String userId,
            @RequestParam String questionId
    ) {
        return answerService.getAnswersByUserIdAndQuestionId(userId, questionId);
    }

    @GetMapping("/{id}")
    public Optional<Answer> getAnswerById(@PathVariable String id) {
        return answerService.getAnswerById(id);
    }

    @GetMapping("/all")
    public List<Answer> getAllAnswers() {
        return answerService.getAllAnswers();
    }

    @PostMapping("/save")
    public Answer saveAnswer(@RequestBody Answer answer) {
        return answerService.saveAnswer(answer);
    }

    @DeleteMapping("/{id}")
    public void deleteAnswerById(@PathVariable String id) {
        answerService.deleteAnswerById(id);
    }

    // Add more controller methods based on your requirements
}
