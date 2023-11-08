<script>
    import { IsLoggedIn } from './stores.js';
    import { getUserId } from '/home/ulyger/html/myapp/src/utils/auth.js';
    import { logOut } from '/home/ulyger/html/myapp/src/utils/auth.js';
    import { goto } from '$app/navigation';
    import buttonTextColor from './themes.svelte';
    import ThemeToggle from './themes.svelte';
    import humanize from 'humanize-plus';
    export let data;

    function navigateToEditPage(id) {
      try {
      goto('/jobs/[records]' + id);
  }   catch (error) {
      console.error('Error:', error);
  }
    }

    function navigateToMainPage() {
        goto('/')
    }
    
    function navigateToJobSubmission() {
        goto('jobs/new')
    }

    function navigateLogOut() {
    logOut();
    IsLoggedIn.set(false);
    console.log('Log Out button clicked');
    goto('users/login');
  }

    function navigateToLogin() {
    goto('users/login');
  }

    function navigateToSignUp() {
    goto('users/new');
  }
  </script>
  
  <div>
    <ThemeToggle />
  </div>

  <div class="main-button">
    <button class="main-button theme-button" on:click={navigateToMainPage} style="color: {buttonTextColor}"> UNEMPLOYED.COM 🔥</button>
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
  

  <h1 class="text-center text-xl font-bold">Find Your Next Job</h1>
  
  <div class="overflow-x-auto w-full">
    {#each data.jobs as job}
      <div class="flex flex-col mt-10">
        <div>
          <a class="font-bold text-2xl" href="/jobs/{job.id}">{job.title}</a>
          <div class="text-sm mt-1">
            {job.employer} . {job.location} .
            <span class="text-sm">USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(job.maxAnnualCompensation)}</span>
          </div>
          <div class="italic text-xs opacity-50 mt-2"
            >posted {new Date(job.created).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</div
          >
        </div>
  
        <div class="mt-4 ">
          {job.description.slice(0, 240)}...
        </div>
        {#if $IsLoggedIn && job.user === getUserId()}
      <button on:click={() => navigateToEditPage(job.id)}>
        Edit
      </button>
    {/if}
      </div>
    {/each}
  </div>
  