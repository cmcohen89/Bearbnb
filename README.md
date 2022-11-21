# [Bearbnb](https://cmcohen-airbnb-project.herokuapp.com/) 

## Table of contents
* [Intro](#intro)
* [Features](#features)
* [Planned Features](#planned-features)
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

## Planned Features

Upcoming features include:
- User profile combining the "My Spots" and "My Reviews" pages
- Create, read, update, and delete functionality for Bookings
- Paginated search feature with optional parameters
- Google Maps image for each spot page
- Create, read, update, and delete functionality for Favorites
- Bonus: Bookings - 4th feature with full CRUD

## Technologies 
<p>
<!-- languages -->
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<!-- Frameworks -->
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
<p/>

## Demo Image

![Bearbnb Splash Page](https://user-images.githubusercontent.com/103705214/202872619-b7e63821-9e44-48f7-8893-c9d942eeab2b.png)

## Get Started

To run the app locally, navigate to the `/backend` directory in the terminal and enter `npm start`. In a separate terminal, navigate to the `/frontend` directory and enter `npm start`. This should automatically launch a browser window navigated to the proper localhost address. By defauly, the app will be running on port 3000.
