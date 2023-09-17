import {Checkbox} from '@mui/material';
import {ReactNode} from 'react';


interface ColumnHeadersProps {
  columnNames: string[];
}

interface EntityGridProps<T extends object> {
  entities: T[];
  fieldToColumnNames: {[field: string]: string};
  orderedFields: string[];
}

interface DataCellProps {
  key: string | number;
  children?: ReactNode;
}

/**
 * Standard format for a data cell in entity grid
 * @param {DataCellProps} props
 * @return {ReactNode}
 */
function DataCell({key, children}: DataCellProps) {
  return (
    <div className="w-28" key={key}>
      {children}
    </div>
  );
}

/**
 * @param {ColumnHeadersProps} props
 * @return {ReactNode}
 */
function ColumnHeaders({columnNames}: ColumnHeadersProps): ReactNode {
  return (
    <div
      className={`flex flex-row border-b border-slate-300`}
    >
      {
        columnNames.map((columnName, i) =>
          <DataCell key={i}>
            {columnName}
          </DataCell>
        )
      }
    </div>
  );
}


/**
 * @param {EntityGridProps<T>} props
 * @return {ReactNode}
 */
export function EntityViewGrid<T extends object>(
    {entities, fieldToColumnNames, orderedFields}:
    EntityGridProps<T>)
  : ReactNode {
  if (entities.length == 0) {
    return <div></div>;
  }
  const orderedColumns = orderedFields
      .map((field) => fieldToColumnNames[field]);
  const fields = Object.keys(fieldToColumnNames);

  const fieldToValues = new Map<string, string[]>();
  entities.forEach((entity) => {
    Object.entries(entity).forEach(([field, value]) => {
      if (!fields.includes(field)) return;
      if (fieldToValues.get(field) == undefined) {
        fieldToValues.set(field, []);
      }
      const values = fieldToValues.get(field);
      values?.push(value);
    });
  });
  console.log();

  return (
    <div className="flex flex-row p-4">
      <div className="flex flex-col">
        <div className="px-8">
          <ColumnHeaders columnNames={orderedColumns} />
        </div>
        <div className={`flex flex-row pt-1`}>
          <div className="flex flex-col gap-2 w-8">
            {
              new Array(entities.length).fill(0).map((_, i) =>
                <DataCell key={i}>
                  <Checkbox
                    sx={{height: 20, width: 20}}
                  />
                </DataCell>
              )
            }
          </div>
          {
            orderedFields.map((field, i) =>
              <div className="flex flex-col gap-2" key={i}>
                {
                  fieldToValues.get(field)?.map((value, i) =>
                    <DataCell key={i}>
                      {value ?? '?'}
                    </DataCell>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
