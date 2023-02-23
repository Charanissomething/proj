// require("dotenv").config();
import { config } from "dotenv";
config();
// const todoLib = require("./backend/lib/todoLib");
import * as todoLib from "./backend/lib/todoLib.js";

// const mongoose = require("mongoose");
import mongoose from "mongoose";

// const express = require('express');
// const { request } = require("express"); 
import express, { request } from "express";
const app = express();
const port = process.env.PORT || 5050;
const options = {
    extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg', 'pdf'],
    index: ['index.html'],
}

app.use(express.static("frontend"));
app.use(express.json());
app.use(express.static("public", options));

app.get("/api/todos", function(req, res) {
    todoLib.getAllTodos(function(err, todos) {
        if (err) {
            res.json({ status: "error", message: err, data: null });
        } else {
            res.json({ status: "success", data: todos });
        }
    });
});

app.post("/api/todos", function(req, res) {
    const todo = req.body;
    todoLib.createTodo(todo, function(err, dbtodo) {
        if (err) {
            res.json({ status: "error", message: err, data: null });
        } else {
            res.json({ status: "success", data: dbtodo });
        }
    });
});

app.put(("/api/todos/:todoid"), function(req, res) {
    const todo = req.body;
    const todoid = req.params.todoid;
    todoLib.updateTodoById(todoid, todo, function(err, dbtodo) {
        if (err) {
            res.json({ status: "error", message: err, data: null });
        } else {
            res.json({ status: "success", data: dbtodo });
        }
    });
});

app.delete(("/api/todos/:todoid"), function(req, res) {
    const todoid = req.params.todoid;
    todoLib.deleteTodoById(todoid, function(err, dbtodo) {
        if (err) {
            res.json({ status: "error", message: err, data: null });
        } else {
            res.json({ status: "success", data: dbtodo });
        }
    });
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/frontend/html/index.html");
});

app.get("/resume", function(req, res) {
    res.sendFile(__dirname + "/frontend/html/resume.html");
});

app.get("/card", function(req, res) {
    res.sendFile(__dirname + "/frontend/html/card.html");
});
app.get("/weather", function(req, res) {
    res.sendFile(__dirname + "/frontend/html/weather.html");
});
app.get("/todolist", function(req, res) {
    res.sendFile(__dirname + "/frontend/html/todolist.html");
});
app.get("/about", function(req, res) {
    res.sendFile(__dirname + "/frontend/html/about.html");
});
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {}, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log("DB Connected");
        app.listen(port, function() {
            console.log("Server running on http://localhost:" + port);
            console.log(`Server running on http://localhost:${port}`);
        });

    }
});