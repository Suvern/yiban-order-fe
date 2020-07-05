import {observable} from "mobx";

const orderStore = observable({
  order: [],

  setOrder(order: any) {
    if (!order) return
    this.order = order
  },

  getOrderList() {
    return this.order ? Array.prototype.slice.call(this.order) : []
  },

  getOrderAgreedList() {
    if (!this.order) {
      return []
    }

    return this.getOrderList().filter(e => {
      return e['bwc_agreed'] && e['dx_agreed']
    }).sort((a, b) => {
      let ta = new Date(a['date'])
      let tb = new Date(b['date'])
      return tb > ta ? 1 : -1
    })
  },

  getOrderNotAgreedList() {
    if (!this.order) {
      return []
    }

    return this.getOrderList().filter(e => {
      return !e['bwc_agreed'] || !e['dx_agreed']
    }).sort((a, b) => {
      let ta = new Date(a['date'])
      let tb = new Date(b['date'])
      return tb > ta ? 1 : -1
    })
  },

  updateOrder() {
    this.setOrder(new Array(this.order))
  },

  clearAll() {
    this.order = null
  }
})

export default orderStore
