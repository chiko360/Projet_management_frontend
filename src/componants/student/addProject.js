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

  const Handler = e => {
    e.preventDefault()
    switch(e.target.name){
      case 'title':
        setTitle(e.target.value);
      case 'introduction':
        setIntro(e.target.value);
      case 'tools':
        setTools(e.target.value);
      case 'details':
        setDetails(e.target.value);
      case 'keywords':
          setTags(e.target.value);
    }
  }

  const addkeyword = keywords => {
    setkw([...keywords, keywords]);
  }

  const loadOptions = async (inputText, callback) => {
    let url = 'http://localhost:8001/members/' + inputText;
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
    let url = 'http://localhost:8001/posts/createpost/student/';
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
    let url = 'http://localhost:8001/profiles/student/';
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
              <section class="breadcrumbs" >
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
              <div>
        <div className="container">
          <div class="card my-4">
            <h2 class="card-header headerrr headerrr-hover" >
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

            <div class="card-body">
              <Form>

                <Input
                type="text"
                  className="form-control my-3"
                  placeholder="Add a title to your project.."
                  onChange={(event)=>{setTitle(event.target.value)}}
                  />



                <textarea
                  className="form-control my-3"
                  rows="3" cols="50"
                  type="text"
                  name="introduction"
                  placeholder="Add an introduction to your project.."
                  onChange={(event)=>{setIntro(event.target.value)}}

                >
                </textarea>

                <textarea
                  className="form-control my-3"
                  rows="3" cols="50"
                  type="text"
                  name="tools"
                  placeholder="Enter the tools needed to make your project.."
                  value={tools}
                  onChange={(event)=>{setTools(event.target.value)}}
                >
                </textarea>

                <textarea
                  className="form-control my-3"
                  rows="5" cols="50"
                  type="text"
                  name="details"
                  placeholder="Add more details to your project.."
                  value={details}
                  onChange={(event)=>{setDetails(event.target.value)}}
                >
                </textarea>
                <input
                  className="form-control my-3"
                  type="text"
                  name="keywords"
                  placeholder="Enter the key words.."
                  value={tags}
                  onChange={(event)=>{setTags(event.target.value)}}
                  /> <br />
                <br />
              </Form>
              <center>
                <Button block size="lg" className="bttn-hover color-1" onClick={() => {Post() }} >
                  submit
 </Button></center>
              <br />
            </div>
          </div>
        </div>
      </div>
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
