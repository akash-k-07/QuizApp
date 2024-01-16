package com.quizapplication.quiz.service;

import com.quizapplication.quiz.model.Answer;
import com.quizapplication.quiz.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;

    @Autowired
    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public List<Answer> getAnswersByQuestionId(String questionId) {
        return answerRepository.findByQuestionId(questionId);
    }

    public List<Answer> getAnswersByText(String text) {
        return answerRepository.findByText(text);
    }

    public List<Answer> getAnswersByTextContaining(String keyword) {
        return answerRepository.findByTextContaining(keyword);
    }

    public List<Answer> getAnswersByUserId(String userId) {
        return answerRepository.findByUserId(userId);
    }

    public List<Answer> getAnswersByUserIdAndQuestionId(String userId, String questionId) {
        return answerRepository.findByUserIdAndQuestionId(userId, questionId);
    }

    // You can add more methods as needed

    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }

    public Optional<Answer> getAnswerById(String id) {
        return answerRepository.findById(id);
    }

    public Answer saveAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    public void deleteAnswerById(String id) {
        answerRepository.deleteById(id);
    }

    // Add more service methods based on your requirements
}
