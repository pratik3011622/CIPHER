<script lang="ts">
    import { onMount } from "svelte";
    import { 
        Gift, 
        Trophy, 
        AlertTriangle, 
        CheckCircle,
    } from "lucide-svelte";
    import { Input } from "@/components/ui/SignupForm";
    import { sendErrorToast, sendSuccessToast } from "@/lib/toast_utils";

    export let teamBonusPoints: number = 0;

    let activeQuestions: any[] = [];
    let loading = true;
    let submitting: Record<string, boolean> = {};
    let answerInputs: Record<string, string> = {};

    onMount(async () => {
        await refreshBonuses();
    });

    async function refreshBonuses() {
        loading = true;
        try {
            const response = await fetch('/api/bonus');
            if (response.ok) {
                const result = await response.json();
                activeQuestions = result.questions || [];
            }
        } catch (err) {
            console.error('Error refreshing bonuses:', err);
        } finally {
            loading = false;
        }
    }

    async function submitAnswer(questionId: string) {
        const answer = answerInputs[questionId]?.trim();
        
        if (!answer) {
            sendErrorToast("Enter answer", "Please enter your answer");
            return;
        }

        submitting[questionId] = true;
        try {
            const response = await fetch('/api/bonus/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questionId, answer })
            });

            const result = await response.json();

            if (result.correct) {
                if (result.alreadySolved) {
                    sendErrorToast("Check status", result.message);
                } else if (result.alreadySolvedByUs) {
                     sendSuccessToast("Already Solved", "You have already won this bonus!");
                } else {
                    sendSuccessToast("🎉 Correct!", result.message);
                }
                // Refresh to update UI (might hide the question if it's "invisible to others" logic, or show "Solved" state)
                await refreshBonuses();
            } else {
                if (result.gone) {
                    sendErrorToast("Too late!", result.message);
                    await refreshBonuses();
                } else {
                    sendErrorToast("Incorrect", result.message || "Try again!");
                }
            }
        } catch (err) {
            sendErrorToast("Error", "Something went wrong");
        } finally {
            submitting[questionId] = false;
            answerInputs[questionId] = "";
        }
    }
</script>

<div class="bonus-section">
    <!-- Header -->
    <div class="bonus-header">
        <div class="bonus-title">
            <Trophy class="text-yellow-500" size={32} />
            <h2 class="text-2xl font-bold">Bonus Question</h2>
        </div>
        <div class="bonus-points">
            <span class="text-lg">Bonus Points:</span>
            <span class="text-2xl font-bold text-yellow-500">{teamBonusPoints}</span>
        </div>
    </div>

    <!-- Content -->
    <div class="bonus-content">
        {#if loading}
            <div class="flex justify-center py-8">
                <span class="loading loading-spinner loading-lg"></span>
            </div>
        {:else if activeQuestions.length === 0}
            <div class="empty-state">
                <AlertTriangle size={48} class="text-base-content/30 mb-4" />
                <p class="text-lg font-medium text-base-content/70">No active bonus questions right now.</p>
                <p class="text-sm text-base-content/50">Keep an eye out for alerts!</p>
            </div>
        {:else}
            <div class="space-y-6">
                {#each activeQuestions as question (question.id)}
                    <div class="bonus-card" class:solved={question.isSolvedByMe}>
                        <div class="card-header">
                            <h3 class="text-xl font-bold flex items-center gap-2">
                                <Gift class="text-primary" />
                                {question.isSolvedByMe ? "Solved Bonus" : "Active Bonus Challenge"}
                            </h3>
                            <span class="badge badge-lg badge-primary">+{question.points} pts</span>
                        </div>

                        <div class="question-text">
                            {question.question}
                        </div>

                        {#if question.isSolvedByMe}
                            <div class="solved-state">
                                <CheckCircle size={32} class="text-success" />
                                <div>
                                    <p class="font-bold text-success">You solved this!</p>
                                    <p class="text-sm opacity-70">Solved at {new Date(question.solvedAt?._seconds * 1000).toLocaleString()}</p>
                                </div>
                            </div>
                        {:else}
                            <div class="input-group">
                                <Input
                                    id="answer-{question.id}"
                                    placeholder="Enter your answer"
                                    type="text"
                                    bind:value={answerInputs[question.id]}
                                />
                                <button 
                                    class="btn btn-primary"
                                    disabled={submitting[question.id]}
                                    on:click={() => submitAnswer(question.id)}
                                >
                                    {#if submitting[question.id]}
                                        <span class="loading loading-spinner"></span>
                                    {:else}
                                        Submit
                                    {/if}
                                </button>
                            </div>
                            <p class="text-xs text-center mt-2 opacity-60">
                                ⚡ First team to solve wins. Invisible to others once solved.
                            </p>
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .bonus-section {
        @apply bg-base-200 rounded-xl p-6 shadow-lg border border-base-300;
    }

    .bonus-header {
        @apply flex flex-wrap justify-between items-center mb-8 gap-4;
    }

    .bonus-title {
        @apply flex items-center gap-3;
    }

    .bonus-points {
        @apply bg-base-300 px-4 py-2 rounded-lg flex items-center gap-2 shadow-inner;
    }

    .empty-state {
        @apply flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-base-300 rounded-lg;
    }

    .bonus-card {
        @apply bg-base-100 rounded-lg p-6 border-l-4 border-primary shadow-md transition-all;
    }

    .bonus-card.solved {
        @apply border-success bg-success/5;
    }

    .card-header {
        @apply flex justify-between items-start mb-4;
    }

    .question-text {
        @apply text-lg mb-6 font-medium leading-relaxed;
    }

    .solved-state {
        @apply flex items-center gap-3 bg-base-200/50 p-4 rounded-lg;
    }

    .input-group {
        @apply flex gap-3;
    }
    
    .input-group :global(.form-control) {
        @apply w-full;
    }
</style>
