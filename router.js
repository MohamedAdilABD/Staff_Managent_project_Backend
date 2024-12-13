const express = require('express');
const router = express.Router();

const userdata = require('./usermodal');
const emplloyeedata = require('./employeemodal');
const leaverequest = require("./leaverequestmodal");
//const shiftdata = require("./shiftmodel");
const recruitement = require("./recruitmentmodal");
const orgchart = require("./orgchartmodal");


// user Authentication

// register user
router.post("/register", async(req, res) => {
    try {
        const { name, email, password , role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userExists = await userdata.findOne({ email });

        if (userExists) {
            return res.status(401).json({ message: 'User already exists' });
        }
        
        const user = new userdata ( { name, email, password, role } );
        await user.save();

        res.status(200).json({ message: "User register sucessfully" });
        
    } catch (error) {
        res.status(500).json({message: "Error registering user", error: error.message});
    }
});

// login 
router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userdata.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: "Login Sucessfully", user: data });
    } catch (error) {
        res.status(500).json({message: "Error in Login user", error: error.message});
    }
});


// employee management

// add employee
router.post("/employee", async(req, res) => {
    try {
        const { name, email, position, department, shift } = req.body;

        const newemployee = new emplloyeedata({ name, email, position, department, shift });
        await newemployee.save();

        res.status(200).json({message: "Employee added", emplloyeedata });

    } catch (error) {
        res.status(500).json({ message: "Error Adding employees", error: error.message});
    }
});

// find employee
router.get("/employeefind", async(req, res) => {
    try {
        const employee = await emplloyeedata.find();
        
        res.status(200).json(employee);

    } catch (error) {
        res.status(500).json({ message: "Error fetching employee", error: error.message});
    }
});

// update employee
router.put("/employeeupdate/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedemployee = await emplloyeedata.findByIdAndUpdate(id, updates, {new: true});

        if (!employee) {
            return res.status(400).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: "Employee updated successfully", employee: updatedemployee });
    } catch (error) {
        res.status(500).json({ message: "Error updating employee", error: error.message });
    }
});

// delete employee
router.delete("/employeedelete/:id", async(req,res) => {
    try {
        const { id } = req.params;

        const deleteemployee = await emplloyeedata.findByIdAndDelete(id);
        
        if (!employee) {
            return res.status(400).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting employee", error: error.message });
    }
});


// leave management

//apply leave
router.post('/applyleave', async (req, res) => {
    try {
      const { name, department, startDate, endDate, reason, days } = req.body;

      const newLeaveRequest = new leaverequest ({ name, department, startDate, endDate, reason, days, status: 'Pending' });
      await newLeaveRequest.save();

      res.status(200).json({ message: 'Leave request submitted successfully', leaverequest: newLeaveRequest });
    } catch (error) {
      res.status(500).json({ message: "Error Applying leave", error: error.message });
    }
});

// show leave

router.get("/showleave", async(req, res) => {
    try {
        const newleaverequest = await leaverequest.find();
        
        res.status(200).json(newleaverequest);

    } catch (error) {
        res.status(500).json({ message: "Error fetching leave request", error: error.message});
    }
});

// aprove/ reject leave
router.put('/updateleave/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedLeaveRequest = await leaverequest.findByIdAndUpdate(id, { status }, { new: true });
      
      if (!leave) {
            return res.status(400).json({ message: 'Leave request not found' });
        }

      res.status(200).json({ message: `Leave ${status.toLowerCase()} successfully`, leave });
    } catch (error) {
        res.status(500).json({ message: "Error updating leave",error: error.message });
    }
});


// shift management

// shift logs 
router.post("/addshift/:id", async(req,res) => {
    try {
        const { employeeId, starttime, endtime } = req.body;

        const shift = new shiftdata({ employeeId, starttime, endtime });

        await shift.save();

        res.status(200).json({ message: "shift assigned successfully", shiftdata });
    } catch (error) {
        res.status(500).json({ message: "Error assignrd shift", error: error.message });
    }
});

// all shift
router.get("/allshift", async(req,res) => {
    try {
        const shift = await shift.find();
        res.status(200).json(shift);
    } catch (error) {
        res.status(500).json({ message: "Error shift logs", error: error.message });
    }
});


// recuitment management

// add recuitment
router.post('/addrecruitment', async (req, res) => {
    try {
      const { jobTitle, description, department, status } = req.body;

      const newRecruitment = new recruitement({ jobTitle, description, department, status });
      await newRecruitment.save();

      res.status(200).json({ message: 'Recruitment added successfully', recruitement: newRecruitment });
    } catch (error) {
      res.status(500).json({ message: "Error adding recruitement" ,error: error.message });
    }
});

// find recruitment
router.get('/findrecruitments', async (req, res) => {
    try {
      const recruitments = await recruitement.find();
      res.status(200).json(recruitments);
    } catch (error) {
      res.status(500).json({ message: "Error recruitement", error: error.message });
    }
});

// update recruitment
router.put('/updaterecruitments/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedRecruitment = await recruitement.findByIdAndUpdate(id, updates, { new: true });
      res.status(200).json({ message: 'Recruitment updated successfully', recruitement: updatedRecruitment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// delete recruitment
router.delete('/deleterecruitments/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await recruitement.findByIdAndDelete(id);
      res.status(200).json({ message: 'Recruitment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  

// organization chart management

// add charts
router.post('/addorgchart', async (req, res) => {
    try {
      const { name, position, managerId } = req.body;

      const newOrgChartNode = new orgchart({ name, position, managerId });
      await newOrgChartNode.save();

      res.status(200).json({ message: 'Organization chart node added successfully', node: newOrgChartNode });
    } catch (error) {
      res.status(500).json({ message: "Error adding charts", error: error.message });
    }
});

// update charts
router.put('/updateorgchart', async(req,res) => {
    try {
        const { nodes } = req.body;

        const charts = await orgchart.findOneAndUpdate( {}, { nodes }, { new: true, upsert: true });
        res.status(200).json({ message: "charts updated successfully", charts})
    } catch (error) {
        res.status(500).json({ message: "Error updating charts", error: error.message });
    }
});

// get charts  
router.get('/findorgchart', async (req, res) => {
    try {
      const Chart = await orgchart.find();
      res.status(200).json(Chart);
    } catch (error) {
      res.status(500).json({ message: "Error getting charts", error: error.message });
    }
});

  
module.exports = router
