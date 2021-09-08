import {AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import axios from "axios";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionsEnum.SET_USER, payload: user}),
    setIsAuth: (payload: boolean): SetAuthAction => ({type: AuthActionsEnum.SET_AUTH, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionsEnum.SET_ERROR, payload}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionsEnum.SET_IS_LOADING, payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            dispatch(AuthActionCreators.setError(''))

            setTimeout(async () => {
                const response = await axios.get<IUser[]>('./users.json')
                const mockUser = response.data.find(user => user.username === username && user.password === password)
                if (mockUser) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', mockUser.username)
                    dispatch(AuthActionCreators.setIsAuth(true))
                    dispatch(AuthActionCreators.setUser(mockUser))
                } else {
                    dispatch(AuthActionCreators.setError('Error! Wrong username or password.'))
                }
                dispatch(AuthActionCreators.setIsLoading(false))
            }, 750)

        } catch (e) {
            dispatch(AuthActionCreators.setError('Error on login!'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            localStorage.removeItem('auth')
            localStorage.removeItem('username')
            dispatch(AuthActionCreators.setUser({} as IUser))
            dispatch(AuthActionCreators.setIsAuth(false))
        } catch (e) {
            dispatch(AuthActionCreators.setError('Error on login!'))
        }
    }
}