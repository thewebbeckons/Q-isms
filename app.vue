<template>
  <div
    class="absolute inset-0 h-screen w-screen bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] flex flex-col"
  >
    <AppNav />
    <NuxtPage />
    <AppFooter />
  </div>
</template>
<style>
.animated-background {
  background-size: 400%;

  -webkit-animation: animation 3s ease infinite;
  -moz-animation: animation 3s ease infinite;
  animation: animation 3s ease infinite;
}

@keyframes animation {
  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}
</style>
