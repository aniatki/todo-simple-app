const LOCAL_STORAGE_KEY = "todo"
const enterTodo = document.getElementById("enter-todo")
const labels = document.querySelector("[data-labels]")
const addButton = document.querySelector("[data-add]")
const clearButton = document.querySelector("[data-clear]")
const num = document.querySelector("[data-show]")
const selectAll = document.querySelector("[data-select-all]")
const unselectAll = document.querySelector("[data-unselect-all]")
const buttons = document.querySelectorAll("button")

clearButton.addEventListener("click", () => {
    clearCompletedTasks()
    setNumber()
})

addButton.addEventListener("click", () => {
    if (enterTodo.value === "") return
    setNumber()
    createTodo()
})

enterTodo.addEventListener("keydown", (e) => {
    if (enterTodo.value === "") return
    if (e.key == "Enter") {
        setNumber()
        createTodo()
    }
})
loadFromLocalStorage()
setNumber()

selectAll.addEventListener("click", () => {
    const checks = document.querySelectorAll("[type='checkbox']")
    checks.forEach((check) => {
        check.checked = true
    })
    setNumber()
})

unselectAll.addEventListener("click", () => {
    const checks = document.querySelectorAll("[type='checkbox']")
    checks.forEach((check) => {
        check.checked = false
    })
    setNumber()
})

function setNumber() {
    return (num.innerText = `${localStorage.length} left to do.`)
}

function createTodo() {
    const firstDiv = document.querySelector("[data-labels]")
    const text = enterTodo.value
    const newLabel = document.createElement("label")
    newLabel.setAttribute("for", Date.now())
    const check = document.createElement("input")
    check.type = "checkbox"
    check.id = Date.now()
    newLabel.innerText = text
    newLabel.prepend(check)
    firstDiv.append(newLabel)
    saveToLocalStorage({ name: text, id: Date.now(), completed: false })
    enterTodo.value = ""
    setNumber()
    return firstDiv
}

function saveToLocalStorage({ completed, id, name }) {
    if (id === undefined) return

    localStorage.setItem(
        `${LOCAL_STORAGE_KEY}${id}`,
        JSON.stringify({ completed, id, name })
    )
    setNumber()
}

function loadFromLocalStorage() {
    if (localStorage.length === 0) return
    for (let i = 0; i < localStorage.length; i++) {
        const key = JSON.parse(localStorage.getItem(localStorage.key(i)))
        if (
            (key.completed === undefined || "" || null,
            key.id === undefined || "" || null,
            key.name === undefined || "" || null)
        )
            return
        const firstDiv = document.querySelector("[data-labels]")
        const newLabel = document.createElement("label")
        newLabel.setAttribute("for", key.id)
        newLabel.innerText = key.name
        const check = document.createElement("input")
        check.type = "checkbox"
        check.checked = key.completed
        check.id = key.id
        newLabel.prepend(check)
        firstDiv.append(newLabel)
    }
    setNumber()
}

function clearCompletedTasks() {
    document.querySelectorAll('[type="checkbox"]').forEach((elem) => {
        if (elem.checked) {
            elem.parentElement.remove()
            localStorage.removeItem(`${LOCAL_STORAGE_KEY}${elem.id}`)
        }
    })
    setNumber()
}
