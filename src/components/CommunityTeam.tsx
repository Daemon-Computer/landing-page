import styles from './CommunityTeam.module.css';
import win98 from './Windows98.module.css';

export default function CommunityTeam() {
    const teamMembers = [
        { name: "Team Member 1", role: "Art Director", avatar: "/api/placeholder/48/48" },
        { name: "Team Member 2", role: "Lead Developer", avatar: "/api/placeholder/48/48" },
        { name: "Team Member 3", role: "Community Manager", avatar: "/api/placeholder/48/48" },
        { name: "Team Member 4", role: "Game Designer", avatar: "/api/placeholder/48/48" }
    ];

    const communityTitleId = 'community-title-' + Math.random().toString(36).substring(2, 9);
    const teamTitleId = 'team-title-' + Math.random().toString(36).substring(2, 9);
    const discordTitleId = 'discord-title-' + Math.random().toString(36).substring(2, 9);
    const twitterTitleId = 'twitter-title-' + Math.random().toString(36).substring(2, 9);
    const achievementsTitleId = 'achievements-title-' + Math.random().toString(36).substring(2, 9);

    return (
        <div class="flex flex-col w-full h-full bg-transparent items-center justify-center p-4 md:p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl text-black">
                {/* Community Section */}
                <div class={`${win98.window} flex flex-col max-h-[85vh]`} role="region" aria-labelledby={communityTitleId}>
                    <div class={`${win98.titleBar} flex-shrink-0`}>
                        <div class={win98.titleBarText} id={communityTitleId}>Community</div>
                    </div>
                    <div class={`${win98.windowBody} p-4 overflow-y-auto flex-grow min-h-0`}>
                        <section class={styles.discordFrame} aria-labelledby={discordTitleId}>
                            <div class={styles.chatHeader} id={discordTitleId}>Discord Chat</div>
                            <div class={`${styles.chatMessages} max-h-40`}>
                                <div class={styles.chatBubble}><span class={styles.username}>User1:</span><span>Just got my first program!</span></div>
                                <div class={styles.chatBubble}><span class={styles.username}>User2:</span><span>The rarity system is awesome</span></div>
                                <div class={styles.chatBubble}><span class={styles.username}>User3:</span><span>Can't wait for the next release</span></div>
                            </div>
                        </section>

                        <section class={styles.twitterFeed} aria-labelledby={twitterTitleId}>
                            <div class={styles.feedHeader} id={twitterTitleId}>Twitter Feed</div>
                            <div class={`${styles.tweets} max-h-40`}>
                                <div class={styles.tweet}><span class={styles.tweetUser}>@DAEMONs project:</span><span>New programs dropping next week! #NFT #Collectibles</span></div>
                                <div class={styles.tweet}><span class={styles.tweetUser}>@User1:</span><span>@DAEMONs project Love the new interface update!</span></div>
                            </div>
                        </section>

                        <section class={styles.achievements} aria-labelledby={achievementsTitleId}>
                            <h3 class="text-lg font-bold mb-2" id={achievementsTitleId}>Community Achievements</h3>
                            <div class="flex flex-wrap gap-2">
                                <div class={styles.achievementBadge}>1000+ Members</div>
                                <div class={styles.achievementBadge}>100+ Trades</div>
                                <div class={styles.achievementBadge}>Community Choice</div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Team Section */}
                <div class={`${win98.window} flex flex-col max-h-[85vh]`} role="region" aria-labelledby={teamTitleId}>
                    <div class={`${win98.titleBar} flex-shrink-0`}>
                        <div class={win98.titleBarText} id={teamTitleId}>Team</div>
                    </div>
                    <div class={`${win98.windowBody} p-4 overflow-y-auto flex-grow min-h-0`}>
                        <div class={styles.teamGrid}>
                            {teamMembers.map(member => (
                                <div class={styles.teamMember}>
                                    <div class={styles.avatarContainer}><div class={styles.pixelAvatar}><img src={member.avatar} alt={`Avatar for ${member.name}, ${member.role}`} class={styles.avatarImage} loading="lazy" /></div></div>
                                    <div class={styles.memberInfo}>
                                        <div class={styles.memberName}>{member.name}</div>
                                        <div class={styles.memberRole}>{member.role}</div>
                                        <div class={styles.socialIcons}>
                                            <span class={styles.socialIcon} role="img" aria-label="Twitter link">🐦</span>
                                            <span class={styles.socialIcon} role="img" aria-label="Website link">💻</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {teamMembers.map((member, index) => (
                                <div class={styles.teamMember}>
                                    <div class={styles.avatarContainer}><div class={styles.pixelAvatar}><img src={member.avatar} alt={`Avatar for ${member.name} Clone ${index + 1}, ${member.role}`} class={styles.avatarImage} loading="lazy" /></div></div>
                                    <div class={styles.memberInfo}>
                                        <div class={styles.memberName}>{member.name} Clone {index + 1}</div>
                                        <div class={styles.memberRole}>{member.role}</div>
                                        <div class={styles.socialIcons}>
                                            <span class={styles.socialIcon} role="img" aria-label="Twitter link">🐦</span>
                                            <span class={styles.socialIcon} role="img" aria-label="Website link">💻</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}