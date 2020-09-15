<template>
  <div class="card shadow card-product">    
    <div class="card-body">      
      <h5 class="card-title"> {{ surah.name }} ({{ surah.index }})</h5>
      <p class="card-text"> {{ surah.aya.length }} ayat </p>
      
    </div>      
  </div>
</template>

<script>
export default {
  name: "CardSurah",
  props: ["surah"]
  
};
</script>

<style>
</style>