type Props = {
  params: { type: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function BookingPageContent({ params, searchParams }: Props) {
  console.log(params, searchParams);
  return <div>page</div>;
}
