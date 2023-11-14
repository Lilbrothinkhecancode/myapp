<script>
  import { authenticateUser } from '/src/utils/auth.js';
  import { IsLoggedIn } from '../../stores.js';
  import { goto } from '$app/navigation';
  import { Circle } from 'svelte-loading-spinners';

  let username = '';
  let password = '';
  let error = '';
  let isSubmitting = false;

  async function handleLogin() {
    isSubmitting = true;

  const result = await authenticateUser(username, password);

    if (result.success) {
      IsLoggedIn.set(true);
      localStorage.setItem('isLoggedIn', 'true');
      console.log('Login successful');
      window.alert('Login succesful!');
      goto('/');
    } else {
      console.log('Login failed');
      error = 'Invalid credentials. Please try again.';
    }

    isSubmitting = false;
  }
</script>

<h1 class="text-center text-xl font-bold">Login</h1>

<div class="flex justify-center items-center mt-8">
  <form on:submit={handleLogin} class="w-1/3">
    <div class="form-control w-full">
      <label class="label" for="username">
        <span class="label-text">Username</span>
      </label>
      <input type="text" name="username" bind:value={username} required class="input input-bordered w-full" />
    </div>

    <div class="form-control w-full">
      <label class="label" for="password">
        <span class="label-text">Password</span>
      </label>
      <input type="password" name="password" bind:value={password} required class="input input-bordered w-full" />
    </div>

    {#if error}
      <p class="text-red-500">{error}</p>
    {/if}

    <div class="form-control w-full mt-4">
      {#if isSubmitting}
      <button class="btn btn-md"><Circle size="30" color="white" unit="px" duration="1s"/>Log In</button>
      {:else}
        <button class="btn btn-md">Log In</button>
      {/if}
    </div>
  </form>
</div>
