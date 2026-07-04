<template>
    <section id="about-me" class="space-section" v-reveal>
        <div class="container">
            <div class="section-header">
                <span class="mono-step">04.</span>
                <h2>About Me</h2>
            </div>

            <div class="about-grid">
                <div class="about-text">
                    <p>
                        My journey into tech started in the fifth grade at a local computer shop, paired with playing chess after school with the trike drivers by the school gate. Chess taught me to love strategic and logical reasoning. By high school, I was searching and customizing internet VBScripts to drop into my Windows startup folder so my PC would greet me like Iron Man’s J.A.R.V.I.S. when it booted up, while movies like Chappie sparked a dream of one day transferring human consciousness into a machine. This fascination with automation, software development, and pushing the boundaries of what computers can do made pursuing a Computer Science degree a natural choice.
                    </p>
                    <p>
                        Today, I work as a Full-Stack Software Developer, exploring backend ecosystems and modern user interfaces. In my role, full-stack means independently managing the entire lifecycle of a system—from planning, requirements gathering and analysis up to building responsive client-side interfaces, designing backend logic, database design, deployment and maintenance. My core engineering toolkit centers on Vue 3, Laravel, PHP, and Node.js, utilizing GitLab for system version control, while deploying personal side projects using Vercel and GitHub.
                    </p>
                    <p>
                        When I step away from the code, I balance my time between creative design and the real world. I work as a freelance computer technician and graphic designer, using Adobe Photoshop, Illustrator, and Premiere Pro to craft logos, vector art, and video edits—a background that keeps me constantly planning and testing new entrepreneurial business ventures. To stay grounded, I regularly unplug to explore nature through mountain hiking, camping, or biking to hidden waterfalls, balancing those outdoor adventures with casual gaming, logic puzzles, and watching anime and movies.
                    </p>
                </div>

                <div class="about-aside">
                    <div class="frame-container">
                        <div class="avatar-placeholder">
                            <img src="@/assets/elgene.png" alt="Elgene Reyes">
                        </div>
                        <div class="frame-accent"></div>
                    </div>

                    <div class="meta-container">                        
                        <!-- Education Block -->
                        <div class="meta-block">
                            <h3>Education</h3>
                            <div v-for="(education, educationIndex) in educations" :key="educationIndex" class="meta-item">
                                <span class="meta-title">{{ education.degree }}</span>
                                <span class="meta-sub font-accent">{{ education.honor }}</span>
                                <span class="meta-sub">{{ education.school }}</span>
                                <span class="meta-date">{{ education.years }}</span>
                            </div>
                        </div>

                        <!-- Achievements Block -->
                        <div class="meta-block">
                            <h3>Major Achievements</h3>
                            <div v-for="(achievement, achievementIndex) in achievements" :key="achievementIndex" class="meta-item" :class="{ 'mt-3': achievementIndex > 0 }">
                                <span class="meta-title">{{ achievement.title }}</span>
                                <span class="meta-sub">{{ achievement.subtitle }}</span>
                                <span v-if="achievement.date" class="meta-date">{{ achievement.date }}</span>
                            </div>
                        </div>

                        <!-- Technical Certifications Block -->
                        <div class="meta-block">
                            <h3>Technical Certifications</h3>
                            <div class="cert-timeline">
                                <div v-for="(certification, certificationIndex) in certifications" :key="certificationIndex" class="cert-node">
                                    <span class="cert-title">{{ certification.title }}</span>
                                    <span class="cert-provider">{{ certification.provider }} • {{ certification.date }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Languages Block -->
                        <div class="meta-block">
                            <h3>Languages</h3>
                            <div class="meta-item">
                                <div class="meta-tags">
                                    <span v-for="(language, languageIndex) in languages" :key="languageIndex" class="tag">
                                        {{ language.name }} ({{ language.fluency }})
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    const educations = [
        {
            degree: 'B.S. in Computer Science',
            school: 'Cavite State University - CCAT',
            years: '2019 — 2024',
            honor: 'Magna Cum Laude'
        }
    ]

    const achievements = [
        {
            title: '1st Place Winner — CALABARZON Regional HackForGov 2',
            subtitle: 'Cavite State University (CvSU)',
            date: 'September 2023'
        },
        {
            title: 'Civil Service Professional Eligibility',
            subtitle: 'Honor Graduate Eligibility',
            date: ''
        }
    ]

    const certifications = [
        {
            title: 'Java (Core Competencies & OOP)',
            provider: 'Armada Logics',
            date: 'Nov 11 - Dec 20, 2024'
        },
        {
            title: 'Web Development (HTML, CSS, JavaScript)',
            provider: 'Armada Logics',
            date: 'Oct 21 - Nov 8, 2024'
        },
        {
            title: 'Web Fundamentals',
            provider: 'Armada Logics',
            date: 'July 9, 2024 8hrs'
        },
        {
            title: 'Advanced UI/UX Concepts (4hrs) & AI Prompt Engineering (4hrs)',
            provider: 'Armada Logics',
            date: 'July 8, 2024'
        }
    ]

    const languages = [
        { name: 'Tagalog', fluency: 'Native' },
        { name: 'English', fluency: 'Proficient' }
    ]
</script>

<style lang="scss" scoped>
    .space-section {
        padding: 6rem 0;
        
        .container {

            .section-header {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 3rem;
                
                .mono-step {
                    font-family: var(--font-mono);
                    color: var(--accent);
                }

                h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    color: var(--text-main);
                }
            }

            .about-grid {
                display: grid;
                grid-template-columns: 3fr 2fr;
                gap: 4rem;
                align-items: flex-start;
                
                .about-text p {
                    color: var(--text-muted);
                    font-size: 1.05rem;
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }
    
                .about-aside {
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                    
                    .frame-container {
                        position: relative;
                        width: 260px;
                        height: 260px;
                        margin: 0 auto;
                        
                        .avatar-placeholder {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            background: var(--bg-card);
                            border: 1px solid rgba(56, 189, 248, 0.3);
                            border-radius: 8px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: var(--accent);
                            font-family: var(--font-mono);
                            font-weight: bold;
                            z-index: 2;
                            transition: transform 0.3s ease;
                            overflow: hidden; 
    
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                display: block;
                            }
                        }
                        
                        .frame-accent {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            border: 2px solid var(--accent);
                            border-radius: 8px;
                            top: 15px;
                            left: 15px;
                            z-index: 1;
                            transition: transform 0.3s ease;
                        }
    
                        &:hover .avatar-placeholder {
                            transform: translate(-4px, -4px);
                        }
                        
                        &:hover .frame-accent {
                            transform: translate(4px, 4px);
                        }
                    }
    
                    .meta-container {
                        display: flex;
                        flex-direction: column;
                        gap: 1.8rem;
                        max-width: 300px;
                        margin: 0 auto;
                        width: 100%;
    
                        .meta-block {
                            h3 {
                                font-family: var(--font-mono);
                                font-size: 0.85rem;
                                color: var(--accent);
                                text-transform: uppercase;
                                letter-spacing: 1.5px;
                                margin-bottom: 0.6rem;
                            }
    
                            .meta-item {
                                display: flex;
                                flex-direction: column;
                                
                                .meta-title {
                                    color: var(--text);
                                    font-size: 1rem;
                                    font-weight: 500;
                                }
                                .meta-sub {
                                    color: var(--text-muted);
                                    font-size: 0.85rem;
                                }
                                .font-accent {
                                    color: var(--accent);
                                    font-weight: 600;
                                }
                                .meta-date {
                                    color: var(--text-muted);
                                    font-family: var(--font-mono);
                                    font-size: 0.8rem;
                                    margin-top: 0.1rem;
                                }
                                .meta-tags {
                                    display: flex;
                                    gap: 0.5rem;
                                    flex-wrap: wrap;
            
                                    .tag {
                                        background: rgba(56, 189, 248, 0.08);
                                        border: 1px solid rgba(56, 189, 248, 0.15);
                                        color: var(--accent);
                                        padding: 0.2rem 0.6rem;
                                        border-radius: 4px;
                                        font-size: 0.8rem;
                                        font-family: var(--font-mono);
                                    }
                                }
                            }

                            .mt-3 { margin-top: 0.75rem; }

                            .cert-timeline {
                                display: flex;
                                flex-direction: column;
                                gap: 0.75rem;

                                .cert-node {
                                    display: flex;
                                    flex-direction: column;
                                    border-left: 1px solid rgba(56, 189, 248, 0.2);
                                    padding-left: 0.75rem;

                                    .cert-title {
                                        color: var(--text);
                                        font-size: 0.9rem;
                                        font-weight: 500;
                                    }
                                    .cert-provider {
                                        color: var(--text-muted);
                                        font-size: 0.8rem;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            @media (max-width: 768px) {
                .about-grid { 
                    grid-template-columns: 1fr; 
                    gap: 4rem; 
                    
                    .about-aside {
                        .frame-container { 
                            width: 220px; 
                            height: 220px; 
                        }
                        .meta-container {
                            max-width: 100%;
                        }
                    }
                }
            }
        }
    }
</style>