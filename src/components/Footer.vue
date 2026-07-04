<template>
    <footer class="system-footer">
        <div class="container footer-grid">
            <div class="footer-brand">
                <a href="#" class="logo">{{ '<Dev.Gene />' }}</a>
                <p class="tagline">Fusing full-stack engineering with creative visual design architecture.</p>
                
                <div class="contact-meta">
                    <div class="meta-item">
                        <Phone :size="14" class="meta-icon" />
                        <span>+63 993-563-7866</span>
                    </div>

                    <div class="meta-item">
                        <Mail :size="14" class="meta-icon" />
                        <a :href="`mailto:${email}`" class="email-link"> {{ email }} </a>
                    </div>

                    <div class="meta-item">
                        <MapPin :size="14" class="meta-icon" />
                        <span>Tanza, Cavite, PH</span>
                    </div>
                </div>
            </div>
            
            <div class="footer-links">
                <div class="link-group">
                    <h4>Sitemap</h4>
                    <a href="#experience">Experience</a>
                    <a href="#projects">Projects</a>
                    <a href="#tech-stack">Technologies</a>
                    <a href="#about-me">About Me</a>
                </div>
                <div class="link-group">
                    <h4>External</h4>
                    <a href="https://github.com/elgene1515" target="_blank" rel="noopener noreferrer">GitHub Portfolio</a>
                    <a href="https://www.linkedin.com/in/elgene-reyes/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                    <a href="https://elgenereyes1515.wixsite.com/elgenecreatives" target="_blank" rel="noopener noreferrer">Wix Design Studio</a>
                    <a href="https://www.facebook.com/elgene8/" target="_blank" rel="noopener noreferrer">Facebook Profile</a>
                </div>
            </div>
        </div>
        
        <div class="container footer-bottom">
            <p>© {{ new Date().getFullYear() }} Gene. All rights reserved.</p>
            <p class="timestamp">SYS // STABLE_BUILD_v2.0</p>
        </div>
    </footer>
</template>

<script setup>
    import { Phone, Mail, MapPin } from 'lucide-vue-next'
    import { ref } from 'vue'

    const email = ref('elgenereyes1515@gmail.com')
</script>

<style lang="scss" scoped>
    .system-footer {
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        background: rgba(17, 24, 39, 0.4);
        padding: 4rem 0 2rem 0;
        margin-top: 4rem;
        
        .footer-grid {
            display: flex;
            justify-content: space-between;
            gap: 3rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
            
            .footer-brand {
                max-width: 360px;
                
                .logo {
                    font-family: var(--font-mono);
                    font-weight: 700;
                    color: var(--accent);
                    font-size: 1.2rem;
                    text-decoration: none;
                }

                .tagline {
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    margin-top: 0.75rem;
                    line-height: 1.5;
                    margin-bottom: 1.5rem;
                }
                
                .contact-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                    
                    .meta-item {
                        display: flex;
                        align-items: center;
                        gap: 0.6rem;
                        color: var(--text-muted);
                        font-size: 0.85rem;
                        
                        .meta-icon {
                            color: var(--accent);
                        }

                        a {
                            color: inherit;
                            text-decoration: none;
                            transition: color 0.2s;
                            
                            &:hover {
                                color: #fff;
                            }
                        }
                    }
                }
            }

            .footer-links {
                display: flex;
                gap: 4rem;
                flex-wrap: wrap;
                
                .link-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    
                    h4 {
                        font-family: var(--font-mono);
                        font-size: 0.8rem;
                        color: var(--accent);
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-bottom: 0.25rem;
                    }

                    a {
                        color: var(--text-muted);
                        font-size: 0.9rem;
                        text-decoration: none;
                        transition: color 0.2s;
                        
                        &:hover {
                            color: #fff;
                        }
                    }
                }
            }
        }

        .footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.03);
            padding-top: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--text-muted);
            font-size: 0.8rem;
            flex-wrap: wrap;
            gap: 1rem;

            .timestamp {
                font-family: var(--font-mono);
                color: rgba(255, 255, 255, 0.2);
            }
        }
        
        @media (max-width: 768px) {
            .footer-grid { 
                flex-direction: column; 
                gap: 2.5rem; 
                
                .footer-links { 
                    gap: 3rem; 
                }
            }
            .footer-bottom { 
                flex-direction: column; 
                text-align: center; 
                gap: 0.5rem;
            }
        }
    }
</style>