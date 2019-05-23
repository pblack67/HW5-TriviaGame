# Opera Trivia Game

* URL: [https://pblack67.github.io/OperaTriviaGame/](https://pblack67.github.io/OperaTriviaGame/)

* Technologies: HTML, CSS, JavaScript, Events, jQuery, Objects, Timers 

## Overview

This is an opera trivia game that gives the user a time limit to answer various questions. What? You don't know that much about opera? Take the quiz anyway. You might learn something! There's also a delay between question answers as well. The application keeps track of right and wrong answers as well as no-answers. Those are the worst since you're taunted and not given the correct answer. If you answer the question correctly you're greeted with a picture. A future enhancement may play actual clips from the operas. Don't worry, it won't be hours long

## Architecture

The main program flow is in the app.js file. Application flow is driven by mouse click events on  and the attack button. Event handlers are attached via jQuery. Clicking on a character either moves it to the player character area or the defender area based on where the character graphic is. The attack button processes the attack logic and notifies the user whether their attack was successful or they ran out of hit points and lost. If the defender is defeated then it's moved to a shadow div so the application doesn't lose track of it. 