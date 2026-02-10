<script lang="ts">
    import { onMount } from "svelte";
    import BonusSection from "@/lib/components/BonusSection.svelte";
    import { ArrowLeft } from "lucide-svelte";
    import { page } from "$app/stores";

    let bonusCodes: any[] = [];
    let timeLockedBonuses: any[] = [];
    let qrBonuses: any[] = [];
    let teamBonusPoints = 0;
    let loading = true;

    onMount(async () => {
        await loadBonuses();
        await loadTeamBonusPoints();
        loading = false;
    });

    async function loadBonuses() {
        try {
            const response = await fetch('/api/bonus');
            if (response.ok) {
                const result = await response.json();
                bonusCodes = result.bonusCodes || [];
                timeLockedBonuses = result.timeLockedBonuses || [];
                qrBonuses = result.qrBonuses || [];
            }
        } catch (err) {
            console.error('Error loading bonuses:', err);
        }
    }

    async function loadTeamBonusPoints() {
        try {
            const response = await fetch('/api/team');
            if (response.ok) {
                const result = await response.json();
                teamBonusPoints = result.total_bonus_points || 0;
            }
        } catch (err) {
            console.error('Error loading team data:', err);
        }
    }
</script>

<div class="min-h-screen bg-base-200 p-4">
    <div class="max-w-4xl mx-auto">
        <a href="/play" class="btn btn-ghost mb-4">
            <ArrowLeft /> Back to Game
        </a>

        <h1 class="text-3xl font-bold text-center mb-6">🎁 Bonus Features</h1>

        {#if loading}
            <div class="flex justify-center p-8">
                <span class="loading loading-spinner loading-lg"></span>
            </div>
        {:else}
            <BonusSection 
                {bonusCodes}
                {timeLockedBonuses}
                {qrBonuses}
                {teamBonusPoints}
            />
        {/if}
    </div>
</div>
