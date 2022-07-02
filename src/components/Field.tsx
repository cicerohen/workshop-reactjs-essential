type Props = {
  label: string;
  errorMessage?: string;
  invalid: boolean;
  component: React.FunctionComponent;
} & React.DOMAttributes<{}> &
  React.AllHTMLAttributes<{}>;

export const Field = ({
  label,
  errorMessage,
  invalid,
  component: Component,
  ...rest
}: Props) => {
  return (
    <label className="block">
      {label && <span className="block text-sm mb-2">{label}</span>}
      {Component && Component({ invalid, ...rest })}
      {invalid && <span className="text-xs text-red-500">{errorMessage}</span>}
    </label>
  );
};
