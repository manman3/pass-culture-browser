import get from 'lodash.get'
import React from 'react'
import Dotdotdot from 'react-dotdotdot'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr-short'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import Icon from '../components/Icon'
import { getDiscoveryPath } from '../utils/routes'

const formatter = buildFormatter(Object.assign(frenchStrings, {
  prefixAgo: 'Il y a',
  prefixFromNow: 'Dans',
}))

const BookingItem = props => {
  const { date,
    mediation,
    offer,
    thumbUrl,
    token
  } = props
  return (
    <li>
      <Link to={`${getDiscoveryPath(offer, mediation)}?to=verso`}>
        <div className='thumb'>
          <img src={thumbUrl} alt='Thumb' />
        </div>
        <div className='infos'>
          <div className='top'>
            <h5 title={get(props, 'source.name')} >
              <Dotdotdot clamp={date ? 2 : 3}>{get(props, 'source.name')}</Dotdotdot>
            </h5>
            <TimeAgo date={date} formatter={formatter} />
          </div>
          <div className='token'>{token}</div>
        </div>
        <div className='arrow'>
          <Icon svg='ico-next-S' />
        </div>
      </Link>
    </li>
  )
}

export default BookingItem
