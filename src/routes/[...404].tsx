import { A } from "@solidjs/router";
import win98 from '../components/Windows98.module.css';
import styles from './NotFound.module.css';
import { createSignal, onMount } from 'solid-js';

export default function NotFound() {
  const [randomHexCode, setRandomHexCode] = createSignal('0x00000000');
  const errorTitleId = 'error-title-' + Math.random().toString(36).substring(2, 9);

  // Generate a new random error code every 3 seconds for effect
  onMount(() => {
    const interval = setInterval(() => {
      const hexCode = '0x' + Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0').toUpperCase();
      setRandomHexCode(hexCode);
    }, 3000);

    return () => clearInterval(interval);
  });

  return (
    <main class="flex min-h-screen items-center justify-center bg-[#9a5cff] p-4">
      <div class="w-full max-w-md">
        <div class={`${win98.window}`} role="alert" aria-labelledby={errorTitleId}>
          <div class={`${win98.titleBar} w-full justify-between`}>
            <div class={win98.titleBarText} id={errorTitleId}>DAE-MON Error</div>
          </div>
          <div class={`${win98.windowBody} p-6`}>
            <div class="flex items-start mb-6">
              <div class="mr-4 flex-shrink-0">
                <div class={styles.errorIcon}>!</div>
              </div>
              <div>
                <h1 class="text-xl font-bold mb-2">404 - Page Not Found</h1>
                <p class="mb-2 text-sm">
                  The page you requested could not be found on this system.
                </p>
                <p class="mb-4 text-xs">
                  Error code: <span class={styles.hexCode}>{randomHexCode()}</span>
                </p>
              </div>
            </div>

            <div class="border-t border-[#8d46ff] pt-4 mt-2">
              <div class={styles.bulletPoint}>
                Check the URL and try again
              </div>
              <div class={styles.bulletPoint}>
                Return to the homepage using the OK button
              </div>
              <div class={styles.bulletPoint}>
                Use Go Back to return to the previous page
              </div>
            </div>

            <div class="flex justify-end space-x-2 mt-6">
              <A href="/" class={`${win98.button} flex items-center justify-center`}>
                <strong>OK</strong>
              </A>
              <button class={`${win98.button} flex items-center justify-center`} onClick={() => window.history.back()}>
                <strong>Go Back</strong>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-8 text-center text-[#0c046f]">
          <p class="text-sm">
            © {new Date().getFullYear()} DAE-MON <span class="hidden sm:inline">|</span><br class="sm:hidden" /> All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
