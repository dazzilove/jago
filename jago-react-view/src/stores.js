import {appDispatcher} from './appDispatcher'
import {ActionType} from './actions.js'

export const todoListStore = {name: '', onChange: null}

appDispatcher.register(payload => {
    if (payload.actionType === ActionType.CHANGE_TODO_LIST) {
        todoListStore.list = payload.value
        todoListStore.onChange()
    }
})