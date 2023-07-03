type Props = {
    label: string;
    value: string;
}

export const InfoItem = ({ label, value }: Props) => {
    return (
        <div className="lg:my-2">
            <div className="text-xs text-center sm:text-base text-sky-600 lg:my-2">{label}</div>
            <div className="text-sm text-center sm:text-4xl text-sky-800 font-bold">{value}</div>
        </div>
    );
}