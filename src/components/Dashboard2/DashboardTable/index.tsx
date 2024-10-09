import React, { useEffect, useRef, useState } from 'react';
import * as S from './style';
import { IDashboardTable } from '../type';
import TextUI from '../../../uiTs/TextUI';
import DashboardTableLine from '../DashboardTableLine';
import ButtonLink from '../../../uiTs/ButtonLink';

const DashboardTable = (props: IDashboardTable) => {
  const { titleComponent, head, table, excelURI } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [heightContainer, setHeightContainer] = useState<number | undefined>(
    undefined
  );
  useEffect(() => {
    if (containerRef.current) {
      setHeightContainer(containerRef.current.offsetHeight);
    }
  }, []);
  return (
    <S.DashboardTableComponent>
      <TextUI size={16} bold>
        {titleComponent}
      </TextUI>
      <S.DashboardTableContainer ref={containerRef} $height={heightContainer}>
        <S.DashboardTable>
          <S.DashboardTableThead>
            <tr>
              {head &&
                head.map((header) => (
                  <S.DashboardTableTh key={header.title}>
                    {header.title}
                  </S.DashboardTableTh>
                ))}
            </tr>
          </S.DashboardTableThead>
          <tbody>
            {table &&
              table.map((line, idx) => {
                return (
                  <DashboardTableLine line={line} head={head || []} key={idx} />
                );
              })}
          </tbody>
        </S.DashboardTable>
      </S.DashboardTableContainer>
      {excelURI && (
        <ButtonLink size={12} color='grey' href={excelURI} download>
          Скачать в Excel
        </ButtonLink>
      )}
    </S.DashboardTableComponent>
  );
};

export default DashboardTable;
