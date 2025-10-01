import { setCookie, getCookie } from './cookie';
import { TIngredient, TOrder, TUser } from './types';

export const BASE_URL =
  process.env.BURGER_API_URL ?? 'https://norma.nomoreparties.space/api';

type TServerResponse<T> = {
  success: boolean;
} & T;

const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json() as Promise<T>;
  }
  return Promise.reject(`Ошибка ${res.status}`) as Promise<T>;
};

const checkSuccess = <T>(res: TServerResponse<T>): TServerResponse<T> => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${JSON.stringify(res)}`) as never;
};

const request = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await checkResponse<TServerResponse<T>>(res);
  return checkSuccess<T>(data) as T;
};

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export const refreshToken = (): Promise<TRefreshResponse> =>
  request<TRefreshResponse>('/auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  }).then((data) => {
    localStorage.setItem('refreshToken', data.refreshToken);
    setCookie('accessToken', data.accessToken);
    return data;
  });

export const fetchWithRefresh = async <T>(
  endpoint: string,
  options: RequestInit = {}
) => {
  try {
    return await request<T>(endpoint, options);
  } catch (err: any) {
    if (err?.message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as Record<string, string>).authorization =
          refreshData.accessToken;
      }
      return await request<T>(endpoint, options);
    }
    return Promise.reject(err);
  }
};

type TIngredientsResponse = TServerResponse<{ data: TIngredient[] }>;

export const getIngredientsApi = () =>
  request<TIngredientsResponse>('/ingredients').then((data) => data.data);

type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

export const getFeedsApi = () => request<TFeedsResponse>('/orders/all');

export const getOrdersApi = () => {
  const token = getCookie('accessToken');
  return fetchWithRefresh<TFeedsResponse>('/orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...(token ? { authorization: token } : {})
    } as HeadersInit
  }).then((data) => data.orders);
};

type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

export const orderBurgerApi = (ingredients: string[]) => {
  const token = getCookie('accessToken');
  return fetchWithRefresh<TNewOrderResponse>('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...(token ? { authorization: token } : {})
    } as HeadersInit,
    body: JSON.stringify({ ingredients })
  });
};

type TOrderResponse = TServerResponse<{ orders: TOrder[] }>;

export const getOrderByNumberApi = (number: number) =>
  request<TOrderResponse>(`/orders/${number}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

export type TRegisterData = { email: string; name: string; password: string };

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export const registerUserApi = (data: TRegisterData) =>
  request<TAuthResponse>('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });

export type TLoginData = { email: string; password: string };

export const loginUserApi = (data: TLoginData) =>
  request<TAuthResponse>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });

export const forgotPasswordApi = (data: { email: string }) =>
  request<TServerResponse<{}>>('/password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });

export const resetPasswordApi = (data: { password: string; token: string }) =>
  request<TServerResponse<{}>>('/password-reset/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });

type TUserResponse = TServerResponse<{ user: TUser }>;

export const getUserApi = () => {
  const token = getCookie('accessToken');
  return fetchWithRefresh<TUserResponse>('/auth/user', {
    headers: token ? ({ authorization: token } as HeadersInit) : undefined
  });
};

export const updateUserApi = (user: Partial<TRegisterData>) => {
  const token = getCookie('accessToken');
  return fetchWithRefresh<TUserResponse>('/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...(token ? { authorization: token } : {})
    } as HeadersInit,
    body: JSON.stringify(user)
  });
};

export const logoutApi = () =>
  request<TServerResponse<{}>>('/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  });
