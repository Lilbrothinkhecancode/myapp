<script>
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import { getTokenFromLocalStorage } from '/src/utils/auth.js';
  import { goto } from '$app/navigation';
  export let data;
  console.log(data.jobs.id);

  let id = data.jobs.id;
  let title = data.jobs.title;
  let minAnnualCompensation = data.jobs.minAnnualCompensation;
  let maxAnnualCompensation = data.jobs.maxAnnualCompensation;
  let employer = data.jobs.employer;
  let location = data.jobs.location;
  let description = data.jobs.description;
  let requirements = data.jobs.requirements;
  let applicationInstructions = data.jobs.applicationInstructions;

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
      goto(`/`);
    } else {
      console.error('Update failed:', resp.status);
    }
  }
</script>

    
    <h1 class="text-center text-xl font-bold">Job Submission</h1>
    
    <div class="flex justify-center items-center min-h-screen">
      <form on:submit={handleEdit} class="w-1/3">
        <div class="form-control w-full">
          <label class="label" for="title">
            <span>Job Title</span>
          </label>
          <input type="text" bind:value={title} required class="input input-bordered w-full" />
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="minAnnualCompensation">
            <span>Min Annual Compensation</span>
          </label>
          <input type="number" bind:value={minAnnualCompensation} required class="input input-bordered w-full" />
          <small>USD min. 1000</small>
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="maxAnnualCompensation">
            <span>Max Annual Compensation</span>
          </label>
          <input type="number" bind:value={maxAnnualCompensation} required class="input input-bordered w-full" />
          <small>USD min. 1000</small>
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="employer">
            <span>Company Name</span>
          </label>
          <input type="text" bind:value={employer} required class="input input-bordered w-full" />
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="location">
            <span>Job Location</span>
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
            <span>Requirements</span>
          </label>
          <textarea bind:value={requirements} required class="input input-bordered w-full" />
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="applicationInstructions">
            <span>Application Instructions</span>
          </label>
          <textarea bind:value={applicationInstructions} required class="input input-bordered w-full" />
          <small>At least 10 characters</small>
        </div>
    
    
        <div class="form-control w-full mt-4">
            <button class="btn btn-md">Submit</button>
        </div>
      </form>
    </div>