<script>
  // Import necessary components and functions
  import LoginPage from "./components/LoginPage.svelte";
  import Dashboard from "./components/Dashboard.svelte";
  import { onMount } from 'svelte';

  // Initialize state variable to control login screen visibility
  let value = false;

  // On component mount, check if there's a stored access token
  onMount(async () => {
    if (await verifyToken()) {
      value = true;
    }
  });

  // Function to handle login screen visibility
  async function loginScreen() {
    if (await verifyToken()) {
      value = true;
    }
  }

  // Function to verify token stored in cookies
  async function verifyToken() {
    const accessToken = getCookie("AUTHENTICATION_TOKEN"); // Read the token from cookies
    if (accessToken) {
      try {
        // Send a verification request to the server
        const response = await fetch("http://localhost:5000/admin/verification", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          return true; // Token is valid
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    }
    return false; // Token is invalid or not found
  }

  // Function to get a specific cookie by name
  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return null; // Cookie not found
  }
</script>

<main>
  {#if value}
    <Dashboard /> <!-- Render dashboard if logged in -->
  {:else}
    <LoginPage on:Access={loginScreen}/>  <!-- Render login page otherwise -->
  {/if} 
</main>
<style>
  /* Component styles here */
</style>
