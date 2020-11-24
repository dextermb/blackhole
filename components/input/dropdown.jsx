import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'clsx'

import ChevronDown from 'heroicons/solid/chevron-down.svg'

import InputLabel from '~/components/input/label'

const Dropdown = React.forwardRef(({ label, size, required, disabled, type, placeholder, name, value, options, onChange, onBlur, ...rest }, ref) => (
  <div {...rest}>
    {label && (
      <InputLabel
        label={label}
        required={required}
      />
    )}
    <div className='relative'>
      <select
        ref={ref}
        name={name}
        type={type}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames([
          'w-full border rounded appearance-none',
          'focus:outline-none focus:ring-2',
          !disabled && 'bg-white',
          disabled && 'bg-gray-100 cursor-not-allowed',
          !size && 'px-3 py-2',
          size && [
            size === 'sm' && 'px-2 py-1'
          ]
        ])}
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className={classNames([
          'w-4 h-4 absolute top-1/2 right-0 transform -translate-y-1/2 opacity-50 pointer-events-none',
          !size && 'mr-3',
          size && [
            size === 'sm' && 'mr-2'
          ]
        ])}
      />
    </div>
  </div>
))

const option = PropTypes.shape({
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired
})

Dropdown.propTypes = {
  label: PropTypes.node,
  size: PropTypes.oneOf([
    'sm'
  ]),
  options: PropTypes.arrayOf(option),
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

export default Dropdown
