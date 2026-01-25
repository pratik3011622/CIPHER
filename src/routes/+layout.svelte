<script lang="ts">
    import "../app.css"
    import {ToastContainer,BootstrapToast} from "svelte-toasts";
    import {auth,db,storage } from '$lib/firebase';
    import {FirebaseApp, } from "sveltefire";
    import {ArrowUpRight,Disc,Sun,Moon} from "lucide-svelte";
    import {page} from '$app/stores';
    import { mode } from "mode-watcher";
    import { onMount } from "svelte";
    export let data;

    onMount(() => {
        const updateTheme = () => {
            document.documentElement.setAttribute('data-theme', $mode === 'dark' ? 'dark' : 'sunset');
            document.documentElement.classList.toggle('dark', $mode === 'dark');
        };
        updateTheme();
        return mode.subscribe(updateTheme);
    });
</script>

<FirebaseApp {auth} firestore={db} {storage}>
    <ToastContainer let:data={data}>
        <BootstrapToast {data} />
    </ToastContainer>
{#if ["/","/leaderboard","/team"].includes($page.url.pathname)}
<div class="navbar">
    <a class="btn btn-ghost text-md" class:text-primary={$page.url.pathname==="/"} href="/"><ArrowUpRight/> Home</a>
    <a class="btn btn-ghost text-md" class:text-primary={$page.url.pathname==="/leaderboard"} href="/leaderboard"><ArrowUpRight/> Leaderboard</a>
    {#if ![undefined,null].includes(data.userTeam)}<a class="btn btn-ghost text-md" class:text-primary={$page.url.pathname==="/team"} href="/team"><ArrowUpRight/> Team</a>{/if}
    {#if data.banned === false && ![undefined,null].includes(data.userTeam)}<a class="btn btn-ghost text-md" href="/play"><Disc /> Play</a>{/if}
    {#if data.userID}<button class="btn btn-ghost text-md" on:click={async () => { await fetch('/api/auth', { method: 'DELETE' }); window.location.href = '/'; }}>Logout</button>{/if}
</div>
{/if}
{#if ["/ready"].includes($page.url.pathname)}
    <div class="navbar z-1000">
        <a class="btn btn-ghost text-md" class:text-primary={$page.url.pathname==="/"} href="/"><ArrowUpRight/> Home</a>
    </div>
    {/if}
<slot />
</FirebaseApp>
