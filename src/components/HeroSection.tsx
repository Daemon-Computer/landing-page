import { createSignal, onMount, onCleanup } from 'solid-js';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [currentFrame, setCurrentFrame] = createSignal<number>(0);
  const [isLoaded, setIsLoaded] = createSignal<boolean>(false);

  let breathingInterval: ReturnType<typeof setInterval>;
  let initialSequenceTimeouts: ReturnType<typeof setTimeout>[] = [];

  const frames: string[] = [
    "/images/daemon-title-loading-window.avif",
    "/images/daemon-title-loading-box-windows.avif",
    "/images/daemon-title-loading-box-egg-windows.avif",
    "/images/daemon-title-no-bg.avif",
    "/images/daemon-title-no-bg-shifted-down.avif"
  ];

  onMount(() => {
    // Preload the final images for smoother transition
    const img3 = new Image();
    img3.src = frames[3];
    const img4 = new Image();
    img4.src = frames[4];

    // Initial loading animation sequence
    initialSequenceTimeouts.push(setTimeout(() => {
      setCurrentFrame(0);
      setIsLoaded(true);
    }, 250));

    initialSequenceTimeouts.push(setTimeout(() => setCurrentFrame(1), 500));
    initialSequenceTimeouts.push(setTimeout(() => setCurrentFrame(2), 750));
    initialSequenceTimeouts.push(setTimeout(() => setCurrentFrame(3), 1000));

    // Start breathing animation (alternating between frames 3 and 4)
    initialSequenceTimeouts.push(setTimeout(() => {
      breathingInterval = setInterval(() => {
        setCurrentFrame(prevFrame => prevFrame === 3 ? 4 : 3);
      }, 1200);
    }, 1250));

    onCleanup(() => {
      if (breathingInterval) {
        clearInterval(breathingInterval);
      }
      initialSequenceTimeouts.forEach(timeout => clearTimeout(timeout));
    });
  });

  return (
    <div class="flex flex-col w-full h-full bg-transparent justify-center items-center p-4">
      {/* Added h1 for SEO and accessibility - visually hidden but present */}
      <h1 class="sr-only">DAE-MON Project Landing Page</h1>
      <div
        class={`${styles.logo} ${isLoaded() ? styles.logoLoaded : ''}`}
      >
        <img
          src={frames[currentFrame()]}
          // Improved alt text
          alt="Animated DAE-MON Project logo loading sequence"
          // Adjusted sizing: constrain max width, let height be auto, ensure full width if container is smaller
          class="max-w-lg w-full h-auto"
          width="512" // Provide intrinsic width hint
          height="200" // Provide intrinsic height hint (adjust ratio if needed)
          fetchpriority="high" // Prioritize loading this image
        />
      </div>
      {/* <div class={`${styles.ctaContainer} ${isLoaded() ? styles.ctaLoaded : ''}`}>
        <div class={win98.window}>
          <div class={win98.titleBar}>
            <div class={win98.titleBarText}>Get notified when we launch!</div>

          </div>
          <div class={`${win98.windowBody} flex`}>
            <input
              type="email"
              placeholder="example@email.com"
              class={`${win98.input} flex-grow mr-2`}
            />
            <button class={win98.button}>Register</button>
          </div>
        </div>
      </div> */}
    </div>
  );
}