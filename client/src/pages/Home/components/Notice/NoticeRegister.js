import React, {createRef, useCallback, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { registerNotice  } from '../../../../api/notice'
import styled from 'styled-components';
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import Dropzone from "react-dropzone";
import { FileIcon, defaultStyles } from "react-file-icon";
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from 'components/Button/Button';

const RegisterContainer = styled.div`
  margin: 3rem 5rem;
`

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid #349466;
  margin-bottom: 1rem;
  height: 60px;
  background-color: #EDFFE7;
  justify-content: space-evenly;
  select {
    width: 10rem;
    border: none;
    padding: 1rem 0.5rem;
    font-size: 1rem;
  }
  input {
    width: 80%;
    border: 1px solid #dadde6;
    height: 40px;
    font-size: 1.2rem;
    margin-top: 8px;
    placeholder: '제목을 입력해주세요';
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


function NoticeRegister() {
  const editorRef = createRef();
  const Navigate = useNavigate();
  const [files, setFiles] = useState({
    files: null,
    uuid: "",
  })
  const [data, setData] = useState({
    title: "",
    content: "",
    uuid: "",
  })

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = () => {
    data.content= editorRef.current.getInstance().getHTML();

    // api요청에 data 실어서 보내기 (header값 필요하면 header 처리해서)
    registerNotice(data).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: '공지사항 등록에 성공하였습니다.',
      })
      Navigate("/notice");
    })
    .catch((e) => {
      Swal.fire({
        icon: 'error',
        title: `${e.response.status} Error`,
        text: '공지사항 등록에 실패하였습니다.',
      })
    });
  };
  

  const onCancel = () => {
      Navigate("../")
    }


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
    axios.defaults.baseURL = "http://i7a706.p.ssafy.io:8080/";
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
      <h5>제목</h5>
        <label for='title'></label>
        <input id='title' name='title' value = {data.title} onChange={onChange}></input>
      </InputContainer>
      {/* 내용 */}
      <label for='content'></label>
      <Editor 
        id="content"
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

export default NoticeRegister