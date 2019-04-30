import React from 'react'
import PropTypes from 'prop-types'
import { LittersPageTemplate } from '../../templates/litters-page'

const LittersPagePreview = ({ entry, widgetFor }) => (
  <LittersPageTemplate
    content={widgetFor('body')}
    title={entry.getIn(['data', 'title'])}
    parents={entry.getIn(['data', 'parents'])}
    birthDate={entry.getIn(['data', 'birthDate'])}
    galleryImages={entry.getIn(['data', 'galleryImages'])}
    date={entry.getIn(['data', 'date'])}
    image={entry.getIn(['data', 'image'])}
    tags={entry.getIn(['data', 'tags'])}
  />
)

LittersPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default LittersPagePreview
