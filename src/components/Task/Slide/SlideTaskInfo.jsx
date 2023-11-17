import React from 'react';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import styled from 'styled-components';

const SlideTaskInfoStyle = styled(SliderBlock)`
  flex-grow: 1;
`;

const SlideTaskInfo = () => {
  const task = useAsyncValue();
  return (
    <SlideTaskInfoStyle>
      <Box column ai='flex-start'>
        <SliderTitle>{task.title}</SliderTitle>
        <TextSpanStyle>{task.description}</TextSpanStyle>
        {/* <TextSpanStyle>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus, repellat sunt ullam ipsam iusto, repudiandae deserunt
          rerum consequuntur voluptatum eos molestiae in. Dolorum molestiae,
          voluptate qui tempore sunt aspernatur earum! Est, saepe a iure minima
          dolorum itaque consequuntur sint alias accusamus commodi ipsam,
          excepturi libero cumque? Obcaecati doloremque ipsam maiores ullam
          placeat, dignissimos consequuntur perspiciatis quidem nam magnam
          repellat deserunt. Debitis cumque, nostrum blanditiis itaque voluptas
          quod architecto, id explicabo corrupti asperiores quaerat corporis.
          Labore, sunt sint nesciunt debitis animi dolore repudiandae nulla
          accusantium ullam? Voluptatum possimus est nam atque. Quas
          reprehenderit dicta culpa ad, quasi, tempora excepturi ab est nobis
          molestiae inventore saepe harum? Ipsam repudiandae soluta distinctio
          numquam nisi iusto, error est unde praesentium neque labore dolor
          aliquam. Velit porro ducimus a pariatur, eligendi ullam quaerat
          perferendis perspiciatis cum quo quas non consequatur maiores dolores
          magni maxime nam molestias recusandae nihil at! Facilis temporibus eum
          eaque sit blanditiis? Harum vel veritatis perferendis numquam dolore
          deserunt neque aliquid excepturi, minus labore animi unde cumque
          eveniet saepe aut laudantium reprehenderit dicta. Voluptatum quia odio
          aliquid commodi aut nemo non et? Inventore nihil, blanditiis dolore
          dignissimos maxime tenetur dolorum magni eveniet delectus quae
          laudantium, consequuntur iusto nulla sint ea! Eveniet vero a error,
          laboriosam dignissimos nostrum animi consequatur provident molestiae
          corporis? Est nesciunt repellat voluptas magnam quidem nostrum in,
          odit veniam totam molestiae esse ea et autem quasi delectus quos
          obcaecati, nam repellendus nobis pariatur excepturi quo ipsam rerum
          nisi. Quas. Expedita, ea dolorem aspernatur dicta labore totam sunt?
          Natus repellendus sequi nemo facere officiis impedit, dolorum mollitia
          rem qui odio saepe temporibus similique, porro sunt voluptatibus quae
          quod quos eos! Nulla, laborum, natus doloremque sint minima deleniti
          dignissimos officia atque a voluptate ducimus assumenda quia ad nemo
          porro, error aliquid accusantium nisi obcaecati debitis nihil tempora
          sequi doloribus? Fugit, beatae.
        </TextSpanStyle> */}
      </Box>
    </SlideTaskInfoStyle>
  );
};

export default SlideTaskInfo;
