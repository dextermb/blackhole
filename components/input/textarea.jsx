import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'clsx'
import InputLabel from '~/components/input/label'

const Textarea = React.forwardRef(({ label, size, required, disabled, type, placeholder, name, value, onChange, onBlur, ...rest }, ref) => (
  <div {...rest}>
    {label && (
      <InputLabel
        label={label}
        required={required}
      />
    )}
    <textarea
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
        !size && 'p-3',
        size && [
          size === 'sm' && 'p-2'
        ]
      ])}
    />
  </div>
))

Textarea.propTypes = {
  label: PropTypes.node,
  size: PropTypes.oneOf([
    'sm'
  ]),
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

export default Textarea
