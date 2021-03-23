
   var UserName = JSON.parse(localStorage.getItem('UserName'))||[];



    var app = new Vue({
      el: '#app',
      data: {
        newTodo: '',
        newname:'',
        addnewtodo: {},
        Todo: [],
        whatTimetodo: '',
        cacheTodo:{},
        cacheTitle:'',
        user:[],
        userName:'',
        info: null
      },
      methods: {
        
        addUser:function(){

          const vm = this;
          var value = vm.newname.trim();
          console.log(value )

          if(!value){
            return;
          }
          vm.user.push({
            name:value, 
          });
          vm.newname = '';


          localStorage.setItem('UserName', JSON.stringify(this.user));
          UserName = JSON.parse(localStorage.getItem('UserName'));
          vm.userName = UserName[0].name;
          console.log(vm.userName +'安安')
          
          vm.getTodo();
        },
        
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
          
          // console.log(vm.addnewtodo)


          UserName = JSON.parse(localStorage.getItem('UserName'));
          vm.userName = UserName[0].name;     
          const api = `https://mighty-waters-02279.herokuapp.com/api/${vm.userName}/addTodo`;
          // const api = `http://127.0.0.1:3000/api/${vm.userName}/addTodo`;
          console.log(api )
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
          UserName = JSON.parse(localStorage.getItem('UserName'));
          vm.userName = UserName[0].name;          
          const api = `https://mighty-waters-02279.herokuapp.com/api/${vm.userName}/getTodo`;
          // const api = `http://127.0.0.1:3000/api/${vm.userName}/getTodo`;
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
          UserName = JSON.parse(localStorage.getItem('UserName'));
          vm.userName = UserName[0].name;          
          const api = `https://mighty-waters-02279.herokuapp.com/api/${vm.userName}/deleteTodo/${item.id}`;
          // const api = `http://127.0.0.1:3000/api/${vm.userName}/deleteTodo/${item.id}`;
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
          UserName = JSON.parse(localStorage.getItem('UserName'));
          vm.userName = UserName[0].name;          
          const api = `https://mighty-waters-02279.herokuapp.com/api/${vm.userName}/updataTodo/${item.id}`;
          // const api = `http://127.0.0.1:3000/api/${vm.userName}/updataTodo/${item.id}`;
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
        const vm = this;
        
        UserName = JSON.parse(localStorage.getItem('UserName'));


        // console.log(vm.user)
        if( UserName !== null  ){
          vm.user = UserName;
          vm.userName =vm.user[0].name;
          console.log(vm.userName)
          vm.getTodo()
        }else{
          console.log('請先輸入姓名');
          vm.userName='';
        }
        console.log(vm.user)
        
      },

    });
