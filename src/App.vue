<template>
    <div>
        <Navbar />
        
        <main>
            <Hero />
            
            <Experience />
            
            <Projects />
            
            <TechStack />
            
            <AboutMe />
            
            <Contact />
        </main>
        
        <Footer />
    </div>
</template>

<script setup>
    import Navbar from './components/Navbar.vue'
    import Hero from './components/Hero.vue'
    import Experience from './components/Experience.vue'
    import Projects from './components/Projects.vue'
    import TechStack from './components/TechStack.vue'
    import AboutMe from './components/AboutMe.vue'
    import Contact from './components/Contact.vue'
    import Footer from './components/Footer.vue'
</script>

<style lang="scss" scoped>
</style>