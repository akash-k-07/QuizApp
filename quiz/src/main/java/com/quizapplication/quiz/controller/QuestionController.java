package com.quizapplication.quiz.controller;

import com.quizapplication.quiz.model.Question;
import com.quizapplication.quiz.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quiz/questions")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/all")
    public List<Map<String, Object>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return questions.stream().map(this::mapQuestionToDto).collect(Collectors.toList());
    }

    private Map<String, Object> mapQuestionToDto(Question question) {
        Map<String, Object> dto = new HashMap<>();
        dto.put("id", question.getId());
        dto.put("questionText", question.getQuestionText());

        if (question.getOptions() != null) {
            List<Map<String, Object>> optionsDto = question.getOptions().stream()
                    .map(option -> {
                        Map<String, Object> optionDto = new HashMap<>();
                        optionDto.put("text", option.getText());
                        optionDto.put("correct", option.isCorrect());
                        return optionDto;
                    })
                    .collect(Collectors.toList());

            dto.put("options", optionsDto);
        } else {
            dto.put("options", Collections.emptyList()); // or any other appropriate handling
        }

        return dto;
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
