import axios from "axios";
import React, { useState } from "react";
import ThreadCard from "../components/ThreadCard";
import ThreadPage from "../pages/ThreadPage";
import UserDropdown from "../components/UserDropdown";

class GroupPage extends React.Component {
  handleThreadClick(props) {
    let clickedThread = props.id;
    this.setState({ clickedThread });
  }

  render() {
    return (
      <>
        <div className="group-page">
          <>
            <div className="group-posts">
              {ShowThread(
                this.state.threads,
                this.handleThreadClick,
                this.state.clickedThread // parent som behövs för handleThreadClick
                // 			Frågar du är du tönt
              )}
            </div>
          </>
          <div className="group-side-panel">
            <div className="group-info">
              <h3>{this.props.group.name}</h3>
              <p>{this.props.group.info}</p>
              <p>Admin: {this.props.group.admin}</p>
            </div>
            <div className="group-members">
              {RenderUsers(this.state.users, this.state.loggedInUser)}
            </div>
          </div>
        </div>
      </>
    );
  }
}

function ShowThread(threads, handleThreadClick, clickedThread) {
  if (clickedThread === 0) {
    return <>{RenderThreads(threads, handleThreadClick)}</>;
  } else {
    return <ThreadPage threadId={clickedThread} />;
  }
}

function RenderThreads(props, handleThreadClick) {
  if (props !== null) {
    let threads = Object.values(props);
    let threadList = [];
    for (let i = 0; i < threads.length; i++) {
      threadList.push(
        <ThreadCard
          thread={threads[i]}
          key={i}
          handleThreadClick={(e) => handleThreadClick(e)}
        />
      );
    }
    return threadList;
  } else return null;
}

function RenderUsers(props, loggedInUser) {
  let users = Object.values(props);
  let usersList = [];
  for (let i = 0; i < users.length; i++) {
    usersList.push(
      <UserDropdown user={users[i]} key={i} loggedInUser={loggedInUser} />
    );
  }
  return usersList;
}

export default GroupPage;
