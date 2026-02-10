<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { Search, AlertTriangle, ArrowLeft } from "lucide-svelte";
    
    let loading = true;
    let error = "";
    let data: any = null;
    
    onMount(async () => {
        const token = $page.url.searchParams.get("token");
        
        if (!token) {
            error = "Invalid QR Code URL";
            loading = false;
            return;
        }

        try {
            const res = await fetch(`/api/bonus/clue?token=${token}`);
            const result = await res.json();
            
            if (res.ok) {
                data = result;
            } else {
                error = result.error || "Failed to load clue";
            }
        } catch (err) {
            error = "Something went wrong";
        } finally {
            loading = false;
        }
    });
</script>

<div class="min-h-screen bg-base-300 flex items-center justify-center p-4">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
        <div class="card-body items-center text-center">
            
            {#if loading}
                <span class="loading loading-spinner loading-lg text-primary"></span>
                <p>Decoding Clue...</p>
            {:else if error}
                <AlertTriangle size={64} class="text-error mb-4" />
                <h2 class="card-title text-error">Access Denied</h2>
                <p>{error}</p>
                <div class="card-actions mt-4">
                    <a href="/play" class="btn btn-outline btn-sm gap-2">
                        <ArrowLeft size={16} />
                        Back to Game
                    </a>
                </div>
            {:else if data}
                <Search size={64} class="text-primary mb-4" />
                <h2 class="card-title text-2xl font-bold mb-2">You found a clue!</h2>
                
                <div class="bg-base-200 p-6 rounded-lg my-4 w-full border-2 border-primary border-dashed">
                    <p class="text-xl italic font-serif">
                        "{data.clue}"
                    </p>
                </div>
                
                <div class="alert alert-info shadow-sm text-sm">
                    <p>Use this clue to answer the Bonus Question!</p>
                </div>

                <div class="card-actions mt-6">
                    <a href="/play" class="btn btn-primary btn-wide">
                        Go to Bonus Question
                    </a>
                </div>
            {/if}
        </div>
    </div>
</div>
