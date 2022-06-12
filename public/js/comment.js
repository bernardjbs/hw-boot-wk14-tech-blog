const btnClearEl = document.querySelector('#button-clear');
const btnSaveEl = document.querySelector('#button-save');
const inputCommentEl = document.querySelector('.input-comment');
const post_id = document.querySelector('.form-add-comment').getAttribute('data-post-id');
const btnDelCommentEl = document.querySelectorAll('.button-delete-comment');

// Function to save a new comment
const saveComment = async (event) => {

  event.preventDefault();
  const comment = inputCommentEl.value.trim();
  if (!comment) {
    alert("Your comment cannot be empty - Please add a comment")
    return;
  }

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
    alert("Your comment could not be saved - Please try again");
  }
}
btnSaveEl.addEventListener('click', saveComment);


// Function to delete an existing comment
const deleteComment = async (commentId) => {
  if (confirm('ARE YOU SURE YOU WANT TO DELETE COMMENT?') == true) {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      window.location.replace(window.location.pathname)
    } else {
      alert('Failed to delete comment');
    };
  }
  else {
    return;
  }
  
};

btnDelCommentEl.forEach(el => el.addEventListener('click', () => { 
  const commentId = el.getAttribute('data-id');
  deleteComment(commentId)
}));


// Checks if input is empty then hide clear button
const checkInput = (element) => {
  if (element.value == '') {
    btnClearEl.classList.add('hide');
    btnClearEl.classList.remove('show');
  } else {
    btnClearEl.classList.add('show');
    btnClearEl.classList.remove('hide');
  }
}

inputCommentEl.addEventListener('keyup', () => checkInput(inputCommentEl))

// Clear title and content inputs when clear button is clicked
const clearInput = () => {
  inputCommentEl.value = '';
  btnClearEl.classList.remove('show');
  btnClearEl.classList.add('hide');
}
btnClearEl.addEventListener('click', () => clearInput())