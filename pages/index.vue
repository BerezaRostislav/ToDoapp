<template>
  <section class="slabcards">
    <todo
      v-for="slab in slabs"
      :key="slab.id"
      :user_name="slab.user_name"
      :id="slab.id"
      :tasks="slab.tasks"
      />
  </section>
</template>

<script>
import todo from '@/components/Todo'

export default {
  components: {
    todo
  },
  data () {
    return{
      slabs: this.$store.state.basedata
    }
  }
}
</script>

<style scoped>
.container{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.slabcards{
  
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}



</style>