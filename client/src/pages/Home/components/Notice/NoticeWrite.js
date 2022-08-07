import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { registerNotice } from '../../../../api/notice'
import { errorAlert, successAlert } from '../../../../modules/alert'
import styled from 'styled-components';
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import Dropzone from "react-dropzone";
import { FileIcon, defaultStyles } from "react-file-icon";
import { uploadFile } from "../../../../api/file";


const InputContainer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid #dadde6;
  select {
    width: 10rem;
    border: none;
    padding: 1rem 0.5rem;
    font-size: 1rem;
  }
  input {
    width: 100%;
    border: none;
    padding: 1rem 0.5rem;
    font-size: 1.2rem;
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


function NoticeWrite() {
  const Navigate = useNavigate()
  const [data, setData] = useState({
    title: "",
    content: "",
    uuid: null,
  })
  const [files, setFiles] = useState(null)

  const onChange = (e) => {
    const {name, value} = e.target
    setData({
      ...data,
      [name]:value,
    })
  }

  const onSubmit = () => {
    if (files) {
      uploadFile(files).then(res).catch((e) => {
        if (e.response.status === 401) {
          errorAlert(401);
        } else {
          errorAlert(e.response.status, "글 등록에 실패하였습니다.");
        }
      });
      data.uuid = res.data.uuid
      registerNotice(data).then(() => {
        successAlert("글 등록에 성공하였습니다.");
        Navigate("/notice");
      })
      .catch((e) => {
        if (e.response.status === 401) {
          errorAlert(401);
        } else {
          errorAlert(e.response.status, "글 등록에 실패하였습니다.");
        }
      });
    } else {
          // api요청에 data 실어서 보내기 (header값 필요하면 header 처리해서)
          registerNotice(data).then(() => {
            successAlert("글 등록에 성공하였습니다.");
            Navigate("/notice");
          })
          .catch((e) => {
            if (e.response.status === 401) {
              errorAlert(401);
            } else {
              errorAlert(e.response.status, "글 등록에 실패하였습니다.");
            }
          });
    };
  }

  const onCancel = () => {
      Navigate("../")
    }

  const handleDrop = (acceptedFiles) => {
    setFiles({
      ...files,
      files: acceptedFiles.map((file) => file),
    });
  };

  const makeExtension = (fileName) => {
    let fileLength = fileName.length;
    let fileDot = fileName.lastIndexOf(".");
    let fileExtension = fileName.substring(fileDot +1, fileLength).toLowerCase();
    return fileExtension;
  };


  return (
    <div>
      <h2>공지사항 작성하기</h2>
      {/* 제목 */}
      <InputContainer>
        <label for='title'></label>
        <input id='title' onChange={onChange}></input>
      </InputContainer>
      {/* 내용 */}
      <InputContainer>
        <label for='content'></label>
        <Editor 
        id='content' 
        onChange={onChange}
        ></Editor>
      </InputContainer>
      <FileContainer>
        <Dropzone onDrop={handleDrop} className="dropzone">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>첨부할 파일을 클릭 또는 드래그하여 올려주세요.</p>
            </div>
          )}
        </Dropzone>
        {files && (
          <div className="files">
            {files.map((file) => (
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

      <button onClick={onCancel}>뒤로가기</button>
      <button onClick={onSubmit}>등록하기</button>
    </div>
  )
}

export default NoticeWrite