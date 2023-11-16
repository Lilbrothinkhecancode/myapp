<script>
    import { onMount } from 'svelte';
    import "../app.css";
    import { IsLoggedIn } from '../utils/stores.js';
    import { logOut } from '../utils/auth.js';
    import { goto } from '$app/navigation';
    import { themeChange } from 'theme-change'


    onMount(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      IsLoggedIn.set(true);
    }
    });

    onMount(() => {
  themeChange(false)
})

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

<div class="top-bar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
  <div class="main-button">
    <button class="main-button theme-button custom-font" on:click={navigateToMainPage} style="font-size: 30px; margin-left: 20px;">
      unemployed.com</button>
  </div>

  <div class="button-container" style="display: flex; margin-top: 20px; font-size: 18px">
    {#if $IsLoggedIn}
    <button class="button" on:click={navigateToJobSubmission} style="margin-right: 40px;">
      Post a Job
    </button>
    
    <button class="button" on:click={navigateLogOut} style="margin-right: 40px;">
      Log Out
    </button>

    {:else}
    <button class="button" on:click={navigateToSignUp} style="margin-right: 40px;">
      Post a Job
    </button>
    
    <button class="button" on:click={navigateToLogin} style="margin-right: 40px;">
      Log In
    </button>
    {/if}
  </div>
</div>


<div class="theme-switcher" style="display: flex; align-items: right; margin-left: 1340px">
  🌚
  <div class="inline-block w-10">
    <span data-toggle-theme="white" data-act-class="pl-4" class="border rounded-full border-black flex items-center cursor-pointer w-10 transition-all duration-300 ease-in-out pl-0">
      <span class="rounded-full w-3 h-3 m-1 bg-black">
      </span>
    </span>
  </div>
  🌞
</div>
<slot></slot>