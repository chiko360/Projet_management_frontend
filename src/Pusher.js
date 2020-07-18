import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Pusher from "pusher-js";
import { toast } from 'react-semantic-toasts';

function Pusher(props) {
  const type = props.type
  const logged = props.islogged
  const KEY = '269da359d7787125ca29'
  const pusher = new Pusher(KEY,{
      cluster: "eu",
      authEndpoint: "http://localhost:8000/api/pusher/auth",
    });


if (type==='student') {
  var Gchannel = pusher.subscribe("Groups");
  const Gevent1 = 'MaxMembers'
  const Gevent2 = 'MaxChoices'
  const Gevent3 = 'GroupCreated'
  const Gevent4 = 'GroupDeleted'
  const Gevent5 = 'added'
  const Gevent6 = 'invited'
  const Gevent7 = 'kicked'
  const Uevent = 'chgpass'
}
if (type==='teacher') {
  var Pchannel = pusher.subscribe("projects");
  const Pevent1 = 'projectapprouved'
  const Pevent2 = 'projectcreated'
  const Pevent3 = 'projectupdated'
  const Pevent4 = 'projectdeleted'
}

  channel.bind(Gevent1, function(data) {
    return toast({
      type: "info",
      icon: "info",
      title: data.title,
      description: data.body,
      time: 5000,
    });
  });
}

export default Pusher;