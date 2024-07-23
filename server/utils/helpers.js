const checkIsEmpty = (obj) => {
  const keys = Object.values(obj)
  let isEmpty = false
  for (const key of keys) {
    if (!key) {
      isEmpty = true
      break
    }
  }

  return isEmpty
}

module.exports = { checkIsEmpty }

