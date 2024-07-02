type ButtonVariant = 'solid' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonColor = 'default' | 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customClass?: string;
  color?: ButtonColor;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function Button({
  customClass,
  color = 'default',
  size = 'md',
  variant = 'solid',
  children = 'Button',
  ...props
}: ButtonProps) {
  const buttonVariantClassStyle = `ds-button-${variant}`;
  const buttonColorClassStyle = `ds-button-${variant}-${color}`;
  const buttonSizeClassStyle = `ds-button-size-${size}`;
  let buttonClassName = `${buttonVariantClassStyle} ${buttonColorClassStyle} ${buttonSizeClassStyle}`;

  if (customClass) {
    buttonClassName += ` ${customClass}`;
  }

  return (
    <button {...props} className={buttonClassName}>
      {children}
    </button>
  );
}
