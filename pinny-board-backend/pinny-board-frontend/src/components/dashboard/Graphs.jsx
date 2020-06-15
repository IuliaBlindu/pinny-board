import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import { ResponsiveLine } from "@nivo/line";
class Graphs extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };
  }
  static propTypes = {
    micro: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  componentDidMount() {
    const { selectedMicro } = this.props.micro;
    const id = selectedMicro;
    const element = this.props.element;
    const body = JSON.stringify({ id, element });
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    axios
      .post("/api/connect/ElementEvents", body, config)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentWillReceiveProps() {
    const { selectedMicro } = this.props.micro;
    const id = selectedMicro;
    const element = this.props.element;
    const body = JSON.stringify({ id, element });
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    axios
      .post("/api/connect/ElementEvents", body, config)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    var { data } = this.state;
    data = data.reverse();
    const event = data.map(d => {
      var register_date = d.register_date.split("T");
      var date = register_date[0];
      date = date.substring(8, 10) + "/" + date.substring(5, 7);
      var hour = register_date[1];
      hour = hour.substring(0, 8);

      return { x: hour + " " + date, y: d.event.value };
    });

    return (
      <div style={{ height: 400 }}>
        <ResponsiveLine
          data={[
            {
              id: "Event ",
              data: event
            }
          ]}
          margin={{ top: 50, right: 10, bottom: 110, left: 30 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 0,
            max: 1,
            stacked: true,
            reverse: false
          }}
          enableGridX={false}
          curve="step"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 12,
            tickRotation: -70,
            legendOffset: 40,
            legendPosition: "middle"
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: "middle"
          }}
          colors={{ scheme: "dark2" }}
          pointSize={7}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          enableArea={true}
          areaOpacity={0.05}
          useMesh={true}
          legends={[]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  micro: state.micro,
  auth: state.auth
});

export default connect(mapStateToProps)(Graphs);
