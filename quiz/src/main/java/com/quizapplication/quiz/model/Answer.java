package com.quizapplication.quiz.model;

import org.springframework.data.annotation.Id;

public class Answer {

    @Id
    private String id;
    private String text;
    private boolean correct;
    private String userId;
    private String questionId;  // Add this property

    // Constructors, getters, setters

    public Answer() {
        // Default constructor
    }

    public Answer(String text, boolean correct, String userId, String questionId) {
        this.text = text;
        this.correct = correct;
        this.userId = userId;
        this.questionId = questionId;  // Set the questionId
    }

    // Getters and setters for other fields

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        correct = correct;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    // Other getters and setters for additional fields if needed
}