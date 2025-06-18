import QuizMap from 'components/quizMap'

export async function generateStaticParams() {
   return [{ island: 'Sumatra' }, 
          { island: 'Sulawesi' }, 
          { island: 'West_Papua' }, 
          { island: 'Nusa' }, 
          { island: 'Maluku'}, 
          { island: 'Kalimantan' }, 
          { island: 'Java'}]
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ island: string }>
}) {
  // eslint-disable-next-line
  const { island } = await params

  return (
    <main>
      <QuizMap />
    </main>
  )
}
