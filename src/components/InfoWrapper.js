import React from 'react';

const InfoWrapper = ({ children }) => {
  return (
    <section className="section section--gradient" style={{marginBottom: '-100vh'}}>
      <div className="container" style={{zIndex: 99, marginTop: 130}}>
        <div className="columns">
          <div className="column is-12">
            <div className="dogs-container columns is-multiline" style={{ marginBottom: '2rem' }}>
            {
              children
            }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoWrapper
