import React, { useState } from 'react';
import { SliderTitle } from '../../../styles/slider';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { Box } from 'ui/Box';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Plus } from 'images/plus.svg';
import DialogWindow from 'components/Main/DialogWindow';
import WindowPlatformLine from './WindowPlatformLine';
import { useAsyncValue } from 'react-router-dom';
import InputText from 'ui/InputText/InputText';
import { useFormContext, Controller } from 'react-hook-form';

const TableStyle = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  position: relative;
  background-color: #fff;
`;
const TableHeader = styled.thead`
  font-family: ${({ theme }) => theme.font.familyBold};
  position: sticky;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  & > tr > th {
    padding: 0.3rem;
  }
`;
const TableLine = styled(motion.tr)`
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #e6b2f0;
  }
  & > td {
    padding: 0.3rem;
    text-align: center;
  }
`;
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const SlidePlanPlatform = ({ platform, setAdvertising, platformIdx }) => {
  const [windowDialog, setWindowDialog] = useState(null);
  const plan = useAsyncValue();
  const { control } = useFormContext();

  const openWindowDialog = (e, region) => {
    setWindowDialog({
      platformName: e.target.id,
      region: region || null,
    });
  };
  const closeWindowDialog = () => {
    setWindowDialog(null);
  };
  return (
    <>
      <SliderTitle>{platform.platformName}</SliderTitle>
      <TableStyle style={{ width: '100%' }}>
        <TableHeader>
          <tr>
            <th>
              <Box gap='0.2rem'>
                Регион:
                <IconButton
                  id={platform.platformName}
                  onClick={openWindowDialog}
                  disabled={plan.isManagerAccepted}
                >
                  <Plus />
                </IconButton>
              </Box>
            </th>
            <th>Категория:</th>
            <th>Сейчас:</th>
            <th>План:</th>
            <th>Факт:</th>
          </tr>
        </TableHeader>
        <tbody>
          <AnimatePresence>
            {platform?.data?.length > 0 &&
              platform.data.map((region, regionIdx) => (
                <React.Fragment key={regionIdx}>
                  <TableLine
                    variants={variants}
                    initial='hidden'
                    animate='visible'
                  >
                    <td
                      rowSpan={region?.data ? region.data.length + 1 : 1}
                      style={{ verticalAlign: 'top' }}
                    >
                      <Box gap='0.2rem'>
                        {region.regName}
                        <IconButton
                          id={platform.platformName}
                          disabled={plan.isManagerAccepted}
                          onClick={(e) => {
                            openWindowDialog(e, region);
                          }}
                        >
                          <Plus />
                        </IconButton>
                      </Box>
                    </td>
                  </TableLine>
                  <AnimatePresence>
                    {region?.data?.length > 0 &&
                      region.data.map((row, categoryIdx) => (
                        <TableLine
                          key={row.catName}
                          variants={variants}
                          initial='hidden'
                          animate='visible'
                        >
                          <td>{row.catName}</td>
                          <td>{row.current}</td>
                          <td>
                            <Controller
                              name={`advertising[${platformIdx}].data[${regionIdx}].data[${categoryIdx}].plan`}
                              defaultValue={row.plan || ''}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <InputText
                                    value={field.value}
                                    type='number'
                                    disabled={plan?.dateManagerAccepted}
                                    onChange={(e) =>
                                      field.onChange(e.target.value)
                                    }
                                  />
                                );
                              }}
                            />
                          </td>
                          <td>{row.fact}</td>
                        </TableLine>
                      ))}
                  </AnimatePresence>
                </React.Fragment>
              ))}
          </AnimatePresence>
        </tbody>
      </TableStyle>
      <DialogWindow onClose={closeWindowDialog} open={Boolean(windowDialog)}>
        <WindowPlatformLine
          onClose={closeWindowDialog}
          setAdvertising={setAdvertising}
          platform={windowDialog}
          UID={plan.UID}
        />
      </DialogWindow>
    </>
  );
};

export default SlidePlanPlatform;
