import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'clsx'

const Button = React.forwardRef(({ children, wide, size, theme, className, ...rest }, ref) => (
  <button
    {...rest}
    ref={ref}
    className={classNames([
      'flex flex-row space-x-2 justify-center',
      'group transition rounded',
      'font-medium text-sm text-center',
      !size && [
        'py-2',
        !wide && 'px-3',
        wide && 'px-6'
      ],
      size && [
        size === 'sm' && [
          'py-1',
          !wide && 'px-2',
          wide && 'px-4'
        ]
      ],
      !theme && [
        'bg-white border text-gray-500',
        'hover:border-gray-400 hover:text-black'
      ],
      theme && [
        theme === 'danger' && [
          'bg-red-500 text-white',
          'hover:bg-red-600'
        ]
      ],
      className
    ])}
  >
    {children}
  </button>
))

Button.propTypes = {
  wide: PropTypes.bool,
  size: PropTypes.oneOf([
    'sm'
  ]),
  theme: PropTypes.oneOf([
    'danger'
  ])
}

export default Button
