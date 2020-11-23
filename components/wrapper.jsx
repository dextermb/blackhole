import classNames from 'clsx'

const Wrapper = ({ children, className, ...rest }) => (
  <div
    {...rest}
    className={classNames([
      'w-full max-w-screen-lg mx-auto px-8',
      className
    ])}
  >
    {children}
  </div>
)

export default Wrapper
