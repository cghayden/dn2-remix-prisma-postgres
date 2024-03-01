// Example function to normalize a JavaScript Date to a date-only string (remove time portion)
// export function normalizeDate(date: Date) {
//   // Create a new date object from the input date
//   const normalizedDate = new Date(date)

//   // Convert the date to the YYYY-MM-DD format, which removes the time component
//   const dateOnlyString = normalizedDate.toISOString().split('T')[0]

//   return dateOnlyString
// }

// class="w-full rounded border bg-gray-50 border-gray-300 text-gray-800 px-2 py-1 focus:ring-2 focus:ring-blue-300"

// Adjusts the input date to a Date object representing midnight UTC of the same day
export function normalizeDate(dateInput: Date) {
  const date = new Date(dateInput)

  // Convert the date to a UTC midnight time to standardize the time part
  const adjustedDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  )
  return adjustedDate
}

// 'dateForPrisma' is now a Date object set to midnight UTC, suitable for storing in the database
