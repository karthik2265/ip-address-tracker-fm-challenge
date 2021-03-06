import React, { useState, useEffect, useRef, useCallback } from 'react'
import ipRegex from 'ip-regex'
import classes from './IPAddressInputLocationOutput.module.css'

const IPAdressInputLocationOutput = ({ setLatAndLng }) => {
  const [data, setData] = useState({
    ipAddress: '',
    location: { city: '', state: '', postalCode: '' },
    timezone: '',
    isp: '',
  })
  const [errorMsg, setErrorMsg] = useState(null)
  const inputRef = useRef()

  // utility functions
  function IPAddressIsValid(ip) {
    return (
      ipRegex({ exact: true }).test(ip) || ipRegex.v6({ exact: true }).test(ip)
    )
  }

  async function getUsersIpAddress() {
    const res = await fetch('https://api.ipify.org/?format=json')
    const data = await res.json()
    return data['ip']
  }

  const getLocation = useCallback(
    async (ipAddress) => {
      if (!IPAddressIsValid(ipAddress)) {
        setErrorMsg('Please Enter a Valid IP4 or IP6 Address')
        return
      } else setErrorMsg(null)
      try {
        let responce = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=at_OCJAADPBKbtbaZwQaA4bCcRtami2X&ipAddress=${ipAddress}`
        )
        responce = await responce.json()
        setLatAndLng([
          parseFloat(responce.location.lat),
          parseFloat(responce.location.lng),
        ])
        setData({
          ipAddress: responce.ip,
          location: {
            city: responce.location.city,
            state: responce.location.region,
            postalCode: responce.location.postalCode,
          },
          timezone: 'GMT' + responce.location.timezone,
          isp: responce.isp,
        })
      } catch {
        setErrorMsg(
          'Sorry, Error Occurred. Ran out of credits for IP Geo Location API'
        )
      }
    },
    [setLatAndLng, setData]
  )

  // effect to get users ipAdress and location on start
  useEffect(() => {
    async function startApp() {
      const userIpAddress = await getUsersIpAddress()
      getLocation(userIpAddress)
    }
    startApp()
  }, [getLocation])

  // handler functions
  function inputSubmitHandler() {
    let userInput = inputRef.current.value
    getLocation(userInput)
    inputRef.current.value = userInput
  }

  // single-use components

  const Input = () => {
    return (
      <div className={classes['input-control']}>
        <input
          placeholder='Search for any IP Address'
          type='text'
          ref={inputRef}
        />
        <div
          className={classes['submit-button']}
          onClick={inputSubmitHandler}
        />
      </div>
    )
  }

  const Output = () => {
    return (
      <div className={classes['output-box']}>
        {errorMsg ? (
          <h1>{errorMsg}</h1>
        ) : (
          <>
            <div className={classes['output-card']}>
              <p className={classes['output-header']}>IP ADDRESS</p>
              <p className={classes['output-info']}>{data.ipAddress}</p>
            </div>
            <div className={classes['output-card']}>
              <p className={classes['output-header']}>LOCATION</p>
              <p className={classes['output-info']}>
                <span className={classes['output-info-state-and-city']}>
                  {data.location.city + ',' + data.location.state}
                </span>
                <span className={classes['output-info-postal-code']}>
                  {data.location.postalCode}
                </span>
              </p>
            </div>
            <div className={classes['output-card']}>
              <p className={classes['output-header']}>TIMEZONE</p>
              <p className={classes['output-info']}>{data.timezone}</p>
            </div>
            <div className={classes['output-card']}>
              <p className={classes['output-header']}>ISP</p>
              <p className={classes['output-info']}>{data.isp}</p>
            </div>
          </>
        )}
      </div>
    )
  }
  return (
    <div className={classes['main']}>
      <h1>IP Address Tracker</h1>
      <Input />
      <Output />
    </div>
  )
}

export default IPAdressInputLocationOutput
