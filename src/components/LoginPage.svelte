<script>
  // Import necessary module and function
  import { createEventDispatcher } from 'svelte';
  const dispatcher = createEventDispatcher();

  // Initialize variables for username, password, and error message
  let username = '';
  let password = '';
  let errorMsg = '';

  // Function to handle login attempt
  async function handleLogin() {
    const user = {
      user: username, // Use destructuring for clarity
      pass: password,
    };

    try {
      // Send login request to the server
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        errorMsg = ''; // Clear error message on successful login
        dispatcher('Access', true); // Dispatch event to notify successful login
      } else if (response.status === 401) {
        errorMsg = 'Incorrect Username or Password'; // Display error message for authentication failure
      } else {
        errorMsg = 'An error occurred. Please try again later.'; // Display generic error message for other failures
      }
    } catch (error) {
      errorMsg = 'Unable to Connect to Server'; // Display error message for server connection failure
      console.error('Login error:', error); // Log the actual error for debugging
    }
  }
</script>

<main style="background-image: url('resources/nust.jpg')">
  <section>
    <div class="login-form">
      <h1 class="h1">Admin Login</h1>
      <input
        type="text"
        placeholder="Enter your Username"
        bind:value={username}
        on:keydown={e => (errorMsg = '')}
      />
      <input
        type="password"
        placeholder="Enter your Password"
        bind:value={password}
        on:keydown={e => (errorMsg = '')}
      />
      <button on:click={handleLogin}>Login</button>
      <p class="errMsg">{errorMsg}</p> <!-- Display error message if any -->
    </div>
    <p class="forgetPassword">Forget Password?</p>
  </section>
</main>  

<style>
main{
  width: 100svw;
  height: 100svh;
  margin: 0;
  background-size: cover;
  background-repeat: no-repeat;
}

section {
  width: 40svw;
  background-color: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(15px);
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

img {
  height: 6rem; 
  width: 6rem;
  align-self: center;
  justify-self: start;
}

div {
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 5rem;
}

input {
  padding: 0.8rem;
  border: none;
  border-bottom: 3px solid var(--first-primary-accent-color);
  background-color: transparent;  
  color: white;
}

button {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 5px;
}

.errMsg {
  color: rgb(255, 44, 44);
}

h1 {
  font-size: 2rem;
}

.forgetPassword {
text-align: center;
color: gray;  
cursor:pointer;
}

</style>
  
