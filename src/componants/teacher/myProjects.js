import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Button} from "semantic-ui-react";
import EditProject from './EditProject';
import { BrowserRouter as Router , Route, Link } from "react-router-dom";
function MyProjects() {

    const [posts, setPost] = useState([]);
    let history = useHistory();

    const getprojects = async () => {
        let url = 'http://localhost:8000/posts/myprojects/';
        let token = localStorage.getItem("token")
        let options = {
                    method: 'get',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization' : 'Bearer '+ token
                    },
                };
        await axios(options).then(res => {
            const response = res.data;
            console.log(response)
            setPost(response)
        })
    }

    const deleteProject = async (index) => {
        let url = 'http://localhost:8000/posts/'+index+'/delete/';
        let token = localStorage.getItem("token")
        let options = {
                    method: 'DELETE',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization' : 'Bearer '+ token
                    },
                };
        let response = await axios(options);
        let responseOK = response && response.status === 200 ;
        if (responseOK) {
            getprojects();
        }
    }
    const editProject = async (index) => {
        let url = 'http://localhost:8000/posts/'+index+'/edit/';
        let token = localStorage.getItem("token")
        let options = {
                    method: 'PUT',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization' : 'Bearer '+ token
                    },
                };
        let response = await axios(options);
        let responseOK = response && response.status === 200 ;
        if (responseOK) {
            history.replace('/teacher/MyProjects');
        }
    }

    useEffect(()=> {
        if (localStorage.getItem('type')!=='teacher'){
            history.push('/Forbiden')
        }
        getprojects();
    },[]);
    return(
            <React.Fragment>
                <header className="App-header">
                  <p>
                    my Projects
                  </p>
                </header>
                <div>
                        {posts.map((post,index) => {
                        return <div>
                                <h2 class="ui top attached header">{post.title}</h2>
                                <div class="ui attached segment">
                                <h3>promo : {post.promo}</h3>
                                <h3>created at : {post.creating_date}</h3>
                                <h3>introduction : {post.introduction}</h3>
                                <h3>tools : {post.tools}</h3>
                                <h3>tags : {post.tags}</h3>
                                <h3>details :{post.details}</h3>
                                <h3>approuved : {post.approved}</h3>
                                <Button color='red' onClick={()=>{deleteProject(post.id)}}>delete topic</Button>
                                <Link
                                      to={{
                                        pathname: "/teacher/editProject/"+post.id+"/",
                                      }}
                                    > 
                                <Button color='green' >edit topic</Button> </Link>
                                </div>
                            </div>
                    })}
                </div>
              </React.Fragment>
        );
    }

export default MyProjects;