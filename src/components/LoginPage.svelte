<script>
  import { createEventDispatcher } from 'svelte';
  const dispatcher = createEventDispatcher();

  let username = '';
  let password = '';
  let errorMsg = '';

  async function handleLogin(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const user = {
      user: username,
      pass: password,
    };

    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        credentials: 'include',
      });

      if (response.ok) {
        errorMsg = '';
        dispatcher('Access', true);
      } else if (response.status === 401) {
        errorMsg = 'Incorrect Username or Password';
      } else {
        errorMsg = 'An error occurred. Please try again later.';
      }
    } catch (error) {
      errorMsg = 'Unable to Connect to Server';
      console.error('Login error:', error);
    }
  }
</script>

<main style={"background-image: url('/resources/nust.jpg')"}>
  <section>
    <form class="login-form" on:submit={handleLogin}>
      <h1>Admin Login</h1>
      <label for="username">Username</label>
      <input
        type="text"
        id = "username"
        placeholder="Enter your Username"
        bind:value={username} required/>

      <label for="password">Password</label>
      <input
        type="password"
        id = "password"
        placeholder="Enter your Password"
        bind:value={password} required/>
      <button type="submit">Login</button>

      <p class="errMsg">{errorMsg}</p>
    </form>
    <p class="forgetPassword">Forget Password?</p>
  </section>
</main>

<style>
main {
  width: 100vw;
  height: 100vh;
  margin: 0;
  background-size: cover;
  background-repeat: no-repeat;
}
section {
  width: 40vw;
  background-color: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(15px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
}

form {
  width: 80%;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  padding: 2rem;
  align-items: center;
  justify-items: center;
}

label {
  grid-column: 1;
  justify-self: start;
}

input {
  grid-column: 2;
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-bottom: 0.2rem solid var(--first-primary-accent-color);
  background-color: transparent;
  color: white;
}

button {
  grid-column: span 3;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.errMsg {
  color: rgb(255, 44, 44);
  grid-column: 1 / span 2;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  grid-column: span 3;
}

.forgetPassword {
  text-align: center;
  color: gray;
  cursor: pointer;
  margin-top: 2rem;
}

</style>
