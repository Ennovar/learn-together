# Interface with webservices
- ajax
  - a jquery feature that makes http requests simple and easy
  ```
  $.ajax({
    url: url, // url to send to
    type: 'GET', // type of request GET, POST, PUT, DELETE, ect..
    success: showPosts, // on success callback function to be called
    error: showError // on error callback function
  })
  ```

- curl
  - a commandline interface for http requests
  - example
  ```
  curl -X GET http://ennovarblogtest.herokuapp.com/posts
  ```

- wget
  - a commandline interface
  - downloads a http requests output
  - example
  ```
  wget http://ennovarblogtest.herokuapp.com/posts
  ```
- javascript form actions
