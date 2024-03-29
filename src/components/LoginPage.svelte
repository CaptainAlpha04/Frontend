<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatcher = createEventDispatcher();
  
  let username = '';
  let password = '';
  let errorMsg = '';
  
  async function handleLogin() {
    const user = {
      user: username, // Use destructuring for clarity
      pass: password,
    };
  
    try {
      const response = await fetch('http://localhost:5000/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        errorMsg = ''; // Clear error message on successful login
        dispatcher('Access', true);
      } else if (response.status === 401) {
        errorMsg = 'Incorrect Username or Password';
      } else {
        errorMsg = 'An error occurred. Please try again later.';
      }
    } catch (error) {
      errorMsg = 'Unable to Connect to Server';
      console.error('Login error:', error); // Log the actual error for debugging
    }
  }

  function SubmitFormm() {
    
  }
  </script>
  
  <main style="background-image: url('resources/nust.jpg')">
    <section>
      <div class="login-form">
        <h1 class="h1">Admin Login</h1>
        <input
          type="text"
          class="usrname"
          placeholder="Enter your Username"
          bind:value={username}
          on:keydown={e => (errorMsg = '')}
        />
        <input
          type="password"
          class="pasw"
          placeholder="Enter your Password"
          bind:value={password}
          on:keydown={e => (errorMsg = '')}
        />
        <button on:click={handleLogin}>Login</button>
        <p class="errMsg">{errorMsg}</p>
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
  padding: 0.7rem;
  border: none;
  border-bottom: 3px solid orange;
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
  
