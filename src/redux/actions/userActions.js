import { userTypes} from './types';
import axios from 'axios';
import { history } from '../../utility/history';

export const find = () => {
    return dispatch =>{
        axios.get('api/users').then((res)=>{
            dispatch({type: userTypes.FIND_USERS, users: res.data});
        }).catch((err) =>{
            console.log(err);
        });
    }
} 

export const create = (User) => {
    return dispatch =>{
        axios.post('api/users', User).then((res)=>{
            console.log("User created!");
        }).catch((err) =>{
            console.log(err);
        });
    }
} 
export const update = (User) => {
    return dispatch =>{
        axios.put('api/users/'+User.name, User).then((res)=>{
            history.push('/ranking');
            console.log("User updated!");
        }).catch((err) =>{
            console.log(err);
        });
    }
} 