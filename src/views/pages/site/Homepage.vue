<template>
  <CCarousel controls indicators>
    <CCarouselItem>
      <img class="d-block w-100" :src="Slide_1" alt="slide 1" />
      <CCarouselCaption class="d-none d-md-block" style="color: black">
        <h5>Welcome to MetaSoil !</h5>
        <p>The newest Metagenomic Analysis Platform.</p>
      </CCarouselCaption>
    </CCarouselItem>
  </CCarousel>
</template>

<script>
import Slide_1 from '@/assets/images/carousel/slide-1.svg'

export default {
  name: 'Homepage',

  setup() {
    return {
      Slide_1,
    }
  },
}
</script>
