# ⏱️ Stop-watch

A minimal, precise stopwatch built with **Next.js 16**, **React 19** and **Tailwind CSS**, with light and dark mode.

## Features

- **Start / Stop / Reset**: a single toggle button plus reset (disabled when there's nothing to reset)
- **Centisecond precision**: displays `MM:SS.cc`, updated every 10 ms
- **Drift-free timing**: elapsed time is calculated from `Date.now()` against a start timestamp, not by counting ticks, so it stays accurate even when the browser throttles timers
- **Pause and resume**: stopping keeps the elapsed time, and starting again continues from where you left off
- **Dark mode**: follows the system theme via Tailwind's `dark:` variants
- **Stable layout**: `tabular-nums` monospace digits keep the display from jittering

## Tech stack

| | |
|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router) |
| UI | React, Tailwind CSS v4 |
| Language | TypeScript |
| Tooling | ESLint, Turbopack |

## Getting started

```bash
git clone https://github.com/tramslegend/Stop-watch.git
cd Stop-watch
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## How it works

The whole app lives in [`app/page.tsx`](app/page.tsx):

```ts
// On start: remember when we started, offset by time already elapsed
startRef.current = Date.now() - elapsed;

// Every 10 ms: elapsed = now - start (no accumulated drift)
setElapsed(Date.now() - startRef.current);
```

The interval only restarts when `running` toggles, and it's cleared on stop and unmount.

## Roadmap

- [ ] Lap button to record split times
- [ ] Keyboard shortcuts (Space = start/stop, R = reset)
- [ ] Persist state across page reloads
