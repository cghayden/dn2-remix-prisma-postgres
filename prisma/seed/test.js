async function displayValuesWithWait(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('The current value is: ', value)
      resolve()
    }, 1000)
  })
}

async function valueLogger() {
  const values = [1, 2, 3, 4, 5]

  console.log('Starting to display values')

  values.forEach(async (value) => {
    console.log(
      'About to run displayValuesWithWait() process for value ',
      value
    )

    await displayValuesWithWait(value)

    console.log('Finished displayValuesWithWait() for value ', value)
  })

  console.log('Finished displaying values')
}

valueLogger()
