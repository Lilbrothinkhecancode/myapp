import { writable } from 'svelte/store';
export const IsLoggedIn = writable(false);

const initialUser = {
    id: '', 
  };

  export const user = writable(initialUser);
