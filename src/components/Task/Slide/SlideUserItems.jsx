import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { ButtonLink } from 'ui/ButtonLink';
import { SliderTitle } from '../../../styles/slider';
import { useGetAvatar } from 'hooks/MakeAvatar';
import { IconButton } from 'ui/IconButton';
import { useWindowSize } from 'hooks/windowSize';
import { ReactComponent as Close } from 'images/close.svg';
import { AnimatePresence, motion } from 'framer-motion';

const IconAvatar = styled.img`
  border-radius: 40px;
  width: 20px;
  height: 20px;
`;
const SlideUserItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const SlideUserItems = ({
  title,
  buttonName,
  users = [],
  isRemove,
  source,
  cbRemove,
  buttonOnClick,
  mode,
}) => {
  const windowSize = useWindowSize();
  const remove = (user) => {
    cbRemove({
      source: source,
      user: user,
    });
  };
  return (
    <Box column ai='flex-start'>
      <SliderTitle size={12}>
        {title}
        {buttonName && (
          <ButtonLink
            color='#786464'
            size={12}
            borderNone
            onClick={() => {
              buttonOnClick(source);
            }}
          >
            {buttonName}
          </ButtonLink>
        )}
      </SliderTitle>
      <Box
        column={windowSize > 768}
        wrap={windowSize < 768}
        jc='flex-start'
        ai='flex-start'
      >
        <AnimatePresence initial={false} mode={mode}>
          {users.map((user) => (
            <SlideUserItem
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              key={user.UID}
            >
              <IconAvatar
                src={useGetAvatar({
                  avatar: user?.avatar,
                  firstName: user?.firstName,
                  lastName: user?.lastName,
                })}
              />
              <TextSpanStyle size={12}>
                {user?.firstName} {user?.lastName}
              </TextSpanStyle>
              {isRemove && (
                <IconButton
                  onClick={() => {
                    remove(user);
                  }}
                  color='error'
                >
                  <Close />
                </IconButton>
              )}
            </SlideUserItem>
          ))}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default SlideUserItems;
