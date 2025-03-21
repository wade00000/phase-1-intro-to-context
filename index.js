// Your code here
function createEmployeeRecord([firstName,familyName,title,payPerHour]){
    return {
        firstName:firstName,
        familyName : familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents:[],
        timeOutEvents:[]
    }

}

function createEmployeeRecords(employeeData){
    return employeeData.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord,dateEnt){
    // Create a new time-in event
    const [date, hour] = dateEnt.split(" ");
    const timeInEvent = {
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10) // Convert string to integer
    };

    // Add to employee's timeInEvents array
    employeeRecord.timeInEvents.push(timeInEvent);

    // Return the updated record
    return employeeRecord;

}

function createTimeOutEvent(employeeRecord,dateEnt){
    
    const [date, hour] = dateEnt.split(" ");
    const timeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10) // Convert string to integer
    };

    
    employeeRecord.timeOutEvents.push(timeOutEvent);

    // Return the updated record
    return employeeRecord;

}

function hoursWorkedOnDate(employeeRecord,dateEnt){
     const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === dateEnt);
     const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === dateEnt);
 
     if (!timeInEvent || !timeOutEvent) {
         return 0; // If no matching event, assume 0 hours worked
     }
 
     return (timeOutEvent.hour - timeInEvent.hour) / 100;
} 

function wagesEarnedOnDate(employeeRecord,dateEnt){
    const payRate = employeeRecord.payPerHour
    const hours = hoursWorkedOnDate(employeeRecord,dateEnt)
    const daysWage = payRate * hours

    return daysWage
}

function allWagesFor(employeeRecord){
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);

    const totalWages = datesWorked.reduce((total,date)=>
        total + wagesEarnedOnDate(employeeRecord,date)
    ,0)

    return totalWages
}

function calculatePayroll(employeeRecords){
        const totalArray = employeeRecords.map(employee=>allWagesFor(employee) )
        const totalAmnt = totalArray.reduce((acc,amnt) => acc + amnt,0)

        return totalAmnt
        
}