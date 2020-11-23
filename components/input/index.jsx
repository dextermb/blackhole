import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'clsx'
import InputLabel from '~/components/input/label'

const Input = React.forwardRef(({ label, size, required, disabled, type, placeholder, name, value, onChange, onBlur, ...rest }, ref) => (
  <div {...rest}>
    {label && (
      <InputLabel
        label={label}
        required={required}
      />
    )}
    <input
      ref={ref}
      name={name}
      type={type}
      value={value}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      className={classNames([
        'w-full border rounded',
        'focus:outline-none focus:ring-2',
        !disabled && 'bg-white',
        disabled && 'bg-gray-100 cursor-not-allowed',
        !size && 'px-3 py-2',
        size && [
          size === 'sm' && 'px-2 py-1'
        ]
      ])}
    />
  </div>
))

Input.propTypes = {
  label: PropTypes.node,
  size: PropTypes.oneOf([
    'sm'
  ]),
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

export default Input
