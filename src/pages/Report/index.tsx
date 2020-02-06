import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import React from 'react';

// third party libraries
import { connect } from 'react-redux';

// interfaces
import { Data, ReportProps } from './interface';

// thunk
import { clearStorage } from 'store/module/employee';

// component
import AllReport from './AllReports';
import EmployeeReport from './EmployeeReport';

// Styles
import './Report.scss';

class Report extends React.Component<ReportProps> {
  componentDidMount() {
    if (this.props.records.length < 10) {
      this.props.history.push('/');
    }
  }

  randomNum = () => {
    return Math.floor(Math.random() * (99 - 1 + 1)) + 1;
  };

  slackTime = (clock: string) => {
    const start = moment(new Date(`${new Date().toDateString()} 9:00`));
    const elaps = moment(new Date(`${new Date().toDateString()} ${clock}`));

    if (start.diff(elaps, 'minutes') > 0) {
      return start.diff(elaps, 'minutes');
    }
    return 0;
  };

  calculateReport = (data: any): any[] => {
    return data.map((val: string) => {
      const diff = this.slackTime(val);
      if (diff > 0) {
        return {
          bonus: (diff / 5) * 50,
          slack: diff
        };
      }
      return { bonus: 0, slack: 0 };
    });
  };

  findEmployee = (name: string) => {
    return this.props.records.find((element: any) => element.name === name);
  };

  getEmployeeReport = (name: string) => {
    const employee = this.findEmployee(name);
    if (employee) {
      const stats = this.createData(employee);
      return {
        name: employee.name,
        avatar: (
          <Avatar
            alt={employee.name}
            src={`https://randomuser.me/api/portraits/men/${this.randomNum()}.jpg`}
            className="employee__avatar"
          />
        ),
        mon: this.slackTime(employee.mon),
        tues: this.slackTime(employee.tues),
        wed: this.slackTime(employee.wed),
        thus: this.slackTime(employee.thus),
        fri: this.slackTime(employee.fri),
        comment: employee.comment,
        totalSlack: stats.slack,
        totalBonus: stats.bonus
      };
    }
    return {};
  };

  redirect = (path: string) => {
    this.props.history.push(`/reports/${path}`);
  }

  createData = (record: any): Data => {
    const { name, comment, ...rest } = record;
    const timeData = Object.values(rest);
    const slack = this.calculateReport(timeData).reduce(
      (cum: any, cur: any) => cum + cur.slack,
      0
    );
    const bonus = this.calculateReport(timeData).reduce(
      (cum: any, cur: any) => cum + cur.bonus,
      0
    );

    const done = {
      slack,
      bonus,
      name: record.name,
      avatar: (
        <Avatar
          alt="Remy Sharp"
          src={`https://randomuser.me/api/portraits/men/${this.randomNum()}.jpg`}
        />
      )
    };

    return done;
  };

  clearData = () => {
    this.props.clearStorageData();
    this.props.history.push('/');
  };

  render() {
    return (
      <React.Fragment>
        {this.props.match.params.employee &&
        this.findEmployee(this.props.match.params.employee) ? (
          <EmployeeReport
            employeeData={this.getEmployeeReport(
              this.props.match.params.employee
            )}
          />
        ) : (
          <AllReport
            records={this.props.records.map((data: any) =>
              this.createData(data)
            )}
            redirect={this.redirect}
            clearData={this.clearData}
          />
        )}
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state: any) => ({
  records: state.employeeRecord.employeeData
});

export const mapDispatchToProps = (dispatch: any) => ({
  clearStorageData: () => dispatch(clearStorage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);
