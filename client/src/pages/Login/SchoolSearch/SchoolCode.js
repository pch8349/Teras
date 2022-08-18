import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import searchIcon from "assets/img/search-solid.png";
// import searchIconHover from "assets/img/search-solid-hover.png";
import SchoolCodeList from "./SchoolCodeList";

const SchoolCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .desc {
    font-size: 1.3rem;
    margin: 1rem;
  }
  .line {
    background: #000000;
    width: 100vw;
    height: 1px;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 3.5rem;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1.2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border: none;
    &:focus {
      outline: none;
    }
  }
  .searchBtn {
    background-position: 5px center;
    height: 58px;
    width: 70px;
    background-color: #555555;
    border: none;
    background-repeat: no-repeat;
    &:hover {
      background-color: #a1a1a1;
    }
  }
`;
// background-image: url(${searchIcon});      background-image: url(${searchIconHover});
const SchoolCode = (props) => {
  const [inputSchoolName, setInputSchoolName] = useState("");
  const [schoolName, setSchoolName] = useState("null");
  const searchElement = useRef(null);
  useEffect(() => {
    if (searchElement.current) {
      searchElement.current.focus();
    }
  }, []);

  const onChange = (e) => {
    setInputSchoolName(e.target.value);
  };

  const onSubmit = () => {
    setSchoolName(inputSchoolName);
  };

  const handleSchoolCode = (schoolData) => {
    let choiceSchoolName = schoolData.schoolName;
    let choiceSchoolCode = schoolData.schoolCode;
    props.setSchoolCode(choiceSchoolCode);
    props.setSchoolName(choiceSchoolName);
    props.setValidSchoolName(true);
    props.onClose();
  };

  return (
    <SchoolCodeContainer>
      <div className="desc">학교찾기</div>
      <InputContainer>
        <input
          placeholder="학교명을 입력해주세요. ex) 싸피 / 싸피고 / 싸피고등학교"
          defaultValue={inputSchoolName}
          onChange={(e) => onChange(e)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSubmit();
            }
          }}
          ref={searchElement}
        />
        <button className="searchBtn" onClick={(e) => onSubmit(e)}></button>
      </InputContainer>
      <div className="line" />
      <SchoolCodeList schoolName={schoolName} onComplate={handleSchoolCode} />
    </SchoolCodeContainer>
  );
};

export default SchoolCode;
