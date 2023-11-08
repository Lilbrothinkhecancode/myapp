<script>
  let job;
  let id;
  
  import { onMount } from 'svelte';
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import { getTokenFromLocalStorage } from '/home/ulyger/html/myapp/src/utils/auth.js';
  import { goto } from '$app/navigation';

  onMount(async () => {
  id = '1fk4suwttvs6osb';
  const resp = await fetch(`${PUBLIC_BACKEND_BASE_URL}/api/collections/jobs/records/${id}`);
  if (!resp.ok) {
    
    console.error('Failed to fetch job:', resp.status);
    return;
  }
  job = await resp.json();
});

  let title = job?.title;
  let minAnnualCompensation = job?.minAnnualCompensation;
  let maxAnnualCompensation = job?.maxAnnualCompensation;
  let employer = job?.employer;
  let location = job?.location;
  let description = job?.description;
  let requirements = job?.requirements;
  let applicationInstructions = job?.applicationInstructions;

  async function handleEdit(event) {
    event.preventDefault();

    const data = {
      title: title,
      minAnnualCompensation: minAnnualCompensation,
      maxAnnualCompensation: maxAnnualCompensation,
      employer: employer,
      location: location,
      description: description,
      requirements: requirements,
      applicationInstructions: applicationInstructions
    };

    const resp = await fetch(`${PUBLIC_BACKEND_BASE_URL}/api/collections/jobs/records/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': getTokenFromLocalStorage() 
      },
      body: JSON.stringify(data),
    });

    console.log('Server response:', resp);

    if (resp.ok) {
      console.log('Job data:', job);
      goto(`/jobs/${id}`);
    } else {
      console.error('Update failed:', resp.status);
    }
  }
</script>
    
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
    
    
        <div class="form-control w-full mt-4">
            <button class="btn btn-md">Submit</button>
            
  
        </div>
      </form>
    </div>