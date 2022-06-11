const postSectionEl = document.querySelector('.post-section');
let inputTitle = document.querySelector('#input-title');
let inputContent = document.querySelector('#input-content');
let btnSendInfo = document.querySelector('.button-send-post-info');

const titleEl = document.querySelectorAll('.post-title');
const contentEl = document.querySelectorAll('.post-content');

const btnPostEl = document.querySelector('#button-post');
const btnDeleteEl = document.querySelectorAll('.button-delete-post');

const user_id = postSectionEl.getAttribute('data-user-id');

let postId = 0;
let postToUpdate = {};

// Function to scroll to the bottom of page
const scrollingElement = (document.scrollingElement || document.body);
const scrollToBottom = () => {
   scrollingElement.scrollTop = scrollingElement.scrollHeight;
}

const clickHandler = (event) => {
  if (event.target.classList.contains('button-send-post-info')) {
    postId = event.target.getAttribute('data-post-id');
    const getInfo = (el, type) => {
      let id = el.getAttribute('data-post-id');
      if (id == postId) {
        postToUpdate.id = postId;
        if (type == 'title') {
          inputTitle.value = el.innerHTML;
        }
        else if (type == 'content') {
          inputContent.value = el.innerHTML;
        }
      }
      return;
    }
    titleEl.forEach(el => getInfo(el, 'title'));
    contentEl.forEach(el => getInfo(el, 'content'));
    btnPostEl.textContent = 'Update';
    btnPostEl.classList.add('btn-update-post');
    btnPostEl.classList.remove('btn-add-post');
    scrollToBottom();
  }
}
postSectionEl.addEventListener('click', clickHandler);

const updatePost = async (event) => {
  // Update post
  postToUpdate.title = inputTitle.value;
  postToUpdate.content = inputContent.value;

  if (postToUpdate.title == '' || postToUpdate.content == '') {
    alert('Please enter a title and a content');
    return;
  }

  const response = await fetch(`api/post/${postToUpdate.id}`, {
    method: 'PUT', 
    body: JSON.stringify({
      title: postToUpdate.title,
      content: postToUpdate.content,    
    }), 
    headers: {
      'content-type': 'application/json',
    },
  })

  if (response) {
    window.location.replace(window.location.pathname)
  } else {
    alert("Update failed");
  }
}

// Function to add a new post or update an existing post 
const addPost = async (event) => {
  const title = inputTitle.value.trim();
  const content = inputContent.value.trim();

  if (!title || !content) {
    alert('Please enter a title and a content');
    return;
  }

  const response = await fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      content: content,
      user_id: user_id
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    window.location.replace(window.location.pathname);
  }
  else {
    alert('POST failed');
  }
};

const checkSubmit = (classList) => {
  if (classList.contains('btn-update-post')) {
    updatePost();
  } else if (classList.contains('btn-add-post')) {
    addPost();
  }
}
btnPostEl.addEventListener('click', () => checkSubmit(btnPostEl.classList));


// Function to delete an existing post
const deletePost = async (postId) => {
  if (confirm('ARE YOU SURE YOU WANT TO DELETE POST?') == true) {
    const response = await fetch(`/api/post/${postId}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      window.location.replace(window.location.pathname)
    } else {
      alert('Failed to delete post');
    };
  }
  else {
    return;
  }
  
};

btnDeleteEl.forEach(el => el.addEventListener('click', () => { 
  const postId = el.getAttribute('data-post-id');
  deletePost(postId)
}));



