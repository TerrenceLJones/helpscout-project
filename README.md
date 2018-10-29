# HelpScout Project Post Mortem

![](https://user-images.githubusercontent.com/7111256/47680725-ec371900-db84-11e8-97b6-603aa62201ec.png)
#### Live Application Link: https://gentle-fjord-88236.herokuapp.com/books
#### GitHub Link: https://github.com/TerrenceLJones/helpscout-project/

Hi, thanks for taking the time to review my code! This was a really fun project to work on and I really enjoyed the process.

This project is live at the above link. **Note:** the project is hosted on Heroku free tier and as such if it does not receive traffic within 30 minutes Heroku will put the node my app is hosted on to sleep. Generally after traffic resumes the app will be available within 30 seconds. See note about needed hosting changes in the "To make production-ready" section.

## Architecture Decisions

During development, I made decisions algorithmically and stylistically to hopefully lead to ease of understanding for teammates. I tried to limit my use of "clever code" in an effort to increase the efficiency of developer on-boarding and code maintenance. I strove to provide understanding via good naming, the overall structure, and/or by commenting.

As you go through the code, you will notice my use of both local and global state. Locally, I have utilized basic React state, while globally I have opted for Redux. I know that there are ways to obfuscate the repetitive nature of Redux, however I feel like some of the "magic" can be a barrier to others working in the codebase.

I also tried to take performance under consideration during development. I opted for lookup objects instead of arrays to make finding, updating, or removing data from the state really efficient and straightforward.


## Lessons Learned

I learned that I need more understanding of idiomatic CSS in React. My previous experiences have been mainly centered around global styles in a Rails environment. In this project, I implemented CSS modules, but would like to look into Styled components and see if that is a better approach.


## To make production-ready

- Implement full test suite (i.e. unit and integration specs).
- Solidify design/css.
- Will need to add a real API, as well as remove the mock data, and bootstraping the app into localStorage.
- Utilize an image processing service like Imgix to process images for display.
- Refactor URL/Routing syncing work into a HOC to abstract away that complexity.
- Remove data URLs for images and store user images in an S3 bucket instead of inline with user-generated data.
- Add in form validations and required fields for the book form.
- Find and consolidate duplicate code into base components.
- Modify hosting settings to prevent idle node sleeping.


## Known Issues

- Currently, the loading screen is not being displayed after the user initiates a save to create, update or delete a new book.
- Some styles need to be addressed in a holistic way (e.g.image styles could be improved).

## Resources

Just in case anyone is interested, here are some resources that have heavily influenced the way I like to approach React/Redux development:


- https://hackernoon.com/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed
- https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1
- http://engineering.kapost.com/2016/01/organizing-large-react-applications/
- https://hackernoon.com/my-journey-toward-a-maintainable-project-structure-for-react-redux-b05dfd999b5
- http://nikolay.rocks/2017-06-18-better-redux-loading
- https://decembersoft.com/posts/a-simple-naming-convention-for-action-creators-in-redux-js/
- https://jaysoo.ca/2016/02/28/organizing-redux-application/
- https://medium.com/@alexmngn/how-to-use-redux-on-highly-scalable-javascript-applications-4e4b8cb5ef38
- https://github.com/erikras/ducks-modular-redux
- https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be

