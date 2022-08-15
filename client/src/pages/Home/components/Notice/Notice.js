import React from "react";
import {Routes, Route} from 'react-router-dom'
import NoticeList from './NoticeList'
import NoticeRegister from './NoticeRegister'
import NoticeDetail from './NoticeDetail'

function main() {
  return (
  <div>
    <Routes>
      <Route path="" element={<NoticeList />} />
      <Route path="register" element={<NoticeRegister />} />
      <Route path="/:noticeNo" element={<NoticeDetail />} />
    </Routes>
  </div>);
}

export default main;
