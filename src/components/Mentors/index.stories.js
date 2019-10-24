import React from 'react';
import { storiesOf } from '@storybook/react';

import Mentors from '.';

storiesOf('Mentors', module)
    .add('Default', () => (
        <Mentors />
    ));
