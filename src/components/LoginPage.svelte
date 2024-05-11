<script>
  import { createEventDispatcher } from 'svelte';
  const dispatcher = createEventDispatcher();

  let username = '';
  let password = '';
  let errorMsg = '';
  let email = "";
  let checkOTP = false;
  let OTP = "";
  let resetPassword = false;
  let newPassword = "";
  let confirmPassword = "";

  $: forgetPassword = false;
  
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

      if (await response.ok) {
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

  const manageForgetPassword = () => {
    forgetPassword = !forgetPassword;
  }

  async function emailCheckRequest() {
    try {
        const response = fetch('http://localhost:5000/admin/forgetPassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
          credentials: 'include',
      });

    if ((await response).status === 200) {
        checkOTP = true;
    } else {
        errorMsg = 'Email not found. Please try again.';
    }  
    } catch (error) {
      console.log(error)
    }
    
  }

  async function emailOTPRequest() {
    try {
      const response = fetch('http://localhost:5000/admin/forgetPassword/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otpRequest: OTP }),
        credentials: 'include',
      });

      if ((await response).status === 200) {
         resetPassword = true;
      } else {
        errorMsg = 'Incorrect OTP. Please try again.';
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function resetPasswordRequest () {
    
    if (newPassword === confirmPassword) {
      try {
        const response = fetch('http://localhost:5000/admin/forgetPassword/reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newPassword }),
          credentials: 'include',
        });

        if ((await response).status === 200) {
          resetPassword = false;
          checkOTP = false;
          forgetPassword = false;
          errorMsg = 'Password Reset Successful. Try Logging In Again.';
        } else {
          errorMsg = 'An error occurred. Please try again later.';
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      errorMsg = 'Passwords do not match. Please try again.';
    }
  }

</script>

<main style={"background-image: url('/resources/nust.jpg')"}>
  <section>
    <!-- svelte-ignore empty-block -->
    {#if !forgetPassword}

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
    <p class="forgetPassword" on:click = {manageForgetPassword}>Forget Password?</p>
    {:else if resetPassword}
    <form on:submit|preventDefault = {resetPasswordRequest}>
      <h1>Reset Password</h1>
      <label for="newPassword">New Password</label>
      <input type="password" id="newPassword" placeholder="Enter New Password" bind:value ={newPassword} required/>
      <label for="confirmPassword">Confirm Password</label>
      <input type="password" id="confirmPassword" placeholder="Confirm Password" bind:value ={confirmPassword} required/>
      <p class="successMsg">{errorMsg}</p>
      <button type="submit">Submit</button>
    </form>
    {:else if checkOTP}
    <form on:submit|preventDefault = {emailOTPRequest}>
      <h1>Enter OTP</h1>
      <label for="otp">OTP</label>
      <input type="text" id="otp" placeholder="Enter OTP" bind:value ={OTP} required/>
      <p class="errMsg">{errorMsg}</p>
      <button type="submit">Submit</button>
    </form> 
    {:else}
    <form on:submit|preventDefault = {emailCheckRequest}>
      <h1>Forget Password</h1>
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="Enter your Email" bind:value ={email} required/>
      <p class="errMsg">{errorMsg}</p>
      <button type="submit">Submit</button>  
    </form>
    <p class="forgetPassword" on:click = {manageForgetPassword}>Try Logging In Again</p>
    {/if}
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
  color: rgb(254, 63, 70);
  grid-column: 1 / span 2;
}

.successMsg {
  color: rgb(44, 255, 69);
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
