import { createSignal, onMount, onCleanup } from "solid-js";
import styles from "./NFTShowcase.module.css";
import win98 from "./Windows98.module.css";

interface ProgramType {
  id: string;
  name: string;
  description: string;
  color: string;
  borderColor: string;
}

// Shared Program Archetypes data
const programTypes: ProgramType[] = [
  {
    id: "virus",
    name: "Virus",
    description: "High attack, focuses on Damage Over Time (DOT)",
    color: "bg-red-400",
    borderColor: "#f87171",
  },
  {
    id: "firewall",
    name: "Firewall",
    description: "High defense, focuses on positive statuses",
    color: "bg-blue-400",
    borderColor: "#60a5fa",
  },
  {
    id: "data",
    name: "Data",
    description: "Balanced programs with versatile abilities",
    color: "bg-green-400",
    borderColor: "#4ade80",
  },
  {
    id: "malware",
    name: "Malware",
    description: "High speed, focuses on negative statuses",
    color: "bg-purple-400",
    borderColor: "#c084fc",
  },
  {
    id: "encryption",
    name: "Encryption",
    description:
      "Mysterious programs with unpredictable powers. Even we don't know what they do!",
    color: "bg-yellow-400",
    borderColor: "#facc15",
  },
  // { id: 'glitch', name: 'Glitch', description: 'Rare programs with unique and powerful abilities', color: 'bg-cyan-400', borderColor: '#22d3ee' }
];

// Shared program examples data
const programs: { src: string; alt: string }[] = [
  {
    src: "/api/placeholder/300/300?text=Virus+Example",
    alt: "Example of a Virus type program",
  },
  {
    src: "/api/placeholder/300/300?text=Firewall+Example",
    alt: "Example of a Firewall type program",
  },
  {
    src: "/api/placeholder/300/300?text=Data+Example",
    alt: "Example of a Data type program",
  },
  {
    src: "/api/placeholder/300/300?text=Malware+Example",
    alt: "Example of a Malware type program",
  },
];

// Program Collection Window Component for mobile use
export function ProgramCollectionWindow() {
  const [activeType, setActiveType] = createSignal<string>("Virus");
  const [animateStep, setAnimateStep] = createSignal<number>(0);

  let animationInterval: number;

  onMount(() => {
    if (typeof window !== "undefined") {
      animationInterval = window.setInterval(() => {
        setAnimateStep((prev) => (prev + 1) % 3);
      }, 1500);
    }
  });

  onCleanup(() => {
    if (typeof window !== "undefined" && animationInterval) {
      clearInterval(animationInterval);
    }
  });

  const collectionTitleId =
    "collection-title-" + Math.random().toString(36).substring(2, 9);
  const typesLabelId =
    "types-label-" + Math.random().toString(36).substring(2, 9);

  return (
    <div
      class={`${win98.window} text-black w-full flex flex-col max-h-[85vh]`}
      role="region"
      aria-labelledby={collectionTitleId}
    >
      <div class={`${win98.titleBar} flex-shrink-0`}>
        <div class={win98.titleBarText} id={collectionTitleId}>
          Program Collection
        </div>
      </div>
      <div class={`${win98.windowBody} p-4 overflow-y-auto flex-grow min-h-0`}>
        <div class="mb-6 text-center">
          <h3 class="text-xl font-bold mb-2">Welcome to DAE-MON/S</h3>
          <p class="text-md">
            An accessible NFT-based program game where players discover digital
            creatures hiding in encrypted drives, nurture them through a
            nostalgic interface, and compete for real rewards.
          </p>
        </div>

        {/* Program Archetypes Showcase */}
        <div class="mb-6">
          <h4 class="text-lg font-bold mb-3" id={typesLabelId}>
            Program Archetypes
          </h4>
          <div class="bg-white p-4 border-2 border-[#985dff]">
            <div
              class="flex flex-wrap gap-2 mb-4 justify-center"
              role="tablist"
              aria-labelledby={typesLabelId}
            >
              {programTypes.map((type) => (
                <button
                  role="tab"
                  id={`type-tab-${type.id}`}
                  aria-controls={`type-panel-${type.id}`}
                  aria-selected={activeType() === type.name}
                  tabindex={activeType() === type.name ? 0 : -1}
                  class={`${styles.pixelIcon} cursor-pointer transition-all duration-300`}
                  classList={{
                    [type.color]: activeType() === type.name,
                    "bg-white": activeType() !== type.name,
                    [styles.pixelIconActive]: activeType() === type.name,
                  }}
                  onClick={() => setActiveType(type.name)}
                >
                  {type.name}
                </button>
              ))}
            </div>
            <div class="relative">
              {programTypes.map((type) => (
                <div
                  role="tabpanel"
                  id={`type-panel-${type.id}`}
                  aria-labelledby={`type-tab-${type.id}`}
                  class={`p-4 border-2 min-h-[80px] bg-white ${styles.typePanel}`}
                  style={{
                    "border-color":
                      activeType() === type.name ? type.borderColor : "#985dff",
                    "box-shadow":
                      activeType() === type.name
                        ? `0 0 8px 1px ${type.borderColor}40`
                        : "none",
                  }}
                  classList={{
                    block: activeType() === type.name,
                    hidden: activeType() !== type.name,
                    [styles.typePanelActive]: activeType() === type.name,
                  }}
                >
                  <div class="flex items-center mb-2">
                    <div
                      class={`w-4 h-4 mr-2 ${activeType() === type.name ? type.color : ""}`}
                    ></div>
                    <h5 class="font-bold">{type.name} programs</h5>
                  </div>
                  <p>{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Infographic */}
        <div class="mb-6">
          <h4 class="text-lg font-bold mb-3">How Programs Are Born</h4>
          <div class="bg-white p-4 border-2 border-[#985dff]">
            <div class="flex flex-col items-center">
              <div class={`${styles.encryptionStepsContainer} w-full max-w-lg`}>
                <div
                  class={`${styles.encryptionStep} transition-all duration-300`}
                  classList={{ [styles.activeStep]: animateStep() === 0 }}
                >
                  <div class="mb-1 text-center">
                    <span class="text-xl" aria-hidden="true">
                      💾
                    </span>
                  </div>
                  <p class="text-xs">Buy Encrypted Drive</p>
                </div>
                <div class={styles.encryptionArrow} aria-hidden="true">
                  →
                </div>
                <div
                  class={`${styles.encryptionStep} transition-all duration-300`}
                  classList={{ [styles.activeStep]: animateStep() === 1 }}
                >
                  <div class="mb-1 text-center">
                    <span class="text-xl" aria-hidden="true">
                      🔓
                    </span>
                  </div>
                  <p class="text-xs">Decrypt Drive</p>
                </div>
                <div class={styles.encryptionArrow} aria-hidden="true">
                  →
                </div>
                <div
                  class={`${styles.encryptionStep} transition-all duration-300`}
                  classList={{ [styles.activeStep]: animateStep() === 2 }}
                >
                  <div class="mb-1 text-center">
                    <span class="text-xl" aria-hidden="true">
                      🐉
                    </span>
                  </div>
                  <p class="text-xs">Get Unique Program</p>
                </div>
              </div>

              <div class="mt-6 w-full text-sm bg-gray-100 p-3 border border-gray-300">
                <p class="font-bold mb-1">What makes DAE-MONs special:</p>
                <p>
                  Each program is randomly generated based on the encrypted
                  drive you purchase. No two programs are alike!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What You Can Do */}
        <div class="mb-6">
          <h4 class="text-lg font-bold mb-3">
            What You Can Do With Your Programs
          </h4>
          <div class="bg-white p-4 border-2 border-[#985dff]">
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div class={`${styles.featureCard}`}>
                <span class={styles.featureIcon} aria-hidden="true">
                  ⚔️
                </span>
                <h5 class="font-bold text-sm mb-1">Battle</h5>
                <p class="text-xs">Compete against other players</p>
              </div>
              <div class={`${styles.featureCard}`}>
                <span class={styles.featureIcon} aria-hidden="true">
                  💕
                </span>
                <h5 class="font-bold text-sm mb-1">Breed</h5>
                <p class="text-xs">Create unique offspring</p>
              </div>
              <div class={`${styles.featureCard}`}>
                <span class={styles.featureIcon} aria-hidden="true">
                  💰
                </span>
                <h5 class="font-bold text-sm mb-1">Trade</h5>
                <p class="text-xs">Buy and sell programs</p>
              </div>
              <div class={`${styles.featureCard}`}>
                <span class={styles.featureIcon} aria-hidden="true">
                  🏆
                </span>
                <h5 class="font-bold text-sm mb-1">Compete</h5>
                <p class="text-xs">Win tournaments and prizes</p>
              </div>
              <div class={`${styles.featureCard}`}>
                <span class={styles.featureIcon} aria-hidden="true">
                  🌟
                </span>
                <h5 class="font-bold text-sm mb-1">Upgrade</h5>
                <p class="text-xs">Improve your program's abilities</p>
              </div>
              <div class={`${styles.featureCard}`}>
                <span class={styles.featureIcon} aria-hidden="true">
                  🎮
                </span>
                <h5 class="font-bold text-sm mb-1">Play</h5>
                <p class="text-xs">Have fun with your collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Key Features Window Component for mobile use
export function KeyFeaturesWindow() {
  const [currentProgram, setCurrentProgram] = createSignal<number>(0);

  let programInterval: number;

  onMount(() => {
    if (typeof window !== "undefined") {
      programs.forEach((p) => {
        const img = new Image();
        img.src = p.src;
      });
      programInterval = window.setInterval(() => {
        setCurrentProgram((prev) => (prev + 1) % programs.length);
      }, 3000);
    }
  });

  onCleanup(() => {
    if (typeof window !== "undefined" && programInterval) {
      clearInterval(programInterval);
    }
  });

  const featuresTitleId =
    "features-title-" + Math.random().toString(36).substring(2, 9);

  return (
    <div
      class={`${win98.window} text-black w-full flex flex-col max-h-[85vh]`}
      role="region"
      aria-labelledby={featuresTitleId}
    >
      <div class={`${win98.titleBar} flex-shrink-0`}>
        <div class={win98.titleBarText} id={featuresTitleId}>
          Key Features
        </div>
      </div>
      <div class={`${win98.windowBody} p-4 overflow-y-auto flex-grow min-h-0`}>
        <div class="flex flex-col gap-8">
          {/* Game Features */}
          <div class="">
            <h4 class="text-lg font-bold mb-4">Game Highlights</h4>
            <div class="flex flex-col items-center mb-6">
              <div class={`${styles.statCounter} mb-4 max-w-xs w-full mx-auto`}>
                <div class={styles.infinitySymbol} aria-hidden="true">
                  ∞
                </div>
                <span class={styles.statLabel}>UNIQUE PROGRAMS</span>
              </div>
              <p class="text-sm text-center max-w-md">
                Every program you discover is completely unique - no two players
                will ever have identical creatures in their collection!
              </p>
            </div>

            {/* Program Showcase - Hidden because we don't have images */}
            {/* <div class="flex flex-col items-center">
              <div class={styles.programCardContainer}>
                <button
                  class={styles.programCard}
                  aria-label={`View details for ${programs[currentProgram()].alt}`}
                >
                  <img
                    src={programs[currentProgram()].src}
                    alt={programs[currentProgram()].alt}
                    class={styles.programImage}
                    loading="lazy"
                    width="300"
                    height="300"
                  />
                  <div class={styles.pixelatedBg}></div>
                </button>
                <div class="mt-4 text-center text-xs">
                  <p>Click the program card to see details</p>
                </div>
              </div>
            </div> */}
            <div class="my-4 border-t border-gray-400 pt-4">
              <h5 class="font-bold mb-3">Game Mechanics</h5>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class={`${styles.featureCard}`}>
                  <span class={styles.featureIcon} aria-hidden="true">
                    🧩
                  </span>
                  <h6 class="font-bold text-sm mb-1">Procedural Generation</h6>
                  <p class="text-xs">
                    Flexible addon-based system that expands with more parts
                    over time, adding extreme and unimaginable variety as
                    expansions are added
                  </p>
                </div>
                <div class={`${styles.featureCard}`}>
                  <span class={styles.featureIcon} aria-hidden="true">
                    ⚖️
                  </span>
                  <h6 class="font-bold text-sm mb-1">Corruption System</h6>
                  <p class="text-xs">
                    Risk and reward system where battles can impact your program
                    - benefits and negatives depend on whether you win or lose
                  </p>
                </div>
                <div class={`${styles.featureCard}`}>
                  <span class={styles.featureIcon} aria-hidden="true">
                    🏆
                  </span>
                  <h6 class="font-bold text-sm mb-1">Tournaments & Rewards</h6>
                  <p class="text-xs">
                    AI boss battles and PvP tournaments funded by collection
                    profits - skill-based rewards with airdrop opportunities for
                    active players willing to risk their daemons
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main NFTShowcase component (for desktop)
export default function NFTShowcase() {
  const [currentProgram, setCurrentProgram] = createSignal<number>(0);
  const [activeType, setActiveType] = createSignal<string>("Virus");
  const [animateStep, setAnimateStep] = createSignal<number>(0);
  const [isMobile, setIsMobile] = createSignal<boolean>(false);

  let programInterval: number;
  let animationInterval: number;

  const handleResize = () => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  };

  onMount(() => {
    // Initialize isMobile now that we're on the client
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
    }

    programs.forEach((p) => {
      const img = new Image();
      img.src = p.src;
    });
    programInterval = window.setInterval(() => {
      setCurrentProgram((prev) => (prev + 1) % programs.length);
    }, 3000);
    animationInterval = window.setInterval(() => {
      setAnimateStep((prev) => (prev + 1) % 3);
    }, 1500);
  });

  onCleanup(() => {
    clearInterval(programInterval);
    clearInterval(animationInterval);
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", handleResize);
    }
  });

  const collectionTitleId =
    "collection-title-" + Math.random().toString(36).substring(2, 9);
  const featuresTitleId =
    "features-title-" + Math.random().toString(36).substring(2, 9);
  const typesLabelId =
    "types-label-" + Math.random().toString(36).substring(2, 9);

  return (
    <div class="flex flex-col w-full h-full bg-transparent items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div
        class={`flex flex-col ${isMobile() ? "w-full gap-4" : "lg:flex-row w-full max-w-6xl gap-6"}`}
      >
        {/* Both windows in a single view for desktop */}
        <ProgramCollectionWindow />
        <KeyFeaturesWindow />
      </div>
    </div>
  );
}
