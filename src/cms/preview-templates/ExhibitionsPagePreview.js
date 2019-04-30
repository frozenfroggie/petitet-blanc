import React from 'react'
import PropTypes from 'prop-types'
import { ExhibitionsPageTemplate } from '../../templates/exhibitions-page'

const ExhibitionsPagePreview = ({ entry, widgetFor }) => (
  <ExhibitionsPageTemplate
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

ExhibitionsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ExhibitionsPagePreview
