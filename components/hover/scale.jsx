import PropTypes from 'prop-types'

const HoverScale = ({ children, scale }) => (
  <div className={`transition transform group-hover:scale-${scale}`}>
    {children}
  </div>
)

HoverScale.defaultProps = {
  scale: 110
}

HoverScale.propTypes = {
  scale: PropTypes.number
}

export default HoverScale
