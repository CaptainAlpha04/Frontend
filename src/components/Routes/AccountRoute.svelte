<script >
import Toggleswitch from "../uicomponents/toggleswitch.svelte";
let themeState;

const checkToggleState = () => {
    console.log("Hello World")
};

</script>

<main>
    <h1>Account Settings</h1>
    <Toggleswitch on:click = {checkToggleState}/>
</main>

<style>
main {

}
</style>