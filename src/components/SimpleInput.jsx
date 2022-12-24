/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function SimpleInput() {
  return (
    <form>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default SimpleInput;
