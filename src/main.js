import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const app = createApp(App)

// Custom directive: v-reveal
app.directive('reveal', {
    mounted(element) {
        element.classList.add('reveal')
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                element.classList.add('visible')
                observer.unobserve(element) // Runs animation once
            }
        }, { threshold: 0.1 })
        observer.observe(element)
    }
})

app.mount('#app')