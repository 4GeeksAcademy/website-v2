import React from 'react';
import {storiesOf} from '@storybook/react';

import Navbar from '.';

storiesOf('Navbar', module)
    .add('Default', () => (
        <Navbar />
    ));