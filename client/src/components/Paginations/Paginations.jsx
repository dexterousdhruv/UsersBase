import React from 'react'
import { Pagination } from "antd";

const Paginations = ({ page, pageCount, setPage }) => {
  
  return (
    <>
     <Pagination align="end" current={page} onChange={(page) => setPage(page)}  total={pageCount * 10} />
    </>
  )
}

export default Paginations