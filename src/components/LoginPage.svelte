<script>
import { createEventDispatcher} from "svelte";

const dispatcher = createEventDispatcher();

let username;
let password;
let errmsg = ""
async function login() {
  const user = {
    user: username, // Access properties directly using destructuring
    pass: password
};
  try {
    const response = await fetch('http://localhost:5000/admin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });

   if(response.ok) {
      let AllowAcess = true;
      dispatcher("Access", AllowAcess);
   } 
   if (response.status === 401) {
    errmsg = "Incorrect Username or Password";
   }
      
  } catch (err) {
     errmsg = "Unable to Connect to Server"; // Log the error message
}
}


</script>
  
<main style={`background-image: url('resources/nust.jpg')`}>
<section>
<div>
  <h1 class="h1">Admin Login</h1>
  <input type="text" class="usrname" placeholder="Enter your Username" bind:value={username}>
  <input type="password" class="pasw" placeholder="Enter your Password" bind:value={password}>
  <button on:click={login}>Login</button>
  <p class="errMsg">{errmsg}</p>
  </div>
  <p class="fpass">Forget Password?</p>
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

.fpass {
text-align: center;
color: gray;  
}

</style>
  
