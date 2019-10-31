# Sensi
> An interactive journal experience that provides insight to and engages human emotions

## Table of contents
* [General info](#general-info)
* [Intro Video](#intro-video)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)
* [License](#license)

## General info
Sensi is a single page application that allows users to create a profile and track their emotional patterns. The user creates a descriptive entry of their mood or day's events, which is processed by sentiment analysis technology and rendered on the user's profile as a color indicative of mood polarity. A chart is included to count and compare mood polarities. Further, a user can balance their current emotional state in a View room of relaxing VR videos, but to access it the user must pass a Smile test! A snapshot is taken of the user every six seconds until their smile is scored at 95% or above.

## Intro Video
[Sensi on YouTube](https://www.youtube.com/watch?v=V5oDAX56trY)

## Technologies
* Vue.js
* Node with Express
* PostgreSQL
* AYLIEN Sentiment Analysis
* Microsoft Cognitive Services - Face API
* Firebase
* Heroku

## Setup
To run this project, install it locally by cloning the GitHub repository.

Front end repo can be found at https://github.com/catherine-o/sensi-frontend

API key/ID for AYLIEN will need to be switched out after 11/16/19.
You may sign up for a free trial and replace the key and ID. These are found at the top of api/users.js
You will also need to set up your own local database connection as it is currently connected to Postgres via Heroku.

From inside the project directory:
```
npm install

npm start
```
Open your browser and go to http://localhost:8080.

## Code Examples

```javascript
router.post('/users/signup', (req, res) => {
    let userExists = User.query().where('username', req.body.username).first()
    .then(function (userExists) {
        if (!userExists) {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            User.query().insert({
                username: req.body.username,
                name: req.body.name,
                password: hash
            })
            .then(user => {
                jwt.sign({user}, process.env.SECRET_KEY, (err, token) => {
                    user.password = null
                    res.json({
                        user,
                        token
                    })
                })
            })
        })
        } else {
            res.json('Username already taken')
        }
    })
})
```

```javascript
router.get('/users/:id', (req, res) => {
    let id = parseInt(req.params.id)
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            User.query()
                .where('id', id)
                .eager('posts')
                .then(user => {
                    res.json({
                        user
                    })
                })
        }
    })
})
```


## Features
* Create user account
* Submit new journal entry for sentiment analysis
* Review previous entries and track emotional patterns over time
* View total counts of each mood polarity in Chart view
* Access VR View room via camera snapshots and smile analysis
* Balance current emotional state by viewing relaxing VR videos


To-do list:
* Build another chart type in Chart view
* Implement a filter function so users may choose VR mood
* Allow users to delete entries
* Complete responsive design functionality


## Status
Project is: deployed for desktop browsers at [https://sensi-journ.firebaseapp.com](https://sensi-journ.firebaseapp.com). However, will need new API keys for AYLIEN & Microsoft Cognitive Services (Limited Trials)

## Inspiration
The inspiration for Sensi came from an interest in AI and Machine Learning technologies. I wanted to build a product that would increase user engagement, such as camera hardware or possibly a VR headset. I was also inspired by futuristic and clean design concepts, such as seen in some episodes of a popular Netflix technology TV series :)

## Contact
Created by [Catherine O'Hara](www.linkedin.com/in/catherine-o)

Feel free to contact me!

## License
[GPL v3.0](https://github.com/catherine-o/sensi-backend/blob/master/LICENSE)
