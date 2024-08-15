let pageNo = 1
const itemPerPage = 5
const search = document.getElementById('search')
const btn = document.getElementById('btn')
const list = document.getElementById('list')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const url = 'http://127.0.0.1:8000/todo/'

const getElement = (data)=> {
    list.innerHTML = ''
    const start = (pageNo-1) * itemPerPage
    const end = start + itemPerPage
    const paginationPage = data.slice(start,end)

    const createbtn = (text) =>{

        const button = document.createElement('button')
        button.className = text
        button.textContent = text
        return button

    } 

    const creatediv = (text) =>{

        const div = document.createElement('div')
        div.className = text
        return div

    }

    paginationPage.forEach((el)=>{

        const status = el.status

        const div1 = creatediv('todo')
        const p = document.createElement('p')
        const btn1 = createbtn('Edit')
        const btn2 = createbtn('Delete')
        const btn3 = createbtn('Toggle')
        const div2 = creatediv('container')
        const process = document.createElement('p')
        process.className = 'status'
        p.className = 'cont'
        p.textContent = el.title
        if (status){
            process.textContent = 'COMPLETED'
            process.style.color = 'Green'
        }
        else{
            process.textContent = 'PENDING'
            process.style.color = 'rgb(215, 154, 109)'
        }

        div2.append(process,btn3,btn1,btn2)
        div1.append(p,div2)
        list.appendChild(div1)
        
        btn2.addEventListener('click',()=> deleteTodo(el.id,div1))
        btn1.addEventListener('click',()=>editTodo(el.id,p))
        btn3.addEventListener('click',()=>toggleTodo(el.id,process))
    })

    prev.disabled = pageNo === 1
    next.disabled = Math.ceil(data.length / itemPerPage) === pageNo
}


btn.addEventListener('click', async () => {

    const title = search.value
    const status = false

    try{
        const res = await fetch(`${url}create/`,{method : 'POST', headers : {'Content-Type' : 'application/json'},body : JSON.stringify({title,status})})
        const data = await res.json()
        // getElement(data)
    } catch (error) {
        console.error('Something Went Wrong',error)
    }

})
    



const fetchtodo = async () => {
    try{
        const res = await fetch(url)
        const data = await res.json()
        getElement(data)
    } catch (error) {
        console.error('Something Went Wrong',error)
    }
}

fetchtodo()

prev.addEventListener('click',()=>{

    if (pageNo > 1){
        pageNo--
        fetchtodo()
    }
})

next.addEventListener('click', ()=>{

    pageNo++
    fetchtodo()
})


const deleteTodo = async (id,block) =>{

    try{

        const res = await fetch(`${url}edit/${id}/`,{method : 'DELETE'})
        
        if (res.ok) block.remove()

        else console.error('Failed to Delete')



    }catch (error){
        console.error('Something Went Wrong',error)
    }
}


const editTodo = async (id,p)=>{

    const newTitle = prompt('Update the Todo',p.textContent)
    

    try{

        const res = await fetch(`${url}edit/${id}/`,{method : 'PUT', headers : {'Content-Type' : 'application/json'},body : JSON.stringify({'title' : newTitle})})
        
        if (res.ok) {
            
            const data = await res.json()
            p.textContent = data.title

        }

        else console.error('Failed to Delete')



    }catch (error){
        console.error('Something Went Wrong',error)
    }

}


const toggleTodo = async (id,p) =>{

    const currentStatus = p.textContent === 'COMPLETED'
    const setupStatus = !currentStatus
    console.log(JSON.stringify({ 'status': setupStatus }))

    try{

        const res = await fetch(`${url}edit/${id}/`,{method : 'PATCH', headers : {'Content-Type' : 'application/json'},body : JSON.stringify({'status' : setupStatus})})
        
        if (res.ok) {
            
            const data = await res.json()
            p.textContent = (data.status)? 'COMPLETED': 'PENDING'
            p.style.color = (data.status)? 'Green':'rgb(215, 154, 109)'
        


        }

        else console.error('Failed to toggle')



    }catch (error){
        console.error('Something Went Wrong',error)
    }
}