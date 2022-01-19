package com.example.demo.entity;

public class User {
    private String id;
    private String privilage;
    private String usergroups;
    private String username;

    public User() {

    }

    public User(String id, String privilage, String usergroups, String username) {
        this.id = id;
        this.privilage = privilage;
        this.usergroups = usergroups;
        this.username = username;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPrivilage() {
        return privilage;
    }

    public void setPrivilage(String privilage) {
        this.privilage = privilage;
    }

    public String getUserGroups() {
        return usergroups;
    }

    public void setUserGroups(String usergroups) {
        this.usergroups = usergroups;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", privilage='" + privilage + '\'' +
                ", userGroups='" + usergroups + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
