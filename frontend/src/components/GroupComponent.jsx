import axios from 'axios';
import React, { Component } from 'react';

export default class GroupComponent extends Component {
constructor(props){
    super(props);
    this.state = {
        user_id : "W5jdoeOwwz25Zvf7aMSJ",
        group: [],
        token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQwMTU0NmJkMWRhMzA0ZDc2NGNmZWUzYTJhZTVjZDBlNGY2ZjgyN2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3Rhc2EtZGEzZDUiLCJhdWQiOiJzdGFzYS1kYTNkNSIsImF1dGhfdGltZSI6MTY0MjY4ODIxNSwidXNlcl9pZCI6InJZNHRUS2VEQUViRkhReXZRUUhiNXBIbXllVjIiLCJzdWIiOiJyWTR0VEtlREFFYkZIUXl2UVFIYjVwSG15ZVYyIiwiaWF0IjoxNjQyNjg4MjE1LCJleHAiOjE2NDI2OTE4MTUsImVtYWlsIjoibWFydGluLncuam9uc3NvbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWFydGluLncuam9uc3NvbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.ibAUW1_bf1cdkf_WZOIx4mlSsyK5rnrzWv4N0SQV2QKf0Jq8CqhyTQhQHb3h3LvXsXKF1ZuMsLXKXnubU_FRE9jnZgLDXXI_LLP3EGJvn870Bl0HSIS6_QI4yZmSc1-UUsSrD68X_9lDzbdiGM-ccA0x1bXFzbrc_xovKPbbbYSfUULWgMVVlc2VcfXT9vNScu7n6_G9vVGm6_mgiaSzuUEt5CU16_heF0DLi4oVr4KvS8b47iwPLx2EgS13lV7Maz8UcbgeKwmKVaMqpJg81tWvgy9JBKdfH7fVKf6BkpQEc-OmtwjmD0Unl0_X0qy0QpLG0x7Z-D7CZOG9EIJowA"
    }
}


    componentDidMount(){

        axios({
            method: "GET",
            url: ("localhost:8080/groups/getforusers?user=" + this.state.user_id),
            headers: {Authorization: "Bearer " + this.state.token}

        })
    }

  render() {

    return <div>Groups list</div>;
  
}
}
