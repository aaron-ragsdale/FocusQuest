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


## Optional AI Focus (experimental)

Choose Classic (no camera), Awareness (count suspected phone checks), or AI Focus (automatically pause and resume). These settings work alongside Casual or Deep Focus. Enable the camera before starting, look at your normal work location and capture calibration step 1, then look at your phone while it is visible to the camera and capture step 2. Test the status before starting a quest. The defaults are 1.5 seconds of suspected phone attention and 1 second before resuming. Adjust detection confidence, detection frequency, and optional tracking-loss behavior. Hand tracking adds a diagnostic signal; it is not required for a pause.

Face Landmarker and EfficientDet-Lite0 run locally through MediaPipe Tasks Vision; the optional Hand Landmarker also runs locally. Model files and runtime download from Google/CDN hosts. No images are recorded or uploaded by FocusQuest. Session history and exports include estimated phone-check counts, duration, elapsed time and event timing. Stop camera at any time to continue without AI. Detection does not affect break timers. Camera may remain on between rounds until stopped or the cycle ends.

The gaze estimator compares two calibrated face/iris feature patterns, not a physical gaze ray. It cannot reliably identify every phone interaction or distinguish every notebook glance; phone visibility, posture and lighting matter. Background browser throttling can interrupt tracking. Keep the page visible and use Awareness first to evaluate accuracy. Chrome/Edge and model loading require real-device validation.
