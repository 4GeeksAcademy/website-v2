import React from 'react';
import {storiesOf} from '@storybook/react';

import Jobs from '.';

storiesOf('Jobs', module)
    .add('Default', () => (
        <Jobs />
    ));