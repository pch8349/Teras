import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  width: 120px;
  text-align: center;
  justify-content: center;
  border: solid 1px #000;
  box-shadow: 2px 2px #525252;
  border-radius: 5px;
  margin-top: 15px;
  .image {
    width: 50px;
    height: 50px; 
    border-radius: 70%;
    overflow: hidden;
    margin-left: 35px;
  }
  .name {
    text-size: 1.5rem;
    margin-top: 15%;
  }
`

function MyClassItem({data, index}) {

  return (
    <Card>
      <div className='image'>
        <img src='https://via.placeholder.com/300x250?text=300x250+MPU' alt='' />
      </div>
      <div className='name'>{data.name}</div>
    </Card>
  )
}

export default MyClassItem