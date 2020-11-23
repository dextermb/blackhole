import React from 'react'
import Next from 'next/link'
import PropTypes from 'prop-types'
import classNames from 'clsx'

const Link = React.forwardRef(({ children, href, as, className, ...rest }, ref) => (
  <Next href={href} as={as}>
    <button
      {...rest}
      ref={ref}
      className={classNames([
        'flex flex-row space-x-2 justify-center',
        'group transition',
        'font-medium text-sm text-center text-gray-500',
        'hover:text-black',
        className
      ])}
    >
      {children}
    </button>
  </Next>
))

Link.propTypes = {
  href: PropTypes.string,
  as: PropTypes.string
}

export default Link
