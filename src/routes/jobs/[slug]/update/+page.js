import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

export async function load({ fetch, params }) {
  console.log("params.slug:", params.slug);
  const url = PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`;

  console.log("API URL:", url);
  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`);


  const res = await resp.json();
  if (resp.status == 200) {
    console.log("Data loaded successfully in page.js")
    console.log("Response data:", res);
    return {
      jobs: res,
    }
  } else {
    return {
      jobs: []
    }
  }
}
