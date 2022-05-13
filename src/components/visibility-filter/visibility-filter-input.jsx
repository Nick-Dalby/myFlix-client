import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import { Form } from 'react-bootstrap';

import { setFilter } from '../../store/actions/actions';

function VisibilityFilterInput({ visibilityFilter, setFilter }) {
  return (
    <Form.Control
      onChange={e => setFilter(e.target.value)}
      value={visibilityFilter}
      placeholder='filter'
    />
    )
}

export default connect(null, { setFilter }) (VisibilityFilterInput)