import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import OfferForm from './OfferForm'
import OfferJoinForm from './OfferJoinForm'
import ThingItem from './ThingItem'
import DeleteButton from '../layout/DeleteButton'
import SubmitButton from '../layout/SubmitButton'
import { assignData } from '../../reducers/data'
import { closeModal } from '../../reducers/modal'
import { NEW } from '../../utils/config'

class OfferModify extends Component {
  onCloseClick = () => {
    this.props.closeModal()
  }
  componentWillUnmount() {
    this.props.assignData({ modifyOfferId: null })
  }
  render() {
    const { id, thing } = this.props
    const isNew = id === NEW
    return (
      <div className="offer-modify p2">
        <div className="h2 mt2 mb2"> Offre </div>
        <ThingItem extraClass="mb2" {...thing} />
        <OfferForm {...this.props} />
        <div>
          <SubmitButton
            add="append"
            className="button button--alive button--cta mr1"
            getBody={form => form.offersById[id]}
            getIsDisabled={form =>
              !form ||
              !form.offersById ||
              !form.offersById[id] ||
              (!form.offersById[id].description && !form.offersById[id].name)
            }
            getOptimistState={(state, action) => {
              const modifyOffer = Object.assign(
                {
                  id,
                  thing,
                },
                action.config.body
              )
              return { offers: state.offers.concat(modifyOffer) }
            }}
            getSuccessState={(state, action) => {
              if (action.method === 'POST') {
                return { modifyOfferId: action.data.id }
              }
            }}
            method={isNew ? 'POST' : 'PATCH'}
            path={'offers/' + (isNew ? '' : id)}
            storeKey="offers"
            text={isNew ? 'Enregistrer' : 'Modifer'}
          />
          <DeleteButton
            className={classnames('button button--alive mb2', {
              'button--disabled': isNew,
            })}
            collectionName="offers"
            disabled={isNew}
            id={id}
            text="Supprimer"
          />
        </div>
        {!isNew && [
          <OfferJoinForm key="offer-join-form" {...this.props} />,
          <button
            key="ok"
            className="button button--alive"
            onClick={this.onCloseClick}
          >
            Ok
          </button>,
        ]}
      </div>
    )
  }
}

OfferModify.defaultProps = {
  id: NEW,
}

const getModifyOffer = createSelector(
  state => state.data.offers,
  (state, ownProps) => state.data.modifyOfferId || ownProps.id,
  (offers, offerId) => offers && offers.find(({ id }) => id === offerId)
)

export default connect(
  (state, ownProps) => getModifyOffer(state, ownProps) || {},
  { assignData, closeModal }
)(OfferModify)
