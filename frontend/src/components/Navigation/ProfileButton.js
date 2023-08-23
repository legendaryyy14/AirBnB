import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
import Modal from 'react-modal'
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowSignUpModal(false)
    setShowMenu(false)
    setShowLoginModal(false)
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const [ showLoginModal, setShowLoginModal ] = useState(false);
  const [ showSignUpModal, setShowSignUpModal ] = useState(false);

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <NavLink to="/spots/current">Manage Spots</NavLink>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={() => setShowLoginModal(true)} className='loginBtn'>Login</button>
              <Modal
                isOpen={showLoginModal}
                onRequestClose={() => setShowLoginModal(false)}
              >
                <LoginFormPage />
              </Modal>
            </li>

            <li>
              <button onClick={() => setShowSignUpModal(true)}>Sign Up</button>
              <Modal
                isOpen={showSignUpModal}
                onRequestClose={() => setShowSignUpModal(false)}
              >
                <SignupFormPage />
              </Modal>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
