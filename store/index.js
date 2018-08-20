import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
        basedata: [
            {
              id: "0",
              user_name: "User 1",
              tasks: [
                {
                  id: "1",
                  title: "First task",
                  description: "First task description",
                  time_creation: "14.08.2018, 15:19:26",
                  time_completion: "",
                  status: true
                },{
                  id: "2",
                  title: "Second task",
                  description: "Second task description",
                  time_creation: "14.08.2018, 16:19:26",
                  time_completion: "",
                  status: true
                },{
                  id: "3",
                  title: "Third task",
                  description: "Third task description",
                  time_creation: "14.08.2018, 18:19:26",
                  time_completion: "",
                  status: true
                }
              ]
    
            },
            {
              id: "1",
              user_name: "User 2",
              tasks: [
                {
                  id: "1",
                  title: "First task",
                  description: "First task description",
                  time_creation: "14.08.2018, 17:19:26",
                  time_completion: "",
                  status: true
                },{
                  id: "3",
                  title: "Third task",
                  description: "Third task description",
                  time_creation: "14.08.2018, 19:19:26",
                  time_completion: "",
                  status: true
                }
              ]
            }
          ]
    },
    mutations: {
      loadbasedata (state, basedata) {
        state.basedata = basedata
      }
    }
  })
}

export default createStore