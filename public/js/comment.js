// Add a new comment
const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('.input-comment').value.trim();
  const post_id = document.querySelector('.form-add-comment').getAttribute('data-post-id');
  const user_id = document.querySelector('.form-add-comment').getAttribute('data-user-id');

  const response = await fetch('/api/comments/', {
    method: 'POST',
    body: JSON.stringify({
      comment: comment,
      post_id: post_id, 
    }),
    headers: {
      'content-type': 'application/json',
    },
  });

  if (response) {
    window.location.replace(window.location.pathname)
  } else {
    alert("Update failed");
  }

};

document
  .querySelector('.form-add-comment')
  .addEventListener('submit', newCommentFormHandler);

// Delete an existing comment
const delCommentBtnEl = document.querySelector('.button-delete-comment');
const commentId = delCommentBtnEl.getAttribute('data-id');

const deleteComment = async () => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    window.location.replace(window.location.pathname)
  } else {
    alert('Failed to delete comment');
  }

}

delCommentBtnEl.addEventListener('click', deleteComment)