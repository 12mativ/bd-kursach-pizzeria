interface IJobInfo {
  id: string,
  name: string,
  workers: {id: string, name: string}[],
}

export const JobCard = ({job}: {job: IJobInfo}) => {
  return (
    <div className="flex flex-col gap-y-2 border border-neutral-700 p-2 rounded w-[300px] bg-neutral-800">
      <p className="text-indigo-400">{job.name}</p>
      {job.workers.map((w) => (
        <p key={w.id}>{w.name}</p>
      ))}
    </div>
  )
}