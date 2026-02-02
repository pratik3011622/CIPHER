<script lang="ts">
    import { onDestroy } from "svelte";
    import { 
        Gift, 
        Clock, 
        MapPin, 
        CheckCircle, 
        XCircle, 
        Trophy,
        AlertTriangle,
        RefreshCw,
        QrCode,
        Camera
    } from "lucide-svelte";
    import { Input } from "@/components/ui/SignupForm";
    import { sendErrorToast, sendSuccessToast } from "@/lib/toast_utils";

    export let bonusCodes: any[] = [];
    export let timeLockedBonuses: any[] = [];
    export let qrBonuses: any[] = [];
    export let teamBonusPoints: number = 0;

    let activeTab: 'codes' | 'timelocked' | 'qr' = 'codes';
    let codeInput = "";
    let timeBonusInput: Record<string, string> = {};
    let submitting = false;
    let submittingTimeBonus: Record<string, boolean> = {};

    // Countdown timer state
    let countdownIntervals: Record<string, any> = {};
    let countdowns: Record<string, string> = {};
    let qrCountdowns: Record<string, string> = {};

    function formatTimeRemaining(releaseTime: string): string {
        const now = new Date();
        const release = new Date(releaseTime);
        const diff = release.getTime() - now.getTime();
        
        if (diff <= 0) return "Active!";
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        return `${hours}h ${minutes}m ${seconds}s`;
    }

    function startCountdown(bonusId: string, releaseTime: string) {
        if (countdownIntervals[bonusId]) return;
        
        const updateCountdown = () => {
            countdowns[bonusId] = formatTimeRemaining(releaseTime);
        };
        
        updateCountdown();
        countdownIntervals[bonusId] = setInterval(updateCountdown, 1000);
    }

    function startQRCountdown(bonusId: string, endTime: string) {
        if (countdownIntervals[`qr_${bonusId}`]) return;
        
        const updateCountdown = () => {
            const now = new Date();
            const end = new Date(endTime);
            const diff = end.getTime() - now.getTime();
            
            if (diff <= 0) {
                qrCountdowns[bonusId] = "Expired";
                return;
            }
            
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            qrCountdowns[bonusId] = `${hours}h ${minutes}m ${seconds}s`;
        };
        
        updateCountdown();
        countdownIntervals[`qr_${bonusId}`] = setInterval(updateCountdown, 1000);
    }

    function stopCountdown(bonusId: string) {
        if (countdownIntervals[bonusId]) {
            clearInterval(countdownIntervals[bonusId]);
            delete countdownIntervals[bonusId];
        }
    }

    $: {
        timeLockedBonuses.forEach(bonus => {
            if (!bonus.isReleased && !bonus.isWon && !bonus.isExpired) {
                startCountdown(bonus.id, bonus.release_time);
            }
        });
        
        qrBonuses.forEach(bonus => {
            if (!bonus.isExpired && !bonus.isClaimed) {
                startQRCountdown(bonus.id, bonus.stage_end_time);
            }
        });
    }

    async function submitBonusCode() {
        if (!codeInput.trim()) {
            sendErrorToast("Enter a code", "Please enter the code you found");
            return;
        }

        submitting = true;
        try {
            const response = await fetch('/api/bonus/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: codeInput })
            });

            const result = await response.json();

            if (result.correct) {
                if (result.alreadyClaimed) {
                    sendErrorToast("Already claimed", result.message);
                } else {
                    sendSuccessToast("Bonus claimed!", `+${result.points} points!`);
                    await refreshBonuses();
                }
            } else {
                sendErrorToast("Invalid code", result.message || "Try again!");
            }
        } catch (err) {
            sendErrorToast("Error", "Something went wrong");
        } finally {
            submitting = false;
            codeInput = "";
        }
    }

    async function submitTimeBonus(bonusId: string, bonus: any) {
        const answer = timeBonusInput[bonusId]?.trim();
        if (!answer) {
            sendErrorToast("Enter answer", "Please enter your answer");
            return;
        }

        submittingTimeBonus[bonusId] = true;
        try {
            const response = await fetch('/api/time-bonus/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bonusId, answer })
            });

            const result = await response.json();

            if (result.correct) {
                sendSuccessToast("🎉 You won!", `+${result.points} points! Lightning fast!`);
                await refreshBonuses();
            } else {
                if (result.alreadyClaimed) {
                    sendErrorToast("Too slow!", "Another team was faster!");
                } else {
                    sendErrorToast("Wrong answer", result.message || "Try again!");
                }
            }
        } catch (err) {
            sendErrorToast("Error", "Something went wrong");
        } finally {
            submittingTimeBonus[bonusId] = false;
            timeBonusInput[bonusId] = "";
        }
    }

    async function refreshBonuses() {
        try {
            const response = await fetch('/api/bonus');
            const result = await response.json();
            bonusCodes = result.bonusCodes || [];
            timeLockedBonuses = result.timeLockedBonuses || [];
            qrBonuses = result.qrBonuses || [];
        } catch (err) {
            console.error('Error refreshing bonuses:', err);
        }
    }

    function handleQRClaim(qrBonus: any) {
        if (qrBonus.token) {
            window.location.href = `/api/qr-bonus/claim?token=${qrBonus.token}`;
        }
    }

    onDestroy(() => {
        Object.keys(countdownIntervals).forEach(key => {
            if (countdownIntervals[key]) {
                clearInterval(countdownIntervals[key]);
            }
        });
    });
</script>

<div class="bonus-section">
    <!-- Header -->
    <div class="bonus-header">
        <div class="bonus-title">
            <Trophy class="text-yellow-500" size={32} />
            <h2 class="text-2xl font-bold">Bonus Stages</h2>
        </div>
        <div class="bonus-points">
            <span class="text-lg">Bonus Points:</span>
            <span class="text-2xl font-bold text-yellow-500">{teamBonusPoints}</span>
        </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
        <button 
            class="tab-btn" 
            class:active={activeTab === 'codes'}
            on:click={() => activeTab = 'codes'}
        >
            <MapPin size={20} />
            Campus Codes
        </button>
        <button 
            class="tab-btn" 
            class:active={activeTab === 'timelocked'}
            on:click={() => activeTab = 'timelocked'}
        >
            <Clock size={20} />
            Time-Locked
        </button>
        <button 
            class="tab-btn" 
            class:active={activeTab === 'qr'}
            on:click={() => activeTab = 'qr'}
        >
            <QrCode size={20} />
            QR Codes
        </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
        {#if activeTab === 'codes'}
            <!-- Code Input -->
            <div class="code-input-section">
                <Input
                    id="bonusCode"
                    placeholder="Enter campus code (e.g., CS-9X4A)"
                    type="text"
                    bind:value={codeInput}
                    onInput={(e) => {
                        codeInput = e.target.value.toUpperCase();
                        e.target.value = codeInput;
                    }}
                />
                <button 
                    class="btn btn-primary btn-wide" 
                    disabled={submitting}
                    on:click={submitBonusCode}
                >
                    {#if submitting}
                        <span class="loading loading-spinner"></span>
                    {:else}
                        <Gift size={20} />
                        Submit Code
                    {/if}
                </button>
            </div>

            <!-- Bonus Codes List -->
            <div class="bonus-list">
                {#if bonusCodes.length === 0}
                    <div class="empty-state">
                        <AlertTriangle size={48} class="text-warning" />
                        <p>No active bonus codes yet. Check your clues!</p>
                    </div>
                {:else}
                    {#each bonusCodes as bonus}
                        <div class="bonus-card" class:claimed={bonus.isClaimed}>
                            <div class="bonus-card-header">
                                <MapPin size={24} class="text-primary" />
                                <span class="font-bold">Code: {bonus.code}</span>
                                {#if bonus.isClaimed}
                                    <CheckCircle size={24} class="text-success" />
                                {:else}
                                    <XCircle size={24} class="text-error" />
                                {/if}
                            </div>
                            <p class="bonus-clue">{bonus.clue}</p>
                            <div class="bonus-footer">
                                <span class="badge badge-primary">+{bonus.points} pts</span>
                            </div>
                        </div>
                    {/each}
                {/if}
            </div>

        {:else if activeTab === 'timelocked'}
            <!-- Time-Locked Bonuses -->
            <div class="bonus-list">
                {#if timeLockedBonuses.length === 0}
                    <div class="empty-state">
                        <Clock size={48} class="text-info" />
                        <p>No time-locked bonuses scheduled yet.</p>
                    </div>
                {:else}
                    {#each timeLockedBonuses as bonus}
                        <div class="bonus-card" class:claimed={bonus.isCompleted} class:locked={!bonus.isReleased}>
                            <div class="bonus-card-header">
                                <Clock size={24} class="text-info" />
                                <span class="font-bold">Time-Locked Bonus</span>
                                {#if bonus.isCompleted}
                                    <CheckCircle size={24} class="text-success" />
                                {:else if bonus.isWon}
                                    <XCircle size={24} class="text-warning" />
                                {:else if bonus.isExpired}
                                    <XCircle size={24} class="text-error" />
                                {:else}
                                    <Clock size={24} class="text-info" />
                                {/if}
                            </div>

                            {#if bonus.isReleased && !bonus.isExpired && !bonus.isWon && !bonus.isCompleted}
                                <!-- Active time-locked bonus -->
                                <p class="bonus-question">{bonus.question}</p>
                                <div class="time-input-section">
                                    <Input
                                        id="timeBonus-{bonus.id}"
                                        placeholder="Enter your answer..."
                                        type="text"
                                        bind:value={timeBonusInput[bonus.id]}
                                    />
                                    <button 
                                        class="btn btn-primary" 
                                        disabled={submittingTimeBonus[bonus.id]}
                                        on:click={() => submitTimeBonus(bonus.id, bonus)}
                                    >
                                        {#if submittingTimeBonus[bonus.id]}
                                            <span class="loading loading-spinner"></span>
                                        {:else}
                                            Submit
                                        {/if}
                                    </button>
                                </div>
                                <div class="bonus-footer">
                                    <span class="badge badge-warning">
                                        ⚡ First correct wins +{bonus.points} pts
                                    </span>
                                </div>
                            {:else if !bonus.isReleased}
                                <!-- Not yet released -->
                                <p class="bonus-question">{bonus.question}</p>
                                <div class="countdown">
                                    <RefreshCw size={20} class="animate-spin" />
                                    <span>Releases in: <strong>{countdowns[bonus.id] || 'Loading...'}</strong></span>
                                </div>
                                <div class="bonus-footer">
                                    <span class="badge badge-info">
                                        {bonus.duration_minutes} min window
                                    </span>
                                </div>
                            {:else if bonus.isWon}
                                <p class="bonus-status">🎉 Won by another team!</p>
                            {:else if bonus.isExpired}
                                <p class="bonus-status">⏰ Bonus expired!</p>
                            {:else if bonus.isCompleted}
                                <p class="bonus-status">✅ You completed this!</p>
                            {/if}
                        </div>
                    {/each}
                {/if}
            </div>

        {:else}
            <!-- QR Bonuses -->
            <div class="bonus-list">
                {#if qrBonuses.length === 0}
                    <div class="empty-state">
                        <QrCode size={48} class="text-primary" />
                        <p>No QR bonuses available. Check back later!</p>
                    </div>
                {:else}
                    {#each qrBonuses as qr}
                        <div class="bonus-card qr-card" 
                             class:claimed={qr.isClaimedByTeam} 
                             class:active={qr.isActive}
                             class:expired={qr.isExpired}>
                            
                            <div class="bonus-card-header">
                                <QrCode size={24} class="text-primary" />
                                <span class="font-bold">{qr.title}</span>
                                {#if qr.isClaimedByTeam}
                                    <CheckCircle size={24} class="text-success" />
                                {:else if qr.isClaimed}
                                    <XCircle size={24} class="text-warning" />
                                {:else if qr.isExpired}
                                    <XCircle size={24} class="text-error" />
                                {:else if qr.isActive}
                                    <Camera size={24} class="text-success" />
                                {:else}
                                    <Clock size={24} class="text-info" />
                                {/if}
                            </div>
                            
                            <p class="bonus-description">{qr.description}</p>
                            
                            {#if qr.location_hint}
                                <p class="location-hint">📍 {qr.location_hint}</p>
                            {/if}

                            {#if qr.isActive && !qr.isClaimed && !qr.isClaimedByTeam}
                                <button 
                                    class="btn btn-primary btn-wide mt-3"
                                    on:click={() => handleQRClaim(qr)}
                                >
                                    <Camera size={20} />
                                    Scan QR to Claim
                                </button>
                            {:else if !qr.isActive && !qr.isExpired && !qr.isClaimed}
                                <div class="countdown">
                                    <Clock size={20} />
                                    <span>Active in: <strong>{qrCountdowns[qr.id] || 'Loading...'}</strong></span>
                                </div>
                            {:else if qr.isClaimedByTeam}
                                <div class="bonus-footer">
                                    <span class="badge badge-success">✅ Claimed by You! +{qr.points} pts</span>
                                </div>
                            {:else if qr.isClaimed}
                                <p class="bonus-status">🎯 Claimed by another team!</p>
                            {:else if qr.isExpired}
                                <p class="bonus-status">⏰ This QR bonus has expired!</p>
                            {/if}

                            <div class="bonus-footer">
                                <span class="badge badge-primary">+{qr.points} pts</span>
                            </div>
                        </div>
                    {/each}
                {/if}
            </div>
        {/if}
    </div>
</div>

<style>
    .bonus-section {
        @apply bg-base-200 rounded-lg p-6 mt-6;
    }

    .bonus-header {
        @apply flex justify-between items-center mb-6;
    }

    .bonus-title {
        @apply flex items-center gap-3;
    }

    .bonus-points {
        @apply bg-base-300 px-4 py-2 rounded-lg flex items-center gap-2;
    }

    .tabs {
        @apply flex gap-2 mb-4;
    }

    .tab-btn {
        @apply btn btn-outline flex items-center gap-2;
    }

    .tab-btn.active {
        @apply btn-primary;
    }

    .tab-content {
        @apply min-h-[300px];
    }

    .code-input-section {
        @apply flex flex-col gap-4 mb-6;
    }

    .bonus-list {
        @apply space-y-4;
    }

    .bonus-card {
        @apply bg-base-100 rounded-lg p-4 border-2 border-base-300;
    }

    .bonus-card.claimed {
        @apply opacity-60;
    }

    .bonus-card.locked {
        @apply border-info;
    }

    .bonus-card.active {
        @apply border-success bg-success/5;
    }

    .bonus-card.expired {
        @apply border-error opacity-50;
    }

    .bonus-card.qr-card {
        @apply border-primary;
    }

    .bonus-card-header {
        @apply flex items-center gap-3 mb-2;
    }

    .bonus-clue {
        @apply text-base-content/80 mb-3;
    }

    .bonus-description {
        @apply text-base-content/90 mb-2;
    }

    .location-hint {
        @apply text-sm text-base-content/70 mb-3 italic;
    }

    .bonus-question {
        @apply font-medium text-lg mb-3;
    }

    .bonus-status {
        @apply text-center py-2 text-warning;
    }

    .bonus-footer {
        @apply mt-3 flex justify-end;
    }

    .time-input-section {
        @apply flex gap-2 mt-2;
    }

    .time-input-section :global(input) {
        @apply flex-1;
    }

    .countdown {
        @apply flex items-center gap-2 py-3 text-info;
    }

    .empty-state {
        @apply flex flex-col items-center justify-center py-12 text-center;
    }

    .empty-state p {
        @apply mt-4 text-base-content/70;
    }

    .animate-spin {
        @apply inline-block;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>
