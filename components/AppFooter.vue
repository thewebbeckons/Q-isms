<template>
  <div
    class="flex flex-col flex-shrink-0 items-center justify-center px-8 py-2"
  >
    <p class="text-slate-500 text-center">
      From the brilliant mind of the one of a kind Q
    </p>
    <div>
      <UTooltip text="Twitch" :popper="{ placement: 'top' }">
        <UButton
          variant="link"
          color="purple"
          to="https://www.twitch.tv/qwinnlucky13"
          size="lg"
        >
          <UIcon name="i-mdi-twitch" class="w-6 h-6" />
        </UButton>
      </UTooltip>
    </div>
  </div>
</template>
