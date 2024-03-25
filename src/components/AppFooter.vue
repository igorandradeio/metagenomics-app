<template>
  <CFooter class="px-4">
    <div>
      <a href="https://github.com/igorandradeio" target="_blank">Igor Andrade</a>
      <span class="ms-1"
        >&copy; {{ new Date().getFullYear() }} App name.</span
      >
    </div>
    <div class="ms-auto">
      <span class="me-1" target="_blank">Hosted by</span>
      <a href="https://github.com/igorandradeio">Server name</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>
