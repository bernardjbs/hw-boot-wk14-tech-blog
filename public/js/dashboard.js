// Constants and Variables
let inputTitleEl = document.querySelector('#input-title');
let inputContentEl = document.querySelector('#input-content');
let btnSendInfo = document.querySelector('.button-send-post-info');

const titleEl = document.querySelectorAll('.post-title');
const postSectionEl = document.querySelector('.post-section');

const btnClearEl = document.querySelector('#button-clear');
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

// Send title and content to input when Edit button is pressed
const clickHandler = (event) => {
  if (event.target.classList.contains('button-send-post-info')) {
    postId = event.target.getAttribute('data-post-id');
    const getInfo = (el, type) => {
      let id = el.getAttribute('data-post-id');
      if (id == postId) {
        postToUpdate.id = postId;
        if (type == 'title') {
          inputTitleEl.value = el.innerHTML;
        }
        else if (type == 'content') {
          inputContentEl.value = el.innerHTML;
        }
      }
      return;
    }
    titleEl.forEach(el => getInfo(el, 'title'));
    contentEl.forEach(el => getInfo(el, 'content'));
    btnPostEl.textContent = 'Update';
    btnPostEl.classList.add('btn-update-post');
    btnPostEl.classList.remove('btn-add-post');
    btnClearEl.classList.remove('hide');
    btnClearEl.classList.add('show');
    scrollToBottom();
  }
}
postSectionEl.addEventListener('click', clickHandler);

// Function to update a post by fetch request to the post api
const updatePost = async (event) => {
  postToUpdate.title = inputTitleEl.value;
  postToUpdate.content = inputContentEl.value;

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

// Function to add a new post or update an existing post by fetch request to the post api
const addPost = async (event) => {
  const title = inputTitleEl.value.trim();
  const content = inputContentEl.value.trim();

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


// Function to delete an existing post by fetch request to the post api
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


// Function to Check if input is empty then hide clear button
const checkInput = (element) => {
  if (element.value == '') {
    btnClearEl.classList.add('hide');
    btnClearEl.classList.remove('show');
  } else {
    btnClearEl.classList.add('show');
    btnClearEl.classList.remove('hide');
  }
}

inputTitleEl.addEventListener('keyup', () => checkInput(inputTitleEl))
inputContentEl.addEventListener('keyup', () => checkInput(inputContentEl))

// Function to clear title and content inputs when clear button is clicked
const clearInput = () => {
  inputTitleEl.value = '';
  inputContentEl.value = '';
  btnClearEl.classList.remove('show');
  btnClearEl.classList.add('hide');
}
btnClearEl.addEventListener('click', () => clearInput())


