type Props = {
  company: string;
  onSelectCompany: (company: string) => void;
};
export default function HashtagItem({ company, onSelectCompany }: Props) {
  return (
    <li>
      <button onClick={() => onSelectCompany(company)}>#{company}</button>
    </li>
  );
}
