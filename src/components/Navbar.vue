<template>
    <nav class="navbar">
        <div class="container nav-flex">
            <a href="#" class="brand" @click="closeMenu">{{ '<Dev.Gene />' }}</a>
            
            <!-- Desktop Navigation Menu Links -->
            <div class="desktop-links">
                <a href="#experience">Experience</a>
                <a href="#projects">Projects</a>
                <a href="#tech-stack">Technologies</a>
                <a href="#about-me">About</a>
                <a href="#contact" class="nav-cta">Connect</a>
            </div>

            <!-- Mobile Hamburger Icon Trigger Button -->
            <button class="menu-toggle" @click="toggleMenu" :aria-label="isMenuOpen ? 'Close Menu' : 'Open Menu'">
                <X v-if="isMenuOpen" :size="24" /> <!--X is lucide close icon-->
                <Menu v-else :size="24" /> <!--Menu 3 Line hamburger icon-->
            </button>
        </div>

        <!-- Mobile Navigation Drawer Overlay Grid Menu -->
        <div :class="['mobile-drawer', { open: isMenuOpen }]">
            <div class="drawer-links">
                <a href="#experience" @click="closeMenu">Experience</a>
                <a href="#projects" @click="closeMenu">Projects</a>
                <a href="#tech-stack" @click="closeMenu">Technologies</a>
                <a href="#about-me" @click="closeMenu">About</a>
                <a href="#contact" @click="closeMenu" class="mobile-cta">Connect</a>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import { ref } from 'vue'
    import { Menu, X } from 'lucide-vue-next'

    const isMenuOpen = ref(false)

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
    }

    const closeMenu = () => {
        isMenuOpen.value = false
    }
</script>

<style lang="scss" scoped>
    .navbar {
        position: fixed;
        top: 0;
        width: 100%;
        height: 80px;
        background: rgba(9, 13, 22, 0.85);
        backdrop-filter: blur(16px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        z-index: 1000;
        
        .nav-flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            
            .brand {
                font-family: var(--font-mono);
                font-weight: 700;
                color: var(--accent);
                font-size: 1.15rem;
                text-decoration: none;
                z-index: 1001;
            }
            
            .desktop-links {
                display: flex;
                align-items: center;
                gap: 2rem;
                
                a {
                    color: var(--text-muted);
                    text-decoration: none;
                    font-size: 0.9rem;
                    transition: color 0.2s;
                }
                a:hover {
                    color: var(--text-main);
                }
                
                .nav-cta {
                    border: 1px solid var(--accent);
                    color: var(--accent) !important;
                    padding: 0.4rem 1rem;
                    border-radius: 6px;
                    background: var(--accent-glow);
                    
                    &:hover {
                        background: var(--accent) !important;
                        color: var(--bg-dark) !important;
                    }
                }
            }
            
            .menu-toggle {
                display: none;
                background: transparent;
                border: none;
                color: var(--text-main);
                cursor: pointer;
                z-index: 1001;
            }
        
            @media (max-width: 768px) {
                .desktop-links {
                    display: none;
                }
                .menu-toggle {
                    display: block;
                }
            }
        }
    }

    .mobile-drawer {
        position: fixed;
        top: 0;
        right: -100%;
        width: 100%;
        height: 100vh;
        background: var(--bg-dark);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 1000;
        
        &.open {
            right: 0;
        }
        
        .drawer-links {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2.5rem;
            width: 100%;
            
            a {
                color: var(--text-muted);
                text-decoration: none;
                font-size: 1.3rem;
                font-weight: 500;
                transition: color 0.2s;
                
                &:hover {
                    color: var(--accent);
                }
            }
            
            .mobile-cta {
                border: 1px solid var(--accent);
                color: var(--accent) !important;
                padding: 0.8rem 2.5rem;
                border-radius: 8px;
                background: var(--accent-glow);
                width: 80%;
                text-align: center;
            }
        }
    }
</style>