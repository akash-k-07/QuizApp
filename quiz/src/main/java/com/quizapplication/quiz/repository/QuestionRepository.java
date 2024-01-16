package com.quizapplication.quiz.repository;

import com.quizapplication.quiz.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;

public interface QuestionRepository extends MongoRepository<Question, String> {

    List<Question> findByQuestionText(String questionText);

    List<Question> findByOptions_Text(String optionText);

    // You can add more custom query methods based on your needs
}