const postSectionEl = document.querySelector('.post-section');
let inputTitle = document.querySelector('#input-title');
let inputContent = document.querySelector('#input-content');

const titleEl = document.querySelectorAll('.post-title');
const contentEl = document.querySelectorAll('.post-content');

const btnPostEl = document.querySelector('#button-post');

const user_id = postSectionEl.getAttribute('data-user-id');

let postId = 0;
let postToUpdate = {};

const clickHandler = (event) => {
  if (event.target.matches('button')) {
    postId = event.target.getAttribute('data-post-id');
  }
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
}
postSectionEl.addEventListener('click', clickHandler);

const updatePost = async (event) => {
  // Update post
  postToUpdate.title = inputTitle.value;
  postToUpdate.content = inputContent.value;

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

const addPost = async (event) => {
  // Add new post
  console.log("hello");
  const title = inputTitle.value.trim();
  const content = inputContent.value.trim();

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
    console.log('UPDATE POST');
    updatePost();
  } else if (classList.contains('btn-add-post')) {
    console.log('ADD POST');
    addPost();
  }
}

btnPostEl.addEventListener('click', () => checkSubmit(btnPostEl.classList));