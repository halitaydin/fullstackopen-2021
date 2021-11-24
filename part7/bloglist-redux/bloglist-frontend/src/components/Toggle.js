import { useSelector } from 'react-redux'

const Toggle = ({ id, children }) => {
  const show = useSelector(({ toggle }) => toggle[id])
  return show ? children : null
}

export default Toggle
