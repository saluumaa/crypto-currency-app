import React, {useState} from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
// import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi'
import {MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, CheckOutlined, MessageOutlined, DollarOutlined, } from '@ant-design/icons'
import { useGetcryptoDetailsQuery } from '../services/cryptoApi'

const { Title, Text } = Typography
const { Option } = Select
const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')
  const {data, isFetching} = useGetcryptoDetailsQuery(coinId)
  console.log(data)

const cryptoDetails = data?.data?.coin
const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y']
const stats = [
  {title: 'Price to USD', value: `$ ${data?.price && millify(data?.price)}`, icon: <DollarCircleOutlined />},
  {title: 'Rank', value: data?.rank, icon: <NumberOutlined />},
  {title: '24h Volume', value: `$ ${data?.volume && millify(data?.volume)}`, icon: <ThunderboltOutlined />},
  {title: 'Market Cap', value: `$ ${data?.marketCap && millify(data?.marketCap)}`, icon: <DollarOutlined />},
  {title: 'All-time-high(daily avg.)', value: `$ ${millify(data?.allTimeHigh.price)}`, icon: <TrophyOutlined />},
]
const genericStats = [
  {title: 'Number Of Markets', value: data?.numberOfMarkets, icon: <FundOutlined />},
  {title: 'Number Of Exchanges', value: data?.numberOfExchanges, icon: <MoneyCollectOutlined />},
  {title: 'Aprroved Supply', value: data?.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined />},
  {title: 'Total Supply', value: `$ ${millify(data?.totalSupply)}`, icon: <ExclamationCircleOutlined />},
  {title: 'Circulating Supply', value: `$ ${millify(data?.circulatingSupply)}`, icon: <ExclamationCircleOutlined />},
]
  if(isFetching) return 'Loading...'


  
  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name} ({cryptoDetails?.slug}) Price
          {/* {data?.data?.coin.name} ({data?.data?.coin.slug}) Price */}
        </Title>
        <p>
          {cryptoDetails?.name} live price in US dollars.
          view value statistics, market cap and supply.
        </p>
     </Col>
      <Select defaultValue="7d" 
      className="select-timeperiod" 
      placeholder="Select Time Period"
       onChange={(value) => setTimePeriod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      {/* Line Chart */}
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats of {cryptoDetails?.name}
            </p>
          </Col>
          {stats.map(({icon, title, value}) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))};
          </Col>
           <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} other Statistics
            </Title>
            <p>
              An overview showing the stats of all cryptocurrencies
            </p>
          </Col>
          {genericStats.map(({icon, title, value}) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))};
          </Col>
      </Col>

      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails?.name}
            {HTMLReactParser(`crypto ${cryptoDetails?.description}`)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails?.name} Links
          </Title>
          {cryptoDetails?.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
          </Col>
      </Col>  
  </Col>
  )
}

export default CryptoDetails