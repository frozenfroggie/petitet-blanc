import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'

import defaultDog from '../img/default_dog.png'

const DogTile = props => (
  <div
    className="is-parent column is-6"
    key={props.id}
    onClick={() => props.showDog(props.idx, props.officialName || props.title)}>
    <Link to={props.slug}>
      <article className={classNames("is-child", "dog-tile")}>
        <div className={classNames({"dog-for-sale-ribbon": props.forSale})}></div>
        <div className={classNames("dog", {"dog-default": !(props.image && props.image.childImageSharp)})} style={{
          backgroundImage: `url(${
            !!(props.image && props.image.childImageSharp)
              ? props.image.childImageSharp.fluid.src
              : defaultDog
          })`
        }}>
        </div>
        <div className="title is-size-5">
          <div className={classNames({"dog-for-sale": props.forSale})}></div>
          { props.officialName || props.title }
        </div>
      </article>
    </Link>
  </div>
)

export default DogTile
