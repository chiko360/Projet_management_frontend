import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AsyncSelect from 'react-select/async';
import { Button} from "semantic-ui-react";
import HorNavbar from '../HorNavbar';
function CreateGroup() {
    const [groupName,setGname] = useState('');
    const [members,setMembers] = useState([]);
    const [nameError,setNE] = useState(null);
    const [ServerError,setSE] = useState(null);
    const [Grp,setGrp] = useState('');
    const [Leader,setLeader] = useState(false);
    const [mem, setmem] = useState([]);
    const [leadername,setLN] = useState([]);
    let history = useHistory();

    const getMembers = async () => {
      let url = 'http://localhost:8000/groups/getMembers/';
      let token = localStorage.getItem("token");
      axios.create({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization' : 'Bearer '+ token
          },
      })
      .request({
        url: url,
        method: "get",
      })
      .then((res) => {
          setmem(res.data);
        }
      )
      .catch(() => {
        console.log('don\'t have a grp');
      })
    }

    const havegrp = async () => {
      let url = 'http://localhost:8000/profiles/getgroup/';
      let token = localStorage.getItem("token");
      axios.create({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization' : 'Bearer '+ token
          },
      })
      .request({
        url: url,
        method: "get",
      })
      .then((res) => {
          setGrp(res.data.grp);
          setLeader(res.data.leader)
          setLN(res.data.leaderName)
        }
      )
      .catch(() => {
        history.push('/*')
      })
    }

    const handleCreation = async () =>{
        const isValid = validate();
        if (isValid===true && Grp==='') {
          setNE(null);
          createGroup();
        }
        else if (Grp!==''){
          for (var i = 0; i < members.length; i++) {
            var memlist= members[i].label.split(' ');
            const first_name=memlist[0]
            const last_name=memlist[1]
            Addmembers(first_name,last_name);
          }
        }
    }

    const deletemember = async (first_name,last_name) => {
      let url = 'http://localhost:8000/groups/deletemember/';
      let token = localStorage.getItem("token");
      axios.create({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization' : 'Bearer '+ token
          },
      })
      .request({
        url: url,
        method: "post",
        data: { first_name,last_name },
      })
      .then((res) => {
          history.push('/student/createGroup')
        }
      )
      .catch(() => {
        console.log('error');
      })
    }

    const Addmembers = async (first_name,last_name) => {
      let url = 'http://localhost:8000/groups/addmember/';
      let token = localStorage.getItem("token");
      axios.create({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization' : 'Bearer '+ token
          },
      })
      .request({
        url: url,
        method: "post",
        data: { first_name,last_name },
      })
      .then((res) => {
        console.log(first_name+' '+last_name+' was added')
        }
      )
      .catch(() => {
        console.log('error');
        setSE('you don\'t have a groupe')
      })
    }
    const createGroup = async () => {
      let url = 'http://localhost:8000/groups/creategroup/';
      let token = localStorage.getItem("token");
      axios.create({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization' : 'Bearer '+ token
          },
      })
      .request({
        url: url,
        method: "post",
        data: { groupName },
      })
      .then((res) => {
        console.log('created')
        for (var i = 0; i < members.length; i++) {
          var memlist= members[i].label.split(' ');
          const first_name=memlist[0]
          const last_name=memlist[1]
          Addmembers(first_name,last_name);
        }
      })
      .catch(() => {
        console.log('already exist')
        for (var i = 0; i < members.length; i++) {
          var memlist= members[i].label.split(' ');
          const first_name=memlist[0]
          const last_name=memlist[1]
          Addmembers(first_name,last_name);
        }
      });
    }
    const validate = () => {
        let nameError = "";

        if (groupName==='') {
          nameError = 'Group name can\'t be blank';
        }
    
        if (nameError) {
          setNE(nameError);
          return false;
        }
    
        return true;
      };

    const addmember = members => {
        setMembers(members);
    }
    const loadOptions = async (inputText,callback)=> {
        let url = 'http://localhost:8000/members/'+inputText;
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
        const response = await fetch(url,options)
        const json = await response.json()
        callback(json.map(i=>({label:i.first_name+' '+i.last_name,value:i.last_name+' '+i.last_name})));
    }
    useEffect(()=> {
      havegrp();
      getMembers();
    },[]);


    function InputGN(props) {
      const havegrp = props.grp;
      if (havegrp==='') {
        return (
          <div>
              <input type="text" name="Gname" placeholder="enter a groupe name" onChange={(event)=>{setGname(event.target.value)}} /> <br/>
              <Button class="ui button" color="blue" onClick={()=>{handleCreation()}}>create group</Button>
              <div style={{ fontSize: 12, color: "red" }}>{nameError}</div>
          </div>
        )
      }
      else return null;
    }  
    function AddFeild(props) {
      const isLeader = props.Leader;
      if (isLeader) {
        return (
          <div>
            <br/>
            <div style={{ fontSize: 26}}>add members :</div> <br/>
            <AsyncSelect  isMulti value={members} onChange={addmember} placeholder='enter members names' loadOptions={loadOptions} /><br/><br/>
            <Button class="ui button" color="blue" onClick={()=>{handleCreation()}}>invite member</Button>
            <div style={{ fontSize: 12, color: "red" }}>{ServerError}</div>
          </div>
        )
      }
      else return null;
    }    
    function DltButton(props) {
      const isLeader = props.Leader;
      const first_name = props.first_name;
      const last_name = props.last_name;
      const leader = props.LN;
      var LNList= leader.split(' ');
      const leaderLN=LNList[0]
      const leaderFN=LNList[1]
      console.log(leaderFN);
      if (first_name===leaderFN && last_name===leaderLN){
        return null;
      }
      else if (isLeader) {
        return (
          <Button class="ui button" color="red" onClick={()=>{deletemember(first_name,last_name)}}>delete member</Button>
        )
      }
      else {
        return null;
      }
    }

    return (
        <React.Fragment>
          <HorNavbar type={localStorage.getItem('type')} islogged={localStorage.getItem('token')}/>
            <header className="App-header">
              <p>
                {Grp}
              </p>
            </header>
          <div><center>
            <InputGN grp={Grp}/>
            <AddFeild Leader={Leader}/>
            <div>
              {mem.map((mem,index) => {
              return <ul>
                      <h1>{index +1}</h1>
                      <h2>first name : {mem.first_name}</h2>
                      <h2>last name : {mem.last_name}</h2>
                      <h3>gender : {mem.gender}</h3>
                      <h3>birth date : {mem.birth_date}</h3>
                      <DltButton Leader={Leader} LN={leadername} first_name={mem.first_name} last_name={mem.last_name} />
                  </ul>
              })}
                </div>
            </center> 
          </div>
          </React.Fragment>
    );
}

export default CreateGroup;