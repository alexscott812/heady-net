import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faKey, faSignOutAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../hooks/useAuth.js';
import getRelativeTime from '../utils/getRelativeTime.js'
import { DEFAULT_THUMBNAIL_MD } from '../constants.js';

const UserHeader = ( props ) => {

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout({
      returnTo: '/'
    });
  };

  return (
    <Card
      style={{color:'inherit',textDecoration:'none'}}
      className='text-left mb-4 shadow-sm'
    >
      <Card.Img
        style={{width:'100%',height:'150px',objectFit:'cover'}}
        variant='top'
        src={ DEFAULT_THUMBNAIL_MD }
      />
      <Card.Body>
        <Card.Title as='h1'>
          {
            (props.user._id === user?._id)
              ? <>
                  <span>{ `${props.user.first_name} ${props.user.last_name}` }</span>
                  <span
                    className='fw-light text-muted ms-2'
                    style={{fontSize: '80%', fontWeight: '400'}}
                  >
                    { '(you)' }
                  </span>
                </>
              : `${props.user.first_name} ${props.user.last_name.charAt(0)}.`
          }
        </Card.Title>
        <div className=''>
          <h6 className='text-muted fw-bold mb-2'>{ 'JOINED' }</h6>
          <p className='mb-0'>{ `${getRelativeTime(props.user.created_at)}` }</p>
        </div>
        {
          (props.user._id === user?._id) &&
            <div className='mt-3 d-grid gap-2'>
              <Button
                variant='secondary'
                onClick={ props.handleShowEditUserModal }
              >
                <FontAwesomeIcon className='me-2' icon={ faPen } />
                { 'Edit Info' }
              </Button>
              <Button
                variant='secondary'
                onClick={ props.handleShowChangePasswordModal }
              >
                <FontAwesomeIcon className='me-2' icon={ faKey } />
                { 'Change Password' }
              </Button>
              <Button
                variant='secondary'
                onClick={ handleLogout }
              >
                <FontAwesomeIcon className='me-2' icon={ faSignOutAlt } />
                { 'Log Out' }
              </Button>
              <Button
                variant='danger'
                onClick={ props.handleShowDeleteUserModal }
              >
                <FontAwesomeIcon className='me-2' icon={ faTrashAlt } />
                { 'Delete Account' }
              </Button>
            </div>
        }
      </Card.Body>
    </Card>
  );
}

export default UserHeader;
