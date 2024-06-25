export function convertToUSCurrency(value: number | undefined) {
  const numericValue = String(value).replace(/[^0-9.,]/g, '')
  const valueWithDots = numericValue.replace(/,/g, '.')
  const parsedValue = parseFloat(valueWithDots)

  if (isNaN(parsedValue)) {
    return '' // Handle invalid values as desired, such as returning an empty string
  }

  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(parsedValue)

  return formattedValue
}
