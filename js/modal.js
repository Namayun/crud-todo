// const modalFunc = () => {
//     const button = document.querySelector('.cover__button')
//     const modalCloseBtn = document.querySelector('.modalCloseButton')
//     const modal = document.querySelector('.modal')
//     const backdrop = document.querySelector('.backdrop')
//     const content = document.querySelector('.modalContent')

//     button.addEventListener('click', () => {
//         modal.classList.add('modalActive')
//         backdrop.classList.add('backdropActive')
//         showContent()
//     })

//     const removeClasses = () => {
//         content.innerHTML = ''
//         modal.classList.remove('modalActive')
//         backdrop.classList.remove('backdropActive')
//     }

//     modalCloseBtn.addEventListener('click', removeClasses)

//     backdrop.addEventListener('click', removeClasses)

//     modal.addEventListener('click', (e) => {
//         e.stopPropagation()
//     })


//     const showContent = () => {
//         const title = document.createElement('input')
//         const description = document.createElement('input')
//         const edit = document.createElement('button')
//         edit.textContent = 'Edit'
//         content.append(title,description,edit)
//     }

    

// }

// modalFunc()