import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getNoticeDetail } from "../../../../api/notice";
import { errorAlert } from "../../../../modules/alert";
import { FileIcon, defaultStyles } from "react-file-icon";
import { getDownloadFile, getFileName } from "../../../../api/file";
import { Viewer } from "@toast-ui/react-editor";
import Button from "components/Button/Button";

const DetailContainer = styled.div`
  padding: 3rem 5rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-front;
  .title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 20px;
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
  justify-content: flex-end;
  div {
    margin: 0 6px;
  }
  .subTitle {
    font-weight: bolder;
    color: white;
    background-color: #16995a;
    padding: 3px 7px;
    border-radius: 5px;
  }
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
  margin-bottom: 30px;
  min-height: 20rem;
  height: 480px;
  overflow: auto;
`;

const FileContainer = styled.div`
  height: 5rem;
  margin: 30px 0;
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
    uuid: "",
    fileName: "이것은 파일 이름",
  });
  const [data, setData] = useState({
    noticeNo: "",
    title: "",
    content: "",
    uuid: "",
    createdDate: "",
    userId: "",
  });

  useEffect(() => {
    if (isLoading) {
      getNoticeDetail(params.noticeNo)
        .then((res) => {
          setData(res.data.notice);
          setIsLoading(false);
          if (res.data.notice.uuid) {
            getFileName(res.data.notice.uuid).then((res) => {
              setFile(res.data);
            });
          }
        })
        .catch((e) => {
          if (e.response.status === 401) {
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
        console.log(e);
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

  const onCancle = () => {
    Navigate("../");
  };

  return (
    <DetailContainer>
      <TitleContainer>
        <div className="title">{data.title}</div>
      </TitleContainer>
      <SubContainer>
        <div className="subTitle">작성자</div> <div>{data.name}</div>
        <div className="subTitle">작성일</div>{" "}
        <div>{data.createdDate.slice(0, 10)}</div>
      </SubContainer>
      {!isLoading && (
        <BoardContainer>
          <Viewer initialValue={`${data.content}`} />
          {data.uuid && (
            <FileContainer>
              <div className="desc">첨부파일</div>
              <div className="fileList">
                <div className="fileItem">
                  <div className="icon">
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

      <Button name="목록으로" height="40px" width="150px" onClick={onCancle} />
    </DetailContainer>
  );
}

export default NoticeDetail;
