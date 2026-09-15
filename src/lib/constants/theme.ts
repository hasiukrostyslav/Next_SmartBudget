// Plain module (no 'use client'), so the root layout can inline the script
// string: importing a value from a client module in a Server Component yields
// a client reference, not the value.

export const THEME_STORAGE_KEY = 'theme';

// Runs before first paint. A stored explicit choice wins; otherwise the OS
// preference decides. Nothing is written here, so an untouched setting keeps
// following the OS.
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}})();`;
