// import React, { useState, useRef, useEffect } from "react";
import { View, Text } from "react-native";

// const CountDownTime = () => {
//   // We need ref in this, because we are dealing
//   // with JS setInterval to keep track of it and
//   // stop it when needed
//   const Ref = useRef(null);

//   // The state for our timer
//   const [timer, setTimer] = useState("00:00:00");

//   const getTimeRemaining = (e) => {
//     const total = Date.parse(e) - Date.parse(new Date());
//     const seconds = Math.floor((total / 1000) % 60);
//     const minutes = Math.floor((total / 1000 / 60) % 60);
//     const hours = Math.floor((total / 1000 / 60 / 60) % 24);
//     return {
//       total,
//       hours,
//       minutes,
//       seconds,
//     };
//   };

//   const startTimer = (e) => {
//     let { total, hours, minutes, seconds } = getTimeRemaining(e);
//     if (total >= 0) {
//       // update the timer
//       // check if less than 10 then we need to
//       // add '0' at the beginning of the variable
//       setTimer(
//         (hours > 9 ? hours : "0" + hours) +
//           ":" +
//           (minutes > 9 ? minutes : "0" + minutes) +
//           ":" +
//           (seconds > 9 ? seconds : "0" + seconds)
//       );
//     }
//   };

//   const clearTimer = (e) => {
//     // If you adjust it you should also need to
//     // adjust the Endtime formula we are about
//     // to code next
//     setTimer("00:00:59");

//     // If you try to remove this line the
//     // updating of timer Variable will be
//     // after 1000ms or 1sec
//     if (Ref.current) clearInterval(Ref.current);
//     const id = setInterval(() => {
//       startTimer(e);
//     }, 1000);
//     Ref.current = id;
//   };

//   const getDeadTime = () => {
//     let deadline = new Date();

//     // This is where you need to adjust if
//     // you entend to add more time
//     deadline.setSeconds(deadline.getSeconds() + 10);
//     return deadline;
//   };

//   // We can use useEffect so that when the component
//   // mount the timer will start as soon as possible

//   // We put empty array to act as componentDid
//   // mount only
//   useEffect(() => {
//     clearTimer(getDeadTime());
//   }, []);

//   return (
// <View>
//   <Text style={{ color: "white", fontSize: 12, fontWeight: 400 }}>
//     Thời gian giữ ghế: {timer}
//   </Text>
// </View>
//   );
// };

// export default CountDownTime;

import React, { Component } from "react";

export default class Timer extends Component {
  state = {
    minutes: 15,
    seconds: 0,
  };
  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { minutes, seconds } = this.state;
    return (
      <View>
        {minutes === 0 && seconds === 0 ? (
          <Text>Busted!</Text>
        ) : (
          //   <Text>
          //     Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          //   </Text>
          <View>
            <Text style={{ color: "white", fontSize: 12, fontWeight: 400 }}>
              Thời gian giữ ghế: {minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
