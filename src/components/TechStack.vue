<template>
    <section id="tech-stack" class="space-section" v-reveal>
        <div class="container">
            <div class="section-header">
                <span class="mono-step">03.</span>
                <h2>Tech Stack</h2>
            </div>

            <div class="matrix-grid">
                <div v-for="category in techCategories" :key="category.title" class="matrix-box">
                    <h3>{{ category.title }}</h3>
                    <div class="skills-flex">
                        <span v-for="skill in category.skills" :key="skill" class="skill-tag">
                            <code>#</code> {{ skill }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ref } from 'vue'

    const techCategories = ref([
        {
            title: 'Client-Side Engineering',
            skills: [
                'Vue 3 (Composition API)',
                'JavaScript (ES6+)',
                'Modern UI (HTML5, CSS3, SASS / SCSS)',
                'Vuetify',
                'Mobile-first development',
                'Responsive & Accessible Design'
            ]
        },
        {
            title: 'Server-Side Engineering',
            skills: [
                'Laravel Framework & PHP',
                'Node.js & Express.js Framework',
                'RESTful API Engineering',
                'Relational Databases (MySQL, MSSQL)'
            ]
        },
        {
            title: 'Deployment & Workflow',
            skills: [
                'Git',
                'GitHub',
                'GitLab',
                'Vercel',
                'PythonAnywhere'
            ]
        },
        {
            title: 'Software Foundations & Design',
            skills: [
                'Python, Django & NLP (Thesis)',
                'Java & Object Oriented Programming (Armada Bootcamp)',
                'Wix Website Builder',
                'C# & Unity Engine',
                'Tubro C++',
                'Adobe Photoshop & Illustrator',
                'Adobe Premiere Pro'
            ]
        }
    ])
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
                    font-size: 1.1rem;
                }

                h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    color: var(--text-main);
                }
            }

            .matrix-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                gap: 1.5rem;
            
                .matrix-box {
                    background: var(--bg-card);
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    border-radius: 12px;
                    padding: 2.2rem;
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;

                    &:hover {
                        transform: translateY(-4px);
                        border-color: rgba(56, 189, 248, 0.2);
                    }

                    h3 {
                        font-size: 1.15rem;
                        font-weight: 600;
                        color: var(--text-main);
                        margin-bottom: 1.5rem;
                        position: relative;
                        display: inline-block;
                    }

                    .skills-flex {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.6rem;

                        .skill-tag {
                            background: rgba(255, 255, 255, 0.02);
                            border: 1px solid rgba(255, 255, 255, 0.05);
                            padding: 0.4rem 0.8rem;
                            border-radius: 6px;
                            font-size: 0.85rem;
                            font-family: var(--font-mono);
                            color: var(--text-muted);
                            transition: all 0.2s;
                            display: inline-flex;
                            align-items: center;
                            gap: 0.3rem;

                            code {
                                color: var(--accent);
                                opacity: 0.5;
                                font-weight: bold;
                            }

                            &:hover {
                                background: var(--accent-glow);
                                border-color: var(--accent);
                                color: var(--accent);
                                
                                code {
                                    opacity: 1;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>