# forFansOf

## Introduction
This web app is intended to serve as a catalog of musicians and their work, as well as a dedicated social platform for those who wish to connect and discuss musical interests.

## Technology

### Languages and Databases
- Front-end: [HTML](https://html.com/), CSS, [JavaScript](https://www.javascript.com/), [Bootstrap](https://getbootstrap.com/)
- Back-end: MEN Stack ([MongoDB](https://www.mongodb.com), [Express.js](https://expressjs.com), [Node.js](https://nodejs.org/))

### Software
- [Atom](https://atom.io/)
- [iTerm2 ]https://www.iterm2.com/

### Deployment
This web app is hosted on Heroku [here](https://forfansof.herokuapp.com).

## Approach
I started this web app by building out the outermost skeletal structure. I created the server file, the folders for models, views, and controllers, and subfolders for each. I wrote the server file from top to bottom. From there, I laid out all RESTFUL routes with full CRUD in the controllers. Next I created all of the view files I thought I may need. After that, I set up the models. From that point on, it was a matter of circling in to increasing specificity, while plugging in any necessary values along the way.

## Future Plans
There is a lot I would like to do with this app:
- I intend to refactor much of the code to improve navigability.
- At the moment, the authentication is vestigial at best. It works, but has no bearing on the user experience. I intend to give it function, for example: allowing users to create collections of artists and albums; establishing artist profiles with distinct functionality beyond fan profiles; enabling user-bound commenting and messaging; and plenty more.
- I would like to make this an actual media marketplace, where one could upload one's own work, set a price, and sell their work to the community, who would be able to listen and download freely.
- I intend to make the front-end more interactive by incorporating jQuery.
