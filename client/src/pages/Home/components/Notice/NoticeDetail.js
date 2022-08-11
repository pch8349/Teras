import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { getNoticeDetail } from '../../../../api/notice'
import { errorAlert } from '../../../../modules/alert';
import { FileIcon, defaultStyles } from "react-file-icon";
import { getDownloadFile, postDownloadFile } from '../../../../api/file';
import { Viewer } from '@toast-ui/react-editor';

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


function NoticeDetail() {
    const Navigate = useNavigate();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isFileLoading, setIsFileLoading] = useState(true);
    const [file, setFile] = useState({
      uuid:"",
    });
    const [data, setData] = useState({
        noticeNo: "",
        title: "",
        content: "",
        uuid: "",
        createDate: "",
        userId: "",
    });

    useEffect(() => {
      if (isLoading) {
        getNoticeDetail(params.noticeNo)
        .then((res) => {
          setData(res.data.notice);
          setIsLoading(false);
        })
        .catch((e) => {
          if (e.response.status == 401) {
            errorAlert(401);
          } else {
            errorAlert(e.response.status, "공지사항을 불러오지 못했습니다.");
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
        <TitleContainer>{data.title}</TitleContainer>
          <div>{data.userId}</div>
          {!isLoading && (
        <BoardContainer>
            <Viewer initialValue={`${data.content}`} />
        </BoardContainer>
          )}
      <FileContainer>
        <div className="desc" onClick={onDownload}>첨부파일</div>
      </FileContainer>
    </DetailContainer>
  )
}

export default NoticeDetail