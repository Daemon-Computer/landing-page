import { createSignal, onMount, onCleanup } from 'solid-js';
import styles from './Navbar.module.css';
import demoStyles from './DemoInvite.module.css';

export default function Navbar() {
    const [isMobile, setIsMobile] = createSignal<boolean>(false);

    const scrollToSection = (index: number) => {
        // This will trigger the vertical stack to scroll to the specified section
        const event = new CustomEvent('scrollToSection', { detail: { index } });
        window.dispatchEvent(event);
    };

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
    });

    onCleanup(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', handleResize);
        }
    });

    return (
        <header class={styles.navbar} role="banner">
            <div class={styles.navbarInner}>
                <a href="#" class={`${styles.logo} ${isMobile() ? styles.logoMobile : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection(0); }} aria-label="DAE-MON Home">
                    <img src='/images/daemon-title.avif' class={`${styles.logoImage} ${isMobile() ? styles.logoImageMobile : ''}`} alt="DAE-MON Logo" />
                </a>

                {!isMobile() && (
                    <nav class={styles.navLinks} aria-label="Main Navigation">
                        <button class={styles.navLink} onClick={() => scrollToSection(1)}>
                            NFT Showcase
                        </button>
                        <button class={styles.navLink} onClick={() => scrollToSection(2)}>
                            Demo
                        </button>
                        <button class={styles.navLink} onClick={() => scrollToSection(3)}>
                            Roadmap
                        </button>
                        <button class={styles.navLink} onClick={() => scrollToSection(4)}>
                            Sign Up
                        </button>
                        <button class={demoStyles.navDemoButton} onClick={() => scrollToSection(5)} aria-label="Try our Demo">
                            Try Demo
                        </button>
                    </nav>
                )}

                {!isMobile() && (
                    <div class={styles.socialIcons} aria-label="Social Media Links">
                        <a href="https://x.com/daemon_pc" target='_blank' rel="noopener noreferrer" class={styles.socialIcon} aria-label="Follow on X (formerly Twitter)">🐦</a>
                        <a href="https://bsky.app/profile/daemon.computer" target='_blank' rel="noopener noreferrer" class={styles.socialIcon} aria-label="Follow on Bluesky">🦋</a>
                    </div>
                )}
            </div>
        </header>
    );
}