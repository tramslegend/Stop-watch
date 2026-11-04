"use client";

import { useEffect, useRef, useState } from "react";

function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

export default function Home() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  // Timestamp (ms) when the current run started, adjusted for time already elapsed.
  const startRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    startRef.current = Date.now() - elapsed;
    const id = setInterval(() => {
      setElapsed(Date.now() - startRef.current);
    }, 10);
    return () => clearInterval(id);
    // Only restart the interval when running toggles; elapsed is read once on start.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const reset = () => {
    setRunning(false);
    setElapsed(0);
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center gap-10 rounded-2xl bg-white px-8 py-16 shadow-sm dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Stopwatch
        </h1>

        <p
          className="font-mono text-6xl tabular-nums text-black dark:text-zinc-50"
          aria-live="off"
        >
          {formatTime(elapsed)}
        </p>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className={`h-12 w-28 rounded-full font-medium text-white transition-colors ${
              running
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {running ? "Stop" : "Start"}
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={elapsed === 0 && !running}
            className="h-12 w-28 rounded-full border border-black/10 font-medium text-black transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15 dark:text-zinc-50 dark:hover:bg-white/10"
          >
            Reset
          </button>
        </div>
      </main>
    </div>
  );
}
