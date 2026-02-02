<script lang="ts">
    // @svelte-ignore unknownProp
    import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
    import { Button } from "@/components/ui/MovingBorder";
    import { LampEffect } from "@/components/ui/LampEffect";
    import Countdown from "svelte-countdown/src/index.js";
    import { onMount } from "svelte";
    import { Trophy, Users, Zap, Target } from "lucide-svelte";

    let leaderboard = [
        { teamName: 'Tech Wizards', score: 950, members: 4 },
        { teamName: 'Code Crusaders', score: 920, members: 3 },
        { teamName: 'Puzzle Masters', score: 880, members: 4 },
        { teamName: 'Logic Lords', score: 850, members: 2 },
        { teamName: 'Brain Busters', score: 820, members: 3 }
    ];
</script>

<title>Cipher Saga 3.0 - Ultimate Techfest Treasure Hunt</title>

<!-- Hero Section -->
<div class="relative min-h-screen w-full flex flex-col items-center justify-center antialiased">
    <BackgroundBeams />

    <div class="relative z-10 text-center px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
        <Countdown
            from="2027-04-10 23:59:00"
            dateFormat="YYYY-MM-DD H:m:s"
            zone="Asia/Kolkata"
            let:remaining
        >
            <div class="mb-6">
                <p class="text-sm md:text-base text-neutral-400 font-mono">
                    Event starts in: {remaining.days}d {remaining.hours}h {remaining.minutes}m {remaining.seconds}s
                </p>
            </div>
        </Countdown>

        <h1 class="bg-gradient-to-b from-neutral-200 via-neutral-100 to-primary bg-clip-text text-transparent font-sans text-5xl md:text-7xl lg:text-8xl font-bold mb-6 mt-4">
            Cipher Saga 3.0
        </h1>

        <p class="text-lg md:text-xl text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            The ultimate treasure hunt challenge of the year. Think. Connect. Solve.
            Join teams, crack codes, and climb the leaderboard in this thrilling techfest event.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
                borderRadius="0.75rem"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3"
                onClick={() => (window.location.href = "/ready")}
            >
                Start Your Journey
            </Button>
            <Button
                borderRadius="0.75rem"
                className="bg-transparent border-2 border-neutral-600 text-neutral-300 hover:bg-neutral-800 font-semibold px-8 py-3"
                onClick={() => (window.location.href = "/leaderboard")}
            >
                View Leaderboard
            </Button>
        </div>
    </div>
</div>

<!-- Features Section -->
<section class="py-20 bg-neutral-900">
    <div class="max-w-6xl mx-auto px-4 md:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-white mb-12">Why Join Cipher Saga?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center p-6 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors">
                <Target class="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 class="text-xl font-semibold text-white mb-2">Challenging Puzzles</h3>
                <p class="text-neutral-400">Solve complex codes and riddles that test your logical thinking</p>
            </div>
            <div class="text-center p-6 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors">
                <Users class="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 class="text-xl font-semibold text-white mb-2">Team Collaboration</h3>
                <p class="text-neutral-400">Work together with your team to overcome challenges</p>
            </div>
            <div class="text-center p-6 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors">
                <Zap class="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 class="text-xl font-semibold text-white mb-2">Real-time Updates</h3>
                <p class="text-neutral-400">Live leaderboard and instant feedback on your progress</p>
            </div>
            <div class="text-center p-6 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors">
                <Trophy class="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 class="text-xl font-semibold text-white mb-2">Exciting Prizes</h3>
                <p class="text-neutral-400">Compete for amazing prizes and recognition</p>
            </div>
        </div>
    </div>
</section>

<!-- Leaderboard Preview -->
<section class="py-20 bg-neutral-800">
    <div class="max-w-4xl mx-auto px-4 md:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-white mb-12">Current Leaders</h2>
        {#if leaderboard.length > 0}
            <div class="bg-neutral-900 rounded-lg p-6">
                <div class="space-y-4">
                    {#each leaderboard.slice(0, 5) as team, i}
                        <div class="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
                            <div class="flex items-center space-x-4">
                                <span class="text-2xl font-bold text-neutral-400">#{i + 1}</span>
                                <div>
                                    <h3 class="text-white font-semibold">{team.teamName}</h3>
                                    <p class="text-neutral-400 text-sm">{team.members} members</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="text-white font-bold">{team.score} pts</p>
                            </div>
                        </div>
                    {/each}
                </div>
                <div class="text-center mt-6">
                    <a href="/leaderboard" class="text-blue-400 hover:text-blue-300 font-semibold">View Full Leaderboard →</a>
                </div>
            </div>
        {:else}
            <div class="text-center text-neutral-400">
                <Trophy class="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Leaderboard will be available once the event starts!</p>
            </div>
        {/if}
    </div>
</section>

<!-- Footer -->
<footer class="py-12 bg-black">
    <div class="max-w-6xl mx-auto px-4 md:px-8 text-center">
        <h3 class="text-2xl font-bold text-white mb-4">Organized by TechnoCrats</h3>
        <p class="text-neutral-400 mb-6">Part of the annual techfest bringing innovation and excitement to our community.</p>
        <div class="flex justify-center space-x-6 mb-4">
            <img src="https://i.ibb.co/whYZ0Ws3/Whats-App-Image-2025-03-13-at-9-40-35-PM.jpg" alt="Soham Wani" class="w-10 h-10 rounded-full" />
            <img src="https://i.ibb.co/qM2wVX1z/Logo.png" alt="TechnoCrats" class="w-10 h-10 rounded-full" />
        </div>
        <p class="text-neutral-500 text-sm mt-6">© 2026 Cipher Saga 3.0. All rights reserved.</p>
    </div>
</footer>
