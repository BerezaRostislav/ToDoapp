<template>
    
    <article class="slabcard">
       

    <div style="text-align: center;">
        <nuxt-link :to="'/' + id">
        <h2>{{ user_name }}</h2>
        </nuxt-link>
  <v-data-table
    :headers="headers"
    :items="tasks"
    hide-actions
    item-key="title"
    expand
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td>
          <v-edit-dialog
            :return-value.sync="props.item.title"
            lazy
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          > {{ props.item.title }}
            <v-text-field
              slot="input"
              v-model="props.item.title"
              :rules="[max20chars]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-right">{{ props.item.time_creation }}</td>
        <td class="text-xs-right">{{ props.item.time_completion }}</td>
        <!-- <td class="text-xs-right">{{ props.item.time_completion }}</td> -->
        <td class="text-xs-right"><v-btn v-on:click="acomplish">done</v-btn></td>
      </tr>

    </template>
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-card-text>{{ props.item.description}}</v-card-text>
      </v-card>
    </template>
    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning">
        Sorry, nothing to display here :(
      </v-alert>
    </template>
  </v-data-table>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-btn slot="activator" color="primary" dark>Create new task</v-btn>
              <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="tasks.title"
      :rules="nameRules"
      :counter="10"
      label="Title"
      required
    ></v-text-field>
    <v-text-field
      v-model="tasks.description"
      :rules="descriptionRules"
      label="Description"
      required
    ></v-text-field>
  </v-form>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue darken-1" flat @click="clear">Clear</v-btn>
          <v-btn color="blue darken-1" flat @click="clear" @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat :disabled="!validat" v-on:click="userAdd" @click.native="dialog = false" @click="clear">Save</v-btn>
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
        max20chars: (v) => v.length <= 20 || 'Input too long!',
        headers: [
          {
            text: "title",
            align: 'left',
            sortable: false,
            value: 'title'
          },
          { text: 'time of creation', value: 'time_creation' },
          { text: 'time of completion', value: 'time_completion' },
        ],
        }
    },

    props: ['id', 'user_name', 'tasks'],
    methods: {
    acomplish: function(event) {
        this.tasks[0].status = false
    },
    userAdd: function(event){
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
    /* flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box; */

}

</style>