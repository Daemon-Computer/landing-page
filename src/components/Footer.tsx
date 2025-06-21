import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer class={styles.footer} role="contentinfo"> {/* Added role */}
            <div class={styles.footerContent}>
                {/* Added nav element for semantics and accessibility */}
                <nav class={styles.navLinks} aria-label="Footer Navigation">
                    <a href="#" class={styles.navLink} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('scrollToSection', { detail: { index: 1 } })); }}>
                        NFT Showcase
                    </a>
                    <a href="#" class={styles.navLink} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('scrollToSection', { detail: { index: 2 } })); }}>
                        Demo
                    </a>
                    <a href="#" class={styles.navLink} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('scrollToSection', { detail: { index: 3 } })); }}>
                        Roadmap
                    </a>
                    <a href="#" class={styles.navLink} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('scrollToSection', { detail: { index: 4 } })); }}>
                        Community
                    </a>
                    <a href="#" class={styles.navLink} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('scrollToSection', { detail: { index: 5 } })); }}>
                        Sign Up
                    </a>
                </nav>


                <div class={styles.additionalLinks}>
                    {/* Added placeholder hrefs - update these */}
                    <a href="/docs" class={styles.additionalLink}>Documentation</a>
                    <a href="/faq" class={styles.additionalLink}>FAQ</a>
                    <a href="/terms" class={styles.additionalLink}>Terms</a>
                </div>

                <div class={`${styles.copyright} text-blue-500`}>
                    {/* Use copyright symbol */}
                    © {new Date().getFullYear()} DAE-MON - All rights reserved
                </div>
            </div>
        </footer>
    );
}