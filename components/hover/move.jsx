import PropTypes from 'prop-types'
import classNames from 'clsx'

const HoverMove = ({ children, move }) => (
  <div
    className={classNames([
      'transition transform',
      move < 0
        ? `group-hover:-translate-x-${Math.abs(move)}`
        : `group-hover:translate-x-${Math.abs(move)}`
    ])}
  >
    {children}
  </div>
)

HoverMove.defaultProps = {
  move: 1
}

HoverMove.propTypes = {
  move: PropTypes.number
}

export default HoverMove
