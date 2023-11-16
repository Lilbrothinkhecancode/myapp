<script>
    import { onMount } from 'svelte';
    import { IsLoggedIn } from '../utils/stores.js';
    import humanize from 'humanize-plus';
    export let data;
    console.log(data.jobs);

    onMount(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      IsLoggedIn.set(true);
    }
    });
    
    function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    do {
        color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    } while (isLightColor(color));
    return color;
    }

    function isLightColor(color) {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
    }
</script>
  
  <h1 class="text-center text-xl font-bold">Find Your Next Job!</h1>

<style>
    .card {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 10px;
      margin: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.15);
    }

    .card a:hover {
      background-color: grey
    }
</style>
  
<div class="overflow-x-auto w-full" style="margin-top: 20px">
    {#each data.jobs as job}
      <div class="card first-letter:flex flex-col mt-10" style="background-color: {getRandomColor()}">
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
      </div>
    {/each}
  </div>
  