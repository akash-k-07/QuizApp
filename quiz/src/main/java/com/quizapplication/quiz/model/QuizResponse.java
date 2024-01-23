package com.quizapplication.quiz.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "responses")
public class QuizResponse {

    @Id
    private String id;

    private User user;
    private int points;

    // Constructors
    public QuizResponse() {
    }

    public QuizResponse(User user, int points) {
        this.user = user;
        this.points = points;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    @Override
    public String toString() {
        return "QuizResponse{" +
                "id='" + id + '\'' +
                ", user=" + user +
                ", points=" + points +
                '}';
    }
}
