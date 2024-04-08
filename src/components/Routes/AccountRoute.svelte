<script>
    import Toggleswitch from "../uicomponents/toggleswitch.svelte";
  
    const checkToggleState = () => {
      console.log("Hello World");
    };
  
    async function logOutRequest() {
      try {
        const response = await fetch("http://localhost:5000/admin/logout", {
          method: "POST",
        });
        if (response.ok) {
          // Clear authentication token cookie
          document.cookie = `AUTHENTICATION_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          // Reload the page
          window.location.reload();
        } else {
          // Handle logout failure
          console.error("Logout failed");
        }
      } catch (error) {
        // Handle fetch request error
        console.error("Error during logout:", error);
      }
    }

  </script>
  
  <main>
    <h1>Account Settings</h1>
  
    <Toggleswitch on:click={checkToggleState} />
    <button on:click={logOutRequest}>Log Out</button>
  </main>
  
  <style>
    main {
      /* Add your styles here */
    }
  </style>
  