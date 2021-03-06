// Function to handle the login form to login a user by fetch request to the users api
const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert('Invalid username or password - Please try again');
    }
  } else if (!username || !password) {
    alert('Please enter your username and password.')
    return;
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);


