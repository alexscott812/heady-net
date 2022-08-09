import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../hooks/useAuth.js';

const UserBadge = (props) => {

  const { user, logout } = useAuth();

  return (
    <DropdownButton
      variant='primary'
      id='dropdown-basic-button'
      align='end'
      title={ `${user.first_name.charAt(0)}${user.last_name.charAt(0)}` }
      className='px-0 mx-1 user-badge'
      style={{borderRadius:'50%'}}
    >
      <Dropdown.Item as={ Link } to={ `/users/${user._id}` }>
        <FontAwesomeIcon icon={ faUser } className='me-2' />
        <span>{ 'View Profile' }</span>
      </Dropdown.Item>
      <Dropdown.Item as='button' onClick={ logout }>
        <FontAwesomeIcon icon={ faSignOutAlt } className='me-2' />
        <span>{ 'Log Out' }</span>
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default UserBadge;
