import React, { useState } from 'react';
import * as S from './style';
import { IDashboardTableHead, IDashboardTableTable } from '../type';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactComponent as ArrowIcon } from '../../../public/images/arrow-down.svg';
interface IDashboardTableLine {
  line: IDashboardTableTable;
  head: IDashboardTableHead[];
}
const DashboardTableLine = (props: IDashboardTableLine) => {
  const [open, setOpen] = useState(false);
  const { line, head } = props;
  const isChild =
    line?.child && Array.isArray(line?.child) && line?.child.length > 0;
  return (
    <>
      <S.DashboardTableLineTr onClick={() => setOpen(!open)}>
        {head?.map((title, idx) => {
          return (
            <S.DashboardTableLineTd key={idx}>
              <S.DashboardTableLineWrap>
                {line[title.key]}
                {idx === 0 && isChild && (
                  <S.Arrow
                    animate={open ? { rotate: 180 } : { rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowIcon />
                  </S.Arrow>
                )}
              </S.DashboardTableLineWrap>
            </S.DashboardTableLineTd>
          );
        })}
      </S.DashboardTableLineTr>
      {line?.child && Array.isArray(line?.child) && line?.child.length > 0 && (
        <tr>
          <td colSpan={head.length}>
            <AnimatePresence>
              {open && (
                <motion.div
                  style={{ overflow: 'hidden' }}
                  initial={{ height: 0 }}
                  exit={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  {
                    <S.DashboardTableLineTable>
                      <thead>
                        <tr>
                          {head?.map((header, idx) => {
                            return (
                              <th key={idx}>
                                <S.DashboardTableLineThWrap>
                                  {header.title}
                                </S.DashboardTableLineThWrap>
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {line.child.map((line, idx) => (
                          <DashboardTableLine
                            line={line}
                            head={head}
                            key={idx}
                          />
                        ))}
                      </tbody>
                    </S.DashboardTableLineTable>
                  }
                </motion.div>
              )}
            </AnimatePresence>
          </td>
        </tr>
      )}
    </>
  );
};

export default DashboardTableLine;
