import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

import { NavLink } from 'react-router-dom';
import { ROUTES } from '@utils-routes';
import clsx from 'clsx';
import { useSelector } from '../../../services/store';
import { isAuthenticatedSelector } from '../../../services/slices/authSlice';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to={ROUTES.HOME}
            className={({ isActive }) =>
              isActive ? clsx(styles.link, styles.link_active) : styles.link
            }
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2 mr-10'>
                  Конструктор
                </p>
              </>
            )}
          </NavLink>
          <NavLink
            to={ROUTES.FEED}
            className={({ isActive }) =>
              isActive ? clsx(styles.link, styles.link_active) : styles.link
            }
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2'>
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <NavLink
          to={isAuthenticated ? ROUTES.PROFILE : ROUTES.LOGIN}
          className={({ isActive }) =>
            clsx(
              styles.link,
              styles.link_position_last,
              isActive && styles.link_active
            )
          }
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};
