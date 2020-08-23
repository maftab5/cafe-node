# **Cafe - Node**

Cafe - Node is the backend part of Online Cafe to create API for various operations for the website.
## Table of Content
* [Features](#Features)
* [Prerequiste](#Prerequiste)
* [Installation](#Installation)

## Features
* It includes all the CRUD operations for the website
* User authentication using JWT token
* User registrations
* Sending emails to and from the users

## Prerequiste
* Node
* Express
* Mongoose
* MongoDB


## Installation

Make sure you have node js and git installed on your machine. I recommend you to have **[Node](https://nodejs.org/en/download/)** version 10x or above, and **npm** verison 5.8 or above

Open the terminal and follow the steps
* Step 1 : Clone the repo

 ```git clone https://github.com/maftab5/cafe-node.git```
 
 You can see `cafe-node` folder in your current working directory. Now change the direcotry to **`cafe`** inside cafe-node
 `cd cafe-node/cafe`
 
 * Step 2 : Install dependencies
 ``` npm install```
 
 This will install all the dependencies for the project.
 * Step 3 : Connect the project to your MongoDB database
 
 change the username and password with your database username and password in the file **db.js** inside **app_server/models** folder
 
 ```const dbURI = 'mongodb+srv://<username>:<password>@nodeapplication-rsic3.mongodb.net/Cafe?retryWrites=true&w=majority'```
 
 * Step 4 : Run the project.
 
 `npm start`
 
 You should see the project up and running
