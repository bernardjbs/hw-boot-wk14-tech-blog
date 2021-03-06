// Function to handle the signup form to sign out a user by fetch request to the users api
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  } else if (!username || !password) {
    alert('Please enter a username and password.')
    return;
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);