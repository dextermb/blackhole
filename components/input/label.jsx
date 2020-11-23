import PropTypes from 'prop-types'

const InputLabel = ({ label, required }) => (
  <div className='mb-1 text-sm text-gray-500'>
    {typeof label !== 'string' && label}
    {typeof label === 'string' && (
      <label className='flex flex-row space-x-2'>
        <span>{label}</span>
        {required && (
          <span className='text-red-500'>
            *
          </span>
        )}
      </label>
    )}
  </div>
)

InputLabel.propTypes = {
  label: PropTypes.node,
  required: PropTypes.bool
}

export default InputLabel
