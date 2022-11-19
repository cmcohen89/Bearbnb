# [Bearbnb](https://cmcohen-airbnb-project.herokuapp.com/) 

## Table of contents
* [Intro](#intro)
* [Features](#features)
* [Technologies](#technologies)
* [Demo Image](#demo-image)
* [Get Started](#get-started)


## Intro

Welcome to Bearbnb! This web application is a fullstack project of my creation wherein I've attempted to clone Airbnb to a fairly reasonable extent.
The CSS stylings for the main splash page as well as a single spot's page are as close to pixel-perfect as I could manage and are based off of how Airbnb looked at the time of this project's creation (November 2022).

Enjoy navigating around the website! You may sign up as a new user or login as the demo user by clicking the profile icon in the top-right of the page and selecting your choice. A logged-in user may create a new spot by selecting "Bearbnb you home" on the Nav bar, or by clicking the profile icon when logged in and choosing "Host Your Home". A logged-in user may also leave a review for any spot by navigating to that spot's page and scrolling down to the "Reviews" section, then clicking the relevant button. A user may view, edit, add images to, remove images from, or delete their own spots by clicking the profile button and choosing "My Spots". Similarly, a user may view, edit, or delete their reviews by choosing the "My Reviews" option in that same profile button dropdown list.

## Features

Currently implemented features include:
- Signup and Login functionality for Users
- Create, read, update, and delete functionality for Spots
- Create, read, update, and delete functionality for Reviews
- Create, read, and delete functionality for Spot Images

## Technologies 
- Node.js
- React
- Redux
- CSS
- FontAwesome

## Demo Image

![Bearbnb Splash Page](https://user-images.githubusercontent.com/103705214/202872619-b7e63821-9e44-48f7-8893-c9d942eeab2b.png)

## Get Started

To run the app locally, navigate to the `/backend` directory in the terminal and enter `npm start`. In a separate terminal, navigate to the `/frontend` directory and enter `npm start`. This should automatically launch a browser window navigated to the proper localhost address. By defauly, the app will be running on port 3000.
