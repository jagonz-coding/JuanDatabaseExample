const express = require("express");     // require express
//const morgan = require("morgan");       // Adding better logging functionality for troubleshooting / debugging
const cors = require("cors");
const app = express();                  // Create new instance of express to run the server
//const axios = require("axios");         // Create new instance of axios for interfacing with a 3rd party API
app.use(express.json());                // allows us to access request body as req.body
//app.use(morgan("dev"));                 // enable incoming request logging in dev mode
app.use(cors());
require("dotenv").config();             // Require the dotenv functionality to upkeep industry best practices arround enviornment variables

var mysql = require('mysql');

//API Resources
//https://codingstatus.com/node-js-mysql-crud-operation/
//https://www.youtube.com/watch?v=4fWWn2Pe2Mk

var connection = mysql.createConnection({
  host              : process.env.RDS_HOSTNAME,
  localAddress      : process.env.RDS_LOCALADDRESS,
  user              : process.env.RDS_USERNAME,
  password          : process.env.RDS_PASSWORD,
  port              : process.env.RDS_PORT,
  database          : process.env.RDS_DATABASE
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
});

app.listen(3001,()=>console.log('Express server is running on port 3001'));


/*------------------------------------ */
/*------------ Begin Customer ------- */
/*---------------------------------- */

app.get('/customer/',(req, res)=>{
  connection.query('SELECT * FROM customers WHERE is_deleted = 0',[req.params.id],(err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});

app.get('/customer/desc/',(req, res)=>{
  connection.query('SELECT * FROM customers WHERE is_deleted = 0 ORDER BY customer_id DESC',[req.params.id],(err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});

app.get('/customer/:id',(req, res)=>{
  connection.query('SELECT * FROM customers WHERE customer_id = ? AND  is_deleted = 0',[req.params.id],(err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});

app.post('/customer/', (req,res) => {
  let type = req.body;
  connection.query('INSERT INTO customers (firstname,lastname,homephone,cellphone,workphone,email,address,suite_num,city,state,zipcode) values (?,?,?,?,?,?,?,?,?,?,?);',[type.firstname,type.lastname,type.homephone,type.cellphone,type.workphone,type.email,type.address,type.suite_num,type.city,type.state,type.zipcode],(err, rows, fields)=>{
    if (!err)
      res.send(rows);
    else
      console.log(err);
    })
      
});

//NEW! Soft Delete Method
app.put('/del/customer/:id', (req,res) => {
  connection.query('UPDATE customers SET is_deleted = 1 WHERE customer_id = ?;',[req.params.id],(err, rows, fields)=>{
    if (!err)
      res.send(rows);
    else
      console.log(err);
    })
      
});

/*
app.delete('/customer/:id',(req, res)=>{
  connection.query('DELETE customers WHERE customer_id = ?',[req.params.id],(err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});
*/

app.put('/customer/:id', (req,res) => {
  let emp = req.body;
  connection.query('UPDATE customers SET firstname = ?, lastname = ?, homephone = ?, cellphone = ?, workphone = ?, email = ?, address = ?, suite_num = ?, city = ?, state = ?, zipcode = ? WHERE customer_id = ?;',[req.body[0].firstname,req.body[0].lastname,req.body[0].homephone,req.body[0].cellphone,req.body[0].workphone, req.body[0].email, req.body[0].address, req.body[0].suite_num, req.body[0].city, req.body[0].state,req.body[0].zipcode,req.params.id],(err, rows, fields)=>{
    if (!err)
      res.send(rows);
    else
      console.log(err);
    })
      
});

/*------------------------------------ */
/*-------- End Customer ------------- */
/*---------------------------------- */



/*------------------------------------ */
/*--------- Begin Vehicles ---------- */
/*---------------------------------- */

/*
app.get('/vehicle/',(req, res)=>{

  connection.query('SELECT * FROM vehicles WHERE is_deleted = 0',[req.params.id],(err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});
*/

app.get('/vehicle/',(req, res)=>{
  connection.query('SELECT * FROM vehicles \
  INNER JOIN customers ON customers.customer_id = vehicles.customer_id \
  WHERE vehicles.is_deleted = 0;',[req.params.id],(err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});


app.get('/vehicle/:id',(req, res)=>{
  connection.query('SELECT * FROM vehicles \
  INNER JOIN customers ON customers.customer_id = vehicles.customer_id \
  WHERE vehicles.vehicle_id = ? AND vehicles.is_deleted = 0;',[req.params.id],(err, rows, fields)=>{
 if (!err)
  res.send(rows);
  else
    console.log(err);
  })
});

app.get('/vehicles',(req, res)=>{
  connection.query('SELECT * FROM vehicles WHERE is_deleted = 0',(err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});

app.get('/vehicle/:id',  (req, res)=>{
  connection.query('SELECT * FROM customers \
  INNER JOIN vehicles ON vehicles.customer_id = customers.customer_id \
  INNER JOIN repair_history ON repair_history.vehicle_id = vehicles.vehicle_id \
  INNER JOIN employees ON employees.employee_id = repair_history.employee_id \
  WHERE vehicles.customer_id = ? AND vehicles.is_deleted = 0',[req.params.id],(err, rows, fields)=>{

  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});

app.get('/cust_vehicles/:cust_id',(req, res)=>{
  connection.query('SELECT * FROM vehicles WHERE customer_id = ? AND is_deleted = 0',[req.params.cust_id],(err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});

app.post('/vehicle', (req,res) => {
  let type = req.body;
  connection.query('INSERT INTO vehicles (customer_id,make,model,year,engine,color,license_plate,miles,is_insured,has_wheel_lock) values (?,?,?,?,?,?,?,?,?,?);',[type.customer_id,type.make,type.model,type.year,type.engine,type.color,type.license_plate,type.miles,type.is_insured,type.has_wheel_lock],(err, rows, fields)=>{
    if (!err)
      res.send(rows);
    else
      console.log(err);
    })
      
});

//NEW! Soft Delete Method
app.put('/del/vehicle/:id', (req,res) => {
  connection.query('UPDATE vehicles SET is_deleted = 1 WHERE vehicle_id = ?;',[req.params.id],(err, rows, fields)=>{
    if (!err)
      res.send(rows);
    else
      console.log(err);
    })
      
});

/*
app.delete('/vehicle/:id',(req, res)=>{
  connection.query('DELETE vehicles WHERE vehicle_id = ?',[req.params.id],(err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});
*/

/* Get vehicles according to customer ID -- Get all cars owned by customer */
app.get('/vehicle/customer/:id',(req, res)=>{
  connection.query('SELECT * FROM vehicles WHERE customer_id = ? AND is_deleted = 0',[req.params.id],(err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
}); 

app.put('/vehicle/:id', (req,res) => {
  connection.query('UPDATE vehicles SET make = ?, model = ?, year = ?, engine = ?, color = ?, license_plate = ?, miles = ?, is_insured = ?, has_wheel_lock = ? WHERE vehicle_id = ?;',[req.body[0].make,req.body[0].model,req.body[0].year,req.body[0].engine,req.body[0].color,req.body[0].license_plate, req.body[0].miles, req.body[0].is_insured, req.body[0].has_wheel_lock, parseInt(req.params.id)],(err, rows, fields)=>{
    if (!err)
      res.send(rows);
    else
      console.log(err);
    })
      
});
/*------------------------------------ */
/*----------- End Vehicles ---------- */
/*---------------------------------- */



/*------------------------------------ */
/*------ Begin Repair History ------- */
/*---------------------------------- */

//TODO: Dylan to add soft delete for repair history

// Get all repair history
app.get('/repair_history',(req, res)=>{
  connection.query('SELECT * FROM repair_history \
  INNER JOIN employees ON employees.employee_id = repair_history.employee_id \
  INNER JOIN services ON services.service_type_id = repair_history.service_type_id \
  INNER JOIN vehicles ON vehicles.vehicle_id = repair_history.vehicle_id \
  INNER JOIN customers ON customers.customer_id = vehicles.customer_id',[req.params.id],(err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});

app.get('/repair_history/:id',(req, res)=>{
  connection.query('SELECT * FROM repair_history \
  INNER JOIN employees ON employees.employee_id = repair_history.employee_id \
  INNER JOIN services ON services.service_type_id = repair_history.service_type_id \
  INNER JOIN vehicles ON vehicles.vehicle_id = repair_history.vehicle_id \
  INNER JOIN customers ON customers.customer_id = vehicles.customer_id \
  WHERE vehicle_history_id = ?',[req.params.id],(err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});

app.get('/repair_history/:lastname/:cellphone',(req, res)=>{
  connection.query('SELECT * FROM repair_history \
  INNER JOIN vehicles ON vehicles.vehicle_id = repair_history.vehicle_id \
  INNER JOIN customers ON customers.customer_id = vehicles.customer_id \
  WHERE customers.lastname = ? AND customers.cellphone = ?',[req.params.lastname,req.params.cellphone],(err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});

app.post('/repair_history', (req,res) => {
  let type = req.body;
  connection.query('INSERT INTO repair_history (employee_id,vehicle_id,checkin_date,checkout_date,service_type_id,service_authorized,service_complete,mechanic_notes) values (?,?,?,?,?,?,?,?);',[type.employee_id,type.vehicle_id,type.checkin_date,type.checkout_date,type.service_type_id,type.service_authorized,type.service_complete,type.mechanic_notes],(err, rows, fields)=>{
    if (!err)
      res.send(rows);
    else
      console.log(err);
    })
      
});

app.post('/add_history', (req, res) => {
  let hist = req.body;
  connection.query('INSERT INTO repair_history (employee_id, vehicle_id, checkin_date, checkout_date, service_type_id, service_authorized, service_complete, mechanic_notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?);', [hist.employee_id, hist.vehicle_id, hist.checkin_date, hist.checkout_date, hist.service_type_id, hist.service_authorized, hist.service_complete, hist.mechanic_notes], (err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});

// Edit Repair
app.put('/editRepair/:id', (req, res) => {
  let hist = req.body;
  connection.query('UPDATE repair_history '+
										'SET employee_id=?, vehicle_id=?, '+
										'checkin_date=?, checkout_date=?, '+
										'service_type_id=?, service_authorized=?, '+
										'service_complete=?, mechanic_notes=?' +
										'WHERE vehicle_history_id=?;',
										[hist.employee_id, hist.vehicle_id, 
										hist.checkin_date, hist.checkout_date, 
										hist.service_type_id, hist.service_authorized, 
										hist.service_complete, hist.mechanic_notes, parseInt(req.params.id)], (err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});

app.delete('/repair_history/:id',(req, res)=>{
  connection.query('DELETE repair_history WHERE vehicle_history_id = ?',[req.params.id],(err, rows, fields)=>{
  if (!err)
    res.send(rows);
  else
    console.log(err);
  })
});

/*------------------------------------ */
/*------- End Repair History -------- */
/*---------------------------------- */



/*------------------------------------ */
/*--------- Begin Employees --------- */
/*---------------------------------- */

app.get('/employeesAll',(req, res)=>{
	connection.query('SELECT * FROM employees\
  INNER JOIN shops ON shops.shop_id = employees.shop_id WHERE employees.is_deleted = 0',(err, rows, fields)=>{
	if (!err)
	  res.send(rows);
	else
	  console.log(err);
	})
	  
  });

// used to specify shop address info from employee address info so both can be referenced from the employee route
//version 3 for employee view table so the occupation and shop location displays words instead of id numbers
app.get('/employees',(req, res)=>{
	connection.query('SELECT employees.employee_id,employees.e_firstname, employees.e_lastname, employees.homephone, employees.cellphone, employees.address,\
  employees.city, employees.state, employees.zipcode,\
  shops.address AS "saddress", shops.state AS "sstate",shops.city AS "scity", shops.zipcode AS "szipcode",\
  employee_type.type_desc AS "etype_desc" FROM employees\
  INNER JOIN shops ON shops.shop_id = employees.shop_id\
  INNER JOIN employee_type ON employee_type.employee_type_id = employees.employee_type_id\
  WHERE employees.is_deleted = 0;',(err, rows, fields)=>{
	if (!err)
	  res.send(rows);
	else
	  console.log(err);
	})
	  
  });

//version 2 (10.31.22)
// app.get('/employees',(req, res)=>{
// 	connection.query('SELECT * FROM employees\
//   INNER JOIN shops ON shops.shop_id = employees.shop_id WHERE employees.is_deleted = 0;',(err, rows, fields)=>{
// 	if (!err)
// 	  res.send(rows);
// 	else
// 	  console.log(err);
// 	})
	  
//   });


// version 1
  // app.get('/employees',(req, res)=>{
  //   connection.query('SELECT * FROM employees WHERE is_deleted = 0',(err, rows, fields)=>{
  //   if (!err)
  //     res.send(rows);
  //   else
  //     console.log(err);
  //   })
      
  //   });

  
  app.get('/employees/:id',(req, res)=>{
	connection.query('SELECT * FROM employees WHERE employee_id = ? AND is_deleted = 0',[req.params.id],(err, rows, fields)=>{
	if (!err)
	  res.send(rows);
	else
	  console.log(err);
	})
	  
  
  });
  
  // Shop ID is included due to there being only one store
  app.post('/addEmployee', (req,res) => {
	let emp = req.body;
	connection.query('INSERT INTO employees (shop_id,employee_type_id,e_firstname,e_lastname,address,suite_num,city,state,zipcode,homephone,cellphone,paid_salary) values (?,?,?,?,?,?,?,?,?,?,?,?);',[emp.shop_id,emp.employee_type_id,emp.e_firstname,emp.e_lastname,emp.address,emp.suite_num,emp.city,emp.state,emp.zipcode,emp.homephone,emp.cellphone,emp.paid_salary],(err, rows, fields)=>{
	  if (!err)
		res.send(rows);
	  else
		console.log(err);
	  })
		
  });
  
  app.put('/employees/:id', (req,res) => {
	let emp = req.body[0];
	connection.query('UPDATE employees SET shop_id = ?, employee_type_id = ?, e_firstname = ?, e_lastname = ?, address = ?, suite_num = ?, city = ?, state = ?, zipcode = ?, homephone = ?,cellphone = ?, paid_salary = ? WHERE employee_id = ?;',[emp.shop_id,emp.employee_type_id,emp.e_firstname,emp.e_lastname,emp.address,emp.suite_num,emp.city,emp.state,emp.zipcode,emp.homephone,emp.cellphone,emp.paid_salary,req.params.id],(err, rows, fields)=>{
	  if (!err)
		res.send(rows);
	  else
		console.log(err);
	  })
		
  });
  
  //NEW! Soft Delete Method
  app.put('/del/employees/:id', (req,res) => {
	connection.query('UPDATE employees SET is_deleted = 1 WHERE employee_id = ?;',[req.params.id],(err, rows, fields)=>{
	  if (!err)
		res.send(rows);
	  else
		console.log(err);
	  })
		
  });
  
  /*
  app.delete('/employee/:id',(req, res)=>{
	connection.query('DELETE employees WHERE employee_id = ?',[req.params.id],(err, rows, fields)=>{
	if (!err)
	  res.send(rows);
	else
	  console.log(err);
	})
  });
  */
  
  /*------------------------------------ */
  /*---------- End Employees ---------- */
  /*---------------------------------- */
  
  
  
  /*------------------------------------ */
  /*------- Begin Employee Type ------- */
  /*---------------------------------- */
  
  app.get('/emptype',(req, res)=>{
	connection.query('SELECT * FROM employee_type WHERE is_deleted = 0',[req.params.id],(err, rows, fields)=>{
	if (!err)
	  res.send(rows);
	else
	  console.log(err);
	})
	  
  
  });
  

  
  app.get('/emptype/:id',(req, res)=>{
	connection.query('SELECT * FROM employee_type WHERE employee_type_id = ? AND is_deleted = 0',[req.params.id],(err, rows, fields)=>{
	if (!err)
	  res.send(rows);
	else
	  console.log(err);
	})
	  
  
  });
  
  
  app.post('/emptype', (req,res) => {
	let type = req.body;
	connection.query('INSERT INTO employee_type (type_desc,base_salary) values (?,?);',[type.type_desc,type.base_salary],(err, rows, fields)=>{
	  if (!err)
		res.send(rows);
	  else
		console.log(err);
	  })
		
  });
  
  app.put('/emptype/:id', (req,res) => {
	let type = req.body;
	connection.query('UPDATE employee_type SET type_desc = ?, base_salary = ? WHERE employee_type_id = ?;',[type[0].type_desc,type[0].base_salary,req.params.id],(err, rows, fields)=>{
	  if (!err)
		res.send(rows);
	  else
		console.log(err);
	  })
		
  });
  
  //NEW! Soft Delete Method
  app.put('/del/emptype/:id', (req,res) => {
	connection.query('UPDATE employee_type SET is_deleted = 1 WHERE employee_type_id = ?;',[req.params.id],(err, rows, fields)=>{
	  if (!err)
		res.send(rows);
	  else
		console.log(err);
	  })
		
  });
  
  /*
  app.delete('/emptype/:id',(req, res)=>{
	connection.query('DELETE employee_type WHERE employee_type_id = ?',[req.params.id],(err, rows, fields)=>{
	if (!err)
	  res.send(rows);
	else
	  console.log(err);
	})
  });
  */
  
  /*------------------------------------ */
  /*-------- End Employee Type -------- */
  /*---------------------------------- */
  
  
  
  /*------------------------------------ */
  /*---------- Begin Services --------- */
  /*---------------------------------- */
  
  //create a service
  app.post('/addService', (req, res) => {
	let serv = req.body;
	connection.query('INSERT INTO services (service_description, is_quick) VALUES (?, ?);',[serv.service_description, serv.is_quick], (err, rows, fields)=>{
	if (!err)
	  res.send(rows);
	else
	  console.log(err);
	})
  });

  

  //res.send('POST request to the homepage');



  // // edit service using put? delete later
  // app.put('/editService', (req, res) => {
  //   let serv = req.body;
  //   connection.query('INSERT INTO services (service_description, is_quick) VALUES (?, ?);',[serv.service_description, serv.is_quick], (err, rows, fields)=>{
  //   if (!err)
  //     res.send(rows);
  //   else
  //     console.log(err);
  //   })
  //   });
  
 //read all services
 app.get('/services',(req, res)=>{
	connection.query('SELECT * FROM services WHERE is_deleted = 0',(err, rows, fields)=>{
	  if (!err)
		res.send(rows);
	  else
		console.log(err);
	  })
		
  });

  // read back one service
  // app.get('/services/:id',(req, res)=>{
	// let serv = req.body;
	// connection.query('SELECT * FROM services WHERE service_type_id = ? AND is_deleted = 0',[serv.service_type_id],(err, rows, fields)=>{
	//   if (!err)
	// 	res.send(rows);
	//   else
	// 	console.log(err);
	//   })
		
  // });
  
  // read back one service, edited/updated - delete later?
  app.get('/services/:id',(req, res)=>{
    connection.query('SELECT * FROM services WHERE service_type_id = ? AND is_deleted = 0',[req.params.id],(err, rows, fields)=>{
      if (!err)
      res.send(rows);
      else
      console.log(err);
      })
      
    });
  

  // update details for one service 
  app.put('/services/:id',(req, res) => {
	// get user input for artist name
	// let serv = req.body;
	connection.query('UPDATE services SET service_description = ?, is_quick = ? WHERE service_type_id = ?',[req.body[0].service_description, req.body[0].is_quick, req.params.id],(err, rows, fields)=>{
	  if (!err)
		res.send(rows);
	  else
		console.log(err);
	  })
		
  });
  

  //NEW! Soft Delete Method
  app.put('/del/services/:id', (req,res) => {
	connection.query('UPDATE services SET is_deleted = 1 WHERE service_type_id = ?;',[req.params.id],(err, rows, fields)=>{
	  if (!err)
		res.send(rows);
	  else
		console.log(err);
	  })
		
  });
  
  /*
  // delete a service
  app.delete('/services/:id',(req, res)=>{
	connection.query('DELETE services WHERE service_type_id = ?',[req.params.id],(err, rows, fields)=>{
	if (!err)
	  res.send(rows);
	else
	  console.log(err);
	})
  });
  */
  
  /*------------------------------------ */
  /*----------- End Services ---------- */
  /*---------------------------------- */
  
  
  
  /*------------------------------------ */
  /*----------- Begin Shops ----------- */
  /*---------------------------------- */
  app.get('/shops/',(req, res)=>{
	connection.query('SELECT * FROM shops WHERE is_deleted = 0',[req.params.id],(err, rows, fields)=>{
	if (!err)
	  res.send(rows);
	else
	  console.log(err);
	})
  });
  
  app.get('/shops/:id',(req, res)=>{
	connection.query('SELECT * FROM shops WHERE shop_id = ? AND is_deleted = 0',[req.params.id],(err, rows, fields)=>{
	if (!err)
	  res.send(rows);
	else
	  console.log(err);
	})
  });
  
  app.post('/shops/', (req,res) => {
	let type = req.body;
	connection.query('INSERT INTO shops (address,city,state,zipcode) values (?,?,?,?);',[type.address,type.city,type.state,type.zipcode],(err, rows, fields)=>{
	  if (!err)
		res.send(rows);
	  else
		console.log(err);
	  })
		
  });
  
  //NEW! Soft Delete Method
  app.put('/del/shops/:id', (req,res) => {
	connection.query('UPDATE shops SET is_deleted = 1 WHERE shop_id = ?;',[req.params.id],(err, rows, fields)=>{
	  if (!err)
		res.send(rows);
	  else
		console.log(err);
	  })
		
  });
  
  /*
  app.delete('/shops/:id',(req, res)=>{
	connection.query('DELETE shops WHERE shop_id = ?',[req.params.id],(err, rows, fields)=>{
	if (!err)
	  res.send(rows);
	else
	  console.log(err);
	})
  });
  */
  
  app.put('/shop/:id', (req,res) => {
	connection.query('UPDATE shops SET address = ?, city = ?, state = ?, zipcode = ? WHERE shop_id = ?;',[req.body[0].address,req.body[0].city,req.body[0].state,req.body[0].zip,req.params.id],(err, rows, fields)=>{
	  if (!err)
		res.send(rows);
	  else
		console.log(err);
	  })
		
  });
  
  /*------------------------------------ */
  /*------------ End Shops ------------ */
  /*---------------------------------- */
  
  
  /*
  app.put('/employees/:id', (req,res) => {
	let emp = req.body;
	connection.query('UPDATE employees SET employee_type_id = ?, firstname = ?, lastname = ? WHERE employee_id = ?;',[emp.employee_type_id,emp.firstname,emp.lastname,req.params.id],(err, rows, fields)=>{
	  if (!err)
		res.send(rows);
	  else
		console.log(err);
	  })
		
  });

*/
  /*------------------------------------ */
  /*---------- Begin Reports ---------- */
  /*---------------------------------- */

app.get('/vehicleTotals',(req, res)=>{
	connection.query('SELECT vehicles.make,	count(*) FROM vehicles	INNER JOIN repair_history ON repair_history.vehicle_id = vehicles.vehicle_id group by vehicles.make',(err, rows, fields)=>{
	if (!err)
	  res.send(rows);
	else
	  console.log(err);
	})
  });

	app.get('/repairTotals',(req, res)=>{
		connection.query('SELECT services.service_description, count(*) FROM services INNER JOIN repair_history ON repair_history.service_type_id = services.service_type_id group by services.service_description',(err, rows, fields)=>{
		if (!err)
			res.send(rows);
		else
			console.log(err);
		})
		});

app.get('/carsCheckedIn/:date1/:date2', (req, res)=>{
  connection.query("SELECT ROW_NUMBER() \
  OVER(order by CONCAT(customers.lastname,', ',customers.firstname) asc) AS 'Row Num', \
  vehicles.vehicle_id, \
  customers.firstname, \
  customers.lastname, \
  customers.homephone, \
  customers.cellphone, \
  customers.workphone, \
  vehicles.license_plate, \
  vehicles.make, \
  vehicles.model, \
  repair_history.checkin_date, \
  repair_history.checkout_date, \
  repair_history.service_complete, \
  services.service_description \
  FROM customers \
  INNER JOIN vehicles ON customers.customer_id = vehicles.customer_id \
  INNER JOIN repair_history ON vehicles.vehicle_id = repair_history.vehicle_id \
  INNER JOIN services ON repair_history.service_type_id = services.service_type_id \
  WHERE DATE(repair_history.checkin_date) BETWEEN ? AND ?;",[req.params.date1,req.params.date2],(err, rows, fields)=>{
    if (!err)
      res.send(rows);
    else
      console.log(err);
    })
  });

  app.get('/carsCheckedOUT/:date1/:date2', (req, res)=>{
    connection.query("SELECT ROW_NUMBER() \
    OVER(order by CONCAT(customers.lastname,', ',customers.firstname) asc) AS 'Row Num', \
    vehicles.vehicle_id, \
    customers.firstname, \
    customers.lastname, \
    customers.homephone, \
    customers.cellphone, \
    customers.workphone, \
    vehicles.license_plate, \
    vehicles.make, \
    vehicles.model, \
    repair_history.checkin_date, \
    repair_history.checkout_date, \
    repair_history.service_complete, \
    services.service_description \
    FROM customers \
    INNER JOIN vehicles ON customers.customer_id = vehicles.customer_id \
    INNER JOIN repair_history ON vehicles.vehicle_id = repair_history.vehicle_id \
    INNER JOIN services ON repair_history.service_type_id = services.service_type_id \
    WHERE DATE(repair_history.checkout_date) BETWEEN ? AND ?;",[req.params.date1,req.params.date2],(err, rows, fields)=>{
      if (!err)
        res.send(rows);
      else
        console.log(err);
      })
    });

app.get('/repairsCompleted/', (req, res)=>{
  connection.query("SELECT ROW_NUMBER()\
  OVER(order by customers.lastname asc) AS 'Row Num',\
  customers.firstname,\
  customers.lastname,\
  customers.cellphone,\
  customers.homephone,\
  vehicles.make,\
  vehicles.model,\
  vehicles.year, \
  vehicles.color, \
  repair_history.vehicle_history_id,\
  repair_history.service_complete,\
  repair_history.mechanic_notes,\
  repair_history.checkin_date,\
  repair_history.checkout_date,\
  employees.e_firstname,\
  employees.e_lastname,\
  services.service_description,\
  shops.address,\
  shops.state,\
  shops.city,\
  shops.zipcode\
  FROM customers\
  INNER JOIN vehicles ON customers.customer_id = vehicles.customer_id\
  INNER JOIN repair_history ON vehicles.vehicle_id = repair_history.vehicle_id\
  INNER JOIN services ON repair_history.service_type_id = services.service_type_id\
  INNER JOIN employees ON repair_history.employee_id = employees.employee_id\
  INNER JOIN shops ON employees.shop_id = shops.shop_id\
  where repair_history.service_complete = 1;",[req.params.date1,req.params.date2],(err, rows, fields)=>{
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

app.get('/repairsNotCompleted/', (req, res)=>{
  connection.query("SELECT ROW_NUMBER()\
  OVER(order by customers.lastname asc) AS 'Row Num',\
  customers.firstname,\
  customers.lastname,\
  customers.cellphone,\
  customers.homephone,\
  vehicles.make,\
  vehicles.model,\
  vehicles.year, \
  vehicles.color, \
  repair_history.vehicle_history_id,\
  repair_history.service_complete,\
  repair_history.mechanic_notes,\
  repair_history.checkin_date,\
  repair_history.checkout_date,\
  employees.e_firstname,\
  employees.e_lastname,\
  services.service_description,\
  shops.address,\
  shops.state,\
  shops.city,\
  shops.zipcode\
  FROM customers\
  INNER JOIN vehicles ON customers.customer_id = vehicles.customer_id\
  INNER JOIN repair_history ON vehicles.vehicle_id = repair_history.vehicle_id\
  INNER JOIN services ON repair_history.service_type_id = services.service_type_id\
  INNER JOIN employees ON repair_history.employee_id = employees.employee_id\
  INNER JOIN shops ON employees.shop_id = shops.shop_id\
  where repair_history.service_complete = 0;",[req.params.date1,req.params.date2],(err, rows, fields)=>{
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

app.get('/empAssigned/:employee_id', (req, res)=>{
  connection.query("SELECT ROW_NUMBER()\
  OVER(order by CONCAT(employees.e_lastname,', ',employees.e_firstname) asc) AS 'Row Num',\
  employees.employee_id,\
  customers.firstname,\
  customers.lastname,\
  customers.homephone AS 'c_home',\
  vehicles.make,\
  vehicles.model,\
  vehicles.color,\
  repair_history.vehicle_history_id,\
  services.service_description,\
  repair_history.service_complete,\
  repair_history.service_authorized,\
  services.is_quick,\
  employees.e_lastname,\
  employees.e_firstname\
  FROM customers\
  INNER JOIN vehicles ON customers.customer_id = vehicles.customer_id\
  INNER JOIN repair_history ON vehicles.vehicle_id = repair_history.vehicle_id\
  INNER JOIN services ON repair_history.service_type_id = services.service_type_id\
  INNER JOIN employees ON repair_history.employee_id = employees.employee_id\
  INNER JOIN shops ON employees.shop_id = shops.shop_id\
  where employees.employee_id = ?;",[req.params.employee_id],(err, rows, fields)=>{
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});
  

/*------------------------------------ */
/*----------- End Reports ----------- */
/*---------------------------------- */