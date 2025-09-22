export const ROUTES = {
  HOME: '/',
  FEED: '/feed',
  FEED_ORDER: '/feed/:number',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  PROFILE_ORDERS: '/profile/orders',
  PROFILE_ORDER: 'profile/orders/:number',
  INGRIDIENT: 'ingridients/:id',
  NOT_FOUND: '*'
} as const;
