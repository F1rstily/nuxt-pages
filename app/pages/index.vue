<template>
    <section class="hero">
      <LetterGlitchBackground :centerVignette="true" />
  
      <div class="content">
      </div>
    </section>
  

    <main class="p-8">
      <h1 class="text-3xl font-bold mb-6">Главная страница</h1>
  
      <!-- Новый блок -->
      <MyBlock 
        title="Добро пожаловать!" 
        text="Это пример нового блока страницы с Nuxt UI." 
      />
    </main>
  </template>
  
  <script setup lang="ts">
  // Компонент автоматически импортируется, если автоимпорт включён
  
    import LetterGlitchBackground from '~/components/LetterGlitchBackground.vue'
    </script>
    
    <style scoped>
        .hero {
          height: 100vh;
          position: relative;
          color: rgb(255, 255, 255);
        }
        .content {
          position: relative;
          z-index: 2;
          text-align: center;
          top: 40%;
        }
        </style>