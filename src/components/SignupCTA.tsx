import styles from './SignupCTA.module.css';
import win98 from './Windows98.module.css';
import { createSignal, onMount, onCleanup } from 'solid-js';

export default function SignupCTA() {
    const [email, setEmail] = createSignal('');
    const [submitted, setSubmitted] = createSignal(false);
    const [isMobile, setIsMobile] = createSignal<boolean>(false);

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (email()) {
            setSubmitted(true);
        }
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

    const openSocialLink = (url: string) => {
        if (typeof window !== 'undefined') {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    const signupTitleId = 'signup-title-' + Math.random().toString(36).substring(2, 9);
    const emailInputId = 'signup-email-input-' + Math.random().toString(36).substring(2, 9);
    const emailDescId = 'signup-email-desc-' + Math.random().toString(36).substring(2, 9);

    return (
        <div class="flex flex-col w-full h-full bg-transparent items-center justify-center p-4 md:p-8 overflow-y-auto">
            <div class={`${isMobile() ? 'w-full' : 'w-full max-w-2xl'}`}>
                <div class={`${win98.window} flex flex-col ${isMobile() ? 'max-h-[90vh]' : 'max-h-[70vh] lg:max-h-[85vh]'}`} role="region" aria-labelledby={signupTitleId}>
                    <div class={`${win98.titleBar} flex-shrink-0`}>
                        <div class={win98.titleBarText} id={signupTitleId}>Stay Connected & Follow</div>
                    </div>
                    <div class={`${win98.windowBody} p-4 md:p-6 overflow-y-auto flex-grow min-h-0`}>
                        <section aria-labelledby="mailing-list-heading">
                            <h3 id="mailing-list-heading" class="text-xl font-bold mb-4">Stay Connected</h3>
                            <p class={`mb-4 ${isMobile() ? 'text-sm' : ''}`}>
                                Be the first to know when we drop new content! <br /><br />
                                Join our mailing list to receive updates about our launch, features, and exclusive offers.
                            </p>
                            <form onSubmit={handleSubmit} class={styles.signupForm} aria-label="Mailing list signup form (currently disabled)">
                                <div class="flex flex-col md:flex-row gap-3 mb-1">
                                    <div class="flex-grow">
                                        <label for={emailInputId} class="sr-only">Email Address</label>
                                        <input type="email" id={emailInputId} placeholder="Your email address" value={email()} onInput={(e) => setEmail(e.currentTarget.value)} required disabled={true} aria-describedby={emailDescId} class={`${win98.inputDisabled} w-full py-1 px-2 cursor-not-allowed`} />
                                    </div>
                                    <button type="submit" class={`${win98.buttonDisabled} whitespace-nowrap h-[30px] cursor-not-allowed`} disabled={true} aria-disabled="true"><strong>Sign Up</strong></button>
                                </div>
                                <div id={emailDescId} class="text-xs text-black italic mb-6 mt-1">
                                    We're currently building our mailing list functionality. Please check back later!
                                </div>
                            </form>
                        </section>

                        <section class="border-t border-gray-400 pt-5 mt-6" aria-labelledby="follow-us-heading">
                            <h3 id="follow-us-heading" class="font-bold mb-3">Follow Us</h3>
                            <div class={`flex ${isMobile() ? 'flex-col gap-3' : 'flex-col sm:flex-row gap-3 sm:gap-5'}`}>
                                <button class={`${win98.button} flex items-center justify-center`} onClick={() => openSocialLink('https://x.com/daemon_pc')} aria-label="Follow DAE-MON on X (formerly Twitter)"><span class="mr-2 text-xl" aria-hidden="true">🐦</span><span>Twitter / X</span></button>
                                <button class={`${win98.button} flex items-center justify-center`} onClick={() => openSocialLink('https://bsky.app/profile/daemon.computer')} aria-label="Follow DAE-MON on Bluesky"><span class="mr-2 text-xl" aria-hidden="true">🦋</span><span>Bluesky</span></button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}