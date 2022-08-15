import React, {useEffect, useCallback, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { errorAlert, successAlert } from '../../../../modules/alert';
import { FileIcon, defaultStyles } from "react-file-icon";
import { getDownloadFile, postDownloadFile } from '../../../../api/file';
import { Viewer } from '@toast-ui/react-editor';
import Button from '../../../../components/Button/Button';
import { TextField } from '@mui/material';
import { submitAssign, getAssignDetail } from '../../../../api/assign';
import axios from 'axios';
import Dropzone from "react-dropzone";

const DetailContainer = styled.div`
  padding: 3rem 5rem;
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
`;

const TitleContainer = styled.div`
  .title {
    font-size: 2.5rem;
    font-weight: 600;
  }
  .code {
    font-size: 1rem;
    font-weight: 300;
    color: ${({ theme }) => theme.textColor};
  }
`;

const BoardContainer = styled.div`
  border: 1px solid #dadde6;
  box-sizing: border-box;
  width: 100%;
  padding: 0 3rem;
  border-radius: 5px;
  margin-top: 0.5rem;
  min-height: 20rem;
`;

const FileContainer = styled.div`
  height: 5rem;
  margin-top: 2rem;
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

const CommentContainer = styled.div`
  height: 5rem;
  margin-top: 2rem;
`;

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
    uuid:"",
  });
  const [commentData, setCommentData] = useState({
    content: "",
    uuid: "",
    assignNo: "",
  });
  const [data, setData] = useState({
      assignNo: "",
      title: "",
      content: "",
      uuid: "",
      subjectName: "",
      createDate: "",
      name: "",
      deadLine: "",
  });

  useEffect(() => {
    if (isLoading) {
      getAssignDetail(params.assignNo)
      .then((res) => {
        setData(res.data.assign);
        setIsLoading(false);
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
    setData({
      ...commentData,
      [e.target.name]: e.target.value,
    })
  };

  const onDownload = () => {
    file.uuid = data.uuid
    console.log(file)
    postDownloadFile(file).then((res)=> {
      console.log(res)
      window.open(res)
    }).catch((e) => {
      alert("다운로드에 실패하였습니다.")
    });
  };

  const onSubmit = () => {
    setCommentData({
      ...commentData,
      assignNo: data.assignNo,
    })

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
    <TitleContainer>{data.subjectName} {data.title} {data.deadLine}</TitleContainer>
      <div>{data.name}</div>
      {!isLoading && (
      <BoardContainer>
          <Viewer initialValue={`${data.content}`} />
      </BoardContainer>
      )}
    {data.uuid && (
      <FileContainer>
        <div className="desc" onClick={onDownload}>첨부파일</div>
      </FileContainer>
    )}
    <CommentContainer>
      <TextField 
        name="content"
        value={commentData.content}
        variant="outlined"
        defaultValue='내용을 입력해주세요.'
        multiline
        fullWidth
        color="success"
        onChange={onChange}
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
      </FileContainer>
      <Button 
        name='제출하기'
        onClick={onSubmit}
      />
    </CommentContainer>
    <Button 
      name='목록보기'
      onClick={()=> Navigate("../")}
      />
  </DetailContainer>
  )
}

export default AssignDetail