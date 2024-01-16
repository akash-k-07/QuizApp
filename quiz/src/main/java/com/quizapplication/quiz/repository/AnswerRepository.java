package com.quizapplication.quiz.repository;

import com.quizapplication.quiz.model.Answer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AnswerRepository extends MongoRepository<Answer, String> {


    List<Answer> findByQuestionId(String questionId);

    List<Answer> findByText(String text);

    List<Answer> findByTextContaining(String keyword);

    List<Answer> findByUserId(String userId);

    List<Answer> findByUserIdAndQuestionId(String userId, String questionId);


    // You can add more custom query methods based on your needs
}