package com.quizapplication.quiz.model;

public class Option {
    private String text;
    private boolean correct;

    // Constructors
    public Option() {
        // Default constructor
    }

    public Option(String text, boolean correct) {
        this.text = text;
        this.correct = correct;
    }

    // Getters and Setters
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
        this.correct = correct;
    }

    // toString, equals, hashCode, etc. can be overridden as needed
}
