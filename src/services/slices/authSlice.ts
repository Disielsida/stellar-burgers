import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  TLoginData,
  TRegisterData,
  getUserApi,
  logoutApi
} from '@api';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const registerUserThunk = createAsyncThunk(
  'auth/registerUser',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const getUserThunk = createAsyncThunk('auth/getUser', async () => {
  const res = await getUserApi();
  return res;
});

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  const res = await logoutApi();
  setCookie('accessToken', '', { expires: -1 });
  localStorage.removeItem('refreshToken');
  return res;
});

type AuthStore = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  userData: TUser | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthStore = {
  isAuthChecked: false,
  isAuthenticated: false,
  userData: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isAuthenticatedSelector: (state) => state.isAuthenticated,
    userDataSelector: (state) => state.userData,
    authLoadingSelector: (state) => state.loading,
    authErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка входа в аккаунт';
        state.loading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        console.error(action.error.message);
        state.userData = null;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка регистрации';
        state.loading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        console.error(action.error.message);
        state.userData = null;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loading = false;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка получения пользователя';
        state.loading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        console.error(action.error.message);
        state.userData = null;

        console.log('111');
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.userData = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка выхода из аккаунта';
        state.loading = false;
        console.error(action.error.message);
      });
  }
});

export const authReducer = authSlice.reducer;
export const {
  isAuthCheckedSelector,
  isAuthenticatedSelector,
  userDataSelector,
  authLoadingSelector,
  authErrorSelector
} = authSlice.selectors;
