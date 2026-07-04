<template>
    <section id="contact" class="space-section" v-reveal>
        <div class="container container-narrow">
            <div class="section-header">
                <span class="mono-step">05. What's Next?</span>
                <h2>Initiate Contact</h2>
            </div>

            <div class="envelope-interface">
                <Transition name="fade" mode="out-in">
                    <!-- Success Screen -->
                    <div v-if="messageSent" class="success-screen">
                        <CheckCircle2 :size="44" class="icon-glow" />
                        <h3>Thanks!</h3>
                        <p>I'll reach out to you at <strong>{{ dynamicEmailDisplay }}</strong> as soon as possible.</p>
                        <button @click="resetForm" class="reset-link">Send another message</button>
                    </div>

                    <!-- Input Form -->
                    <form v-else @submit.prevent="handleSubmission" class="payload-form">
                        <div class="field-block">
                            <label>Name</label>
                            <input type="text" v-model="formPayload.name" required placeholder="ex. John Doe" />
                        </div>
                        
                        <div class="field-block">
                            <label>Email Address</label>
                            <input type="email" v-model="formPayload.email" required placeholder="ex. johndoe@email.com" />
                        </div>
                        
                        <div class="field-block">
                            <label>Message</label>
                            <textarea v-model="formPayload.message" rows="4" required placeholder="Write details here..."></textarea>
                        </div>
                        
                        <button type="submit" class="execute-btn" :disabled="messageSending">
                            <span v-if="messageSending">Processing Packets...</span>
                            <span v-else>Send Message <Send :size="14" style="margin-left: 6px; vertical-align: middle;"/></span>
                        </button>
                    </form>
                </Transition>
            </div>

            <!-- Social Links -->
            <div class="social-deck">
                <a 
                    v-for="channel in socialChannels" 
                    :key="channel.label" 
                    :href="channel.url" 
                    target="_blank" 
                    :aria-label="channel.label"
                    class="social-icon-btn"
                >
                    <component :is="channel.icon" :size="20" />
                    <span class="tooltip">{{ channel.label }}</span>
                </a>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { reactive, ref } from 'vue'
    import { Send, CheckCircle2, Github, Linkedin, Palette, Facebook } from 'lucide-vue-next'
    import emailjs from '@emailjs/browser'

    const socialChannels = [
        { icon: Github, url: 'https://github.com/elgene1515', label: 'GitHub' },
        { icon: Linkedin, url: 'https://www.linkedin.com/in/elgene-reyes/', label: 'LinkedIn' },
        { icon: Palette, url: 'https://elgenereyes1515.wixsite.com/elgenecreatives', label: 'Graphic Design Portfolio' },
        { icon: Facebook, url: 'https://www.facebook.com/elgene8/', label: 'Facebook' }
    ]

    const formPayload = reactive({ name: '', email: '', message: '' })
    const dynamicEmailDisplay = ref('')
    const messageSending = ref(false)
    const messageSent = ref(false)

    const handleSubmission = async() => {
        messageSending.value = true
        dynamicEmailDisplay.value = formPayload.email

        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

        const templateParams = {
            name: formPayload.name,
            email: formPayload.email,
            message: formPayload.message
        }

        try {
            await emailjs.send(serviceID, templateID, templateParams, publicKey)
            messageSent.value = true
        } catch (error) {
            console.error('Packet Dispatch Failure:', error)
            alert('System error encountered while emitting message.')
        } finally {
            messageSending.value = false
        }
    }

    const resetForm = () => {
        messageSent.value = false
        formPayload.name = ''
        formPayload.email = ''
        formPayload.message = ''
        dynamicEmailDisplay.value = ''
    }
</script>

<style lang="scss" scoped>
    .space-section {
        padding: 6rem 0;
        
        .container-narrow {
            max-width: 580px !important;
            margin: 0 auto;
            
            .section-header {
                text-align: center;
                margin-bottom: 3rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                
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

            .envelope-interface {
                background: var(--bg-card);
                border: 1px solid rgba(255, 255, 255, 0.04);
                border-radius: 16px;
                padding: 2.5rem;
                margin-bottom: 3rem;
                
                .success-screen {
                    text-align: center;
                    padding: 2rem 0;
                    
                    .icon-glow {
                        color: var(--accent);
                        margin-bottom: 1rem;
                    }
                    
                    h3 {
                        margin-bottom: 0.5rem;
                    }
                    
                    p {
                        color: var(--text-muted);
                        font-size: 0.95rem;
                        margin-bottom: 1.5rem;
                        
                        strong {
                            color: var(--text-main);
                        }
                    }
                    
                    .reset-link {
                        background: transparent;
                        border: none;
                        color: var(--accent);
                        text-decoration: underline;
                        cursor: pointer;
                        font-family: var(--font-mono);
                        font-size: 0.8rem;
                    }
                }

                .payload-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    
                    .field-block {
                        display: flex;
                        flex-direction: column;
                        gap: 0.4rem;
                        
                        label {
                            font-family: var(--font-mono);
                            font-size: 0.75rem;
                            color: var(--accent);
                            text-align: left;
                        }
                        
                        input, textarea {
                            background: rgba(9, 13, 22, 0.6);
                            border: 1px solid rgba(255, 255, 255, 0.08);
                            padding: 0.8rem 1rem;
                            color: #fff;
                            border-radius: 8px;
                            font-family: inherit;
                            font-size: 0.95rem;
                            transition: border-color 0.2s;
                        }
        
                        input:focus, textarea:focus {
                            outline: none;
                            border-color: var(--accent);
                        }
                    }
                    
                    .execute-btn {
                        background: var(--accent);
                        color: var(--bg-dark);
                        border: none;
                        padding: 1rem;
                        border-radius: 8px;
                        font-weight: 700;
                        cursor: pointer;
                        transition: opacity 0.2s;
                        
                        &:disabled {
                            opacity: 0.6;
                            cursor: not-allowed;
                        }
                    }
                }
                
                .fade-enter-active, .fade-leave-active {
                    transition: opacity 0.25s ease;
                }
                
                .fade-enter-from, .fade-leave-to {
                    opacity: 0;
                }
            }
        
            .social-deck {
                display: flex;
                justify-content: center;
                gap: 1.5rem;
                padding-top: 1rem;
                
                .social-icon-btn {
                    position: relative;
                    background: var(--bg-card);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    color: var(--text-muted);
                    width: 46px;
                    height: 46px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    
                    &:hover {
                        color: var(--accent);
                        border-color: var(--accent);
                        transform: translateY(-4px);
                        background: var(--accent-glow);
                        box-shadow: 0 4px 12px rgba(56, 189, 248, 0.15);
                    }
                    
                    &:hover .tooltip {
                        opacity: 1;
                        transform: translateY(0);
                    }

                    .tooltip {
                        position: absolute;
                        bottom: -35px;
                        background: #1e293b;
                        color: #fff;
                        font-size: 0.75rem;
                        font-family: var(--font-mono);
                        padding: 0.2rem 0.6rem;
                        border-radius: 4px;
                        opacity: 0;
                        pointer-events: none;
                        transition: opacity 0.2s, transform 0.2s;
                        transform: translateY(-5px);
                        white-space: nowrap;
                        border: 1px solid rgba(255, 255, 255, 0.05);
                    }
                }
            }
        }
    }
</style>