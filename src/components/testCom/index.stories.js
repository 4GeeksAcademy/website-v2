import React from 'react';
import {storiesOf} from '@storybook/react';

import TestCom from '.';

storiesOf('TestCom', module)
    .add('Default', () => (
        <TestCom />
    ));