<script>
    import { onMount } from 'svelte';
    import "../app.css";
    import { IsLoggedIn } from './stores.js';
    import { logOut } from '../utils/auth.js';
    import { goto } from '$app/navigation';
    import buttonTextColor from './themes.svelte';
    import ThemeToggle from './themes.svelte';


    onMount(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      IsLoggedIn.set(true);
    }
    });

    function navigateToMainPage() {
        goto('/')
    }

    export function navigateToJobSubmission() {
        goto('/jobs/new')
    }

    export function navigateLogOut() {
    logOut();
    localStorage.removeItem('isLoggedIn');
    IsLoggedIn.set(false);
    goto('/users/login');
    }

    export function navigateToLogin() {
    goto('/users/login');
  }

    export function navigateToSignUp() {
    goto('/users/new');
  }
  </script>

  <style>
    .custom-font {
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
  </style>

<div class="main-button">
  <button class="main-button theme-button custom-font" on:click={navigateToMainPage} style="color: {buttonTextColor}"> UNEMPLOYED.COM 🔥💯</button>
</div>

<div>
  <ThemeToggle />
</div>

<div class="button-container theme-button">
  {#if $IsLoggedIn}
  <button class="button theme-button" on:click={navigateToJobSubmission} style="color: {buttonTextColor}">
    Post a Job
  </button>
  
  <button class="button theme-button" on:click={navigateLogOut} style="color: {buttonTextColor}">
    Log Out
  </button>

  {:else}
  <button class="button theme-button" on:click={navigateToSignUp} style="color: {buttonTextColor}">
    Post a Job
  </button>
  
  <button class="button theme-button" on:click={navigateToLogin} style="color: {buttonTextColor}">
    Log In
  </button>
  {/if}
</div>

<slot></slot>