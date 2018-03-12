var getters = {

};
var state = {
  count: 0
};
var mutations = {
  increment(state) {
    console.log(state)
    state.count++;
  }
};
var actions = {
  increment (context) {
    context.commit('increment')
  }
};
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
});
export default store
