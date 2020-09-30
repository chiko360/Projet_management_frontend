import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import NavBlack from '../header/NavBlack';
import "../../addP.css";
import Footer from '../Footer';
import AOS from 'aos';
import {
  Button,
  Form,
  Input,
  Container,
} from "reactstrap";
function StudentAddProject() {

  const [title, setTitle] = useState(null);
  const [promo, setpromo] = useState(null);
  const [introduction, setIntro] = useState(null);
  const [tags, setTags] = useState(null);
  const [tools, setTools] = useState(null);
  const [details, setDetails] = useState(null);
  const [keywords, setkw] = useState([]);
  let history = useHistory();

  const addkeyword = keywords => {
    setkw([...keywords, keywords]);
  }

  const loadOptions = async (inputText, callback) => {
    let url = 'http://localhost:8000/members/' + inputText;
    let token = localStorage.getItem("token")
    let options = {
      method: 'get',
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    };
    const response = await fetch(url, options)
    const json = await response.json()
    callback(json.map(i => ({ label: i.first_name + ' ' + i.last_name, value: i.last_name + ' ' + i.last_name })));
  }


  const Post = async () => {
    let url = 'http://localhost:8000/posts/createpoststudent/';
    let token = localStorage.getItem("token")
    let options = {
      method: 'POST',
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
      data: { title, promo, introduction, tags, tools, details }
    };
    let response = await axios(options);
    let responseOK = response && response.status === 200;
    if (responseOK) {
      history.replace('/student/MyProjects');
    }
  }

  const getinfo = async () => {
    let url = 'http://localhost:8000/profiles/student/';
    let token = localStorage.getItem("token")
    let options = {
      method: 'get',
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    };

    await axios(options).then(res => {
      const response = res.data;
      setpromo(response.data['0'].promo)
    })
      .catch(function (error) {
        history.push('/Forbiden')
      }
      )
  }
  useEffect(() => {
    if (localStorage.getItem('type') !== 'student') {
      history.push('/Forbiden')
    }
    getinfo();
    AOS.init();
    AOS.refresh();
  }, []);


  function AbleProject(props) {
    if (props.promo === '3CS / SIW' || props.promo === '3CS / ISI') {
      return (
        <div>
          <div className="container">
            <div class="card my-4">
              <h2 class="card-header headerrr headerrr-hover" data-aos="fade-up" data-aos-delay="400">
                <br />
   Fill the fields and hit submit to add a new project.
   <a href="/student/myprojects">
                  <Button
                    style={{ float: 'right' }}
                    size="lg"
                    className="bttn-hover color-9">
                    my Projects
  </Button>
                </a>

                <br />
                <br />
              </h2>

              <div class="card-body" data-aos="fade-up" data-aos-delay="600">
                <Form>
                  <Input
                    className="form-control my-3"
                    name="title"
                    placeholder="Add a title to your project.."
                    onChange={(event) => { setTitle(event.target.value) }}
                  />
                  <textarea
                    className="form-control my-3"
                    rows="3" cols="50"
                    type="text"
                    name="introduction"
                    placeholder="Add an introduction to your project.."
                    onChange={(event) => { setIntro(event.target.value) }}
                  >
                  </textarea>

                  <textarea
                    className="form-control my-3"
                    rows="3" cols="50"
                    type="text"
                    name="tools"
                    placeholder="Enter the tools needed to make your project.."
                    onChange={(event) => { setTools(event.target.value) }}
                  >
                  </textarea>

                  <textarea
                    className="form-control my-3"
                    rows="5" cols="50"
                    type="text"
                    name="details"
                    placeholder="Add more details to your project.."
                    onChange={(event) => { setDetails(event.target.value) }}
                  >
                  </textarea>
                  <input
                    className="form-control my-3"
                    type="text"
                    name="keywords"
                    placeholder="Enter the key words.."
                    onChange={(event) => { setTags(event.target.value) }} /> <br />
                  <br />
                </Form>
                <center>
                  <Button block size="lg" className="bttn-hover color-1" onClick={() => { Post() }} >
                    submit
   </Button></center>
                <br />
              </div>
            </div>
          </div>
        </div>
      )
    }
    else
      return (
        <div className="container">
          <div class="card my-4">
            <div class="card-body"  data-aos="fade-up" data-aos-delay="400">
              <br /><br /><br /><br /><br /><br /><br /><br />
              <center><h1 > you have to be a 3CS student to be able to post a project. </h1></center>
              <br /><br /><br /><br /><br /><br /><br />
            </div>

          </div>
        </div>
      );
  }
  
  return (
    <>
      <NavBlack type={localStorage.getItem('type')} islogged={localStorage.getItem('token')} />
      <br />
      <br />
      <br />

      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div className="section about">
              <Container>
                <section class="breadcrumbs"  data-aos="fade-up" data-aos-delay="200">
                  <div class="container">
                    <div class="d-flex justify-content-between align-items-center">
                      <h2>Add Project</h2>
                      <ol>
                        <li><a href="/index">home</a></li>
                        <li><a href="/student">student</a></li>
                        <li>add project</li>
                      </ol>
                    </div>
                  </div>
                </section>

                <hr />

                <AbleProject promo={promo} />
                <br />
                <br />
                <br />
                <br />
              </Container>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StudentAddProject;

//<React.Fragment>
//<HorNavbar type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>
//<div className="auth-main">
//  <div class="auth-content">
//        <div className="auth-card">
//          <Header as="h2" color="black" textAlign="center">
//                  add project    
//              </Header>
//              <form class="ui form">
//            <input type="text" name="title" placeholder="title" onChange={(event)=>{setTitle(event.target.value)}} /></form><br/>
//            <form class="ui form">
//            <select onChange={(event)=>{setPromo(event.target.value)}}>
//                <option>2CPI</option>
//                <option>1CS</option>
//                <option>2CS</option>
//                <option>3CS</option>
//            </select> </form> <br/>
//            <form class="ui form">
//            <textarea rows="4" cols="50" type="text" name="introduction" placeholder="introduction" onChange={(event)=>{setIntro(event.target.value)}} /> 
//            </form><br/>
//            <form class="ui form">
//            <textarea rows="4" cols="50" type="text" name="tools" placeholder="tools" onChange={(event)=>{setTools(event.target.value)}} />
//            </form><br/>
//            <form class="ui form">
//            <textarea rows="10" cols="50" type="text" name="details" placeholder="details" onChange={(event)=>{setDetails(event.target.value)}} />
//            </form><br/>
//            <form class="ui form">
//            <input type="text" name="keywords" placeholder="keywords" onChange={(event)=>{setTags(event.target.value)}} /> <br/>
//            </form><br/>
//            <AsyncSelect isMulti value={keywords} onChange={addkeyword} placeholder='type your keywords' loadOptions={loadOptions} />
//            <Button class="ui button" color="blue" size="huge" type="submit" onClick={()=>{Post()}}>submit</Button>
//          </div>
//          </div>
//      </div>
//      </React.Fragment>