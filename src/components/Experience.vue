<template>
    <section id="experience" class="space-section" v-reveal>
        <div class="container">
            <div class="section-header">
                <span class="mono-step">01.</span>
                <h2>Professional Journey</h2>
            </div>

            <div class="timeline-wrapper">
                <div class="tabs-sidebar">
                    <button 
                        v-for="(job, jobIndex) in jobs" 
                        :key="jobIndex"
                        :class="['tab-btn', { active: activeTab === jobIndex, 'cta-tab': job.isCTA }]"
                        @click="activeTab = jobIndex"
                    >
                        <span class="company-name">{{ job.company }}</span>
                        <span class="role-subtext">{{ job.role }}</span>
                    </button>
                </div>

                <div class="content-panel">
                    <Transition name="fade-panel" mode="out-in">
                        <div :key="activeTab" class="panel-inner">
                            <h3 class="role-title">
                                {{ jobs[activeTab].role }} 
                                <span class="company-tag" v-if="!jobs[activeTab].isCTA" @click.stop="gotoCompanyWebsite(jobs[activeTab].link)">
                                    @ {{ jobs[activeTab].company }}
                                </span>
                            </h3>
                            <div class="time-stamp">
                                <Calendar :size="14" class="inline-icon" /> {{ displayDuration }}
                            </div>

                            <ul v-if="jobs[activeTab].points" class="duties-list">
                                <li v-for="(point, pointIndex) in jobs[activeTab].points" :key="pointIndex">
                                    {{ point }}
                                </li>
                            </ul>

                            <div v-if="!jobs[activeTab].isCTA && jobs[activeTab].tech" class="job-tech-stack">
                                <span v-for="(t, tIdx) in jobs[activeTab].tech" :key="tIdx" class="tech-badge">
                                    {{ t }}
                                </span>
                            </div>

                            <div class="cta-block">
                                <a v-if="jobs[activeTab].isCTA && jobs[activeTab].points" href="#contact" class="timeline-hire-btn">
                                    Hire Me ⚡
                                </a>

                                <div v-else-if="jobs[activeTab].isCTA && !jobs[activeTab].points" class="experience-chart-container">
                                    <div class="aggregate-summary-box">
                                        Total Combined Experience: <span class="highlight-metric">{{ totalCombinedExperience }}</span>
                                    </div>
                                    
                                    <div v-for="(graphItem, gIdx) in experienceGraphData" :key="gIdx" class="chart-row">
                                        <div class="chart-meta">
                                            <span class="chart-company">{{ graphItem.company }}</span>
                                            <span class="chart-role">{{ graphItem.role }}</span>
                                        </div>
                                        <div class="chart-bar-wrapper">
                                            <div class="chart-bar" :style="{ width: graphItem.percentageWidth + '%' }">
                                                <span class="bar-label">{{ graphItem.durationText }}</span>
                                            </div>
                                        </div>
                                        
                                        <div class="chart-tech-row" v-if="graphItem.tech.length">
                                            <span v-for="(t, tIdx) in graphItem.tech" :key="tIdx" class="mini-tech-badge">
                                                {{ t }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { Calendar } from 'lucide-vue-next';

    const activeTab = ref(0);

    const jobs = ref([
        {
            role: 'Full Stack Developer',
            company: 'HRD Singapore PTE LTD',
            duration: 'Feb 21, 2025 - Present',
            startDate: '2025-02-21', 
            endDate: null,
            link: 'https://www.linkedin.com/company/hrd-singapore-pte-ltd/about/',
            points: [
                'Developed and maintained scalable Single Page Applications (SPAs) using Vue.js, improving front-end modularity and user engagement.',
                'Engineered robust RESTful APIs using Laravel, Node.js, and Express.js to facilitate seamless data exchange between microservices.',
                'Optimized MySQL and MSSQL database runtimes, significantly lowering data retrieval latency for high-concurrency internal software.',
                'Collaborated within an Agile ecosystem, executing Git workflows and peer code reviews to enforce strict production standards.'
            ],
            tech: ['Laravel', 'VueJS', 'NodeJS', 'ExpressJS', 'PHP', 'JavaScript', 'HTML5', 'CSS3', 'SQL', 'SQLDBX', 'MSSQL']
        },
        {
            isCTA: true,
            company: '📊 Summary',
            role: 'Experience Break Down',
            duration: 'Overall Timeline Metrics',
            points: null
        },
        {
            isCTA: true,
            company: '👉 Hire Me Now',
            role: 'Your Next Engineering Asset',
            duration: 'Available Immediately',
            points: [
                'Ready to deploy production-grade code using Laravel, Vue 3, Node.js, and advanced database architectures.',
                'Open to full-time remote ecosystems or hybrid junior/mid-level software engineering configurations.',
                'Eager to solve complex scaling challenges, optimize database query runtimes, and design pixel-perfect interfaces.'
            ]
        }
    ])

    const displayDuration = computed(() => {
        const currentJob = jobs.value[activeTab.value];
        
        if (currentJob.isCTA || !currentJob.startDate) {
            return currentJob.duration;
        }

        const start = new Date(currentJob.startDate);
        const end = currentJob.endDate ? new Date(currentJob.endDate) : new Date();

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months -= 1;
        }
        if (months < 0) {
            years -= 1;
            months += 12;
        }

        // Build a human-readable string (e.g., "1 yr 4 mos" or "5 mos")
        let trackingString = '';
        if (years > 0) trackingString += `${years} ${years === 1 ? 'yr' : 'yrs'}`;
        if (months > 0) trackingString += `${years > 0 ? ' ' : ''}${months} ${months === 1 ? 'mos' : 'mos'}`;
        
        // Handle fallback if calculated values are less than a month
        if (years === 0 && months === 0) trackingString = '1 mos';

        return `${currentJob.duration} • (${trackingString})`;
    });

    function gotoCompanyWebsite(companyUrl) {
        if(companyUrl){
            window.open(companyUrl, '_blank')
        }
    }

    // Helper to extract total operational months per job entry
    const calculateMonths = (job) => {
        if (!job.startDate) return 0;
        const start = new Date(job.startDate);
        const end = job.endDate ? new Date(job.endDate) : new Date();

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        if (end.getDate() - start.getDate() < 0) months -= 1;

        return (years * 12) + months;
    };

    // Human-friendly month formatter
    const formatMonths = (totalMonths) => {
        const yrs = Math.floor(totalMonths / 12);
        const mos = totalMonths % 12;
        let str = '';
        if (yrs > 0) str += `${yrs} ${yrs === 1 ? 'yr' : 'yrs'}`;
        if (mos > 0) str += `${yrs > 0 ? ' ' : ''}${mos} ${mos === 1 ? 'mos' : 'mos'}`;
        return str || '1 mos';
    };

    // Compiles data for rendering your bar chart rows
    const experienceGraphData = computed(() => {
        const structuralJobs = jobs.value.filter(j => !j.isCTA && j.startDate);
        const dynamicMonths = structuralJobs.map(calculateMonths);
        const maxTimelineValue = Math.max(...dynamicMonths, 12);

        return structuralJobs.map((job, idx) => {
            const calculatedMonths = dynamicMonths[idx];
            return {
                company: job.company,
                role: job.role,
                tech: job.tech || [], // Pass the tech array to the graph layout
                durationText: formatMonths(calculatedMonths),
                percentageWidth: Math.min(Math.max((calculatedMonths / maxTimelineValue) * 100, 20), 100)
            };
        });
    });

    // Calculates the summary total across your full timeline
    const totalCombinedExperience = computed(() => {
        const combinedMonths = jobs.value
            .filter(j => !j.isCTA && j.startDate)
            .reduce((accum, job) => accum + calculateMonths(job), 0);

        return formatMonths(combinedMonths);
    });
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
            
            .timeline-wrapper {
                display: flex;
                gap: 3rem;
                background: var(--bg-card);
                border: 1px solid rgba(255, 255, 255, 0.04);
                border-radius: 16px;
                padding: 2.5rem;
                min-height: 320px;
                
                .tabs-sidebar {
                    display: flex;
                    flex-direction: column;
                    border-left: 2px solid rgba(255, 255, 255, 0.05);
                    width: 240px;
                    flex-shrink: 0;
                    
                    .tab-btn {
                        background: transparent;
                        border: none;
                        color: var(--text-muted);
                        padding: 1rem 1.2rem;
                        text-align: left;
                        cursor: pointer;
                        transition: all 0.2s;
                        border-left: 2px solid transparent;
                        margin-left: -2px;
                        display: flex;
                        flex-direction: column;
                        gap: 0.25rem;

                        .company-name {
                            font-family: var(--font-mono);
                            font-size: 0.85rem;
                            font-weight: 600;
                        }

                        .role-subtext {
                            font-family: var(--font-sans, system-ui, sans-serif); /* Overrides monospace inherits */
                            font-size: 0.72rem;
                            opacity: 0.6;
                            font-weight: 400;
                            letter-spacing: 0.3px;
                            transition: opacity 0.2s;
                        }

                        &.cta-tab {
                            color: var(--accent);
                            border-left-style: dashed;
                        }

                        &:hover, &.active {
                            color: var(--accent);
                            background: var(--accent-glow);
                            
                            .role-subtext {
                                color: var(--text-main);
                                opacity: 0.8;
                            }
                        }

                        &.active {
                            border-left-color: var(--accent);
                            border-left-style: solid; /* Keeps style consistent if active tab is the CTA */
                        }
                    }
                }
                
                .content-panel {
                    flex-grow: 1;

                    .role-title {
                        font-size: 1.4rem;
                        margin-bottom: 0.4rem;

                        .company-tag {
                            color: var(--accent);
                            cursor: pointer;
                        }
                    }
                    
                    .time-stamp {
                        font-family: var(--font-mono);
                        font-size: 0.8rem;
                        color: var(--text-muted);
                        margin-bottom: 1.5rem;
                        display: flex;
                        align-items: center;
                        gap: 0.4rem;
                    }

                    .duties-list {
                        list-style: none;

                        li {
                            color: var(--text-muted);
                            font-size: 0.98rem;
                            margin-bottom: 0.8rem;
                            position: relative;
                            padding-left: 1.5rem;
                            line-height: 1.6;
                        }

                        li::before {
                            content: "▹";
                            position: absolute;
                            left: 0;
                            color: var(--accent);
                        }
                    }

                    .job-tech-stack {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.5rem;
                        margin-top: 1.5rem;
                        padding-top: 1.5rem;
                        border-top: 1px solid rgba(255, 255, 255, 0.05);

                        .tech-badge {
                            font-family: var(--font-mono);
                            font-size: 0.72rem;
                            color: var(--accent);
                            background: rgba(var(--accent-rgb, 100, 255, 218), 0.05);
                            border: 1px solid rgba(var(--accent-rgb, 100, 255, 218), 0.15);
                            padding: 0.25rem 0.65rem;
                            border-radius: 4px;
                            letter-spacing: 0.3px;
                        }
                    }

                    .cta-block {
                        margin-top: 2rem;
                        
                        .timeline-hire-btn {
                            display: inline-block;
                            background: var(--accent-glow);
                            border: 1px solid var(--accent);
                            color: var(--accent);
                            padding: 0.6rem 1.4rem;
                            border-radius: 6px;
                            font-family: var(--font-mono);
                            font-size: 0.85rem;
                            text-decoration: none;
                            font-weight: 600;
                            transition: all 0.2s;
                            
                            &:hover {
                                background: var(--accent);
                                color: var(--bg-dark);
                                transform: translateY(-2px);
                            }
                        }

                        .experience-chart-container {
                            display: flex;
                            flex-direction: column;
                            gap: 1.5rem;
                            width: 100%;
                            margin-top: 1rem;

                            .aggregate-summary-box {
                                background: rgba(var(--accent-rgb, 100, 255, 218), 0.05);
                                border: 1px solid rgba(var(--accent-rgb, 100, 255, 218), 0.15);
                                padding: 0.6rem 1.2rem;
                                border-radius: 6px;
                                font-size: 0.85rem;
                                font-family: var(--font-mono);
                                width: fit-content;
                                color: var(--text-main);
                                margin-bottom: 0.5rem;

                                .highlight-metric {
                                    color: var(--accent);
                                    font-weight: 600;
                                }
                            }

                            .chart-row {
                                display: flex;
                                flex-direction: column;
                                gap: 0.4rem;
                                margin-bottom: 0.5rem;
                                
                                .chart-tech-row {
                                    display: flex;
                                    flex-wrap: wrap;
                                    gap: 0.4rem;
                                    margin-top: 0.4rem;

                                    .mini-tech-badge {
                                        font-family: var(--font-mono);
                                        font-size: 0.68rem;
                                        color: var(--text-muted);
                                        background: rgba(255, 255, 255, 0.03);
                                        border: 1px solid rgba(255, 255, 255, 0.06);
                                        padding: 0.15rem 0.5rem;
                                        border-radius: 3px;
                                        transition: all 0.2s;

                                        &:hover {
                                            color: var(--accent);
                                            border-color: rgba(var(--accent-rgb, 100, 255, 218), 0.3);
                                            background: var(--accent-glow);
                                        }
                                    }
                                }

                                .chart-meta {
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: baseline;
                                    flex-wrap: wrap;
                                    gap: 0.5rem;
    
                                    .chart-company {
                                        font-family: var(--font-mono);
                                        font-size: 0.9rem;
                                        font-weight: 600;
                                        color: var(--text-main);
                                    }
    
                                    .chart-role {
                                        font-size: 0.78rem;
                                        color: var(--text-muted);
                                    }
                                }
    
                                .chart-bar-wrapper {
                                    background: rgba(255, 255, 255, 0.03);
                                    border-radius: 4px;
                                    width: 100%;
                                    height: 32px;
                                    overflow: hidden;
                                    border: 1px solid rgba(255, 255, 255, 0.02);
                                    
                                    .chart-bar {
                                        background: linear-gradient(90deg, var(--accent-glow) 0%, rgba(var(--accent-rgb, 100, 255, 218), 0.2) 100%);
                                        border-right: 2px solid var(--accent);
                                        height: 100%;
                                        display: flex;
                                        align-items: center;
                                        padding-left: 0.75rem;
                                        box-sizing: border-box;
                                        animation: growChartBar 0.5s ease-out forwards;
        
                                        .bar-label {
                                            font-family: var(--font-mono);
                                            font-size: 0.75rem;
                                            color: var(--accent);
                                            font-weight: 600;
                                            white-space: nowrap;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .fade-panel-enter-from, .fade-panel-leave-to {
                        opacity: 0;
                        transform: translateX(10px);
                    }
                    .fade-panel-enter-active, .fade-panel-leave-active {
                        transition: all 0.25s ease;
                    }
                }
            }
        }
    
        /* Responsive Viewport Modifications */
        @media (max-width: 768px) {
            .timeline-wrapper { 
                flex-direction: column; 
                gap: 1.5rem; 
                padding: 1.5rem; 
            }
            .tabs-sidebar { 
                width: 100%; 
                flex-direction: row; 
                border-left: none !important; 
                border-bottom: 2px solid rgba(255, 255, 255, 0.05); 
                overflow-x: auto; 
                -webkit-overflow-scrolling: touch; 
                
                &::-webkit-scrollbar { display: none; } 
                
                .tab-btn { 
                    border-left: none !important; 
                    border-bottom: 2px solid transparent; 
                    margin-left: 0; 
                    margin-bottom: -2px; 
                    text-align: center;
                    white-space: nowrap; 
                    min-width: 170px;
                    padding: 0.8rem 1rem;
                    
                    .company-name, .role-subtext {
                        white-space: nowrap;
                    }
                    
                    &.active { 
                        border-bottom-color: var(--accent) !important; 
                    }
                }
            }
        }

        @keyframes growChartBar {
            from { width: 0% !important; }
        }
    }
</style>