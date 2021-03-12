
    var app = new Vue({
      el: '#app',
      data: {
        newTodo: '',
        todo: {},
        tempTodo: [],
        whatTimetodo: '',
        info: null
      },
      methods: {
        addTodo: function () {

          const vm = this;
          var value = vm.newTodo.trim();
          if (!value) {
            return;
          };

          vm.todos = {
            content: value,
            timetodo: vm.whatTimetodo,
          };
          vm.newTodo = '';
          vm.whatTimetodo = '';
          // const api = '127.0.0.1:3000/addTodo';

          console.log(vm.todos)
          const api = `https://warm-shore-54768.herokuapp.com/addTodo`;

          axios.post(api, vm.todos)
            .then((res) => {
              console.log(res);
              vm.getTodo(); 
            })
            .catch((error) => { console.error(error) })
          
          //  axios.post(api, vm.todos ).then(response => {
          //   console.log(response);
          // });



        },
        getTodo: function () {
          const vm = this;

          const api = 'https://warm-shore-54768.herokuapp.com/getTodo';
          axios.get(api).then(response => {
            // console.log(response.data.list);
            vm.tempTodo = response.data.list;
            // console.log(vm.tempTodo )
            return vm.tempTodo;

          });
        }
      },
      computed: {
        todayFilteredTodos: function () {
          var vm = this;
          var newTodos = [];
          vm.tempTodo.forEach(function (item) {
            // console.log(item )
            if (item.timetodo == "今天") {
              newTodos.push(item);
            }
          });
          return newTodos;
        },
        tomorrowFilteredTodos: function () {
          var vm = this;
          var newTodos = [];
          vm.tempTodo.forEach(function (item) {
            // console.log(item )
            if (item.timetodo == "明天") {
              newTodos.push(item);
            }
          });
          return newTodos;
        },
        thisWeekFilteredTodos: function () {
          var vm = this;
          var newTodos = [];
          vm.tempTodo.forEach(function (item) {
            // console.log(item )
            if (item.timetodo == "這禮拜") {
              newTodos.push(item);
            }
          });
          return newTodos;
        },
        thisMonthFilteredTodos: function () {
          var vm = this;
          var newTodos = [];
          vm.tempTodo.forEach(function (item) {
            // console.log(item )
            if (item.timetodo == "這個月") {
              newTodos.push(item);
            }
          });
          return newTodos;
        },
        totalTodos: function () {    
          const vm = this;      
          return vm.tempTodo;
        },
      },
      created() {
        
        this.getTodo()
      },

    });
