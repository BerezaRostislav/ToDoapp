<template>
  <v-app light>
    <v-toolbar>
      <nuxt-link :to="'/'">
        <v-toolbar-title>ToDo</v-toolbar-title>
      </nuxt-link>
      <v-spacer/> 
      <v-autocomplete
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        v-model="select"
        cache-items
        class="mx-3"
        flat
        hide-no-data
        hide-details
        label="Which user you looking for?"
        solo-inverted
      ></v-autocomplete>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click.stop="dialog = true" >Create User</v-btn>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Creating new User</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="username"
                :rules="nameRules"
                :counter="10"
                label="User name"
                required
              />
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
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer>
      <span>&copy; Contacts</span>
    </v-footer>
  </v-app>
</template>

<script>

import Todo from '@/components/Todo.vue'

  export default {

    data () {
      return {
        valid: true,
        username: null,
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters'
        ],
        dialog: false,
        loading: false,
        items: [],
        search: null,
        select: null,
        users: this.$store.state.basedata
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      }
    },
    computed: {
    validat () {
      if (this.username) {
        return true
      }
    }
  },
  methods: {
  clear () {
    this.$refs.form.reset()
  },
  userAdd: function(event){
    this.users.push({
    user_name: this.username,
    id: '3',
    tasks: []
    });
  },
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style>

.v-content {
  background-size:auto;
  background-image: url("/static/background.jpg");
}

</style>
