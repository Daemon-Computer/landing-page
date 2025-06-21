import { createSignal, onMount, onCleanup } from 'solid-js';
import win98 from './Windows98.module.css';
import styles from './DemoInvite.module.css';

export default function DemoInvite() {
    const [isMobile, setIsMobile] = createSignal<boolean>(false);

    const handleResize = () => {
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth < 768);
        }
    };

    onMount(() => {
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth < 768);
            window.addEventListener('resize', handleResize);
        }
    });

    onCleanup(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', handleResize);
        }
    });

    const demoTitleId = 'demo-title-' + Math.random().toString(36).substring(2, 9);

    return (
        <div class="flex flex-col w-full h-full bg-transparent items-center justify-center p-4 md:p-8 overflow-y-auto">
            <div class="w-full max-w-2xl">
                <div class={`${win98.window} flex flex-col max-h-[70vh] lg:max-h-[85vh]`} role="region" aria-labelledby={demoTitleId}>
                    <div class={`${win98.titleBar} flex-shrink-0`}>
                        <div class={win98.titleBarText} id={demoTitleId}>Try Our Demo</div>
                    </div>
                    <div class={`${win98.windowBody} p-4 md:p-6 overflow-y-auto flex-grow min-h-0`}>
                        <section aria-labelledby="demo-heading">
                            <h3 id="demo-heading" class="text-xl text-center font-bold mb-4">Experience DAE-MON Now</h3>
                            <p class="mb-6 text-center">
                                Ready to see what DAE-MON can do? Check out our live demo
                            </p>
                            <div class="flex justify-center">
                                <a
                                    href="https://os.daemon.computer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class={styles.demoButton}
                                    aria-label="Visit DAE-MON Demo"
                                >
                                    Launch Demo
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
} 