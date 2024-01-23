package com.quizapplication.quiz.repository;

import com.quizapplication.quiz.model.QuizResponse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizResponseRepository extends MongoRepository<QuizResponse, String> {
    // No custom queries or methods needed for basic CRUD
}