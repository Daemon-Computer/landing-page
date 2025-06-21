import { createSignal, onMount, onCleanup } from "solid-js";
import styles from "./Roadmap.module.css";
import win98 from "./Windows98.module.css";

export default function Roadmap() {
  const [isMobile, setIsMobile] = createSignal<boolean>(false);
  const currentDate = new Date();
  const phases = [
    {
      title: "Phase 1 - Pitch Demo",
      targetDate: "Q2 2025",
      description: "Initial project demonstration and concept validation.",
      startDate: new Date("2025-04-01"),
      endDate: new Date("2025-06-01"),
    },
    {
      title: "Phase 2 - Optimizations & Content",
      targetDate: "Q3 2025",
      description: "Platform optimizations and additional content development.",
      startDate: new Date("2025-06-02"),
      endDate: new Date("2025-09-30"),
    },
    {
      title: "Phase 3 - Program Battling",
      targetDate: "Q4 2025",
      description: "Implementation of program battle mechanics and systems.",
      startDate: new Date("2025-10-01"),
      endDate: new Date("2025-12-31"),
    },
    {
      title: "Phase 4 - Mainnet Ready",
      targetDate: "Q1 2026",
      description:
        "Platform prepared for mainnet deployment with full functionality.",
      startDate: new Date("2025-10-01"),
      endDate: new Date("2026-03-31"),
    },
    {
      title: "Phase 5 - Program Breeding",
      targetDate: "Q1 2026",
      description:
        "Launch of program breeding mechanics and genetic inheritance system.",
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-03-31"),
    },
    {
      title: "Phase 6 - Competitive Tournaments & Prize Pools",
      targetDate: "Q2 2026",
      description:
        "Introduction of tournament structures and competitive gameplay with prizes.",
      startDate: new Date("2026-04-01"),
      endDate: new Date("2026-06-30"),
    },
    {
      title: "Phase 7 - Content Updates",
      targetDate: "TBD",
      description: "Continuous development of new content and features.",
      startDate: null,
      endDate: null,
    },
  ].map((phase) => {
    const completed = phase.endDate ? currentDate > phase.endDate : false;
    const current =
      !completed && phase.startDate && phase.endDate
        ? currentDate >= phase.startDate && currentDate <= phase.endDate
        : false;
    const status = completed
      ? "Completed"
      : current
        ? "In Progress"
        : "Upcoming";
    const progressValue = completed ? 100 : current ? 50 : 0;
    return { ...phase, completed, current, status, progressValue };
  });

  const roadmapTitleId =
    "roadmap-title-" + Math.random().toString(36).substring(2, 9);

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
  });

  onCleanup(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", handleResize);
    }
  });

  return (
    <div class="flex flex-col w-full h-full bg-transparent items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div
        class={`${isMobile() ? "w-full" : "w-full max-w-4xl"} ${win98.window} text-black flex flex-col ${isMobile() ? "max-h-[90vh]" : "max-h-[70vh] lg:max-h-[85vh]"}`}
        role="region"
        aria-labelledby={roadmapTitleId}
      >
        <div class={`${win98.titleBar} flex-shrink-0`}>
          <div class={win98.titleBarText} id={roadmapTitleId}>
            Development Timeline
          </div>
        </div>
        <div
          class={`${win98.windowBody} p-3 md:p-6 overflow-y-auto flex-grow min-h-0`}
        >
          <div class={styles.timeline}>
            {phases.map((phase, index) => (
              <div
                class={styles.timelineItem}
                aria-label={`${phase.title}, Target: ${phase.targetDate}, Status: ${phase.status}`}
              >
                <div
                  class={styles.timelineIcon}
                  classList={{
                    [styles.completed]: phase.completed,
                    [styles.current]: phase.current,
                  }}
                  aria-hidden="true"
                >
                  {phase.completed ? "✓" : index + 1}
                </div>
                <div class={styles.timelineContent}>
                  <div
                    class={`flex ${isMobile() ? "flex-col items-start" : "flex-col sm:flex-row justify-between items-start"} gap-2 mb-2`}
                  >
                    <h3
                      class={`${isMobile() ? "text-base" : "text-lg sm:text-xl"} font-bold`}
                    >
                      {phase.title}
                    </h3>
                    <span class="text-xs sm:text-sm font-bold bg-gray-200 px-2 py-1 rounded whitespace-nowrap">
                      {phase.targetDate}
                    </span>
                  </div>
                  <p class={`${isMobile() ? "text-xs" : "text-sm"} mb-3`}>
                    {phase.description}
                  </p>
                  <div class={styles.progressContainer}>
                    <div
                      class={win98.progressBar}
                      role="progressbar"
                      aria-valuenow={phase.progressValue}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-label={`${phase.title} progress`}
                    >
                      <div
                        class={win98.progressBarFill}
                        style={{ width: `${phase.progressValue}%` }}
                      ></div>
                    </div>
                    <span class="text-xs sm:text-sm mt-1 block">
                      {phase.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
