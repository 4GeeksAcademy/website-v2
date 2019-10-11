import React from 'react';
import {storiesOf} from '@storybook/react';

import ProgramDescription from '.';

storiesOf('ProgramDescription', module)
    .add('Default', () => (
        <ProgramDescription />
    ));
