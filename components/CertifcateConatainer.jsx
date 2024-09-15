import React from 'react'

const CertifcateConatainer = ({name}) => {
  return (
    <div
    id="certificate"
    style={{
      width: '770px',
      height: '570px',
      margin: '0 auto',
      padding: '20px',
      border: '10px solid #ddd',
      boxShadow: '0 0 20px rgba(0,0,0,0.15)',
      textAlign: 'center',
      backgroundColor: 'white',
      position: 'absolute',
      fontFamily: 'serif',
      top:-1000
    }}
  >
    <div
      style={{
        width: 'calc(100% - 40px)',
        height: 'calc(100% - 40px)',
        border: '5px solid #aaa',
        padding: '20px',
        position: 'absolute',
        top: '20px',
        left: '20px',
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{ fontSize: '2.5em', margin: '0' }}>Certificate of Achievement</h1>
      <p style={{ fontSize: '1.25em', marginTop: '40px' }}>This certifies that</p>
      <h2 style={{ fontSize: '2em', margin: '20px 0' }}>{name.toUpperCase() || 'Your Name Here'}</h2>
      <p style={{ fontSize: '1.25em' }}>has successfully completed the course</p>
      <p style={{ fontSize: '1.5em', fontStyle: 'italic', margin: '40px 0' }}>Red Cross Cavite Graduate</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px' }}>
        <div>
          <p>__________________________</p>
          <p>Dr. Juan Dela Cruz</p>
        </div>
        <div>
          <p>__________________________</p>
          <p>Dr. Jane Doe</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CertifcateConatainer