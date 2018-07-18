import {appDispatcher} from './appDispatcher'

export const ActionType = {
    CHANGE_TODO_LIST: 'CHANGE_TODO_LIST'
}

export const Actions = {
    changeTodoList: (list) => {
        appDispatcher.dispatch({
            actionType: ActionType.CHANGE_TODO_LIST,
            value: list
        })
    }
}