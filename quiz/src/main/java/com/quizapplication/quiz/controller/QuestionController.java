package com.quizapplication.quiz.controller;

import com.quizapplication.quiz.model.Question;
import com.quizapplication.quiz.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/all")
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/{id}")
    public Question getQuestionById(@PathVariable String id) {
        return questionService.getQuestionById(id)
                .orElse(null); // You can handle the case where the question is not found
    }

    @GetMapping("/byText/{questionText}")
    public List<Question> getQuestionsByQuestionText(@PathVariable String questionText) {
        return questionService.getQuestionsByQuestionText(questionText);
    }

    @GetMapping("/byOption/{optionText}")
    public List<Question> getQuestionsByOptionText(@PathVariable String optionText) {
        return questionService.getQuestionsByOptionText(optionText);
    }

    @PostMapping("/add")
    public Question addQuestion(@RequestBody Question question) {
        // Add validation or other logic if needed
        return questionService.saveQuestion(question);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteQuestion(@PathVariable String id) {
        // You can add validation or other logic if needed
        questionService.deleteQuestionById(id);
    }

    // You can add more endpoints based on your needs
}
