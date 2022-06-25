import styled from "styled-components";

export const Button = styled.button`
   background: ${(props) => (props.primary ? "palevioletred" : "white")};
   color: ${(props) => (props.primary ? "white" : "palevioletred")};
   font-size: 1em;
   padding: 0.25em 1em;
   border: 2px solid palevioletred;
   border-radius: 3px;
`;
export const DeleteButton = styled.button`
   background: ${(props) => (props.primary ? "#FF5C5C" : "white")};
   color: ${(props) => (props.primary ? "white" : "#FF5C5C")};
   font-size: 1em;
   padding: 0.25em 1em;
   border: 2px solid #ff5c5c;
   border-radius: 3px;
   margin-right: 5px;
   margin-left: 5px;
`;
export const AddButton = styled.button`
   background: ${(props) => (props.primary ? "palevioletred" : "white")};
   color: ${(props) => (props.primary ? "white" : "palevioletred")};
   font-size: 1em;
   padding: 0.25em 1em;
   border: 2px solid palevioletred;
   border-radius: 3px;
   margin: 0px 5px 10px 5px;
`;
export const EditButton = styled.button`
   background: ${(props) => (props.primary ? "#01949A" : "white")};
   color: ${(props) => (props.primary ? "white" : "#01949A")};
   font-size: 1em;
   padding: 0.25em 1em;
   border: 2px solid #01949a;
   border-radius: 3px;
   margin-right: 5px;
   margin-left: 5px;
`;

export const ErrorDisplay = styled.div`
   color: red;
`;

export const MutedText = styled.div`
   color: #6c757d;
   font-size: small;
`;
export const FormTitle = styled.h3`
   color: palevioletred;
   text-align: center;
   margin: 1em;
`;

export const Card = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   min-width: 0;
   word-wrap: break-word;
   background-color: #fff;
   background-clip: border-box;
   border: 1px solid rgba(0, 0, 0, 0.125);
   border-radius: 0.25rem;
   margin: 10px 0px 10px 0px;
   padding: 10px 0px 10px 0px;
`;
