<template>
  <article class="slabcard">
    <v-container grid-list-md text-xs-center>
      <v-layout style="background-color:white;" align-space-around justify-center row fill-height>
        <v-flex  xs11>
          <nuxt-link :to="'/' + id">
            <span style="margin-left: 60px;font-size:30px">{{ user_name }}</span>
          </nuxt-link>
        </v-flex>
        <v-flex xs1 style="margin-top:8px"> 
          <v-icon
            medium
            @click="deleteUser(id)"
          >
          delete
          </v-icon>
        </v-flex>
      </v-layout>
      <v-layout align-space-around justify-center column>
      <v-flex>
        
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
      </v-flex>
      <v-flex>
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
            <span class="headline">Edit task</span>
          </v-card-title>
          <v-flex xs12 sm6 md4>
            <v-text-field v-model="editedItem.id" label="id"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field v-model="editedItem.title" label="title"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field v-model="editedItem.description" label="description"></v-text-field>
          </v-flex>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="clear">Clear</v-btn>
            <v-btn color="blue darken-1" flat @click="clear" @click.native="dialogedit = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="savetask" >Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> 
      </v-flex>
      </v-layout>
    </v-container>
  </article>
</template>

<script>


export default {
  data () {
    return {
      slabs: this.$store.state.basedata,
      editedIndex: -1,
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
      ],
      editedItem: {
        id: '',
        title: "",
        description: "",
      },
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
      confirm('Are you sure you want to delete this task?') && this.tasks.splice(index, 1)
    },
    deleteUser (id) {
      const index = this.slabs.findIndex((item) => item.id === id);
      confirm('Are you sure you want to delete this user?') && this.slabs.splice(index, 1)
    },
    taskAdd: function(event){
      this.tasks.push({
      title:this.tasks.title,
      description: this.tasks.description,
      status: true,
      time_creation: new Date().toLocaleString()
      });
    },
    savetask () {
      if (this.editedIndex > -1) {
        Object.assign(this.tasks[this.editedIndex], this.editedItem)
      } else {
        this.tasks.push(this.editedItem)
      }
      this.dialogedit = false
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



</style>