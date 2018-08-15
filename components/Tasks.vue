<template>
    <article>
        <v-expansion-panel inset>
          <v-expansion-panel-content>
            <div slot="header">{{ title }}</div>
            <v-card>
              <v-card-text>{{ description }}</v-card-text>
              <v-card-text>{{ time_creation }}</v-card-text>
              <v-card-text>{{ time_completion }}</v-card-text>

            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

    <!-- <button @click="markAsCompleted(i)" class="task__checkbox" :class="{task__checkbox__completed: status}"></button>
    <p>{{title}}</p>
    <p class="task__text" :class="{task__text__completed: status}">{{ title }}</p>
    <button @click="deleteTask(i)" class="task__delete">X</button> -->
</article>
</template>

<script>
export default {
    props: ['id','title','description','time_creation','time_completion','status']
,
  methods: {
    markAsCompleted(index) {
      this.tasks[index].completed = !this.tasks[index].completed;
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    addTask(e) {
      this.tasks.push({
        text: this.task,
        completed: false
      });

      this.task = "";
    }
  }
}
</script>

