import React, {createRef, useCallback, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import styled from 'styled-components';
import Dropzone from "react-dropzone";
import { FileIcon, defaultStyles } from "react-file-icon";
import { registerAssign  } from '../../../../api/assign'
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from 'components/Button/Button';

const RegisterContainer = styled.div`
  margin: 3rem 5rem;
`;

const StyledDate = styled.div`
  grid-column: span 3;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  justify-content: center;
  width:100%;
  div {
    grid-column: span 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color:#1c1c1c;
  }
  .react-datepicker-wrapper {
    width: 95%;
    grid-column: span 3;
    margin: auto;
    margin-right:0.5rem;
  }
  input {
    grid-column: span 3;
    border: 1px solid #dadde6;
    height: 40px;
    text-align: center;
    font-size: 1rem;
    margin: auto;
    border-radius:4px;
  }
`;

const StyledTitle = styled.div`
  grid-column: span 4;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  justify-content: center;
  width:100%;
  div {
    grid-column: span 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color:#1c1c1c;

  }
  input {
    padding: 0 1rem;
    grid-column: span 5;
    width:90%;
    border: 1px solid #dadde6;
    height: 40px;
    font-size: 1.2rem;
    margin: auto;
    margin-right: 1.5em;
    border-radius:4px;
  }
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid #349466;
  margin-bottom: 0.5rem;
  height: 60px;
  background-color: #EDFFE7;
  justify-content: space-evenly;
  notice {
    text-size: 1.5rem;
  }
`;


const FileContainer = styled.div`
  margin-top: 1rem;
  .dropzone {
    text-align: center;
    padding: 20px;
    border: 3px dashed #eeeeee;
    background-color: #fafafa;
    color: #bdbdbd;
  }
  .files {
    margin-top: 0.5rem;
    display: flex;
    padding: 0rem 0.5rem;
    .file {
      display: flex;
      border-radius: 5px;
      border: 1px solid #e4e4e4;
      padding: 0.2rem 0.4rem;
      margin-right: 0.5rem;
      .icon {
        width: 0.7rem;
        margin-right: 0.3rem;
      }
      .desc {
        font-size: 0.9rem;
        color: #666666;
      }
    }
  }
`;

const MyDatePicker = styled(DatePicker)`
  grid-column: span 3;
  width: 100%;
`


function AssignRegister() {
  const [endDate, setEndDate] = useState(new Date());
  const editorRef = createRef();
  const Navigate = useNavigate();
  const [files, setFiles] = useState({
    files: null,
    uuid: "",
  });
  const [data, setData] = useState({
    title: "",
    content: "",
    deadLine: "",
    uuid: null,
  });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const onCancel = () => {
    Navigate("../")
  }

  const onSubmit = () => {
    data.content= editorRef.current.getInstance().getHTML();
    data.deadLine = endDate.getFullYear() + '-' + (endDate.getMonth()+1) + '-' + endDate.getDate() + ' ' + endDate.getHours() + ':' +endDate.getMinutes() + '0'

    // api요청에 data 실어서 보내기 (header값 필요하면 header 처리해서)
    registerAssign(data).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: '과제 등록에 성공하였습니다.',
      })
      Navigate("/assign");
    })
    .catch((e) => {
      Swal.fire({
        icon: 'error',
        title: `${e.response.status} Error`,
        text: '과제 등록에 실패하였습니다.',
      })
    });
  };

  const handleDrop = useCallback(async (acceptedFiles) => {
    // 사용자가 올린 정보를 확인해야 하므로 일단 서버로 전송합니다.
    // 제목 같은 건 폼을 제출한 이후에 달아주도록 합시다.

    // 폼데이터 구성
    const formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("file", acceptedFiles[0]);
    setFiles({
      ...files,
      files: acceptedFiles.map((file) => file),
    })

    // 배포시에는 지워줘야 합니다.
    axios.defaults.baseURL = "https://i7a706.p.ssafy.io:8080/";
    await axios.post("/file/upload", formData, config).then((res) => {
      setData({
        ...data,
        uuid : res.data.uuid,
      })
    });
  }, []);

  const makeExtension = (fileName) => {
    let fileLength = fileName.length;
    let fileDot = fileName.lastIndexOf(".");
    let fileExtension = fileName.substring(fileDot +1, fileLength).toLowerCase();
    return fileExtension;
  };


  return (
    <RegisterContainer>
      {/* 제목 */}
      <InputContainer>
        <StyledTitle>
          <div className='notice'>제목</div>
          <input id='title' name='title' value = {data.title} onChange={onChange}></input>
        </StyledTitle>
        <StyledDate>
          <div>마감 시간</div>
          <MyDatePicker 
            locale={ko}
            closeOnscroll={true}
            selected={endDate} 
            onChange={date => setEndDate(date)}
            minDate = {new Date()}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            timeCaption="time"
            dateFormat="yyyy-MM-dd HH:mm"
            width="50%"
          />
        </StyledDate>
      </InputContainer>
      {/* 내용 */}
      <label for='content'></label>
      <Editor 
        name="content"
        initialValue={data.content}
        previewStyle="tab"
        height="400px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        ref={editorRef}
        />
      <FileContainer>
        <Dropzone onDrop={handleDrop} className="dropzone">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>첨부할 파일을 클릭 또는 드래그하여 올려주세요.</p>
            </div>
          )}
        </Dropzone>
        {files.files && (
          <div className="files">
            {files.files.map((file) => (
              <div key={file.name}>
                <div className="file">
                  <div className="icon">
                    <FileIcon
                      extension={makeExtension(file.name)}
                      {...defaultStyles[makeExtension(file.name)]}
                    />
                  </div>
                  <div className="desc">{file.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </FileContainer>
      
      <Button 
      name='뒤로가기'
      height='30px'
      width='100px'
      onClick={onCancel} />
      <Button 
      name='등록하기'
      height='30px'
      width='100px'
      onClick={onSubmit} />
    </RegisterContainer>
  )
}

export default AssignRegister