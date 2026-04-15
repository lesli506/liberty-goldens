export type PedigreeData = Record<string, string>;

const cell = "border border-border p-2 align-middle text-xs";
const parentCell = `${cell} bg-navy-light min-w-[160px]`;
const gpCell = `${cell} bg-card min-w-[150px]`;
const ggpCell = `${cell} bg-navy min-w-[130px]`;

function Slot({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <div className="text-[10px] text-muted mb-0.5">{label}</div>
      <div className="font-medium text-cream">{value || <span className="text-muted/40 italic">—</span>}</div>
    </div>
  );
}

export function PedigreeChart({ data }: { data: PedigreeData }) {
  const s = data;
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className={`${cell} text-muted font-semibold text-left`}>Parents</th>
            <th className={`${cell} text-muted font-semibold text-left`}>Grandparents</th>
            <th className={`${cell} text-muted font-semibold text-left`}>Great-Grandparents</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={4} className={parentCell}>
              <Slot label="SIRE" value={s.sire} />
            </td>
            <td rowSpan={2} className={gpCell}>
              <Slot label="Sire's Sire" value={s.sire_sire} />
            </td>
            <td className={ggpCell}>
              <Slot label="Sire's Sire's Sire" value={s.sire_sire_sire} />
            </td>
          </tr>
          <tr>
            <td className={ggpCell}>
              <Slot label="Sire's Sire's Dam" value={s.sire_sire_dam} />
            </td>
          </tr>
          <tr>
            <td rowSpan={2} className={gpCell}>
              <Slot label="Sire's Dam" value={s.sire_dam} />
            </td>
            <td className={ggpCell}>
              <Slot label="Sire's Dam's Sire" value={s.sire_dam_sire} />
            </td>
          </tr>
          <tr>
            <td className={ggpCell}>
              <Slot label="Sire's Dam's Dam" value={s.sire_dam_dam} />
            </td>
          </tr>
          <tr>
            <td rowSpan={4} className={`${parentCell} border-t-2 border-t-gold/20`}>
              <Slot label="DAM" value={s.dam} />
            </td>
            <td rowSpan={2} className={gpCell}>
              <Slot label="Dam's Sire" value={s.dam_sire} />
            </td>
            <td className={ggpCell}>
              <Slot label="Dam's Sire's Sire" value={s.dam_sire_sire} />
            </td>
          </tr>
          <tr>
            <td className={ggpCell}>
              <Slot label="Dam's Sire's Dam" value={s.dam_sire_dam} />
            </td>
          </tr>
          <tr>
            <td rowSpan={2} className={gpCell}>
              <Slot label="Dam's Dam" value={s.dam_dam} />
            </td>
            <td className={ggpCell}>
              <Slot label="Dam's Dam's Sire" value={s.dam_dam_sire} />
            </td>
          </tr>
          <tr>
            <td className={ggpCell}>
              <Slot label="Dam's Dam's Dam" value={s.dam_dam_dam} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
