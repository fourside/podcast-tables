import { formatHourMinute } from "../lib/day";
import { Program, ProgramPerDate} from "../lib/station";
import styles from "./programColumns.module.css";

type Props = {
  programs: ProgramPerDate[]
};

export const ProgramColumns: React.FC<Props> = ({ programs }) => {
  return (
    <div className={styles.container}>
      {programs.map(program => (
        <div className={styles.column} key={program.date}>
          <h3 className={styles.date}>{program.date}</h3>
          {program.programs.map((p) => (
            <ProgramCard program={p} key={p.id} />
          ))}
        </div>
      ))}
    </div>
  )
}

type ProgramCardProps = {
  program: Program
}
const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const time = formatHourMinute(program.from);
  return (
    <div className={styles.program}>
      <span className={styles.time}>{time}</span>
      <h4 className={styles.title}>{program.title}</h4>
      <div>{program.personality}</div>
      <div className={styles.info}>{program.info}</div>
    </div>
  )
};
