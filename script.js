// getTodoListFromlocal function ye isliye use hota hai ki jab page refress ho to data local storage wala mile
      const getTodoListFromlocal = () =>{
        const data = JSON.parse(localStorage.getItem("youtubeTodoList"))
        console.log(data);
        return data;
      }
 
    //   adding add to list dynamically
          const addTodoDynamicElement = (curele) =>{
           const divElement = document.createElement("div")
           divElement.classList.add("main_todo_div")
           divElement.innerHTML = `<li>${curele}</li> <button class = "deletebtn"> Delete </button>`
            mainTodoElem.append(divElement)

    }
        
    const addTodoListLocalStorage = (localTodoLists)=>{
        return localStorage.setItem("youtubetodolist",JSON.stringify(localTodoLists))
    }


        // ya to previous wala mile agr na ho to empty array mile
            localTodoLists = getTodoListFromlocal() || []


        const addTodoList = (e)=>{
            e.preventDefault()
            
            // empty space ko hta ke store krna hai
            const TodoListValue = inputValue.value.trim();


            if(localTodoLists.includes(TodoListValue)){

                // agar same hua to add na ho

                inputValue.value = " ";
            }
            else if(TodoListValue != ""){
             
            // agr different huyiyo add and string bhi khali na ho

            localTodoLists.push(TodoListValue)

            // set isliye liya hai unique element hi use hota
            // then uske baad array mein add hota hai
            localTodoLists = [... new Set(localTodoLists)]
            console.log(localTodoLists);
            
            // ab localstorage mein add kro
            localStorage.setItem("youtubeTodoList",JSON.stringify(localTodoLists))
            
            // creation of div
           const divElement = document.createElement("div")

           // add class to th div
           divElement.classList.add("main_todo_div")

           // ab uss divElement ke andr li list aur dlt button add karna hai
           divElement.innerHTML = `<li>${inputValue.value}</li> <button class = "deletebtn"> Delete </button>`

           // aur ye append kr do div todo lis mein
            mainTodoElem.append(divElement)
               
            // ye isliye kiya kyunki add krne ke baad screen blank ho jye
            inputValue.value = ""

             }
        }
        const mainTodoElem = document.querySelector(".todo-lists-elem")
        const inputValue = document.getElementById("inputValue")
        const btn = document.querySelector(".addTodo");

          
        /// create a function to show the data
        const showTodoList = () =>{
        localTodoLists.forEach((curele)=>{
            addTodoDynamicElement(curele)
        })
        
        }

        showTodoList();

        // remove the data
        const removeTodoElem = (e)=>{
           console.log(e.target);
           const todotoRemove = e.target;
           let todolistContent = todotoRemove.previousElementSibling.innerText
           let parentElem =todotoRemove.parentElement;
           console.log(todolistContent);


           localTodoLists = localTodoLists.filter((currele)=>{
                return (currele != todolistContent)
           })

           addTodoListLocalStorage(localTodoLists);
           parentElem.remove()
           console.log(localTodoLists);
           
           
        }

        mainTodoElem.addEventListener("click",(e)=>{
        e.preventDefault();
        if(e.target.classList.contains("deletebtn")){
            removeTodoElem(e)
        }
        })

        
        btn.addEventListener("click",(e)=>{
            addTodoList(e)
        })
