// lib/stores/user.ts
import { writable } from 'svelte/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '$lib/firebase';

import type { User } from 'firebase/auth';

export const user = writable<User | null>(null);
onAuthStateChanged(auth, (u) => user.set(u));
