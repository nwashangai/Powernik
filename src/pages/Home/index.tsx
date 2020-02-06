import { Button, Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// third party libraries
import { connect } from 'react-redux';

// thunk
import { addEmployee } from 'store/module/employee';

// component
import AddEMployee from 'components/AddEmployee';

// styles
import './Home.scss';

const initialState = {
  isModal: false,
  form: {
    name: '',
    mon: '',
    tues: '',
    wed: '',
    thus: '',
    fri: '',
    comment: ''
  },
  validation: {
    name: true,
    mon: true,
    tues: true,
    wed: true,
    thus: true,
    fri: true
  }
};

const Home = ({ records, addEployeeRecord }: any) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const isValid =
      Object.values(state.form)
        .slice(0, 6)
        .findIndex(element => element === '') < 0;
    if (isValid) {
      addEployeeRecord(state.form);
      setState({
        ...state,
        isModal: false
      });
    }
  }, [state.validation]);

  const setModal = () => {
    setState({
      ...state,
      isModal: !state.isModal,
      form: {
        name: '',
        mon: '',
        tues: '',
        wed: '',
        thus: '',
        fri: '',
        comment: ''
      }
    });
  };

  const onChange = (event: any) => {
    setState({
      ...state,
      form: {
        ...state.form,
        [event.target.id]: event.target.value
      }
    });
  };

  const onSubmit = () => {
    const isNotExist =
      records.find((element: any) => element.name === state.form.name) ===
      undefined;
    setState({
      ...state,
      validation: {
        name: state.form.name !== '' && isNotExist,
        mon: state.form.mon !== '',
        tues: state.form.tues !== '',
        wed: state.form.wed !== '',
        thus: state.form.thus !== '',
        fri: state.form.fri !== ''
      }
    });
  };

  return (
    <div className="home-page">
      <div className="home-page__company">Powernik</div>
      <div className="home-page__start">
        <Button
          color="primary"
          id="isModal"
          onClick={setModal}
          variant="contained"
          className="cusor home-page__add-btn"
        >
          Add ({records.length})
        </Button>{' '}
        <Link to="/reports" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            className="cusor home-page__report-btn"
            disabled={records.length < 10}
          >
            View Report
          </Button>
        </Link>
        <Modal
          className="cusor home-page__add-employee-modal"
          open={state.isModal}
        >
          <AddEMployee
            closeModal={setModal}
            onChange={onChange}
            onSubmit={onSubmit}
            validation={state.validation}
          />
        </Modal>
      </div>
    </div>
  );
};

export const mapStateToProps = (state: any) => ({
  records: state.employeeRecord.employeeData
});

export const mapDispatchToProps = (dispatch: any) => ({
  addEployeeRecord: (employee: any) => dispatch(addEmployee(employee))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
