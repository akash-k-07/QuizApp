package com.quizapplication.quiz.service;

import com.quizapplication.quiz.model.Question;
import com.quizapplication.quiz.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Optional<Question> getQuestionById(String id) {
        return questionRepository.findById(id);
    }

    public List<Question> getQuestionsByQuestionText(String questionText) {
        return questionRepository.findByQuestionText(questionText);
    }

    public List<Question> getQuestionsByOptionText(String optionText) {
        return questionRepository.findByOptions_Text(optionText);
    }

    // Example: Add a method to save a question
    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }

    // Example: Add a method to delete a question by ID
    public void deleteQuestionById(String id) {
        questionRepository.deleteById(id);
    }

    // You can add more methods based on your needs

    // Example: Add a method to get questions created after a specific date
    public List<Question> getQuestionsCreatedAfterDate(Date date) {
        // Implement the logic based on your requirements
        // For example:
        // return questionRepository.findByCreationDateAfter(date);
        return null;
    }
}
