import React from 'react';
import { Bar } from 'react-chartjs-2';

const EmployeeReport = ({ employeeData }: any) => {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'slack time',
        data: [
          employeeData.mon,
          employeeData.tues,
          employeeData.wed,
          employeeData.thus,
          employeeData.fri
        ]
      }
    ]
  };

  return (
    <div className="employee">
      <div className="employee__bio">
        <div className="employee__avatar-container">{employeeData.avatar}</div>
        <div className="employee__bio-details">
          <div className="employee__bio-name">{employeeData.name}</div>
          <div className="employee__bio-status">Employee at Powernik</div>
          <div className="employee__stats">
            <div className="employee__bio-slack">
              Total slack: {employeeData.totalSlack.toLocaleString()} mins
            </div>
            <div className="employee__bio-bonus">
              Total bonus: ₦ {employeeData.totalBonus.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      <div className="employee__chart-container">
        <Bar
          data={data}
          min-height={400}
          width={5}
          options={{ maintainAspectRatio: false, responsive: true }}
        />
      </div>
    </div>
  );
};

export default EmployeeReport;
