import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'
import Aside from '../../components/Aside'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section className="section" style={{marginBottom: '-100vh'}}>
          <div className="container" style={{zIndex: 99, position: 'relative', top: 100}}>
            <div className="content">
              <div className="columns">
                <div className="column is-9">
                  <BlogRoll />
                </div>
                <div className="column is-3">
                  <Aside />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
