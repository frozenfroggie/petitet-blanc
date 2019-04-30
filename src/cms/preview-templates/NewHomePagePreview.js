import React from 'react'
import PropTypes from 'prop-types'
import { NewHomePageTemplate } from '../../templates/new-home-page'

const NewHomePagePreview = ({ entry, widgetFor }) => (
  <NewHomePageTemplate
    id={entry.getIn(['data', 'id'])}
    image={entry.getIn(['data', 'image'])}
    title={entry.getIn(['data', 'title'])}
    description={entry.getIn(['data', 'description'])}
    galleryImages={entry.getIn(['data', 'galleryImages'])}
  />
)

NewHomePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default NewHomePagePreview
