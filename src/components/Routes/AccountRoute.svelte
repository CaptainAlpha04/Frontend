  <script>
  import Card from "../uicomponents/card.svelte";
  import ContentGrid from "../uicomponents/content-grid.svelte";
  import Toggleswitch from "../uicomponents/toggleswitch.svelte";
  import Modal from "../uicomponents/modal.svelte";

  let showModal = false;
  let username; let password;
  let requestedPassword = "";
  let newPasswordCheck = "";
  let passwordAlert = false;

  const checkToggleState = () => {
    
  }
    
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

const handleAccountRequest = () => {
    showModal = true;
  }

  let passwordStrength = '';

  function checkPasswordStrength() {
    const strongPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    const mediumPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})');

    if(strongPassword.test(requestedPassword)) {
      passwordStrength = 'strong';
    } else if(mediumPassword.test(requestedPassword)) {
      passwordStrength = 'medium';
    } else {
      passwordStrength = 'weak';
    }
  }

  async function comparePassword() {
    checkPasswordStrength();
    if (requestedPassword !== newPasswordCheck) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/admin/security/changeCredentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${document.cookie.split("=")[1]}`,
        },
        body: JSON.stringify({
          user: username,
          pass: password,
          requestedPassword: requestedPassword
        })
      });
      if (response.ok) {
        // Handle successful password change
        passwordAlert = true;
        showModal = false;
      } else {
        // Handle password change failure
        console.error("Password change failed");  
        alert("Password change failed");
      }
    } catch (error) {
      // Handle fetch request error
      console.error("Error during password change:", error);
    }

  }

  </script>
    {#if showModal}
      <Modal bind:showModal = {showModal}>
        <h2>Change Password</h2>
        <form on:submit|preventDefault={comparePassword}>
          <label for="username">Current Username</label>
          <input type="text" id="username" bind:value={username} required>

          <label for="current-password">Current Password</label>
          <input type="password" id="current-password" bind:value={password} required>

          <label for="new-password">New Password</label>
          <input type="password" id="new-password" bind:value={requestedPassword} on:input={checkPasswordStrength} required>

          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" bind:value={newPasswordCheck} required>
          {#if requestedPassword != ""}
            <p class={passwordStrength}>{passwordStrength} password</p>
          {/if}
          <button type="submit">Submit</button>
        </form>
      </Modal>
    {/if}
    {#if passwordAlert}
    <Modal>
      <i class="fi fi-ss-badge-check"></i>
      <h3 class="strong">Password Changed Successfully</h3>
      <button class="success-btn" on:click = {()=>{passwordAlert = false;}}>Okay</button>
    </Modal>
    {/if}

  <main>
    <h1>Account Settings</h1>
  <ContentGrid>

    <Card columnSpan = 3 rowSpan = 2>
      <h3>Personalization</h3>
      <div class="sub-area">
       <p>Dark Theme</p>
       <Toggleswitch on:click={checkToggleState} />
      </div>
     </Card>

    <Card columnSpan = 3 rowSpan = 2>
      <h3>Security Settings</h3>
      <div class="sub-area">
        <p>Log Out of System</p>
        <button on:click={logOutRequest}>Log Out</button>
      </div>
      <div class="sub-area">
        <p>Modify Login Details</p>
        <button on:click={handleAccountRequest}>Change Password</button>
      </div>
    </Card>

  </ContentGrid>
  </main>
  <style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    left: 6.7svw;
  }
  .sub-area {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
  }
  .ModalComponent {
    padding: 1rem;  
  }
  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  form label {
    color: #878787; 
    font-size: 1rem;
    align-items: center;
    text-align: left;
  }

  form input {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  form button {
    padding: 1rem 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: var(--tertiary-accent-color);
    color: white;
    cursor: pointer;
    grid-column: span 2;
    transition: all 100ms ease;
  }

  form button:hover {
    background-color: #2287f3;
  }

  .strong {
    color: green;
  }

  .medium {
    color: orange;
  }

  .weak {
    color: red;
  }

  form p {
    font-size: 1rem;
    margin: 0;
    place-self: start;
    
  }

  .success-btn {
    background-color: rgb(0, 176, 115);
    color: white;
    font-weight: bold;
  }

  i {
    font-size: 3rem;
    color: rgb(0, 176, 115);
  }
  </style>
    