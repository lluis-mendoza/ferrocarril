import {userTypes} from '.././actions/types';

export default function users(state={}, action){
    switch (action.type) {
        case userTypes.FIND_USERS:
            return {
                users: action.users
            };
        default:
            return state;
    }
  }