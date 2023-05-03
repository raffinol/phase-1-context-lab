/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(record) {
  let testEmployee = {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return testEmployee;
}

function createEmployeeRecords(records) {
  let employeeRecords = records.map((record) => createEmployeeRecord(record));
  return employeeRecords;
}

function createTimeInEvent(dateTimeStamp) {
  let [date, hour] = dateTimeStamp.split(' ');

  this.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}

function createTimeOutEvent(dateTimeStamp) {
  let [date, hour] = dateTimeStamp.split(' ');

  this.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}

function hoursWorkedOnDate(dateStamp) {
  let timeIn = this.timeInEvents.find((e) => e.date === dateStamp).hour;
  let timeOut = this.timeOutEvents.find((e) => e.date === dateStamp).hour;
  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(dateStamp) {
  let wagesOnDate = hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour;
  return wagesOnDate;
}

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function findEmployeeByFirstName(srcArray, firstName) {
  let EmployeeName = srcArray.find(function (record) {
    return record.firstName === firstName;
  });
  return EmployeeName;
}

function calculatePayroll(records) {
  const payrollAll = records.map((emp) => {
    return allWagesFor.call(emp);
  });
  return payrollAll.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
}
