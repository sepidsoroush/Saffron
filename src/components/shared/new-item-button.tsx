import { AddCircleFill } from "./icons";

type Props = {
  onClick: () => void;
};

export function NewItemButton({ onClick }: Props) {
  return (
    <div className="text-orange-500" onClick={onClick}>
      <AddCircleFill width={30} height={30} />
    </div>
  );
}
