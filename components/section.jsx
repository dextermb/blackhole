import classNames from 'clsx'

const Section = ({ children, className, ...rest }) => (
  <div
    {...rest}
    className={classNames([
      'mb-4',
      className
    ])}
  >
    {children}
  </div>
)

export default Section
