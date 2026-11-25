# 🌱 FocusQuest

Focus with intention. Rest with intention. Grow a little every day.

**[Open FocusQuest](https://aaron-ragsdale.github.io/FocusQuest/)**

A playful, browser-based Pomodoro timer that rewards focus and makes breaks intentional.

## Getting started

1. Open the website in Chrome or another modern browser.
2. Set a task, focus duration, break duration and number of rounds.
3. Configure your Recharge library before starting.
4. Choose Casual or Deep Focus and start your quest.
5. Earn coins and XP, unlock companions and decorations, and track your journey.

## Features

- Configurable Pomodoro cycles with short and final long breaks.
- Deep Focus uses fullscreen and pauses on detected departures; Casual counts elapsed time while you work elsewhere.
- Recharge activities: animated breathing (4 seconds in, 6 out), stretches, quotes, quiet time, approved YouTube videos and local photos.
- Break library locked within the app during an active cycle; video embeds are removed when the break ends.
- Coins, XP, daily quests, achievements, companions and a growing garden.
- Session history, seven-day chart, streaks and JSON backup/import.

## Privacy and storage

Progress is stored in localStorage under a versioned key; uploaded photos use IndexedDB. No account, backend or API key is required. Progress is browser/device-specific and can be lost when clearing site data. JSON backups do not include uploaded photos. Active cycles are not restored after a reload. YouTube playback contacts YouTube and is subject to its embed policies.

## GitHub Pages

In repository Settings → Pages, select Deploy from a branch, main, / (root), and Save. The application is self-contained in index.html.

## Limitations and roadmap

A website cannot prevent Escape, closing a tab, switching apps, or visiting other sites. Deep Focus measures browser presence, not actual attention. YouTube embeds may contain links or recommendations. The next phases are a Chrome extension for website blocking and a desktop app for stronger OS-permitted restrictions with an emergency exit.

