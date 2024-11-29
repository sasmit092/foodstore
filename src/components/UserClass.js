import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "Dummy Name",
        location: "BBSR",
      },
    };
    //console.log("Child Constructor")
  }

  async componentDidMount() {
    //console.log("Child Component Did Mount")
    //API calls
    const data = await fetch("https://api.github.com/users/AnishRajLord");
    const json = await data.json();

    this.setState({ userInfo: json });
    console.log(json);
  }

  componentDidUpdate(){
    console.log("Component Did Update")
  }

  componentWillUnmount(){
    console.log("Component Will Unmount")
  }

  render() {
    const { name, location } = this.state.userInfo;
    // console.log("Child Render")

    return (
      <div className="user-card">
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
      </div>
    );
  }
}

export default UserClass;