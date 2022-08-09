import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeroCard = ( props ) => {

  return (
    <div
      className='py-5 align-middle'
      style={{
        color: 'var(--bs-light)',
        backgroundImage: 'linear-gradient(135deg, var(--bs-primary), var(--bs-danger))'
      }}
    >
      <Container className='py-5 text-center'>
        <h1
          className='display-3 fw-bold'
          style={{letterSpacing:'-2px'}}
        >
          { 'Welcome to HeadyNet.' }
        </h1>
        <p>{ 'Discover and review your favorite Grateful Dead shows.' }</p>
        <Button
          size='lg'
          variant='light'
          className='mx-1'
          as={ Link }
          to={ '/auth/register?redirect=%2F' }
        >
          { 'Sign Up' }
        </Button>
        <Button
          size='lg'
          variant='outline-light'
          className='mx-1'
          as={ Link }
          to={ '/shows' }
        >
          { 'Discover Shows' }
        </Button>
      </Container>
    </div>
  );
}

export default HeroCard;
