function removeDuplicates(array) {
  const unique = new Set()
  const uniqueArray = []

  array.forEach((item) => {
    let identifier = item

    // Attempt to create a unique identifier for objects and arrays
    if (typeof item === 'object' && item !== null) {
      try {
        identifier = JSON.stringify(item)
      } catch (error) {
        console.error('Error serializing item:', error)
        // Fallback to using the object reference itself for comparison,
        // acknowledging that this won't remove duplicate objects
        identifier = item
      }
    }

    if (!unique.has(identifier)) {
      unique.add(identifier)
      uniqueArray.push(item)
    }
  })

  return uniqueArray
}

export { removeDuplicates }
