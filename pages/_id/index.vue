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
import slabs from "@/pages/index.vue"

export default {
    data () {
    return {
      id: this.$route.params.id,
      slabs: this.$store.state.basedata
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
