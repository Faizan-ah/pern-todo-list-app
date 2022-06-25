import React, { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getTodoCount } from "../actions/actions";
import { connect } from "react-redux";
import { FormTitle } from "../styledComponents/general";

ChartJS.register(ArcElement, Tooltip, Legend);

const Wrapper = styled.div`
   height: 50vh;
   width: 50vh;
   margin-left: auto;
   margin-right: auto;
   margin-top: 10px;
`;
const NoTodos = styled.h3`
   font-weight: bolder;
   text-align: center;
   margin-top: 10px;
`;
const View = (props) => {
   const { dispatch, todo } = props;
   const [completed, setCompleted] = useState(0);
   const [notCompleted, setNotCompleted] = useState(0);
   const [firstTime, setFirstTime] = useState(true);

   useEffect(() => {
      if (completed === 0 && notCompleted === 0 && firstTime) {
         dispatch(getTodoCount());
         setFirstTime(false);
      }
      if (todo !== null && completed === 0 && notCompleted === 0) {
         setCompleted(todo.completedTodos);
         setNotCompleted(todo.notCompletedTodos);
      }
   }, [todo]);
   const data = {
      labels: ["Completed", "Not Completed"],
      datasets: [
         {
            label: "progress",
            data: [completed, notCompleted],
            backgroundColor: [
               "rgba(75, 192, 192, 0.2)",
               "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
            borderWidth: 1,
         },
      ],
   };
   return (
      <Fragment>
         <Header />
         <FormTitle>Your Progress</FormTitle>

         {completed === 0 && notCompleted === 0 ? (
            <NoTodos>Complete Todos to see progress</NoTodos>
         ) : (
            <Wrapper>
               <Pie data={data} />
            </Wrapper>
         )}
      </Fragment>
   );
};
const mapStateToProps = (state) => {
   const { todo } = state.getTodoCount;
   return {
      todo,
   };
};
export default connect(mapStateToProps)(View);
