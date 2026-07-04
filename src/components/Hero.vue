<template>
    <header class="hero-wrapper" v-reveal>
        <div class="container">
            <div class="badge">Available for Opportunities</div>
            
            <h1 class="main-title">Engineering Full-Stack Systems from Concept to Production</h1>
            
            <h2 class="dynamic-sub">
                Hi, I'm Elgene Reyes. I am a <span class="highlight">{{ sub }}</span> <span class="cursor">_</span>
            </h2>
            
            <p class="summary">
                I build both the visible applications users interact with and the backstage logic that powers them, turning complex ideas into efficient, scalable, working software.
            </p>

            <div class="actions">
                <a class="btn primary" @click="openCV()">Download Resume</a>
                <a href="#contact" class="btn secondary">Get In Touch</a>
            </div>
        </div>
    </header>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import cvFile from '../assets/Elgene_Reyes_Full_Stack_Software_Engineer.pdf'

    const dynamicSubs = ['Full Stack Engineer', 'Graphic Designer', 'Logical Problem Solver'];
    const sub = ref('');
    let subID = 0;
    let charID = 0;
    let deleting = false;

    const typeHandler = () => {
        const fullString = dynamicSubs[subID];

        if(deleting){
            sub.value = fullString.substring(0, charID - 1);
            charID--;
        } else {
            sub.value = fullString.substring(0, charID + 1);
            charID++
        }

        let delay = deleting? 40 : 80;
        if(!deleting && charID === fullString.length) {
            delay = 2500;
            deleting = true;
        } else if(deleting && charID === 0) {
            deleting = false;
            subID = (subID + 1) % dynamicSubs.length;
            delay = 400
        }

        setTimeout(typeHandler, delay)
    }

    const openCV = () => {
        window.open(cvFile, '_blank' );
    }

    onMounted(() => setTimeout(typeHandler, 500))
</script>

<style lang="scss" scoped>
    .hero-wrapper {
        min-height: 100vh;
        display: flex;
        align-items: center;
        padding-top: 80px;

        .badge {
            display: inline-flex;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--accent);
            background: var(--accent-glow);
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            border: 1px solid rgba(56, 189, 248, 0.3);
            margin-bottom: 1.5rem;
        }

        .main-title {
            font-size: 3.8rem;
            line-height: 1.15;
            font-weight: 800;
            max-width: 850px;
            letter-spacing: -1px;
        }

        .dynamic-sub {
            font-size: 2.2rem;
            font-weight: 600;
            margin: 1rem 0 1.5rem 0;
            color: var(--text-muted);
            min-height: 3.5rem;

            .highlight {
                color: #fff;
                border-bottom: 2px solid var(--accent);
            }
            .cursor {
                color: var(--accent);
                animation: pulse 1s infinite alternate;
            }
        }

        .summary {
            max-width: 550px;
            color: var(--text-muted);
            font-size: 1.1rem;
            margin-bottom: 2.5rem;
        }
        
        .actions {
            display: flex;
            gap: 1rem;
        
            .btn {
                padding: 0.8rem 1.8rem;
                border-radius: 8px;
                font-weight: 600;
                font-size: 0.95rem;
                text-decoration: none;
                transition: transform 0.2s, background 0.2s;
            }
            .btn:hover {
                transform: translateY(-2px);
            }
            .btn.primary {
                background: var(--accent);
                color: var(--bg-dark);
            }
            .btn.secondary {
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: var(--text-main);
            }
            .btn.secondary:hover {
                background: rgba(255, 255, 255, 0.02);
            }
        }

        @keyframes pulse {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }

        @media (max-width: 768px) {
            .main-title { font-size: 2.4rem; }
            .dynamic-sub { font-size: 1.5rem; }
        }
    }
</style>