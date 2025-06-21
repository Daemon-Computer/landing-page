import { createSignal, onMount, onCleanup } from 'solid-js';
import { Meta, Title, Link } from "@solidjs/meta";
import HeroSection from "~/components/HeroSection";
import VerticalStack from "~/components/VerticalStack";
import Navbar from "~/components/Navbar";
import NFTShowcase, { ProgramCollectionWindow, KeyFeaturesWindow } from "~/components/NFTShowcase";
import InterfaceDemo, { DemoVideoWindow, GameplayLoopWindow } from "~/components/InterfaceDemo";
import Roadmap from "~/components/Roadmap";
import SignupCTA from "~/components/SignupCTA";
import DemoInvite from "~/components/DemoInvite";

export default function Home() {
  const [currentSection, setCurrentSection] = createSignal(0);
  const [isMobile, setIsMobile] = createSignal(false);

  const handleCardChange = (index: number) => {
    setCurrentSection(index);
  };

  // Check if the device is mobile based on screen width
  const checkMobile = () => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  };

  onMount(() => {
    // Initial check for mobile
    checkMobile();

    // Add resize event listener to update isMobile state
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
    }

    const handleScrollToSection = (e: CustomEvent) => {
      const verticalStack = document.querySelector('.vertical-stack-container');
      if (verticalStack) {
        const index = e.detail.index;
        const container = verticalStack.querySelector('.overflow-y-scroll');
        if (container && typeof window !== 'undefined') {
          container.scrollTo({
            top: index * window.innerHeight,
            behavior: 'smooth'
          });
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scrollToSection', handleScrollToSection as EventListener);
    }

    onCleanup(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scrollToSection', handleScrollToSection as EventListener);
        window.removeEventListener('resize', checkMobile);
      }
    });
  });

  return (
    <div class="relative bg-[url(/images/title-bg.avif)] bg-cover h-screen overflow-hidden">
      <Title>DAE-MON</Title>
      <Meta name="description" content="DAE-MONs are digital programs that live on your PC, providing ownership and fun gameplay through interactive battles and a virtual evolution system." />
      <Meta name="keywords" content="DAE-MON, monsters, programs, virtual pet, NFT, SUI" />
      <Meta property="og:title" content="DAE-MON" />
      <Meta property="og:description" content="DAE-MONs are digital programs that live on your PC, providing ownership and fun gameplay through interactive battles and a virtual evolution system." />
      <Meta property="og:image" content="/images/daemon-title.avif" />
      <Meta property="og:url" content="https://daemon.computer" />
      <Meta property="og:type" content="website" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content="DAE-MON" />
      <Meta name="twitter:description" content="DAE-MONs are digital programs that live on your PC, providing ownership and fun gameplay through interactive battles and a virtual evolution system." />
      <Meta name="twitter:image" content="/images/daemon-title.avif" />
      <Link rel="canonical" href="https://daemon.computer" />

      <Navbar />

      <div class="vertical-stack-container h-full pt-[40px]">
        {isMobile() ? (
          <VerticalStack
            threshold={0.1}
            transitionDuration={700}
            showIndicators={true}
            onCardChange={handleCardChange}
          >
            {/* Mobile views - each window gets its own section */}
            <HeroSection />
            <div class="w-full h-full flex items-center justify-center p-4">
              <ProgramCollectionWindow />
            </div>
            <div class="w-full h-full flex items-center justify-center p-4">
              <KeyFeaturesWindow />
            </div>
            <div class="w-full h-full flex items-center justify-center p-4">
              <DemoVideoWindow />
            </div>
            <div class="w-full h-full flex items-center justify-center p-4">
              <GameplayLoopWindow />
            </div>
            <Roadmap />
            <SignupCTA />
          </VerticalStack>
        ) : (
          <VerticalStack
            threshold={0.2}
            transitionDuration={700}
            showIndicators={true}
            onCardChange={handleCardChange}
          >
            {/* Desktop views - original multi-window layout */}
            <HeroSection />
            <NFTShowcase />
            <InterfaceDemo />
            <Roadmap />
            <SignupCTA />
            <DemoInvite />
          </VerticalStack>
        )}
      </div>
    </div>
  );
}