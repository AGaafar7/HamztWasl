// lib/currency.js
//
// Single source of truth for USD → EGP conversion. Used both at
// checkout time (app/actions/payments.js) and in the UI when we
// display the EGP equivalent of a USD price.

export const USD_TO_EGP = 51.94

export function usdToEgp(usd) {
  return Math.round(usd * USD_TO_EGP)
}

export function formatEgp(usd) {
  const egp = usdToEgp(usd)
  return `EGP ${egp.toLocaleString('en-US')}`
}