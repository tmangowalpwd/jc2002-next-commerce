import { gaMeasurementId } from '../configs/ga'

export const pageView = (url) => {
  window.gtag("config", gaMeasurementId, {
    page_path: url
  })
}

export const gaEvent = ({ action, label, value, category, user_id }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    user_id: user_id ? user_id : "guest"
  })
}