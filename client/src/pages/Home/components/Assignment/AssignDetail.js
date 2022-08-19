import React, {useEffect, useCallback, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { errorAlert, successAlert } from '../../../../modules/alert';
import { FileIcon, defaultStyles } from "react-file-icon";
import { getDownloadFile, getFileName, postDownloadFile } from '../../../../api/file';
import { Viewer } from '@toast-ui/react-editor';
import Button from '../../../../components/Button/Button';
import { TextField } from '@mui/material';
import { submitAssign, getAssignDetail } from '../../../../api/assign';
import axios from 'axios';
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { selectUser } from "storage/UserSlice";

const DetailContainer = styled.div`
  box-sizing: border-box;
  width: 800px;
  height: 600px;
  margin-top: 50px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-front;
  .notice {
    font-size:1.5rem;
    color:#349466;
  }
  .title {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .code {
    font-size: 1rem;
    font-weight: 300;
    color: ${({ theme }) => theme.textColor};
  }
`;

const SubContainer = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid #dadde6;
  border-bottom: 1px solid #dadde6;
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 3rem;
  border-radius: 5px;
  margin-top: 0.5rem;
  min-height: 20rem;
  height: 250px;
  overflow: auto;
`;

const FileContainer = styled.div`
  height: 5rem;
  margin: 1rem 0;
  .desc {
    font-size: 1.2rem;
    padding-left: 0.5rem;
  }
  .fileList {
    margin-top: 1rem;
    padding: 0.5rem 2.5rem;
    border: 1px solid #dadde6;
    border-radius: 5px;
    .fileItem {
      display: flex;
      height: 1.5rem;
      align-items: center;
      .icon {
        width: 1rem;
        margin-right: 0.2rem;
      }
      .file {
        cursor: pointer;
        display: block;
        background-color: white;
        border: none;
        color: #555555;
        &:hover {
          color: #000000;
        }
      }
    }
  }
`;

const CommentFileContainer = styled.div`
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

const CommentContainer = styled.div`
  height: 5rem;
  margin-top: 2rem;
`;

const Buttondiv = styled.div`
  margin-top: 90px;
`

function AssignDetail() {
  const Navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isFileLoading, setIsFileLoading] = useState(true);
  const [commentFile, setCommentFile] = useState({
    files: null,
    uuid:"",
  });
  const [file, setFile] = useState({
    fileName:"이것은파일",
    uuid:"",
  });
  const [commentData, setCommentData] = useState({
    content: "",
    uuid: null,
    assignNo: "",
  });
  const [data, setData] = useState({
      assignNo: "",
      title: "",
      content: "",
      uuid: "",
      subjectName: "",
      createdDate: "",
      name: "",
      deadLine: "",
  });
  const user = useSelector(selectUser);

  useEffect(() => {
    if (isLoading) {
      getAssignDetail(params.assignNo)
      .then((res) => {
        setData(res.data.assign);
        setIsLoading(false);
        if (res.data.assign.uuid) {
          getFileName(res.data.assign.uuid).then((res)=>{setFile(res.data)})
        }
      })
      .catch((e) => {
        if (e.response.status === 401) {
          errorAlert(401);
        } else {
          errorAlert(e.response.status, "과제를 불러오지 못했습니다.");
        }
        Navigate("../");
        return () => {
          setIsLoading(false);
        };
      });
    }
  }, [isLoading]);


  // useEffect(() => {
  //   console.log(data.uuid)
  //   if (data.uuid) {
  //     getDownloadFile(data.uuid)
  //     .then((res) => {
  //       console.log(res);
  //       setFile(res.data);
  //       setIsFileLoading(false);
  //     })
  //     .catch((e) => {
  //       if (e.response.status == 401) {
  //         errorAlert(401);
  //       } else {
  //         errorAlert(e.response.status, "파일을 불러오지 못했습니다.");
  //       }
  //       Navigate("../");
  //       return () => {
  //         setIsFileLoading(false);
  //       };
  //     })
  //   } else {
  //     setIsFileLoading(false);
  //   }
  // }, [isFileLoading]);

  const onChange = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    })
  };

  const onDownload = () => {
    file.uuid = data.uuid;
    getDownloadFile(file.uuid)
      .then((res) => {
        const blob = new Blob([res.data]);
        const fileObjectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = fileObjectUrl;
        link.style.display = "none";
        link.download = `${file.fileName}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(fileObjectUrl);
      })
      .catch((e) => {
        alert("다운로드에 실패했습니다.");
      });
  };

  const onSubmit = () => {
    commentData.assignNo = data.assignNo;
    submitAssign(commentData)
    .then(() => {
      successAlert("글 등록에 성공하였습니다.");
      Navigate("/assign");
    })
    .catch( (e) => {
      if (e.response.status === 401) {
        errorAlert(401);
      } else {
        errorAlert(e.response.status, "과제 제출에 실패하였습니다.");
      }
    })
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
    setCommentFile({
      ...commentFile,
      files: acceptedFiles.map((file) => file),
    })

    // 배포시에는 지워줘야 합니다.
    axios.defaults.baseURL = "http://i7a706.p.ssafy.io:8080/";
    await axios.post("/file/upload", formData, config).then((res) => {
      setCommentData({
        ...commentData,
        uuid : res.data.uuid,
      })
    });
  }, []);

  const makeExtension = (fileName) => {
    let fileLength = fileName.length;
    let fileDot = fileName.lastIndexOf(".");
    let fileExtension = fileName
      .substring(fileDot + 1, fileLength)
      .toLowerCase();
    return fileExtension;
  };

  return (
  <DetailContainer>
    <TitleContainer>
      <div className='notice'>[{data.subjectName}]</div> 
      <div className='title'>{data.title}</div>
    </TitleContainer>
    <SubContainer>
      <div>{data.name}</div>
      <div>기한 : {data.createdDate.slice(0,16)} - {data.deadLine}</div>
    </SubContainer>
      
      {!isLoading && (
      <BoardContainer>
          <Viewer initialValue={`${data.content}`} />
          {data.uuid && (
            <FileContainer>
              <div className="desc">첨부파일</div>
                <div className="fileList">
                  <div className="fileItem">
                    <div className="icon" >
                      <FileIcon
                        extension={makeExtension(file.fileName)}
                        {...defaultStyles[makeExtension(file.fileName)]}
                      />
                    </div>
                    <button className="file" onClick={onDownload}>
                      {file.fileName}
                    </button>
                </div>
              </div>
            </FileContainer>
            )}
      </BoardContainer>
      )}
    {user.authority === "STUDENT" && (
    <CommentContainer>
      <div>과제 제출하기</div>
      <label for='comment'></label>
      <TextField 
        id="comment"
        value={commentData.content}
        name="content"
        variant="outlined"
        multiline
        fullWidth
        color="success"
        onChange={onChange}
      />
      <CommentFileContainer>
        <Dropzone onDrop={handleDrop} className="dropzone">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>첨부할 파일을 클릭 또는 드래그하여 올려주세요.</p>
            </div>
          )}
        </Dropzone>
        {commentFile.files && (
          <div className="files">
            {commentFile.files.map((file) => (
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
      </CommentFileContainer>

    </CommentContainer>
    )}
    <Buttondiv>
    {user.authority === "STUDENT" && (
      <Button 
        height='30px'
        width='100px'
        name='제출하기'
        onClick={onSubmit}
      />)}
      <Button 
        height='30px'
        width='100px'
        name='목록'
        onClick={()=> Navigate("../")}
      />
    </Buttondiv>

  </DetailContainer>
  )
}

export default AssignDetail