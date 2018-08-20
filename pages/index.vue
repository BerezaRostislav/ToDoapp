<template>
<v-container>
  <v-layout align-center justify-start column fill-height>
  <v-flex xs12>
  <v-text-field 
  style="max-width: 400px;
         "   
  v-model="search" 
  solo
  placeholder="search users"
  />
  </v-flex>
  <v-flex style="slabcards">
    <todo
      v-for="slab in filteredusers"
      :key="slab.id"
      :user_name="slab.user_name"
      :id="slab.id"
      :tasks="slab.tasks"
      />
  </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import todo from '@/components/Todo'

export default {
  components: {
    todo
  },
  data () {
    return{
      search: '',
      slabs: this.$store.state.basedata
    }
  },
  computed: {
    filteredusers () {
      return  this.$store.state.basedata.filter((user) => {
        return user.user_name.match(this.search)
      }) 
    }  
  }
}
</script>

<style scoped>
.container{
  min-height: 100vh;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  text-align: center;
}

.slabcards{
  align-content: center;
  display: flex;
  flex-flow: row wrap;
  /* justify-content: space-between; */
}



</style>