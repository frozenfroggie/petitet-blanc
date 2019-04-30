import React from 'react'
import PropTypes from 'prop-types'
import { NewHomePageTemplate } from '../../templates/new-home-page'

const NewHomePagePreview = ({ entry, widgetFor }) => (
  <NewHomePageTemplate
    title={entry.getIn(['data', 'title'])}
    lineage={entry.getIn(['data', 'lineage'])}
    galleryImages={entry.getIn(['data', 'galleryImages'])}
    image={entry.getIn(['data', 'image'])}
    officialName={entry.getIn(['data', 'officialName'])}
    homeName={entry.getIn(['data', 'homeName'])}
    gender={entry.getIn(['data', 'gender'])}
    birthDate={entry.getIn(['data', 'birthDate'])}
    achievements={entry.getIn(['data', 'achievements'])}
    tags={entry.getIn(['data', 'tags'])}
  />
)

NewHomePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default NewHomePagePreview
