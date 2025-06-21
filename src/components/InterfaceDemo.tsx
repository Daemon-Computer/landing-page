import { createSignal, onMount, onCleanup } from 'solid-js';
import styles from './InterfaceDemo.module.css';
import win98 from './Windows98.module.css';

// Shared game steps data
const gameplaySteps = [
    { id: "care", icon: "🏥", title: "Care", description: "Care for your daemons to increase their stats and reduce corruption" },
    { id: "battle", icon: "⚔️", title: "Battle", description: "Battle against AI and users to strengthen your daemons, but beware of corruption from losses" },
    { id: "breed", icon: "💕", title: "Breed", description: "Breed with other daemons to create offspring with rare traits, abilities and colors" },
    { id: "earn", icon: "💰", title: "Earn", description: "Win prizes in seasonal events and tournaments funded by mint profits" }
];

// Demo Video Window Component for mobile use
export function DemoVideoWindow() {
    const demoTitleId = 'demo-title-' + Math.random().toString(36).substring(2, 9);

    return (
        <div class={`${win98.window} flex flex-col w-full max-h-[85vh]`} role="region" aria-labelledby={demoTitleId}>
            <div class={`${win98.titleBar} flex-shrink-0`}>
                <div class={win98.titleBarText} id={demoTitleId}>Demo</div>
            </div>
            <div class={`${win98.windowBody} p-0 flex-grow flex overflow-hidden`}>
                <div class={`${styles.videoContainer} w-full`}>
                    <div class={styles.videoPlaceholder} title="Video demonstration placeholder">
                        <button class={`${styles.playButtonDisabled}`} aria-label="Play video demo (currently disabled)" disabled>▶</button>
                        <p class="text-sm text-gray-300 mt-2">Coming Soon</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Gameplay Loop Window Component for mobile use
export function GameplayLoopWindow() {
    const [activeStep, setActiveStep] = createSignal<number>(0);

    let animationInterval: number;

    onMount(() => {
        if (typeof window !== 'undefined') {
            animationInterval = window.setInterval(() => {
                setActiveStep((prev) => (prev + 1) % gameplaySteps.length);
            }, 10000);
        }
    });

    onCleanup(() => {
        if (typeof window !== 'undefined' && animationInterval) {
            clearInterval(animationInterval);
        }
    });

    const gameplayTitleId = 'gameplay-title-' + Math.random().toString(36).substring(2, 9);
    const gameplayLoopLabelId = 'gameplay-loop-label-' + Math.random().toString(36).substring(2, 9);

    return (
        <div class={`${win98.window} flex flex-col w-full max-h-[85vh]`} role="region" aria-labelledby={gameplayTitleId}>
            <div class={`${win98.titleBar} flex-shrink-0`}>
                <div class={win98.titleBarText} id={gameplayTitleId}>Gameplay Loop</div>
            </div>
            <div class={`${win98.windowBody} p-4 overflow-y-auto flex-grow`}>
                <div class="bg-white p-4 border-2 border-[#985dff]" >
                    <h3 class="sr-only" id={gameplayLoopLabelId}>Gameplay Loop Steps</h3>
                    <div class={`${styles.gameplayLoopHorizontal} flex-wrap justify-center`} role="tablist" aria-labelledby={gameplayLoopLabelId}>
                        {gameplaySteps.map((step, index) => (
                            <div class={`${styles.gameplayStepContainerHorizontal} mb-3`}>
                                <button role="tab" id={`gameplay-tab-${step.id}`} aria-controls={`gameplay-panel-${step.id}`} aria-selected={activeStep() === index} tabindex={activeStep() === index ? 0 : -1} class={`${styles.gameplayStepHorizontal} transition-all duration-300`} classList={{ [styles.activeGameplayStep]: activeStep() === index }} onClick={() => setActiveStep(index)}>
                                    <div class="text-2xl mb-2" aria-hidden="true">{step.icon}</div>
                                    <div class="font-bold text-sm">{step.title}</div>
                                </button>
                                {index < gameplaySteps.length - 1 && (
                                    <div class={styles.stepConnectorHorizontal} aria-hidden="true"><div class={styles.connectorArrowHorizontal}>→</div></div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div class="mt-6 p-3 bg-gray-100 border border-gray-300 text-sm min-h-[60px]" role="tabpanel" id={`gameplay-panel-${gameplaySteps[activeStep()].id}`} aria-labelledby={`gameplay-tab-${gameplaySteps[activeStep()].id}`} aria-live="polite">
                        <p class="font-bold mb-1">{gameplaySteps[activeStep()].title}:</p>
                        <p class="text-sm">{gameplaySteps[activeStep()].description}</p>
                    </div>

                    <div class="mt-4 text-xs text-gray-700">
                        <p class="font-bold">Be Careful with the Corruption System:</p>
                        <p class="text-xs">The more battles you lose, the more corrupted your program becomes. Balance battling with proper care to maintain optimal program health!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main InterfaceDemo component (for desktop)
export default function InterfaceDemo() {
    const [activeStep, setActiveStep] = createSignal<number>(0);
    const [isMobile, setIsMobile] = createSignal<boolean>(false);

    let animationInterval: number;

    const handleResize = () => {
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth < 768);
        }
    };

    onMount(() => {
        // Initialize isMobile now that we're on the client
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth < 768);
            window.addEventListener('resize', handleResize);
        }

        animationInterval = window.setInterval(() => {
            setActiveStep((prev) => (prev + 1) % gameplaySteps.length);
        }, 10000);
    });

    onCleanup(() => {
        clearInterval(animationInterval);
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', handleResize);
        }
    });

    return (
        <div class="flex flex-col w-full h-full bg-transparent items-center justify-center p-4 md:p-8 overflow-y-auto">
            <div class={`flex flex-col w-full ${isMobile() ? 'gap-4' : 'max-w-6xl gap-6'} items-center`}>
                {/* Both windows in a single view for desktop */}
                <DemoVideoWindow />
                <GameplayLoopWindow />
            </div>
        </div>
    );
}