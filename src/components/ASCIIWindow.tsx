import { createSignal, onMount } from 'solid-js';
import styles from './ASCIIWindow.module.css';

export default function TerminalAnimation() {
    const [terminalLines, setTerminalLines] = createSignal<string[]>([]);
    const [title, setTitle] = createSignal<string>('Terminal');
    const [cursorVisible, setCursorVisible] = createSignal<boolean>(true);

    const asciiLogo = `                                                                                                                                
                                                                                                                                
       ##%%                                                                                                          ##%%       
       #.....%%%%%%        %.. .  ..@                                                                             %.....%       
        #*.........:++*#   #........#%@     #%%%%%%%%%%             %+===-%       @+=-%    %%+==%%   %+++++%   %+.....-%        
          #:............#% %.........%%   @%...........%          %%%.....%     @%....%  %#.......#%%%.....#%%%......#          
            #.............%%.........%%% #.............%#        %%%%.....+%   %......% %%.........%%%......%%%....%            
             %.....%#......%.........:%%  #.....##%%%%%%%        %%%%......: %........%%%...........#%.......%%....%            
             %.....%%......%..........=%% #.....%%%%%%%%%        %%%%.................%%.....%%#.....%........%....%            
             %.....%%......%.....%....+%% %...........%%%..........%%.................%%.....%%%.....%.............%            
             %:::::%+:::::%%:::::%%::::%%%%:::::::::::%%%-:::::::::%%:::::::::::::::::%%::::-%%%:::::%:::::::::::::%            
             %:::::::::::%%%:::::%%:::::%%%:::::%%%%%%%%%%%%%%%%#%%%%:::::*:::::%:::::%%::::::%::::::%:::::%:::::::%            
             %:::::::::%#%%%::::::::::::#%%:::::%%%%%%%%%%%%%%%%%%%%%:::::*::::%%:::::%%:::::::::::::%:::::%%::::::%            
             %:::::::%%%%%%%::::::::::::#%%:::::::::::%%         %%%%:::::%#:%%%%:::::%%%:::::::::::%%:::::%%%:::::%            
             %--:-###%%%%% %:::::#%%::::#%%:---:::::::%%%        %%%%%::::%% %%%%%::::%%%%#%:::-:%%%%%:::::%%%%::::#            
               %%%%%%%%%     %%::%%%%%%%%%%%%%%%%%%%%%%%%        %%%%%##::%  %%%%%%%::%%%%%%%%%%% %%%%%%:::%%%%%%%              
                 %%%%          %%%%%% %%%%%   %%%%%%%%%%%          %%%%%%      %%%%%%    %%%%%     %%%%%%%% %%%%@               
                                  %%                                 %%          %%                  %%%%                       
                                                                                                                                
                                                                                                                                `;

    onMount(() => {
        const cursorInterval = setInterval(() => {
            setCursorVisible(prev => !prev);
        }, 500);

        startAnimation();

        return () => clearInterval(cursorInterval);
    });

    const startAnimation = (): void => {
        setTerminalLines(['user@home:~$']);

        // First command appears (after 200ms)
        setTimeout(() => {
            setTerminalLines(['user@home:~$ uname -a']);
        }, 200);

        // System output (after 400ms)
        setTimeout(() => {
            setTerminalLines([
                'user@home:~$ uname -a',
                'Linux workstation 6.5.0-25-generic #25-Ubuntu SMP x86_64 GNU/Linux',
                'user@home:~$'
            ]);
        }, 400);

        // Second command (after 800ms)
        setTimeout(() => {
            setTerminalLines(prev => [
                ...prev,
                'cat /etc/issue.net && ./launch_secure_connection'
            ]);
        }, 800);

        // ASCII logo appears (after 1200ms)
        setTimeout(() => {
            const logoLines = asciiLogo.split('\n');
            setTerminalLines(prev => [
                ...prev,
                'Secure Network Terminal v3.2.1',
                'Establishing connection...',
                ...logoLines,
                'root@daemon:~$'
            ]);

            // Change the title
            setTitle('Welcome Runner');
        }, 1200);
    };

    const terminalContent = (): string => {
        const lines = [...terminalLines()];
        if (lines.length > 0) {
            // Add cursor to the last line
            const lastLineIndex = lines.length - 1;
            lines[lastLineIndex] = lines[lastLineIndex] + (cursorVisible() ? ' _' : '  ');
        }
        return lines.join('\n');
    };

    // Unique ID for ARIA labelling
    const titleId = 'ascii-window-title-' + Math.random().toString(36).substring(2, 9);

    return (
        // Adjusted sizing for responsiveness: full width, max-width, auto height on small screens, fixed height on medium+
        <div
            class={`${styles.asciiWindow} w-full max-w-2xl h-auto md:h-96 mb-12 overflow-hidden`}
            role="region" // Added role for semantic landmark
            aria-labelledby={titleId} // Link title for screen readers
        >
            <div class={styles.windowTitle}>
                <p class='ml-2' id={titleId}>{title()}</p> {/* Added ID for aria-labelledby */}
            </div>
            {/* Added role="log" and aria-live="polite" for screen readers to potentially announce updates */}
            <div
                class={`${styles.windowBody} text-[8px] bg-black overflow-auto h-[88%]`}
                role="log"
                aria-live="polite"
            >
                <div class='h-full ml-1'>
                    <pre aria-label="Terminal output" class='max-w-full'>{terminalContent()}</pre> {/* Added aria-label for context */}
                </div>
            </div>
        </div>
    );
}