<template>
  <UContainer
    class="flex flex-col flex-grow justify-center items-center text-xl transition-all ease-in-out duration-100 text-center"
  >
    <div v-if="loading" class="flex flex-col justify-center items-center">
      <img
        v-if="loading"
        src="/foxes/Animated/Thinking.gif"
        alt="Animated Q Thinkinging"
        width="112"
        height="112"
      />

      <div
        class="flex items-center justify-center max-w-[500px] md:w-[500px] min-h-[140px] p-6 [background:linear-gradient(45deg,theme(colors.white),theme(colors.white)_50%,theme(colors.white))_padding-box,conic-gradient(from_var(--border-angle),theme(colors.fuchsia.900/.48)_80%,_theme(colors.fuchsia.500)_86%,_theme(colors.fuchsia.300)_90%,_theme(colors.fuchsia.500)_94%,_theme(colors.fuchsia.900/.48))_border-box] dark:[background:linear-gradient(45deg,theme(colors.slate.900),theme(colors.slate.900)_50%,theme(colors.slate.900))_padding-box,conic-gradient(from_var(--border-angle),theme(colors.fuchsia.900/.48)_80%,_theme(colors.fuchsia.500)_86%,_theme(colors.fuchsia.300)_90%,_theme(colors.fuchsia.500)_94%,_theme(colors.fuchsia.900/.48))_border-box] rounded-2xl border-4 border-transparent animate-border"
      >
        Using the ol' brain box...
      </div>
    </div>
    <div v-else class="flex flex-col justify-center items-center">
      <img
        src="/foxes/Static/Thinking.png"
        alt="Q Lurking"
        width="112"
        height="112"
        class="z-10"
      />
      <div
        class="relative group rounded-xl hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-shadow duration-150 ease-in-out cursor-pointer"
        @click="fetchQuote"
      >
        <div
          class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
        ></div>
        <div
          class="font-bold text-xl leading-6 max-w-[500px] md:w-[500px] min-h-[140px] relative px-7 py-4 bg-white dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center divide-x divide-gray-600 border-4 border-black"
        >
          {{ quote }}
          <p class="self-end pt-2 text-sm text-slate-600 dark:text-slate-400">
            - Q (Tony)
          </p>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
const quote = ref(""); // Initialize to an empty string to avoid hydration errors
const loading = ref(false);

// Array of image pairs
const imagePairs = [
  { animated: "/foxes/Animated/Angel.gif", static: "/foxes/Static/Angel.png" },
  { animated: "/foxes/Animated/Comfy.gif", static: "/foxes/Static/Comfy.png" },
  { animated: "/foxes/Animated/Goofy.gif", static: "/foxes/Static/Goofy.png" },
  {
    animated: "/foxes/Animated/Hug me.gif",
    static: "/foxes/Static/Hug me.png",
  },
  {
    animated: "/foxes/Animated/Love 3.gif",
    static: "/foxes/Static/Love 3.png",
  },
  { animated: "/foxes/Animated/Lurk.gif", static: "/foxes/Static/Lurk.png" },
  // Add more pairs here as needed
];

// Randomly select one pair from the array
const selectedPair = imagePairs[Math.floor(Math.random() * imagePairs.length)];
const animatedImage = selectedPair.animated;
const staticImage = selectedPair.static;

const fetchQuote = async () => {
  loading.value = true;
  try {
    const response = await $fetch("/data.json"); // Fetch quotes JSON file
    const randomQuote =
      response.quotes[Math.floor(Math.random() * response.quotes.length)];

    // Simulate an API delay
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2000 ms delay
    quote.value = randomQuote;
  } catch (error) {
    console.error("Error fetching quote:", error);
  } finally {
    loading.value = false;
  }
};

// Fetch quote only on the client side
onMounted(() => {
  fetchQuote();
});
</script>

<style>
div {
  font-family: Syne Mono, "Courier New", Courier, monospace;
}
@property --border-angle {
  inherits: false;
  initial-value: 0deg;
  syntax: "<angle>";
}
</style>
