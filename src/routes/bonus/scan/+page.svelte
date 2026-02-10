<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { Loader2, AlertTriangle, CheckCircle, Search } from 'lucide-svelte';

    let loading = true;
    let error: string | null = null;
    let clue: string | null = null;
    let solved = false;

    onMount(async () => {
        const token = $page.url.searchParams.get('token');
        
        if (!token) {
            error = "Invalid QR Code: No token found.";
            loading = false;
            return;
        }

        try {
            const res = await fetch(`/api/bonus/clue?token=${token}`);
            const data = await res.json();

            if (res.ok) {
                clue = data.clue;
            } else {
                if (res.status === 410) { // Gone / Solved
                    solved = true;
                    error = data.error;
                } else {
                    error = data.error || "Failed to load clue.";
                }
            }
        } catch (e) {
            console.error(e);
            error = "Connection error. Please try again.";
        } finally {
            loading = false;
        }
    });
</script>

<div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
        <div class="card-body items-center text-center">
            
            {#if loading}
                <Loader2 class="h-12 w-12 animate-spin text-primary mb-4" />
                <h2 class="card-title">Scanning...</h2>
                <p>Deciphering the QR code...</p>
            {:else if error}
                {#if solved}
                    <CheckCircle class="h-16 w-16 text-success mb-4" />
                    <h2 class="card-title text-success">Already Solved!</h2>
                    <p class="text-lg">{error}</p>
                    <div class="card-actions mt-6">
                        <a href="/" class="btn btn-primary">Go to Dashboard</a>
                    </div>
                {:else}
                    <AlertTriangle class="h-16 w-16 text-error mb-4" />
                    <h2 class="card-title text-error">Access Denied</h2>
                    <p class="text-lg">{error}</p>
                    <div class="card-actions mt-6">
                        <a href="/" class="btn btn-ghost">Go Back</a>
                    </div>
                {/if}
            {:else if clue}
                <Search class="h-16 w-16 text-primary mb-4" />
                <h2 class="card-title text-2xl mb-2">Clue Discovered!</h2>
                
                <div class="bg-base-200 p-6 rounded-lg w-full mb-4 border-l-4 border-primary">
                    <p class="text-xl font-mono">{clue}</p>
                </div>

                <p class="opacity-70 mb-6">
                    Use this clue to solve the active bonus question in your dashboard.
                </p>

                <div class="card-actions">
                    <a href="/" class="btn btn-primary w-full">Go to Dashboard</a>
                </div>
            {/if}

        </div>
    </div>
</div>
