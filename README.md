## Getting started

You can view a live demo over at https://postit-redux.firebaseapp.com

To get the frontend running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- `npm start` to start the local server (this project uses create-react-app)


The application is a social blogging site (i.e. a Medium.com clone) called "Conduit". It uses a custom API for all requests, including authentication. You can view a live demo over at https://postit-redux.firebaseapp.com

### Making requests to the backend API
There exists a live API server running at https://conduit-rails-api.herokuapp.com/api for the application to make requests against.

The source code for the backend server available in Rails can be found on [github](https://github.com/alagram/conduit-api).

If you want to change the API URL to a local server, simply edit `src/agent.js` and change `API_ROOT` to the local server's URL (i.e. `http://localhost:3000/api`)

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: / )
    - List of tags
    - List of articles pulled from either Feed, Global, or by Tag
    - Pagination for list of articles
- Sign in/Sign up pages (URL: /login, /register )
    - Use JWT (store the token in localStorage)
- Settings page (URL: /settings )
- Editor page to create/edit articles (URL: /editor, /editor/article-slug-here )
- Article page (URL: /article/article-slug-here )
    - Delete article button (only shown to article's author)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)
- Profile page (URL: /@username, /@username/favorites )
    - Show basic user info
    - List of articles populated from author's created articles or author's favorited articles

<br />
