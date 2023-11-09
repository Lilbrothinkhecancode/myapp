<script>
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import { getUserId } from '/src/utils/auth.js';
  import { goto } from '$app/navigation';
  import { Circle } from 'svelte-loading-spinners'

  let isSubmitting = false;
  let RECORD_ID = getUserId();
  let title = '';
  let minAnnualCompensation = 0;
  let maxAnnualCompensation = 0;
  let employer = '';
  let location = '';
  let description = '';
  let requirements = '';
  let applicationInstructions = '';

  let formErrors = {};

  function navigateToMainPage() {
    goto('/');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    isSubmitting = true;

    const data = {
      user: RECORD_ID,
      title: title,
      minAnnualCompensation: minAnnualCompensation,
      maxAnnualCompensation: maxAnnualCompensation,
      employer: employer,
      location: location,
      description: description,
      requirements: requirements,
      applicationInstructions: applicationInstructions
    };

    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      const responseText = await resp.text();
  console.log('Server response:', responseText);

  if (resp.status == 200) {
    const responseJson = JSON.parse(responseText);
  const id = responseJson.id;
  const url = `/jobs/${id}`;
  navigateToMainPage();
  goto(url, { replace: true });
    window.alert('Job Submitted!');
  } else {
    console.error('Submission failed:', resp.status);
    formErrors.general = 'Submission failed. Please try again.';
  }
    }

</script>


  <div class="main-button">
    <button class="main-button theme-button" on:click={navigateToMainPage}> UNEMPLOYED.COM 🔥</button>
  </div>
  
  <style>
    .error-message {
      color: red;
    }
  </style>
  
  <h1 class="text-center text-xl font-bold">Job Submission</h1>
  
  <div class="flex justify-center items-center mt-8">
    <form on:submit={handleSubmit} class="w-1/3">
      <div class="form-control w-full">
        <label class="label" for="title">
          <span class="label-text">Job Title</span>
        </label>
        <input type="text" bind:value={title} required class="input input-bordered w-full" />
      </div>
  
      <div class="form-control w-full">
        <label class="label" for="minAnnualCompensation">
          <span class="label-text">Min Annual Compensation</span>
        </label>
        <input type="number" bind:value={minAnnualCompensation} required class="input input-bordered w-full" />
        <small>USD min. 1000</small>
      </div>
  
      <div class="form-control w-full">
        <label class="label" for="maxAnnualCompensation">
          <span class="label-text">Max Annual Compensation</span>
        </label>
        <input type="number" bind:value={maxAnnualCompensation} required class="input input-bordered w-full" />
        <small>USD min. 1000</small>
      </div>
  
      <div class="form-control w-full">
        <label class="label" for="employer">
          <span class="label-text">Company Name</span>
        </label>
        <input type="text" bind:value={employer} required class="input input-bordered w-full" />
      </div>
  
      <div class="form-control w-full">
        <label class="label" for="location">
          <span class="label-text">Job Location</span>
        </label>
        <input type="text" bind:value={location} required class="input input-bordered w-full" />
      </div>
  
      <div class="form-control w-full">
        <label class="label" for="description">
          <span class="label-text">Description</span>
        </label>
        <textarea bind:value={description} required class="input input-bordered w-full" />
      </div>
  
      <div class="form-control w-full">
        <label class="label" for="requirements">
          <span class="label-text">Requirements</span>
        </label>
        <textarea bind:value={requirements} required class="input input-bordered w-full" />
      </div>
  
      <div class="form-control w-full">
        <label class="label" for="applicationInstructions">
          <span class="label-text">Application Instructions</span>
        </label>
        <textarea bind:value={applicationInstructions} required class="input input-bordered w-full" />
        <small>At least 10 characters</small>
      </div>
  
      {#if formErrors.general}
        <p class="error-message">{formErrors.general}</p>
      {/if}
  
      <div class="form-control w-full mt-4">
        {#if isSubmitting}
          <button class="btn btn-md"><Circle size="30" color="white" unit="px" duration="1s"/>Submit</button>
          {:else}
          <button class="btn btn-md">Submit</button>
          {/if}

      </div>
    </form>
  </div>