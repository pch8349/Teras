import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { getNoticeDetail } from '../../../../api/notice'
import { errorAlert } from '../../../../modules/alert';
import { FileIcon, defaultStyles } from "react-file-icon";


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
    const [fileUrl, setFileUrl] = useState("");
    const [data, setData] = useState({
        noticeNo: "",
        title: "",
        content: "",
        uuid: "",
        createDate: "",
        userId: "",
    });

    useEffect(() => {
        let noticeUserId = "";

        getNoticeDetail(params.noticeId)
        .then((res) => {
            noticeUserId = res.data.notice.userId;
            setData(res.data.notice);
          })
          .catch((e) => {
            if (e.response.status === 401) {
              errorAlert(401);
            } else {
              errorAlert(e.response.status, "공지사항을 불러오지 못했습니다.");
            }
            Navigate("../");
        })
    });


  return (
    <div>
        <title>{data.title}</title>
        <div>{data.userId}</div>
        <div>{data.files}</div>
        <content>{data.content}</content>
      <FileContainer>
        <div className="desc">첨부파일</div>
        {!isLoading && Object.keys(data.files).length > 0 && (
          <div className="fileList">
            {Object.entries(data.files).map((item) => (
              <div className="fileItem" key={item[1]}>
                <div className="icon" value={item[1]}>
                  <FileIcon
                    extension={makeExtension(item[0])}
                    {...defaultStyles[makeExtension(item[0])]}
                  />
                </div>
                <button className="file" onClick={onDownload} value={item[1]}>
                  {item[0]}
                </button>
              </div>
            ))}
          </div>
        )}
      </FileContainer>
    </div>
  )
}

export default NoticeDetail