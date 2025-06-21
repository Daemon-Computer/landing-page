import { createSignal, onMount, onCleanup, children, JSX, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';

/**
 * TypeScript interface for the component props
 * Now much simpler - just accepts children and a few optional config props
 */
export interface VerticalStackProps {
    children: JSX.Element;
    threshold?: number;                   // Scroll threshold for snapping (0-1)
    transitionDuration?: number;          // Duration of snap animation in ms
    showIndicators?: boolean;             // Whether to show position indicators
    indicatorPosition?: 'left' | 'right'; // Position of indicators
    indicatorColor?: string;              // Color for indicators (Tailwind class)
    onCardChange?: (index: number) => void; // Callback when active card changes
}

/**
 * VerticalStack Component
 * 
 * A fullscreen vertical stack component that accepts direct JSX/TSX children
 * and handles all the scroll animations and transitions between them.
 */
export default function VerticalStack(props: VerticalStackProps) {
    // Split props between local and those passed to children
    const [local, otherProps] = splitProps(props, [
        'children', 'threshold', 'transitionDuration', 'showIndicators',
        'indicatorPosition', 'indicatorColor', 'onCardChange'
    ]);

    // Default props
    const threshold = local.threshold ?? 0.3;
    const transitionDuration = local.transitionDuration ?? 500;
    const showIndicators = local.showIndicators ?? true;
    const indicatorPosition = local.indicatorPosition ?? 'right';
    const indicatorColor = local.indicatorColor ?? 'bg-white';

    // Process children
    const childElements = children(() => local.children);
    const childrenArray = () => childElements.toArray();

    // State
    const [currentIndex, setCurrentIndex] = createSignal(0);
    const [isTransitioning, setIsTransitioning] = createSignal(false);
    const [containerRef, setContainerRef] = createSignal<HTMLDivElement | null>(null);
    const [isMobile, setIsMobile] = createSignal(false);
    const [scrollData, setScrollData] = createStore({
        lastScrollTime: 0,
        scrollTimeout: null as number | null
    });

    /**
     * Scrolls to a specific card with smooth animation
     */
    const scrollToCard = (index: number) => {
        if (index < 0 || index >= childrenArray().length) return;

        const container = containerRef();
        if (!container || isTransitioning()) return;

        setIsTransitioning(true);

        // Calculate target scroll position
        const targetScrollTop = index * (typeof window !== 'undefined' ? window.innerHeight : 0);

        // Scroll with animation
        container.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth'
        });

        // Update current index and trigger callback
        setCurrentIndex(index);
        local.onCardChange?.(index);

        // Reset transitioning state after animation completes
        setTimeout(() => {
            setIsTransitioning(false);
        }, transitionDuration);
    };

    /**
     * Throttled scroll handler to detect scroll direction and implement snap behavior
     */
    const handleScroll = () => {
        const now = Date.now();
        const container = containerRef();

        // Return if we're in a transition or container isn't available
        if (!container || isTransitioning()) return;

        // Throttle scroll events
        if (now - scrollData.lastScrollTime < 50) return;
        setScrollData('lastScrollTime', now);

        const scrollTop = container.scrollTop;

        // Clear any existing scroll timeout
        if (scrollData.scrollTimeout !== null) {
            window.clearTimeout(scrollData.scrollTimeout);
        }

        // Set a timeout to check if scrolling has stopped
        const timeout = window.setTimeout(() => {
            // Calculate which card we're closest to
            const cardHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
            const rawIndex = scrollTop / cardHeight;
            const index = Math.round(rawIndex);

            // Only snap if we're not already at a card boundary
            if (Math.abs(rawIndex - index) > threshold) {
                // If we're between cards, snap to the closest one
                scrollToCard(Math.round(rawIndex));
            } else {
                // Just update the index if we're already at a card boundary
                setCurrentIndex(index);
                local.onCardChange?.(index);
            }
        }, 150);

        setScrollData('scrollTimeout', timeout);
    };

    /**
     * Handles window resize to ensure proper card sizing and positioning
     */
    const handleResize = () => {
        const container = containerRef();
        if (!container) return;

        // Update mobile state
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth < 768);

            // Re-align to current card
            container.scrollTo({
                top: currentIndex() * window.innerHeight,
                behavior: 'auto'
            });
        }
    };

    // Set up event listeners
    onMount(() => {
        const container = containerRef();
        if (!container) return;

        container.addEventListener('scroll', handleScroll, { passive: true });

        if (typeof window !== 'undefined') {
            // Initialize isMobile now that we're on the client
            setIsMobile(window.innerWidth < 768);
            window.addEventListener('resize', handleResize);

            // Ensure we start at the top
            container.scrollTo(0, 0);
        }

        onCleanup(() => {
            container.removeEventListener('scroll', handleScroll);

            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }

            if (scrollData.scrollTimeout !== null) {
                window.clearTimeout(scrollData.scrollTimeout);
            }
        });
    });

    return (
        <div class="relative w-full h-screen overflow-hidden">
            {/* Main scrollable container */}
            <div
                ref={setContainerRef}
                class="w-full h-full overflow-y-scroll overscroll-y-none snap-y snap-mandatory"
                style={{ 'scroll-behavior': 'smooth' }}
            >
                {/* Map each child to a full-height section */}
                {childrenArray().map((child, index) => (
                    <div
                        class="w-full h-screen snap-start flex flex-col items-center justify-center"
                        data-index={index}
                    >
                        <div class={`w-full h-full ${isMobile() ? 'py-4 px-3' : ''}`}>
                            {child}
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation indicators */}
            {showIndicators && childrenArray().length > 1 && (
                <div
                    class={`fixed top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-10 ${indicatorPosition === 'left' ? 'left-6' : 'right-6'
                        } ${isMobile() ? 'right-3' : ''}`}
                >
                    {childrenArray().map((_, index) => (
                        <button
                            class={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${indicatorColor}`}
                            classList={{
                                'opacity-100 scale-125': currentIndex() === index,
                                'opacity-50 hover:opacity-75': currentIndex() !== index
                            }}
                            onClick={() => scrollToCard(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={currentIndex() === index ? 'true' : 'false'}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};