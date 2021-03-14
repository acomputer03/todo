
    var app = new Vue({
      el: '#app',
      data: {
        newTodo: '',
        addnewtodo: {},
        Todo: [],
        whatTimetodo: '',
        cacheTodo:{},
        cacheTitle:'',
        info: null
      },
      methods: {
        addTodo: function () {

          const vm = this;
          var value = vm.newTodo.trim();
          console.log(vm.whatTimetodo )
          // if( vm.whatTimetodo ===""){
          //   return;
          // }
          if (!value || vm.whatTimetodo ==="") {
            return;
          };

          vm.addnewtodo = {
            content: value,
            timetodo: vm.whatTimetodo,
          };
          vm.newTodo = '';
          vm.whatTimetodo = '';
          // const api = '127.0.0.1:3000/addTodo';

          console.log(vm.addnewtodo)
          const api = `https://warm-shore-54768.herokuapp.com/addTodo`;

          axios.post(api, vm.addnewtodo)
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
            vm.Todo = response.data.list;
            // console.log(vm.Todo )
            return vm.Todo;

          });
        },
        delTodo: function (item) {
          // console.log(item )
          const vm = this;
          const api = `https://warm-shore-54768.herokuapp.com/deleteTodo/${item.id}`;
          
          // console.log(process.env.APIPATH,process.env.CUSTOMPATH)
          axios.delete(api).then((response) => {
            console.log(response.data);
            vm.getTodo(); 
            
          });
        },
        editTodo: function (item){
          const vm = this;
          vm.cacheTodo = item;
          vm.cacheTitle = item.content;          
        },

        doneEdit:function(item){
          const vm = this;
          item.content = vm.cacheTitle;
          vm.cacheTitle = '';
          vm.cacheTodo = {};          
          const api = `https://warm-shore-54768.herokuapp.com/updataTodo/${item.id}`;

          axios.put(api, item)
            .then((res) => {
              console.log(res);
              vm.getTodo(); 
            })
            .catch((error) => { console.error(error) })         
        },
        cacelEdit:function(){
          this.cacheTodo = {};
        },
        
        // editTodo:function(item){
        //   const vm = this;
        //   const api = `https://warm-shore-54768.herokuapp.com/deleteTodo/${item.id}`;



        // },
        
        //修改
        


        
      },
      computed: {
        todayFilteredTodos: function () {
          var vm = this;
          var newTodos = [];
          vm.Todo.forEach(function (item) {
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
          vm.Todo.forEach(function (item) {
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
          vm.Todo.forEach(function (item) {
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
          vm.Todo.forEach(function (item) {
            // console.log(item )
            if (item.timetodo == "這個月") {
              newTodos.push(item);
            }
          });
          return newTodos;
        },
        totalTodos: function () {    
          const vm = this;      
          return vm.Todo;
        },
      },
      created() {
        
        this.getTodo()
      },

    });
