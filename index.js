function createEmployeeRecord(anArray){
    let employee = {
        firstName : anArray[0],
        familyName: anArray[1],
        title: anArray[2],
        payPerHour : anArray[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
    return employee
}

function createEmployeeRecords(theArray){
    const newEmployees = theArray.map(createEmployeeRecord)
    return newEmployees
}

function createTimeInEvent(dateTime){
    const date = dateTime.split(' ')[0]
    const hour = parseInt(dateTime.split(' ')[1]);
    this.timeInEvents.push({'date': date, 'hour' : hour, 'type': 'TimeIn'} )
    return this
}

function createTimeOutEvent(dateTime){
    const date = dateTime.split(' ')[0]
    const hour = parseInt(dateTime.split(' ')[1]);
    this.timeOutEvents.push({'date': date, 'hour': hour, 'type': 'TimeOut'})
    return this
}

function hoursWorkedOnDate(date){
    const timeIn = this.timeInEvents.find(d => d.date === date).hour;
    const timeOut = this.timeOutEvents.find(d => d.date === date).hour;
    return (timeOut - timeIn) / 100   
}

function wagesEarnedOnDate(date){
    const total = this.payPerHour * hoursWorkedOnDate.call(this, date)
    return total
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(empRec, name){
    const theName = empRec.find(f => name === f.firstName);
    return theName
}

function calculatePayroll(empRecs){
    return empRecs.reduce((total, empRec)=> total + allWagesFor.call(empRec), 0);
}