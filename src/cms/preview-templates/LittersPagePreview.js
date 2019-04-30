import React from 'react'
import PropTypes from 'prop-types'
import { LittersPageTemplate } from '../../templates/litters-page'

const LittersPagePreview = ({ entry, widgetFor }) => (
  <LittersPageTemplate
    id={entry.getIn(['data', 'id'])}
    title={entry.getIn(['data', 'title'])}
    parents={entry.getIn(['data', 'parents'])}
    birthDate={entry.getIn(['data', 'birthDate'])}
    galleryImages={entry.getIn(['data', 'galleryImages'])}
    image={entry.getIn(['data', 'image'])}
    puppies={entry.getIn(['data', 'puppies'])}
  />
)

LittersPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default LittersPagePreview
