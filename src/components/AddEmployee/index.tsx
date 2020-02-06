import { Button, Container, Grid, TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import React from 'react';

// interface
import { AddEmployeeInterface, timeInput } from './interface.d';

// styles
import './AddEmployee.scss';

const AddEmloyee = ({
  closeModal,
  onChange,
  onSubmit,
  validation
}: AddEmployeeInterface) => {
  const timeInputs = [
    { id: 'mon', day: 'Monday', validate: validation.mon },
    { id: 'tues', day: 'Tuesday', validate: validation.tues },
    { id: 'wed', day: 'Wednesday', validate: validation.wed },
    { id: 'thus', day: 'Thursday', validate: validation.thus },
    { id: 'fri', day: 'Friday', validate: validation.fri }
  ];
  return (
    <Container maxWidth="sm" className="add-employee">
      <CancelIcon className="cusor close" onClick={closeModal} />
      <Grid container spacing={3}>
        <Grid item xs={12} className="form-setting add-employee__tittle-grid">
          <div className="add-employee__tittle">Add Employee</div>
        </Grid>
        <TextField
          id="name"
          error={!validation.name}
          className="form-setting add-employee__name"
          label="Employee Name"
          type="search"
          onChange={onChange}
          variant="outlined"
        />
        <div className="form-setting add-employee__time-record">
          <div className="add-employee__data">Time Record</div>
          {timeInputs.map((el: timeInput) => (
            <TextField
              id={el.id}
              error={!el.validate}
              className="add-employee__time-input"
              label={el.day}
              type="time"
              onChange={onChange}
              InputLabelProps={{
                shrink: true
              }}
              helperText="ex: 09:00 AM"
            />
          ))}
        </div>
        <div className="add-employee__comment">
          <TextField
            id="comment"
            className="add-employee__comment-input"
            label="Comment"
            multiline
            rows="3"
            variant="outlined"
          />
        </div>
        <div className="add-employee__submit">
          <Button
            variant="contained"
            className="cusor form-setting add-employee__submit-btn"
            onClick={onSubmit}
          >
            Add
          </Button>
        </div>
      </Grid>
    </Container>
  );
};

export default AddEmloyee;
