// Problem 1: Create JSON for each employee
  const employee1 = 
  {
    firstName: "Sam",
    department: "Tech",
    designation: "Manager",
    salary: 40000,
    raiseEligible: true
  };
  
  const employee2 = 
  {
    firstName: "Mary",
    department: "Finance",
    designation: "Trainee",
    salary: 18500,
    raiseEligible: true
  };
  
  const employee3 = 
  {
    firstName: "Bill",
    department: "HR",
    designation: "Executive",
    salary: 21200,
    raiseEligible: false
  };
  
  console.log("// Problem 1");
  console.log(employee1, employee2, employee3);
  
  // Problem 2: Create JSON for the company
  const company = 
  {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: [employee1, employee2, employee3]
  };
  
  console.log("// Problem 2");
  console.log(company);
  
  // Problem 3: Add a new employee
  const employee4 = 
  {
    firstName: "Anna",
    department: "Tech",
    designation: "Executive",
    salary: 25600,
    raiseEligible: false
  };
  
  company.employees.push(employee4);
  
  console.log("// Problem 3");
  console.log(company);
  
  // Problem 4: Calculate total salary
  let totalSalary = 0;
  company.employees.forEach(employee => 
  {
    totalSalary += employee.salary;
  });
  
  console.log("// Problem 4");
  console.log("Total Salary: $" + totalSalary);
  
  // Problem 5: Give raises to eligible employees
  function applyRaises(companyData) 
  {
    companyData.employees.forEach(employee => 
    {
      if (employee.raiseEligible) 
      {
        employee.salary *= 1.10; // Increase by 10%
        employee.raiseEligible = false;
      }
    });
  }
  
  applyRaises(company);
  
  console.log("// Problem 5");
  console.log("After Raises:");
  console.log(company);
  
  // Problem 6: Add work-from-home status
  const wfhEmployees = ["Anna", "Sam"];
  
  company.employees.forEach(employee => 
  {
    employee.wfh = wfhEmployees.includes(employee.firstName);
  });
  
  console.log("// Problem 6");
  console.log("Work From Home Status:");
  console.log(company);
  