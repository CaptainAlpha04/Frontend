<script>

</script>

<section>

<img src="/resources/logo.png" alt="Persona" srcset="">
<div class="nav-btn">
    <i class="fi fi-rr-house-chimney"></i>
</div>
<div class="nav-btn">
    <i class="fi fi-rr-user-graduate"></i>
</div>
<div class="nav-btn">
    <i class="fi fi-rr-building"></i>
</div>
<div class="nav-btn">
    <i class="fi fi-rr-hamburger-soda"></i>
</div>
<div class="nav-btn">
    <i class="fi fi-rr-messages-question"></i>
</div>
<div class="nav-btn">
    <i class="fi fi-rr-shield-keyhole"></i>
</div>

<div class="Account">
    <div class="accountImg">
        <button>Log Out</button>
    </div>
</div>
</section>

<style>
section {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(230, 230, 230);
    height: 100svh;
    width: 5svw;
    min-width: 4.5svw;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem;
}

.nav-btn {
    align-self: center;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    padding: 0.05rem;
    border-radius: 1rem;
    cursor: pointer;
    transition: background-color 100ms ease-in-out;
}

i{
    font-size: 1.5rem;
    color: #073347;
}

.Account {
    margin-top: auto;
    margin-bottom: 1rem;
}
.nav-btn:hover{
    background-color: rgba(0, 34, 146, 0.37);
}
.active {
    background-color: rgba(0, 164, 175, 0.664);
}
</style>