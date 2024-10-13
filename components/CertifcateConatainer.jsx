import React from 'react';
import Image from 'next/image';

const CertifcateConatainer = ({ name }) => {
  return (
    <div
      id="certificate"
      style={{
        width: '794px', // A4 width (in pixels at 96 DPI)
        height: '1123px', // A4 height (in pixels at 96 DPI)
        margin: '0 auto',
        padding: '20px',
        border: '10px solid #ddd',
        backgroundColor: 'white', // Set white backgroun
        fontFamily: 'serif',
        position:"absolute",
        top:"-5000px"
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          border: '5px solid #aaa',
          padding: '30px',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {/* Logo and Header */}
        <div className="flex items-center justify-center gap-6" style={{ marginBottom: '40px' }}>
          <Image src="/assets/white logo.png" width={100} height={100} alt="logo" />
          <div>
            <h1 style={{ fontSize: '20px', color: 'blue',textAlign:"center" }}>PHILIPPINE RED CROSS</h1>
            <h2 style={{ fontSize: '20px', color: 'blue',textAlign:"center" }}>CAVITE CHAPTER</h2>
            <h2 style={{ fontSize: '18px', color: 'red',textAlign:"center" }}>DASMARIÑAS CITY BRANCH</h2>
            <div className='flex flex-col items-center'>
              <p className="text-blue-600" style={{ fontSize: '16px',textAlign:"center" }}>
                Ground Floor, Units 2 & 3, Amada Building
              </p>
              <p className="text-blue-600" style={{ fontSize: '16px',textAlign:"center" }}>
                Emilio Aguinaldo Highway, Barangay Zone IV, Dasmariñas Cavite City
              </p>
              <p className="text-blue-600" style={{ fontSize: '16px',textAlign:"center" }}>Tel No. (046) 4026267</p>
              <p className="text-blue-600" style={{ fontSize: '16px',textAlign:"center" }}>
                <u>cavitedasmariñas@redcross.org.ph</u>
              </p>
            </div>
          </div>
        </div>

        {/* Certification Section */}
        <div style={{ marginTop: '80px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '18px', fontSize: '25',fontWeight:"bold" }}>CERTIFICATION</h2>
          <div style={{  textAlign: 'justify' }}>
           <h2 style={{ textAlign: 'left', marginBottom: '10px', fontSize: '13',fontWeight:"bold" }}>TO WHOM MAY IT CONCENRN:</h2>
            <p style={{fontSize:"16px",lineHeight:2,marginTop:10,textIndent:"100px"}}>
              This is to certify that <strong>{name.toUpperCase() || 'Sample Name'}</strong> graduated in{' '}
              <strong>STANDARD FIRST AID AND BLS CPR / AED TRAINING</strong> conducted on ___________________ at
              Philippine Red Cross Dasmariñas City Branch, G/F Units 2 & 3 Amada Building, Emilio Aguinaldo Highway, Barangay Zone IV, Dasmariñas Cavite City, and <strong>PASSED</strong> the evaluating examination given on ____________________.
              The training was conducted under the supervision of Mr. Fernando B. Camacho Jr. and Loida D. Rivera, RN.
            </p>
            <p style={{ marginTop: '20px',fontSize:"16px",textIndent:"100px" }}>
              This certification is being issued for <strong>reference</strong> purposes and shall be valid up to
              ___________________ only.
            </p>
          </div>
        </div>

        {/* Signature Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '100px' }}>
          <div>
            <p style={{fontSize:"16px",fontWeight:"900"}}><strong>GARY C. SANTOS, AEMT</strong></p>
            <p style={{fontSize:"16px"}}>BRANCH HEAD</p>
            <p style={{fontSize:"16px"}}>Philippine Red Cross</p>
            <p style={{fontSize:"16px"}}>Cavite Chapter - Dasmariñas City</p>
          </div>
          <div>
            <p style={{fontSize:"16px",fontWeight:"900"}}><strong>ADELINA B. CASTILLO, RN</strong></p>
            <p style={{fontSize:"16px"}}>CHAPTER ADMINISTRATOR</p>
            <p style={{fontSize:"16px"}}>Philippine Red Cross</p>
            <p style={{fontSize:"16px"}}>Cavite Chapter</p>
          </div>
        </div>

       
      </div>

      <div className='w-full h-[50px] p-10 flex items-center absolute bg-red-600 bottom-0 left-0'>
      <p style={{fontSize:"25px",color:"white"}}><i> Always First, Always Ready, Always There!</i></p>
      </div>
     
    </div>
  );
};

export default CertifcateConatainer;
