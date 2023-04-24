import React from 'react';
import { Card, Table } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

function ProfilesMessages({ profile }) {
  return (
    
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td className='text-center'>
        <Link  to={`/date/${profile._id}`} style={{ margin: '0 auto' }}>
          <Card.Img src={profile.image} variant="top" style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '15%' }} />
        </Link>

        <Link style={{ color: 'white', textDecoration: 'none', fontFamily: 'Segoe Script' }} to={`/date/${profile._id}`}>
          <h3 as="h3">
            <strong>{profile.headline}</strong>
          </h3>
        </Link>
            </td>
         
          </tr>
        </tbody>
      </Table>

  );
}

export default ProfilesMessages;
