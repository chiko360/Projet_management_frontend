import React from 'react';
import './App.css';
import { BrowserRouter as Router , Route, Link } from "react-router-dom";
import Login from './componants/login';
import home from './componants/home';
import Studentprofile from './componants/student/studentprofile'
import Teacherprofile from './componants/teacher/teacherprofile'
import AddProject from './componants/teacher/addProject'
import EditProject from './componants/teacher/EditProject'
import MyProjects from './componants/teacher/myProjects'
import ApprovedProjects from './componants/student/approvedprojects'
import ChangePassword from './componants/changePassword'
import CreateGroup from './componants/student/createGroupe';
import Forbiden from './componants/Forbiden';
function App() {
  return (
    <React.Fragment>
      <Router>
          <Route path='/teacher/editProject/:id/' component={EditProject} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={home} />
          <Route exact path="/student" component={Studentprofile} />
          <Route exact path="/teacher" component={Teacherprofile} />
          <Route exact path="/teacher/addProject" component={AddProject} />
          <Route exact path="/teacher/editProject" component={EditProject} />
          <Route exact path="/teacher/MyProjects" component={MyProjects} />
          <Route exact path="/student/themes" component={ApprovedProjects} />
          <Route exact path="/changePassword" component={ChangePassword} />
          <Route exact path="/student/createGroup" component={CreateGroup} />
          <Route exact path="/Forbiden" component={Forbiden} />
          
      </Router>
    </React.Fragment>
  );
}

export default App;
