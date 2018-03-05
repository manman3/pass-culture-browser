import { API_URL, THUMBS_URL } from '../utils/config'

export function getCardFromUserMediation (userMediation) {
  const { mediation,
    userMediationOffers
  } = userMediation
  // choose one of the offer
  const offer = userMediationOffers[Math.floor(Math.random() * userMediationOffers.length)]
  // check
  if (!offer && !mediation) {
    console.warn('no offer neither mediation here!')
    return null
  }
  // choose an image
  let source
  let sourceCollectionName
  if (offer) {
    if (offer.eventOccurence) {
      source = offer.eventOccurence
      sourceCollectionName = 'eventOccurences'
    } else {
      source = offer.thing
      sourceCollectionName = 'things'
    }
  } else {
    if (mediation.event) {
      source = mediation.event
      sourceCollectionName = 'events'
    } else {
      source = mediation.thing
      sourceCollectionName = 'things'
    }
  }
  const thumbUrl = mediation && mediation.thumbCount > 0
    ? `${THUMBS_URL}/mediations/${mediation.id}`
    : (
      source && source.thumbCount > 0
        ? `${THUMBS_URL}/${sourceCollectionName}/${source.id}`
        : `${API_URL}/static/images/default_thumb.png`
    )
  return Object.assign({ source, thumbUrl }, userMediation)
}