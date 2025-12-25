<template>
  <section class="hero">
    <!-- ФОН -->
    <LetterGlitchBackground class="bg" />

    <!-- КОНТЕНТ ПО ЦЕНТРУ — БЕЗ ПЛАШКИ! -->
    <div class="content">
      <!-- ТЕКСТ ПАРИТ В ТУМАНЕ -->
      <Transition
        appear
        name="fade-slide"
        mode="out-in"
      >
        <div class="fog-text" key="text">
          <h1>Ваш VIP-контент</h1>
          <p>Эксклюзивные видео, которые нельзя найти нигде больше</p>
        </div>
      </Transition>
    </div>

    <!-- 🌫️ КРУГОВОЕ РАЗМЫТИЕ ТИПА ТУМАНА — ПОД ТЕКСТОМ -->
    <div class="fog-overlay"></div>
  </section>

  <ScrollVelocity
    :texts="['Привет, Гриша!', 'meow']"
    :velocity="100"
    :damping="50"
    :stiffness="400"
    :velocity-mapping="{ input: [0, 1000], output: [0, 5] }"
    class-name="custom-scroll-text"
    parallax-class-name="custom-parallax"
    scroller-class-name="custom-scroller"
  />

  <main class="p-8">
    <h1 class="text-3xl font-bold mb-6">Тут сиськи!</h1>

    <MyBlock  
      title="Смотреть онлайн без регистрации!" 
      text="Вот сюда тык" 
    />
  </main>
</template>

<script setup lang="ts">
import LetterGlitchBackground from '~/components/LetterGlitchBackground.vue'
import ScrollVelocity from "~/components/ScrollVelocity.vue";
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
  color: rgb(255, 255, 255);
}

.bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ✨ ТЕКСТ БЕЗ ПЛАШКИ — ПАРИТ В ТУМАНЕ */
.fog-text {
  text-align: center;
  color: white;
  /* Добавляем небольшую тень для читаемости */
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
}

.fog-text h1 {
  font-weight: bold;
  font-size: 3rem;
  margin: 0 0 10px 0;
  line-height: 1.2;
}

.fog-text p {
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
}

/* Анимации */
.fade-slide-enter-active {
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@keyframes subtle-bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
.fog-text {
  animation: subtle-bounce 3s ease-in-out infinite;
  animation-delay: 0.8s;
}

/* 🌫️ КРУГОВОЕ РАЗМЫТИЕ ТИПА ТУМАНА — ПОД ТЕКСТОМ */
.fog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* под контентом, но над LetterGlitchBackground */
  pointer-events: none;

  /* радиальный градиент — туман концентрируется в центре */
  background: radial-gradient(
    circle at 50% 50%,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.15) 40%,
    rgba(0, 0, 0, 0) 80%
  );

  /* размытие для эффекта тумана */
  filter: blur(25px);
  -webkit-filter: blur(25px);

  /* смягчаем края сверху и снизу */
  mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
}
</style>