import React from 'react';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; 
import './assets/css/font-awesome.min.css';
import './assets/css/smthing.css';
import './assets/css/tooplate-style.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route,Router, Switch } from "react-router-dom";
import Login from './componants/LoginPage';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Studentprofile from './componants/student/studentprofile';
import Teacherprofile from './componants/teacher/teacherprofile';
import AddProject from './componants/teacher/addProject';
import MyProjects from './componants/teacher/myProjects';
import StudentAddProject from './componants/student/addProject';
import StudentMyProjects from './componants/student/myProjects';
import ApprovedProjects from './componants/student/approvedprojects';
import ChooseProject from './componants/student/chooseProject';
import ChangePassword from './componants/changePassword'
import CreateGroup from './componants/student/createGroupe';
import Forbiden from './componants/Forbiden';
import InternalError from './componants/500';
import Logout from './componants/logout';
import {ContactUsPage} from './componants/ContactPage';
import {AboutUsPage} from './componants/AboutUsPage';
import Resultspage from './componants/student/resultsPage';
import SortPage from './componants/sortPage';
import NotFound from './componants/404';
import FinalResults from './componants/teacher/finalResults';



ReactDOM.render(
  <BrowserRouter>
  <Switch>
          <Route exact path="/changepassword" component={ChangePassword} />
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/contactus" component={ContactUsPage} />
          <Route exact path="/aboutus" component={AboutUsPage} />
          <Route exact path="/changePassword" component={ChangePassword} />
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
          <Route exact path="/teacher/results" component={FinalResults} />
          <Route exact path="/sort" component={SortPage} />
          <Route exact path="/Forbiden" component={Forbiden} />
          <Route exact path="/500" component={InternalError} />
          <Route exact path="/404" component={NotFound} />
          <Route component={NotFound} />
    </Switch>

</BrowserRouter>,

document.getElementById('root'));
serviceWorker.register();