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
    return {
      filterStatus: true,
      newslabs: [],
      slabs: [
        {
          id: "1",
          user_name: "User 1",
          tasks: [
            {
              id: "1",
              title: "First task",
              description: "First task description",
              time_creation: "2018.08.14/14:54",
              time_completion: "",
              status: true
            },{
              id: "2",
              title: "Second task",
              description: "Second task description",
              time_creation: "2018.08.14/14:55",
              time_completion: "",
              status: true
            },{
              id: "3",
              title: "Third task",
              description: "Third task description",
              time_creation: "2018.08.14/14:54",
              time_completion: "",
              status: false
            }
          ]

        },
        {
          id: "2",
          user_name: "User 2",
          tasks: [
            {
              id: "1",
              title: "First task",
              description: "First task description",
              time_creation: "2018.08.14/14:54",
              time_completion: "",
              status: true
            },{
              id: "3",
              title: "Third task",
              description: "Third task description",
              time_creation: "2018.08.14/14:54",
              time_completion: "",
              status: false
            }
          ]
        }
      ]
    }
  },
  computed: {

  },
  
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