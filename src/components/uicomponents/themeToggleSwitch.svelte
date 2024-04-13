<script>
import { onMount } from 'svelte';
import {darkTheme} from '../../themeStore.js';

let stateManager = localStorage.getItem('darkTheme') === "true" ? true : false;

darkTheme.subscribe(value => {
  stateManager = value;
});

onMount(() => {
  const storedValue = localStorage.getItem('darkTheme');
  stateManager = storedValue === "true" ? true : false;
});

$: {
  localStorage.setItem('darkTheme', stateManager ? "true" : "false");
  darkTheme.set(stateManager);
}
</script>

<main>
<label class="switch">
    <input type="checkbox" bind:checked={stateManager}>
    <span class="slider round"></span>
  </label>
</main>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--tertiary-accent-color);
  ;
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--tertiary-accent-color);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>