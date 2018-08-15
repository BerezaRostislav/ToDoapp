<template>
<section>
    <div>
    <h1 style="color:white">{{user_info[0].user_name }}</h1>
    <div style="color:white" v-for="task in user_info[0].tasks"
        :key="task.id"
        >
        <h1>{{ task.title }}</h1>
        <h1>{{ task.description }}</h1>
        <p/>
    </div>
    </div>
</section>
</template>

<script>
export default {
    data () {
    return {
      id: this.$route.params.id,
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
      user_info: function () {
        return this.slabs.filter((elem) => {
           return elem.id === this.id
        })
      }
  }
}
</script>
