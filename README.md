# quiz-game (aka Daily Quiz for now...) - Project 3 - Back End

![logo](public/favicon.ico)

This is a daily quiz game that generates 5 questions everyday. Everyone accessing the game on the same day will receive the same 5 questions (like wordle). It uses local storage to keep track of the stats. This is the final project for the General Assembly Software Engineering Immersive course (SEI57). Consolidating learnings on Vue, node.js, express and MongoDB.

You can visit the deployed site by clicking [here](https://dailyquiz.netlify.app/).

---

## Project Snapshot

![Landing Page](readme_images/ss1.jpg)
![Quiz Page](readme_images/ss3.jpg)
![Summary Page](readme_images/ss4.jpg)

---

## Stack

- Vue.js
- Node.js / express [link to frontend repo](https://github.com/jiakairen/quiz-game-client)
- MongoDB

---

## APIs Used

- [The Trivia API](https://the-trivia-api.com/)

---

## Features

- The server refreshes the question set everyday at midnight (UTC)
- Same questions for everyone on the same daty
- Time-based scoring
- Summary of game stats after completing the quiz for the day
- Uses local storage for storing game stats and status
- The server checks if a quizset exists either on server or in database based on the date. If not, it'll request new quizset from the external API.

---

## Known Issues

- Loading of questions might take upto 10 seconds when the server recovers from sleep.
- Opening multiple tabs of the game appears to mess with the local storage
- CSS glitches especially with blur

---

## Future Plans

- Add log in so stats can be saved
- Add team so people can join the same team and compete with each other
- Add review questions on the summary page
- Add charts on the summary page

---

## Special Thanks

Thanks to Loden ([Github](https://github.com/Tenzang)) and Joel ([Github](https://github.com/wofockham)) for their help at General Assembly Australia.

---

## Special Special Thanks

Thanks nico ([Github](https://github.com/Anico94)) for the idea and numerous suggestions. You always come up with good stuff on the train 🚃 😬
