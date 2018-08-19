<template>
  <article class="slabcard">
    <div style="text-align: center;">
      <nuxt-link :to="'/' + id">
        <h2>{{ user_name }}</h2>
      </nuxt-link>
    <v-data-table
      :headers="headers"
      :items="tasks"
      item-key="title"
      expand  
    >
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td class="text-xs-right">{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.time_creation }}</td>
          <td class="text-xs-right">{{ props.item.time_completion }}</td>
          <td class="text-xs-right" @click="props.expanded = !props.expanded">
            <v-btn v-if="props.item.status === true" v-on:click="acomplish(props.item)">done</v-btn>
            <v-btn v-else>Completed</v-btn>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
            delete
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
            edit
            </v-icon>
          </td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>{{ props.item.description}}</v-card-text>
        </v-card>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="orange" icon="warning">
          Sorry, no tasks created :(
        </v-alert>
      </template>
    </v-data-table>
      <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn slot="activator" color="primary" dark>Create new task</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Creating task for {{ user_name }}</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="tasks.title"
                :rules="nameRules"
                :counter="10"
                label="Title"
                required
              />
              <v-text-field
                v-model="tasks.description"
                :rules="descriptionRules"
                label="Description"
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="clear">Clear</v-btn>
            <v-btn color="blue darken-1" flat @click="clear" @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat :disabled="!validat" v-on:click="taskAdd" @click.native="dialog = false" @click="clear">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> 
      <v-dialog v-model="dialogedit" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">User Profile edit</span>
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="clear">Clear</v-btn>
            <v-btn color="blue darken-1" flat @click="clear" @click.native="dialogedit = false">Close</v-btn>
            <v-btn color="blue darken-1" flat :disabled="!validat" v-on:click="taskAdd" @click.native="dialogedit = false" @click="clear">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> 
    </div>
  </article>
</template>

<script>


export default {
  data () {
    return {
      editedIndex: -1,
      editedItem: {},
      valid: true,
      nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      descriptionRules: [
          v => !!v || 'Description is required',
          v => (v && v.length <= 100) || 'Name must be less than 100 characters'
      ],
      dialog: false,
      dialogedit: false,
      max20chars: (v) => v.length <= 20 || 'Input too long!',
      headers: [
        {
          text: "title",
          align: 'left',
          sortable: false,
          value: 'title'
        },
        { 
          text: 'time of creation', 
          value: 'time_creation' 
        },
        { 
          text: 'time of completion', 
          value: 'time_completion' 
        },
      ]
    }
  },
  props: ['id', 'user_name', 'tasks'],
  methods: {
    acomplish (item) {
      const index = this.tasks.indexOf(item)
      this.tasks[index].time_completion = new Date().toLocaleString()
      this.tasks[index].status = false
    },
    editItem (item) {
      this.editedIndex = this.tasks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogedit = true
    },
    deleteItem (item) {
      const index = this.tasks.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.tasks.splice(index, 1)
    },
    taskAdd: function(event){
      this.tasks.push({
      title:this.tasks.title,
      description: this.tasks.description,
      status: true,
      time_creation: new Date().toLocaleString()
      });
    },
    save () {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved'
    },
    cancel () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    open () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    close () {
      console.log('Dialog closed')
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  computed: {
    validat () {
      if (this.tasks.title && this.tasks.description  ) {
        return true
      }
    }
  }
}
</script>

<style scoped>


.slabcard{
    background-color: white;
    display: flex;
    height: 50px;
    margin-bottom: 400px;
}

</style>