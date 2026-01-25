<script lang="ts">
    import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
    import { Button } from "@/components/ui/MovingBorder";
    import { LampEffect } from "@/components/ui/LampEffect";
    import Countdown from "svelte-countdown/src/index.js";
    import { onMount } from "svelte";
    import { Trophy, Users, Zap, Target } from "lucide-svelte";

    let showRules = false;
    let leaderboard = [
        { teamName: 'Tech Wizards', score: 950, members: 4 },
        { teamName: 'Code Crusaders', score: 920, members: 3 },
        { teamName: 'Puzzle Masters', score: 880, members: 4 },
        { teamName: 'Logic Lords', score: 850, members: 2 },
        { teamName: 'Brain Busters', score: 820, members: 3 }
    ];
</script>

<title>Cipher Saga 3.0 - Ultimate Techfest Treasure Hunt</title>

{#if !showRules}
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

            <h1 class="bg-gradient-to-b from-neutral-200 via-neutral-100 to-primary bg-clip-text text-transparent font-sans text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
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
            <div class="flex justify-center space-x-6">
                <a href="" class="text-neutral-400 hover:text-white transition-colors">
                    <img src="https://i.ibb.co/whYZ0Ws3/Whats-App-Image-2025-03-13-at-9-40-35-PM.jpg" alt="Soham Wani" class="w-10 h-10 rounded-full" />
                </a>
                <a href="" class="text-neutral-400 hover:text-white transition-colors">
                    <img src="https://i.ibb.co/qM2wVX1z/Logo.png" alt="TechnoCrats" class="w-10 h-10 rounded-full" />
                </a>
            </div>
            <p class="text-neutral-500 text-sm mt-6">© 2026 Cipher Saga 3.0. All rights reserved.</p>
        </div>
    </footer>

    <!-- Rules Modal (if needed) -->
    {#if showRules}
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-neutral-900 p-8 rounded-lg max-w-2xl mx-4">
                <h2 class="text-2xl font-bold text-white mb-4">Event Rules</h2>
                <div class="text-neutral-300 space-y-2 mb-6">
                    <p>• Teams must consist of 2-4 members</p>
                    <p>• All solutions must be submitted through the platform</p>
                    <p>• Fair play is mandatory - no external help allowed</p>
                    <p>• Winners will be announced at the closing ceremony</p>
                </div>
                <button
                    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    onClick={() => showRules = false}
                >
                    Close
                </button>
            </div>
        </div>
    {/if}
{:else}
    <!-- Rules Section -->
    <div class="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
        <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-8">Event Rules</h1>
            <div class="bg-neutral-800 rounded-lg p-8 text-left">
                <div class="space-y-4 text-neutral-300">
                    <div class="flex items-start space-x-3">
                        <span class="text-blue-400 font-bold">1.</span>
                        <p>Teams must register with 2-4 members from the same institution.</p>
                    </div>
                    <div class="flex items-start space-x-3">
                        <span class="text-blue-400 font-bold">2.</span>
                        <p>All puzzles and solutions must be submitted through the official platform.</p>
                    </div>
                    <div class="flex items-start space-x-3">
                        <span class="text-blue-400 font-bold">3.</span>
                        <p>Fair play is essential - external help or unauthorized collaboration is prohibited.</p>
                    </div>
                    <div class="flex items-start space-x-3">
                        <span class="text-blue-400 font-bold">4.</span>
                        <p>The event duration and specific rules will be announced at the start.</p>
                    </div>
                    <div class="flex items-start space-x-3">
                        <span class="text-blue-400 font-bold">5.</span>
                        <p>Winners will be determined by the highest score achieved within the time limit.</p>
                    </div>
                </div>
            </div>
            <button
                class="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg"
                onClick={() => showRules = false}
            >
                Back to Home
            </button>
        </div>
    </div>
{/if}
                    borderRadius="0.75rem"
                    className="bg-white-300 text-white border-slate-800 text-sm font-bold"
                    onClick={() => (showRules = !showRules)}
                >
                    Read Me
                </Button>
            </div>
        </div>
    </div>
{/if}
{#if showRules}
    <div
        class="relative flex h-screen w-full flex-col items-center justify-start rounded-md px-32 antialiased"
    >
        <BackgroundBeams />
        <div
            style="align-items: center;justify-content: center;display: flex;"
            class="mt-6"
        >
            <div>
                <Button
                    borderRadius="0.75rem"
                    className="bg-white-300 text-white border-slate-800 text-sm font-bold"
                    onClick={() => (showRules = !showRules)}
                >
                    Take Me Back
                </Button>
            </div>
        </div>
        <div
            style="align-items: center;justify-content: center;display: flex;"
            class="mt-6 pb-[3vh]"
        >
            <div>
                <div
                    class="bg-white-300 text-white border-slate-800 border-2 text-sm w-[80vw] min-w-[80vw] max-w-[80vw] p-[5vh_10vw] rounded-[0.75rem]"
                >
                    <div class="pb-[3vh]">
                        <h2
                            class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]"
                        >
                            What is Cipher Saga 3.0?
                        </h2>
                        <p
                            class="relative z-10 text-justify text-sm text-neutral-400"
                        >
                            Cipher Saga 3.0 is the third installment of the online cryptic hunt event hosted
                            during EPITOME, the annual techno-management fest of Gati Shakti Vishwavidyalaya.
                            Participants will team up to tackle a series of
                            challenging levels, deciphering clues and solving
                            riddles to progress. The event will test their wit,
                            collaboration, and problem-solving skills, which
                            will probably leave everyone thrilled and eager for
                            more.
                        </p>
                    </div>
                    <div class="pb-[3vh]">
                        <h2
                            class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]"
                        >
                            What are cryptic hunts anyway?
                        </h2>
                        <p></p>
                        <p
                            class="relative z-10 text-justify text-sm text-neutral-400"
                        >
                            A cryptic hunt is like a puzzle-solving game where
                            you solve riddles, clues, or challenges to move from
                            one hint to the next. Each clue usually leads to the
                            next clue, and the goal is to reach the final answer
                            of a level by decoding all the hints along the way.
                            It often involves thinking creatively, solving
                            wordplay, interpreting patterns, and sometimes even
                            searching online for hidden answers. It's a fun mix
                            of brain teasers, logic, and exploration. Cipher
                            coders, AI tools, QR codes, coding softwares, etc.
                            are all allowed and encouraged to be used.
                        </p>
                    </div>
                    <div class="pb-[3vh]">
                        <h2
                            class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]"
                        >
                            How will winners be decided?
                        </h2>
                        <p
                            class="relative z-10 text-justify text-sm text-neutral-400"
                        >
                            Winners will be decided based on the leaderboard
                            standings at the end of the competition. The leaderboard ranks teams based on
                            how quickly they solve the puzzles, with teams that
                            solve earlier being placed higher. Accuracy is not a
                            criteria.
                        </p>
                    </div>
                    <div class="pb-[3vh]">
                        <h2
                            class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]"
                        >
                            Rules
                        </h2>
                        <ul
                            class="relative z-10 text-justify text-sm text-neutral-400 list-disc pl-5"
                        >
                            <li>
                                Make sure you have registered on the platform
                                using only your registered student email. If you
                                don't have one, you can still play but you won't
                                be considered for the prizes. Make sure you are
                                part of atleast one team.
                            </li>
                            <li>
                                Make sure you have joined the <a
                                    href="https://discord.gg/Dm5zy3EaE4"
                                    >Discord server</a
                                > as well.
                            </li>
                            <li>
                                Asking other players for hints or sharing
                                answers or hints among users via any medium is
                                strictly prohibited. If found, it will lead to
                                direct disqualification.
                            </li>
                            <li>
                                Reverse engineering the platform means a direct
                                ban from the competition. Bugs, if found, should
                                be reported and not exploited. Exploiting a bug
                                also leads to disqualification.
                            </li>
                            <li>
                                Obscene or offensive usernames and team names
                                are not allowed.
                            </li>
                            <li>
                                <b>
                                    Decisions by organizers are final and should
                                    not be questioned.
                                </b>
                            </li>
                            <li>
                                By playing the game, you agree to adhere to all
                                the rules and guidelines.
                            </li>
                        </ul>
                    </div>
                    <div class="pb-[3vh]">
                        <h2
                            class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]"
                        >
                            Guidelines
                        </h2>
                        <ul
                            class="relative z-10 text-justify text-sm text-neutral-400 list-disc pl-5"
                        >
                            <li>
                                To report misconduct by any player, DM any
                                member of the team.
                            </li>
                            <li>
                                All hints and lead confirmations will be done
                                via the <a href="https://discord.gg/Dm5zy3EaE4"
                                    >official Discord server</a
                                > only.
                            </li>
                            <li>
                                You can always clear your doubts on the Discord
                                server. Be sure not to discuss answers or
                                question about answers in any way.
                            </li>
                            <li>
                                Lead confirmations are short private yes/no
                                questions. You may ask leads about the level you
                                are on in the dedicated private channels on
                                Discord and organizers would respond with yes or
                                no. You get 3 leads per day per person by
                                default and this number is subject to change. Be
                                updated on Discord. Unused leads don't stack.
                                Unanswered leads can be changed. Confusing leads
                                will not be considered.
                            </li>
                            <li>
                                And if it was not obvious, answer sharing, leads
                                sharing and cross teaming in general is not
                                allowed and any such evidence can lead to
                                disqualification.
                            </li>
                            <li>
                                Unless otherwise stated, file passwords,
                                passkeys, etc. encountered in any level allow
                                all characters. So brute forcing won't help
                                much.
                            </li>
                        </ul>
                    </div>
                    <div class="pb-[4vh]">
                        <h2
                            class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-2xl font-bold text-transparent pb-[1vh]"
                        >
                            Learning resources
                        </h2>
                        <p
                            class="relative z-10 text-justify text-sm text-neutral-400 pb-[0.5vh]"
                        >
                            Cryptic hunts generally revolve around tech, trivia,
                            and mostly anything you can find on the internet.
                            Googling is allowed and heavily encouraged, but it
                            won't directly get you the answer in most cases.
                            Think logically, make connections between different
                            parts of levels. Cryptic hunts are all about
                            connecting the dots and finding the solutions.
                        </p>
                        <p
                            class="relative z-10 text-justify text-sm text-neutral-400 pb-[0.5vh]"
                        >
                            Keep getting your leads confirmed from the
                            organizers. If you think you've gotten stuck
                            somewhere, seek for hints on Discord. The levels
                            will basically consist of a set of clues, all which
                            link to ONE ANSWER. The difficulty is random. When
                            you get two or more clues, try to connect them and
                            find an interrelated clue from it. If you can't
                            figure out the hint, try breaking it down and
                            solving it in parts.
                        </p>
                        <p
                            class="relative z-10 text-justify text-sm text-neutral-400 pb-[0.5vh]"
                        >
                            <i
                                >Note: Not all tools and approaches are listed
                                below. Read these to get you through some of the
                                levels. But tougher levels requires much more
                                brain power and tools not listed here may also
                                be used. Sky's truly the limit.</i
                            >
                        </p>
                        <ul
                            class="relative z-10 text-justify text-sm text-neutral-400 list-disc pl-5 pb-[0.5vh]"
                        >
                            <li>
                                <strong>Hunt's Site:</strong> Clues are sometimes
                                hidden in the hunt's rules and maybe even in the
                                event descriptions. The page title. The URL. Focus
                                on every word carefully as almost every hunt uses
                                a lot of wordplay.
                            </li>
                            <li>
                                <strong>Source Code:</strong> Look at the code comments.
                                There could be other links inside the code (This
                                especially helps in cases in which there aren't any
                                on-screen clues). You can even try using Inspect
                                Element (Ctrl+Shift+I) or Viewing Page Source (Ctrl+Shift+U).
                            </li>
                            <li>
                                <strong>Audio Files:</strong> Inspect the name, duration,
                                and content. Use spectrograms and tools like Audacity
                                or Sonic Visualizer for hidden text. Look for morse
                                code, binary, or locked files. Adjust the tempo or
                                format for clues.
                            </li>
                            <li>
                                <strong>Videos/GIFs:</strong> Focus on specific frames,
                                extract relevant audio, or slow down/speed up videos
                                to uncover clues. Visual or audio elements like morse/binary
                                code may be hidden.
                            </li>
                            <li>
                                <strong>Images:</strong> Check the image file name,
                                dimensions, and metadata for hidden strings or steganography.
                                Use tools like Aperisolve to detect and extract hidden
                                info by adjusting contrast or brightness.
                            </li>
                            <li>
                                <strong>Backlinks:</strong> If it looks like a completely
                                random string, try appending it to the end of common
                                URL patterns, like bit.ly/string, youtube.com/watch?v=string
                                etc. This is known as a backlink. Backlinks are key!
                                Use sites like imgur, pastebin, bit.ly, and tinyurl.
                                For encrypted pastebins, find the password clues.
                                Use a4x.me to identify backlinks when unsure.
                            </li>
                            <li>
                                <strong>Ciphers:</strong> Pay attention to ciphers,
                                such as Morse code, binary, or simple text substitutions
                                (like Caesar or Vigenère ciphers). The creators are
                                known to use a lot of ciphers, so expect clues to
                                be encoded in these forms, often hidden within clues
                                or images.
                            </li>
                            <li>
                                <strong>Geocodes:</strong> Sometimes, when there are random numbers on the screen, try using geocoding sites that can make you arrive at the next clue. Try puting those coordinates in Google maps or geocoding sites like geocode.xyz. Another site called geoapify.com can prove useful as well. Try lingering with the words and get to sites like what3words or any other popular and unique geocoding software.
                            </li>
                        </ul>
                        <p
                            class="relative z-10 text-justify text-sm text-neutral-400"
                        >
                            Keep experimenting, stay creative! All the best!
                        </p>
                    </div>
                    <div class="pb-[3vh]">
                        <h2
                            class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-3xl font-bold text-transparent pb-[1vh]"
                        >
                            Our Team
                        </h2>
                    </div>
                    <div class="pb-[4vh]">
                        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="flex flex-col items-center">
                                <a href="">
                                    <img src="https://i.ibb.co/whYZ0Ws3/Whats-App-Image-2025-03-13-at-9-40-35-PM.jpg" alt="Soham Wani" class="w-20 h-20 rounded-full mb-2 mx-auto object-cover" />
                                    <h2
                                        class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-xl font-bold text-transparent"
                                    >
                                        Soham Wani
                                    </h2>
                                    <p
                                        class="relative z-10 text-center text-sm text-neutral-400 pb-[1vh]"
                                    >
                                        (Event Head)
                                    </p></a
                                >
                            </div>
                            <div class="flex flex-col items-center">
                                <a href="https://www.linkedin.com/in/shreya-mohanty-755529296/">
                                    <img src="https://i.ibb.co/d4v8xBmj/IMG-20250314-WA0093.jpg" alt="Shreya Mohanty" class="w-20 h-20 rounded-full mb-2 mx-auto object-cover" />
                                    <h2
                                        class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-xl font-bold text-transparent"
                                    >
                                        Shreya Mohanty
                                    </h2>
                                    <p
                                        class="relative z-10 text-center text-sm text-neutral-400 pb-[1vh]"
                                    >
                                        (Event Head)
                                    </p></a
                                >
                            </div>
                            <div class="flex flex-col items-center">
                                <a href="https://www.linkedin.com/in/rishav-kumar-2399241ab/">
                                    <img src="https://i.ibb.co/tpyz2pZL/58198da2-d4f5-4e08-bbe8-085c751453ff.jpg" alt="Rishav Kumar" class="w-20 h-20 rounded-full mb-2 mx-auto object-cover" />
                                    <h2
                                        class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-xl font-bold text-transparent"
                                    >
                                        Rishav Kumar
                                    </h2>
                                    <p
                                        class="relative z-10 text-center text-sm text-neutral-400 pb-[1vh]"
                                    >
                                        (Volunteer)
                                    </p></a
                                >
                            </div>
                        </div>
                    </div>
                    <div class="pb-[3vh]">
                        <h2
                            class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-3xl font-bold text-transparent pb-[1vh]"
                        >
                            Special Thanks
                        </h2>
                    </div>
                    <div class="pb-[4vh]">
                        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="flex flex-col items-center">
                                <a href="https://www.linkedin.com/in/dr-anshika-srivastava-933bbb1b7/">
                                    <img src="https://i.ibb.co/NT1B7nJ/1703908262735.jpg" alt="Dr. Anshika Srivastava" class="w-20 h-20 rounded-full mb-2 mx-auto object-cover" />
                                    <h2
                                        class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-xl font-bold text-transparent"
                                    >
                                        Dr. Anshika Srivastava
                                    </h2>
                                    <p
                                        class="relative z-10 text-center text-sm text-neutral-400 pb-[1vh]"
                                    >
                                        (Faculty Advisor)
                                    </p></a
                                >
                            </div>
                            <div class="flex flex-col items-center">
                                <a href="https://www.linkedin.com/in/dr-sonu-lamba-2a385694/">
                                    <img src="https://i.ibb.co/6cfXncPm/1736622240889.jpg" alt="Dr. Sonu Lamba" class="w-20 h-20 rounded-full mb-2 mx-auto object-cover" />
                                    <h2
                                        class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-xl font-bold text-transparent"
                                    >
                                        Dr. Sonu Lamba
                                    </h2>
                                    <p
                                        class="relative z-10 text-center text-sm text-neutral-400 pb-[1vh]"
                                    >
                                        (Faculty Advisor)
                                    </p></a
                                >
                            </div>
                            <div class="flex flex-col items-center">
                                <a href="">
                                    <img src="https://i.ibb.co/qM2wVX1z/Logo.png" alt="TechnoCrats" class="w-20 h-20 rounded-full mb-2 mx-auto" />
                                    <h2
                                        class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-xl font-bold text-transparent"
                                    >
                                        TechnoCrats
                                    </h2>
                                    <p
                                        class="relative z-10 text-center text-sm text-neutral-400 pb-[1vh]"
                                    >
                                        (Conducted By)
                                    </p></a
                                >
                            </div>
                        </div>
                    </div>
                    <div class="pb-[4vh]">
                        <h2
                            class="relative z-10 bg-gradient-to-b from-neutral-200 to-primary bg-clip-text text-center font-sans text-l font-bold text-transparent pb-[1vh]"
                        >
                            Also a special thanks to Student Cell @ GSV and Epitome'25 organising committee for supoorting us throughout
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
