

export default function MajorButton({
  text,
  action,
}: Readonly<{
  text: string,
  action: () => void,
}>): ReactNode {
  return (
    <div className="text-center">
      <div className="button major">
        <div className="wrap" onClick={action}>
          <button>{text}</button>
        </div>
      </div>
    </div>
  );
}
