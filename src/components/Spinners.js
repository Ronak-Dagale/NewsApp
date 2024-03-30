import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class Spinners extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
      </div>
    )
  }
}
