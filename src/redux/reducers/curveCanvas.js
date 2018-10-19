const getInitList = () => {
  const list = []
  for (let i = 0; i <= 255; i++) {
    list.push([i, i])
  }
  return list
}

const initState = {
  points: [[0, 0], [255, 255]],
  list: getInitList()
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    default:
      return state
  }
}
