import React from 'react';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; 
import './assets/css/font-awesome.min.css';
import './assets/css/smthing.css';
import './assets/css/tooplate-style.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Login from './componants/LoginPage';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Studentprofile from './componants/student/studentprofile'
import Teacherprofile from './componants/teacher/teacherprofile'
import AddProject from './componants/teacher/addProject'
import MyProjects from './componants/teacher/myProjects'
import StudentAddProject from './componants/student/addProject'
import StudentMyProjects from './componants/student/myProjects'
import ApprovedProjects from './componants/student/approvedprojects'
import ChooseProject from './componants/student/chooseProject'
import ChangePassword from './componants/changePassword'
import CreateGroup from './componants/student/createGroupe';
import Forbiden from './componants/Forbiden';
import Logout from './componants/logout';
import {ContactUsPage} from './componants/ContactPage';
import {AboutUsPage} from './componants/AboutUsPage';
import Resultspage from './componants/student/resultsPage';
import SortPage from './componants/sortPage';


ReactDOM.render(
  <BrowserRouter>
  <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/changepassword" component={ChangePassword} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/contactus" component={ContactUsPage} />
          <Route exact path="/aboutus" component={AboutUsPage} />
          <Route exact path="/" component={App} />
          <Route exact path="/student" component={Studentprofile} />
          <Route exact path="/teacher" component={Teacherprofile} />
          <Route exact path="/teacher/addProject" component={AddProject} />
          <Route exact path="/teacher/MyProjects" component={MyProjects} />
          <Route exact path="/student/addProject" component={StudentAddProject} />
          <Route exact path="/student/MyProjects" component={StudentMyProjects} />
          <Route exact path="/student/ChooseProject" component={ChooseProject} />
          <Route exact path="/student/themes" component={ApprovedProjects} />
          <Route exact path="/student/results" component={Resultspage} />
          <Route exact path="/student/group" component={CreateGroup} />
          <Route exact path="/sort" component={SortPage} />
          <Route exact path="/Forbiden" component={Forbiden} />
    </Switch>

</BrowserRouter>,

document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();