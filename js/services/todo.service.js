'use strict'

var gTodos
_createTodos()


var gFilterBy = 'ALL'

function getTodosForDisplay() {
    if (gFilterBy === 'ALL') return gTodos
    const todos = gTodos.filter(todo =>
        (todo.isDone && gFilterBy === 'DONE') ||
        (!todo.isDone && gFilterBy === 'ACTIVE'))
    return todos
}

function getTotalCount() {
    return gTodos.length
}
function getActiveCount() {
    const todos = gTodos.filter(todo => !todo.isDone)
    return todos.length
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1)
    _saveTodosToStorage()
}

function addTodo(txt) {
    const todo = _createTodo(txt)
    gTodos.unshift(todo)
    _saveTodosToStorage()
}


// Those are "private" functions meant to be used ONLY by the service itself
function _createTodo(txt) {
    const todo = {
        id: _makeId(),
        txt: txt,
        isDone: false
    }
    return todo
}

function _makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveTodosToStorage() {
    saveToStorage('todoDB', gTodos)
}

function _createTodos() {
    var todos = loadFromStorage('todoDB')
    if (!todos || todos.length === 0) {
        todos = [
            _createTodo('Learn JS'),
            _createTodo('Master CSS'),
            _createTodo('Study HTML'),
        ]
    }
    gTodos = todos
    _saveTodosToStorage()
}