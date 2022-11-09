# Tech-Blog

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
This app is a tech blog in a style similar to word-press that would allow users to create blogs and comment on others posts. 

[Deployed site](https://cryptic-fjord-85495.herokuapp.com/)

## Technology Used
* Express.js
* Dotevn
* mysql2
* sequelize
* handlebars

## Code Snippet 

This snippet is a funciton that checks if a user is logged in. If not they will be redirected to a login page

```Javascript 
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};
```

Here is a function to log a user out of their account.

```Javascript
const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};
```