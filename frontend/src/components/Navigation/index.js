import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  // const dispatch = useDispatch();

  // const logout = (e) => {
  //   e.preventDefault();
  //   dispatch(sessionActions.logout());
  // };


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
      </div>
    );
  }

  return (
    <div>

      <div className='left-side'>
        <NavLink exact to="/"><i className="fa-brands fa-airbnb"></i> airbnb</NavLink>
      </div>
      {
       sessionUser ? (
        <>
         <NavLink to='/spots'>Create a New Spot</NavLink>
        </>) : (<></>)

      }
      <div className='right-side'>
      {isLoaded && sessionLinks}
      </div>

    </div>
  );
}

export default Navigation;
