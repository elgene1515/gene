<template>
    <section id="projects" class="space-section" v-reveal>
        <div class="container">
            <div class="section-header">
                <span class="mono-step">02.</span>
                <h2>Projects</h2>
            </div>

            <div class="control-deck">
                <button 
                    v-for="tag in tags" 
                    :key="tag"
                    :class="['deck-btn', { active: isTagActive(tag) }]"
                    @click="toggleTag(tag)"
                >
                    {{ tag }}
                </button>
            </div>

            <div class="card-grid">
                <TransitionGroup v-if="filteredProjects.length > 0" name="deck">
                    <div v-for="project in filteredProjects" :key="project.id" class="project-card">
                        <div class="inner-card">
                            <div class="card-top">
                                <div class="title-group">
                                    <h3>{{ project.title }}</h3>
                                    <span v-if="project.role" class="role-badge">{{ project.role }}</span>
                                </div>
                            </div>
                                                        
                            <p class="project-desc">{{ project.desc }}</p>
                            
                            <div class="pill-rack">
                                <span v-for="tech in project.stack" :key="tech" class="pill">{{ tech }}</span>
                            </div>
                            
                            <div class="links-footer">
                                <a :href="project.source" target="_blank" aria-label="GitHub Repository">
                                    <Github :size="18"/>
                                </a>
                                <a :href="project.live" target="_blank" aria-label="Live Target Access">
                                    <ExternalLink :size="18"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </TransitionGroup>

                <Transition v-else name="fade-state">
                    <div class="empty-state">
                        <div class="empty-icon">📁</div>
                        <h3>No Projects Found</h3>
                        <p>No listings match all of your selected stack criteria: <strong>{{ activeFiltersDisplay }}</strong></p>
                        <button class="clear-btn" @click="resetFilters">Reset Filters</button>
                    </div>
                </Transition>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import { Github, ExternalLink } from 'lucide-vue-next'

    const selectedTags = ref(['All'])
    const tags = ['All', 'Vue', 'Laravel', 'JavaScript', 'TypeScript', 'Java', 'Django', 'Python', 'C#', ]

    const projects = ref([
        {
            id: 1,
            title: 'VisiThoughts (Thesis)',
            desc: 'Engineered a lexicon-based sentiment analysis engine using Natural Language Processing (NLP) to process high-volume campus feedback. Developed the backend data extraction infrastructure and built interactive charts to translate raw textual metrics into actionable insights for the administration team.',
            role: 'Lead Programmer',
            stack: ['Python', 'Django', 'NLTK', 'HTML5', 'CSS3', 'JavaScript', 'Adobe Photoshop'],
            source: 'https://github.com/elgene1515/Visithoughts',
            live: 'https://github.com/elgene1515/Visithoughts'
        },
        {
            id: 2,
            title: 'Pop and Match (2D Game)',
            desc: 'Developed game logic and state management in C# for a 2D game, handling asset optimization and responsive UI scaling.',
            role: 'Lead Programmer & Graphic Artist',
            stack: ['C#', 'Unity', 'Adobe Photoshop', 'Adobe Illustrator'],
            source: 'https://github.com/elgene1515/POPandMATCH',
            live: 'https://github.com/elgene1515/POPandMATCH'
        },
        {
            id: 3,
            title: 'Pharmacy Information System',
            desc: 'Designed and implemented a desktop-based management system using Java and OOP principles to streamline inventory tracking and prescription processing.',
            role: 'Java Developer | Java Trainee',
            stack: ['Java', 'OOP'],
            source: 'https://github.com/elgene1515/Pharmacy-Information-System',
            live: 'https://github.com/elgene1515/Pharmacy-Information-System'
        },
        {
            id: 3,
            title: 'Mich',
            desc: 'A beautiful personal website and automated booking platform built using Vue 3 TypeScript and Vite and SCSS. This serves as her professional digital space to showcase her teaching career and easily accept appointment requests from parents and students and other inquiries.',
            role: 'Web Developer',
            stack: ['Vue', 'TypeScript', 'SCSS'],
            source: 'https://github.com/elgene1515/mich',
            live: 'https://michellemartinez.vercel.app/'
        }
    ])

    const isTagActive = (tag) => {
        return selectedTags.value.includes(tag)
    }

    const toggleTag = (tag) => {
        if (tag === 'All') {
            selectedTags.value = ['All']
            return
        }

        selectedTags.value = selectedTags.value.filter(t => t !== 'All')

        if (selectedTags.value.includes(tag)) {
            selectedTags.value = selectedTags.value.filter(t => t !== tag)
            
            // Revert fallback to 'All' layout block if choices break down to zero
            if (selectedTags.value.length === 0) {
                selectedTags.value = ['All']
            }
        } else {
            selectedTags.value.push(tag)
        }
    }

    const resetFilters = () => {
        selectedTags.value = ['All']
    }

    const filteredProjects = computed(() => {
        if (selectedTags.value.includes('All')) return projects.value
        
        return projects.value.filter(project => {
            return selectedTags.value.every(tag => project.stack.includes(tag))
        })
    })

    const activeFiltersDisplay = computed(() => {
        return selectedTags.value.join(', ')
    })
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
            }
            
            .control-deck {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 3rem;
                overflow-x: auto;
                padding-bottom: 0.5rem;
                -webkit-overflow-scrolling: touch;
                
                &::-webkit-scrollbar { display: none; }
            
                .deck-btn {
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    color: var(--text-muted);
                    padding: 0.4rem 1.2rem;
                    border-radius: 30px;
                    font-family: var(--font-mono);
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                
                .deck-btn:hover, .deck-btn.active {
                    background: var(--accent-glow);
                    color: var(--accent);
                    border-color: var(--accent);
                }
            }
            
            .card-grid {
                position: relative;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
                gap: 1.5rem;
                
                .project-card {
                    background: var(--bg-card);
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    transition: border-color 0.3s, transform 0.3s;
                    
                    &:hover {
                        border-color: rgba(56, 189, 248, 0.25);
                        transform: translateY(-4px);
                    }
                    
                    .inner-card {
                        padding: 2.2rem;
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                        
                        .card-top {
                            margin-bottom: 1rem;
                            width: 100%;
                            
                            .title-group {
                                display: flex;
                                flex-direction: column;
                                align-items: flex-start;
                                gap: 0.4rem; /* Balanced spacing between title and badge */

                                h3 {
                                    font-size: 1.3rem;
                                    font-weight: 700;
                                    color: var(--text-main);
                                    line-height: 1.3;
                                }
                                
                                .role-badge {
                                    font-family: var(--font-mono);
                                    font-size: 0.68rem;
                                    color: var(--accent);
                                    background: var(--accent-glow);
                                    padding: 0.2rem 0.55rem;
                                    border-radius: 4px;
                                    border: 1px solid rgba(56, 189, 248, 0.15);
                                    display: inline-block;
                                }
                            }
                        }
                        
                        .project-desc {
                            color: var(--text-muted);
                            font-size: 0.92rem;
                            line-height: 1.6;
                            margin-bottom: 1.5rem;
                            flex-grow: 1;
                        }

                        .pill-rack {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 0.4rem;
                            margin-bottom: 1.5rem;
                            
                            .pill {
                                font-family: var(--font-mono);
                                font-size: 0.75rem;
                                background: rgba(255, 255, 255, 0.03);
                                color: var(--text-muted);
                                padding: 0.2rem 0.6rem;
                                border-radius: 4px;
                                border: 1px solid rgba(255, 255, 255, 0.02);
                            }
                        }

                        .links-footer {
                            display: flex;
                            gap: 1.2rem;
                            
                            a {
                                color: var(--text-muted);
                                transition: color 0.2s;
                                display: inline-flex;
                                align-items: center;
                                
                                &:hover {
                                    color: var(--accent);
                                }
                            }
                        }
                    }
                }

                .empty-state {
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 4rem 2rem;
                    background: rgba(255, 255, 255, 0.01);
                    border: 1px dashed rgba(255, 255, 255, 0.08);
                    border-radius: 12px;

                    .empty-icon {
                        font-size: 2.5rem;
                        margin-bottom: 1rem;
                        opacity: 0.6;
                    }

                    h3 {
                        color: var(--text-main);
                        font-size: 1.2rem;
                        margin-bottom: 0.5rem;
                    }

                    p {
                        color: var(--text-muted);
                        font-size: 0.9rem;
                        margin-bottom: 1.5rem;
                        
                        strong {
                            color: var(--accent);
                        }
                    }

                    .clear-btn {
                        background: transparent;
                        border: 1px solid var(--accent);
                        color: var(--accent);
                        padding: 0.5rem 1.5rem;
                        border-radius: 4px;
                        font-family: var(--font-mono);
                        font-size: 0.8rem;
                        cursor: pointer;
                        transition: all 0.2s;

                        &:hover {
                            background: var(--accent-glow);
                        }
                    }
                }
            }
        }
    }

    .deck-enter-active, .deck-leave-active {
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .deck-enter-from, .deck-leave-to {
        opacity: 0;
        transform: translateY(15px) scale(0.98);
    }
    .deck-leave-active {
        position: absolute;
    }
    .deck-move {
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .fade-state-enter-active, .fade-state-leave-active {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .fade-state-enter-from, .fade-state-leave-to {
        opacity: 0;
        transform: scale(0.98);
    }
</style>