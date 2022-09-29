// 1)Если токена нет - redirect на auth
// 2)Вам нужно создать кнопку - log out
// log out должен стереть токен и сразу
// редиректнуть на auth


const API = 'https://jwt-ulios-test.herokuapp.com'
const createTodoRoute = '/create-todo'
const getAllTodoRoute = '/get-all-todo'
const deleteTodoRoute = '/delete-todo/'
const doneTodoRoute = '/done/'
const editTodoRoute = '/update-todo/'
const getNameRoute = '/get-user-name'


const title = document.querySelector('#title')
const descr = document.querySelector('#descr')
const output = document.querySelector('.output')
const form = document.querySelector('#todo-form')
const redirectAuth = document.querySelector('#redirectAuth')
const redirectReg = document.querySelector('#redirectReg')
const userName = document.querySelector('#user-name')





const exitFunc = () => {
    const exit = document.querySelector('#log-out')
    exit.addEventListener('click', () => {
        window.location.href = '../pages/auth.html'
        localStorage.removeItem("token")

    })
}


exitFunc()

const redirect = () => {
    const token = localStorage.getItem('token')
    if (!token) {
        window.location.href = '../pages/auth.html'
    }
    redirectAuth.addEventListener('click', () => {
        window.location.href = '../pages/auth.html'
    })

    redirectReg.addEventListener('click', () => {
        window.location.href = '../reg.html'
    })
}


redirect()



const createTodo = async () => {
    const data = {
        title: title.value,
        description: descr.value
    }
    try {
        const request = await fetch(API + createTodoRoute, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': localStorage.getItem('token')
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
        const response = await request.json()
        getTodo()
        title.value = ''
        descr.value = ''
        console.log(response);
    } catch (e) {
        alert('asd')
    }


}


const getTodo = async () => {
    try {
        const request = await fetch(API + getAllTodoRoute, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': localStorage.getItem('token')
            },
            method: 'GET'
        })
        const response = await request.json()
        console.log(response);
        renderTodo(response.reverse());
    } catch (e) {
        // alert('error')
    }
}

getTodo()




const deleteTodo = async (id) => {
    try {
        const request = await fetch(API + deleteTodoRoute + id, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': localStorage.getItem('token')
            },
            method: 'DELETE'
        })
        const response = await request.json()
        console.log(response);
        getTodo()
    } catch (e) {
        // alert('error')
    }
}


const doneTodo = async (id) => {
    try {
        const request = await fetch(API + doneTodoRoute + id, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': localStorage.getItem('token')
            },
            method: 'POST'
        })
        const response = await request.json()
        getTodo()
        console.log(response);
    } catch (e) {

    }
}




const getUser = async () => {
    try {
        const request = await fetch(API + getNameRoute, {
            headers: {
                "Content-Type": "application/json",
                'x-access-token': localStorage.getItem('token')
            },
            method: 'GET'
        })
        const response = await request.json()
        console.log(response);
        renderUser(response);
    } catch (e) {

    }
}

getUser()

const renderUser = (name) => {
    userName.textContent = `USERNAME: ${name.name}`
}

form.addEventListener('submit', (e) => {
    if (!title.value || !descr.value || !title.value.trim() || !descr.value.trim()) {
        alert('Fields is empty')
        e.preventDefault()
    } else {
        e.preventDefault()
        createTodo()
    }

})

let editId = ''
console.log(editId);

const renderTodo = (data) => {
    output.innerHTML = ''

    data.forEach(el => {
        const box = document.createElement('div')
        const title = document.createElement('h2')
        const descr = document.createElement('p')
        const btnDelete = document.createElement('button')
        const btnDone = document.createElement('button')
        const btnEdit = document.createElement('button')
        const messageDone = document.createElement('p')
        const imageDelete = document.createElement('img')
        const imageDone = document.createElement('img')
        const imageEdit = document.createElement('img')

        imageDelete.src = 'https://www.svgrepo.com/show/21045/delete-button.svg'
        imageDone.src = 'https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/done-icon.png'
        imageEdit.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/SVG-edit_logo.svg/1024px-SVG-edit_logo.svg.png'



        if (!el.title) {
            title.textContent = 'пустая строка'
            box.append(title, btnDelete, btnDone)
            output.append(box)
        } else {
            title.textContent = `Name: ${el.title}`
            descr.textContent = `Description: ${el.description}`
            box.style.border = '1px solid black'
            box.style.borderRadius = '3px'
            box.style.margin = '10px 0'
            btnEdit.append(imageEdit)
            btnDone.append(imageDone)
            btnDelete.append(imageDelete)
            box.append(messageDone, title, descr, btnDelete, btnDone, btnEdit)
            output.append(box)
        }



        btnDone.addEventListener('click', () => {
            if (confirm('Уверенны')) {
                doneTodo(el._id)
                el.status = true
            }
        })

        if (el.status) {
            title.style.textDecoration = 'line-through'
            descr.style.textDecoration = 'line-through'
            messageDone.textContent = 'Todo is done'
            box.style.background = 'green'
            btnDone.disabled
            btnDelete.addEventListener('click', () => {
                deleteTodo(el._id)
            })
            btnEdit.addEventListener('click', () => {
                alert('Todo is done')
                btnEdit.disabled
            })

        } else {
            messageDone.textContent = 'Todo is not done'
            box.style.background = 'red'
            btnEdit.addEventListener('click', () => {
                editToModal(el._id)
                editId = el._id
                console.log(editId);
            })
            btnDelete.addEventListener('click', () => {
                btnDelete.disabled
                alert('Todo is not done')
            })

        }

    })

}



// Modal 

const editTodo = async () => {
    const title = document.querySelector('#edit-title')
    const descr = document.querySelector('#edit-desc')
    if (!title.value || !descr.value || !title.value.trim() || !descr.value.trim()) {
        alert('Fields empty')
    } else {
        const data = {
            title: title.value,
            description: descr.value
        }
        try {
            const request = await fetch(API + editTodoRoute + editId, {
                headers: {
                    "Content-Type": "application/json",
                    'x-access-token': localStorage.getItem('token')
                },
                method: 'PATCH',
                body: JSON.stringify(data)
            })
            const response = await request.json()
            getTodo()
            removeClasses()
            console.log(response);

        } catch (e) {

        }
    }

}

const editBtn = document.querySelector('#edit-modal')

editBtn.addEventListener('click', () => {
    editTodo()
})

const modalCloseBtn = document.querySelector('.modalCloseButton')
const modal = document.querySelector('.modal')
const backdrop = document.querySelector('.backdrop')
const content = document.querySelector('.modalContent')

const removeClasses = () => {
    modal.classList.remove('modalActive')
    backdrop.classList.remove('backdropActive')
}

const editToModal = () => {
    modal.classList.add('modalActive')
    backdrop.classList.add('backdropActive')
    modalCloseBtn.addEventListener('click', removeClasses)
    backdrop.addEventListener('click', removeClasses)
    modal.addEventListener('click', (e) => {
        e.stopPropagation()
    })
}

// Modal