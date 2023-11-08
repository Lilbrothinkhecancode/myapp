<script>
    export let id;
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { getUserId } from '/home/ulyger/html/myapp/src/utils/auth.js';

    let jobId;
  let user;
  let title;
  let minAnnualCompensation;
  let maxAnnualCompensation;
  let employer;
  let location;
  let description;
  let requirements;
  let applicationInstructions;

  onMount(async () => {
    jobId = $params.jobId;

    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${jobId}`);
    const job = await resp.json();

    user = job.user;
    title = job.title;
    minAnnualCompensation = job.minAnnualCompensation;
    maxAnnualCompensation = job.maxAnnualCompensation;
    employer = job.employer;
    location = job.location;
    description = job.description;
    requirements = job.requirements;
    applicationInstructions = job.applicationInstructions;
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const currentUserId = getUserId();
    if (currentUserId !== user) {
      console.error('You can only edit your own submissions.');
      return;
    }

    const data = {
      title,
      minAnnualCompensation,
      maxAnnualCompensation,
      employer,
      location,
      description,
      requirements,
      applicationInstructions
    };

    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${jobId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (resp.ok) {
      goto(`/jobs/${jobId}`);
    } else {
      console.error('Update failed:', resp.status);
    }
  }
</script>
  
    <style>
      .error-message {
        color: red;
      }
    </style>
    
    <h1 class="text-center text-xl font-bold">Job Submission</h1>
    
    <div class="flex justify-center items-center mt-8">
      <form on:submit={handleEdit} class="w-1/3">
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