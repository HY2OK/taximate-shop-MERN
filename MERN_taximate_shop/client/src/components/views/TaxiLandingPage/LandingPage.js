/* global kakao */
import React, {useEffect, useState} from 'react'
import {FaCode} from 'react-icons/fa'
import {Card, Avatar, Col, Typography, Row} from 'antd'
import TaxiBar from '../TaxiBar/NavBar'
import axios from 'axios'
import moment from 'moment'
import styled from 'styled-components'

const SoftBox = styled.div`
    position: relative;
    background: rgb(255, 192, 0);
    border-radius: 40px;
    margin: 5px;
    padding: 20px;
    box-shadow: inset 5px 5px 15px rgba(0, 0, 0, 0.15), inset -5px -5px 15px rgba(255, 255, 255, 0.15), 5px 5px 15px rgba(0, 0, 0, 0.15),
        -5px -5px 15px rgba(255, 255, 255, 0.15);
    &::before {
        content: '';
        position: absolute;
        inset: 5px;
        background: #fff;
        border-radius: 35px;
        transition: 0.5s;
    }
    &:hover::before {
        transform: translate(-10px, -10px);
        box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.5);
    }
`

const {Title} = Typography
const {Meta} = Card

function LandingPage() {
    const [Videos, setVideos] = useState([])

    useEffect(() => {
        axios.get('/api/video/getVideos').then(response => {
            if (response.data.success) {
                console.log(response.data.videos)
                setVideos(response.data.videos)
            } else {
                alert('작성에 실패했습니다.')
            }
        })
    }, [])

    const renderCards = Videos.map((video, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <SoftBox>
                    <div style={{position: 'relative'}}>
                        <a href={`/video/${video._id}`}>
                            <img
                                src={`https://upload.wikimedia.org/wikipedia/commons/3/3f/Taxi_Icon.png`}
                                style={{
                                    width: '100px',
                                    margin: 'auto',
                                    display: 'block',
                                }}
                            />
                            <div style={{textAlign: 'center', margin: '10px 0 10px', color: '#333'}}>
                                {video.StartLocation} -&#62; {video.EndLocation}
                            </div>
                            <Meta avatar={<Avatar src={video.writer.image} />} title={video.writer.name} />
                            <span style={{textAlign: 'center', margin: 'auto', color: '#333'}}>
                                {' '}
                                {moment(video.MeetTime).format('YYYY년 MM월 D일 hh:mm 예정')}
                            </span>
                        </a>
                    </div>
                </SoftBox>
            </Col>
        )
    })

    return (
        <div style={{minHeight: '100vh' /* , backgroundColor: '#FFE699' */}}>
            <TaxiBar />
            <div
                style={{
                    width: '85%',
                    margin: '3rem auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div style={{fontSize: '2.5rem' /* color: 'rgb(24,144,255)' */}}> Taxi Mate </div>
                <Row>{renderCards}</Row>
            </div>
        </div>
    )
}

export default LandingPage
