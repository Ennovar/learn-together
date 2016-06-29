// a function to hold the styling of a post item
function postItemList(title, body) {
  return '<li class="post list-group-item"><h4>' + title + '</h4><div>' + body + '</div>' + '</li>'
}
// updates the page to show the posts
function showPosts(posts) {
  // for each post we get back
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];
    $('#posts').append(postItemList(post.title, post.body))
  }
}
function goHome() {
  window.location = 'index.html'
}
// updates the page to show the error
function showError(error) {
  $('#messages').empty()
  $('#messages').append('<div class="alert alert-danger">' + error +  '</div>')
}

// Requests the posts from the url provided
function getPosts(url) {
  $.ajax({
    url: url,
    type: 'GET',
    success: showPosts,
    error: showError
  })
}
function newPost(url, title, body) {
  if (title && body) {
    // if there is a title and body send the request
    // form the body of the request
    var post = {
      post: {
        title: title,
        body: body
      }
    };

    $.ajax({
      url: url,
      type: 'POST',
      data: post,
      success: goHome,
      error: showError
    });
  }
}
